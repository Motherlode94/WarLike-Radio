const $=id=>document.getElementById(id),days=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
let lastStream='',requestInFlight=false;
async function refresh(){
 if(requestInFlight)return;requestInFlight=true;
 try{
  const response=await fetch('/api/station',{cache:'no-store'}),data=await response.json();
  if(!response.ok)throw Error(data.error||'Service indisponible');
  const station=data.station||{},live=data.live||{},onAir=live.is_on_air===true&&Boolean(station.stream_url);
  $('stationName').textContent=station.name||'WarLike Radio';
  $('description').textContent=station.description||'';
  $('status').textContent=onAir?'● ON AIR déclaré · Lecteur proposé':'○ Hors antenne';
  $('nowOnAir').textContent=onAir?[(live.show_title||'Émission en direct'),live.host?'Avec '+live.host:'',live.message||''].filter(Boolean).join(' · '):'Aucune émission déclarée en cours.';
  const stream=onAir?station.stream_url:'';
  if(stream!==lastStream){
   const player=$('live');player.pause();player.removeAttribute('src');
   if(stream)player.src=stream;else player.load();
   lastStream=stream;
  }
  $('live').hidden=!onAir;
  $('playError').textContent='';
  $('schedule').replaceChildren(...(data.shows||[]).map(show=>{const li=document.createElement('li');li.textContent=days[show.day]+' '+show.start_time+' — '+show.title+' ('+show.duration_minutes+' min)'+(show.host?' · '+show.host:'');return li;}));
 }catch(e){$('status').textContent='Service indisponible : '+e.message;}finally{requestInFlight=false;}
}
$('live').addEventListener('error',()=>{$('playError').textContent='Lecture impossible. Le diffuseur doit vérifier le flux audio HTTPS et son encodeur.';});
$('refreshOnAir').onclick=refresh;
setInterval(refresh,15000);
refresh();
