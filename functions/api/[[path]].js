const reply=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
const validUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&u.href.length<=1500;}catch{return false;}};
export async function onRequest({request,env}){
 if(!env.RADIO_DB)return reply({error:'RADIO_DB non configurée'},503);
 const url=new URL(request.url),path=url.pathname.replace(/^\/api\/?/,'').replace(/\/$/,'');
 if(request.method==='GET'&&(path==='station'||path==='health')){try{const station=await env.RADIO_DB.prepare('SELECT name,stream_url,description,updated_at FROM station WHERE id=1').first();if(path==='health')return reply({ok:true});const shows=await env.RADIO_DB.prepare('SELECT id,day,start_time,duration_minutes,title,host FROM shows ORDER BY day,start_time').all();return reply({station,shows:shows.results});}catch{return reply({error:'Erreur base de données'},500);}}
 if(request.method!=='POST'||!['station','shows','shows/delete'].includes(path))return reply({error:'Route introuvable'},404);
 if(request.headers.get('origin')!==url.origin)return reply({error:'Origine interdite'},403);
 const secret=env.RADIO_ADMIN_TOKEN;
 if(!secret||secret.length<24)return reply({error:'Administration non configurée'},503);
 if(request.headers.get('authorization')!=='Bearer '+secret)return reply({error:'Accès administrateur refusé'},401);
 try{
  const raw=await request.text();if(raw.length>6000)return reply({error:'Requête volumineuse'},413);const body=JSON.parse(raw);
  if(path==='station'){
   const name=String(body.name||'').trim(),description=String(body.description||'').trim(),stream=String(body.stream_url||'').trim();
   if(!name||name.length>90||description.length>300||(stream&&!validUrl(stream)))return reply({error:'Configuration invalide : URL HTTPS directe requise'},400);
   await env.RADIO_DB.prepare('UPDATE station SET name=?,description=?,stream_url=?,updated_at=? WHERE id=1').bind(name,description,stream,Date.now()).run();
  }else if(path==='shows'){
   const title=String(body.title||'').trim(),host=String(body.host||'').trim(),start=String(body.start_time||'');
   const day=Number(body.day),duration=Number(body.duration_minutes);
   if(!Number.isInteger(day)||day<0||day>6||!/^([01]\d|2[0-3]):[0-5]\d$/.test(start)||!Number.isInteger(duration)||duration<1||duration>1440||!title||title.length>90||host.length>90)return reply({error:'Émission invalide'},400);
   await env.RADIO_DB.prepare('INSERT INTO shows(id,day,start_time,duration_minutes,title,host) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),day,start,duration,title,host).run();
  }else{
   const id=String(body.id||'');if(!/^[0-9a-f-]{36}$/i.test(id))return reply({error:'Identifiant invalide'},400);
   await env.RADIO_DB.prepare('DELETE FROM shows WHERE id=?').bind(id).run();
  }
  return reply({ok:true});
 }catch{return reply({error:'Écriture impossible'},500);}
}