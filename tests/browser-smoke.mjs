import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'load'});
 await page.locator('[data-tab="schedule"]').click();
 await page.locator('#showTime').fill('20:30');
 await page.locator('#showName').fill('WarLike Sessions QA');
 await page.locator('#showHost').fill('Studio');
 await page.locator('#scheduleForm button[type=submit]').click();
 await page.getByText('WarLike Sessions QA',{exact:true}).waitFor();
 await page.reload();
 await page.locator('[data-tab="schedule"]').click();
 await page.getByText('WarLike Sessions QA',{exact:true}).waitFor();
 await page.locator('[data-tab="player"]').click();
 await page.locator('#streamUrl').fill('https://example.org/qa-stream.mp3');
 await page.locator('#streamName').fill('Radio QA');
 await page.locator('#streamForm button[type=submit]').click();
 await page.getByText('Radio QA',{exact:true}).waitFor();
 await page.reload();
 await page.locator('[data-tab="library"]').click();
 await page.getByText('Radio QA',{exact:true}).waitFor();
 assert.deepEqual(errors,[],'Unexpected browser errors');
 console.log('PASS: radio schedule and stream list persist across reloads');
}finally{await browser.close();}
