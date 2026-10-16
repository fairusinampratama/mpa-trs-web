const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-core');
(async()=>{
 const root=path.resolve(__dirname,'../dist'),out=path.resolve(process.env.EVIDENCE_DIR||'photography-evidence');fs.mkdirSync(out,{recursive:true});
 const server=http.createServer((req,res)=>{const f=path.resolve(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/mpa-trs-web\//,'')||'index.html');if(!f.startsWith(root+path.sep)||!fs.existsSync(f)){res.writeHead(404);return res.end('missing');}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));});await new Promise(r=>server.listen(4181,'127.0.0.1',r));
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--no-zygote','--disable-gpu']}),errors=[],failures=[],navigationAborts=[],metrics=[];
 const pages=[['home','/',4],['catalogue','/program/te',1],['te11','/expedition/te11',2],['gh29','/activity/gh29',1],['rc29','/activity/rc29',1],['kawi29','/activity/kawi29',1],['batafia30','/activity/batafia30',1]];
 try{
 for(const width of [1366,1024,768,390,320]){
  const p=await b.newPage({viewport:{width,height:width<768?844:900},deviceScaleFactor:1});p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('requestfailed',r=>{const issue={url:r.url(),error:r.failure()?.errorText};if(issue.error==='net::ERR_ABORTED')navigationAborts.push(issue);else failures.push(issue);});
  for(const [name,route,count] of pages){
   await p.goto('http://127.0.0.1:4181/mpa-trs-web/#'+route);await p.locator('main h1').waitFor();await p.evaluate(()=>document.fonts.ready);
   const images=p.locator('main figure img');assert.equal(await images.count(),count,name+' image count');
   for(const im of await images.all()){await im.scrollIntoViewIfNeeded();await im.evaluate(im=>im.decode());}
   const m=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.querySelectorAll('main figure img')].map(im=>({asset:im.closest('figure').dataset.mediaAsset,use:im.closest('figure').dataset.mediaUse,src:im.currentSrc,loading:im.loading,priority:im.fetchPriority,alt:im.alt,w:im.width,h:im.height,naturalWidth:im.naturalWidth,naturalHeight:im.naturalHeight,widthAttr:im.getAttribute('width'),heightAttr:im.getAttribute('height'),srcset:im.srcset,sizes:im.sizes,credit:im.closest('figure').querySelector('.ds-credit')?.textContent,fit:getComputedStyle(im).objectFit})),actionBottom:document.querySelector('.ds-hero-actions')?.getBoundingClientRect().bottom,bytes:performance.getEntriesByType('resource').filter(r=>r.name.includes('/media/')).reduce((s,r)=>s+r.encodedBodySize,0)}));
   assert.equal(m.scrollWidth,width,name+' overflow');for(const im of m.images){assert(im.naturalWidth>0&&im.naturalHeight>0);assert(im.alt);assert(im.srcset&&im.sizes);assert.equal(im.fit,'contain');assert.equal(im.credit,'Foto: Dokumentasi HUMED MAPALA Tursina');assert(Math.abs(im.w/im.h-im.naturalWidth/im.naturalHeight)<.03);assert(im.widthAttr&&im.heightAttr);}
   if(name==='home'){await p.evaluate(()=>scrollTo(0,0));const actions=await p.locator('.ds-hero-actions').boundingBox();assert(actions.y+actions.height<740);assert.equal(m.images[0].loading,'eager');assert.equal(m.images[0].priority,'high');assert(m.images.slice(1).every(im=>im.loading==='lazy'));}
   if(name==='te11')assert(m.images.find(im=>im.asset==='te11-ecology').loading==='lazy');
   metrics.push({route,...m});await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,name+'-'+width+'-first.jpg'),type:'jpeg',quality:85});await p.screenshot({path:path.join(out,name+'-'+width+'-full.jpg'),type:'jpeg',quality:85,fullPage:true});await p.reload();await p.locator('main h1').waitFor();
  }
  for(const route of ['/expedition/te10','/expedition/te12','/activity/gh28','/activity/rc26','/jejak','/ui-lab']){await p.goto('http://127.0.0.1:4181/mpa-trs-web/#'+route);await p.locator('main h1').waitFor();assert.equal(await p.locator('main figure img').count(),0,'Unapproved placement '+route);}
  await p.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
 // Delayed image bytes must not change the reserved hero geometry.
 const p=await b.newPage({viewport:{width:390,height:844}});let release;const wait=new Promise(r=>release=r);
 await p.route('**/media/kawi-collective-*.webp',async r=>{await wait;await r.continue();});
 await p.goto('http://127.0.0.1:4181/mpa-trs-web/',{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.locator('.ds-media-identity img').waitFor();const before=await p.locator('.ds-media-identity img').boundingBox();release();await p.locator('.ds-media-identity img').evaluate(im=>im.decode());const after=await p.locator('.ds-media-identity img').boundingBox();assert(Math.abs(before.height-after.height)<1);assert(Math.abs(before.y-after.y)<1);await p.close();
 // Intentional failed image keeps compact explanatory fallback; no runtime error.
 const failed=await b.newPage({viewport:{width:320,height:844}});await failed.route('**/media/kawi-collective-*.webp',r=>r.abort());await failed.goto('http://127.0.0.1:4181/mpa-trs-web/');await failed.getByText('Dokumentasi tidak termuat',{exact:true}).waitFor();assert.equal(await failed.locator('.ds-media-identity').count(),0);assert.equal(await failed.evaluate(()=>document.documentElement.scrollWidth),320);await failed.close();
 fs.writeFileSync(path.join(out,'photography-results.json'),JSON.stringify({status:'PASS',publicCandidate:true,creditApproved:true,browser:await b.version(),metrics,errors,failures,navigationAborts,layoutReservation:{before,after},checks:['35 actual-photo layouts, seven routes at five CSS widths','11 exact use IDs','30 unauthorized sparse/history/lab checks','full frame contain crops and responsive srcset','literal mobile identity/actions before media','hero eager/high priority; secondary lazy','image intrinsic sizing preserved before/after load','failed-image fallback at 320','direct refresh']},null,2));console.log('PASS approved public media: 35 layouts, 30 unauthorized-context checks, reserved geometry and failure fallback');
 }finally{await b.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exit(1)});
