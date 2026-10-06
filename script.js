const currentScript=document.currentScript;
const carouselScript=document.createElement('script');carouselScript.src=new URL('recent-carousel.js?v=20261007-1',currentScript.src).href;carouselScript.defer=true;document.head.appendChild(carouselScript);
if(!document.querySelector('script[data-node8-cms]')){const cmsScript=document.createElement('script');cmsScript.src=new URL('cms-public.js?v=20261007-1',currentScript.src).href;cmsScript.defer=true;document.head.appendChild(cmsScript);}

const footerVideo=document.querySelector('.node8-footer-media video');
if(footerVideo){footerVideo.muted=true;if('IntersectionObserver' in window){const playObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)footerVideo.play().catch(()=>{});else footerVideo.pause()}));playObserver.observe(footerVideo)}else footerVideo.play().catch(()=>{})}

const button=document.querySelector('.top-button');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
addEventListener('scroll',()=>button?.classList.toggle('is-visible',scrollY>440),{passive:true});
button?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
// Phone menu: the glass sheet lives in grid-foundation.css (2026-10-05). ☰ opens and closes it; a tap on the dimmed
// page or Esc closes it too.
const setMenu=open=>{nav?.classList.toggle('is-open',open);menuButton?.setAttribute('aria-expanded',String(open));menuButton?.setAttribute('aria-label',open?'Close menu':'Open menu')};
menuButton?.addEventListener('click',()=>setMenu(!nav.classList.contains('is-open')));
menuButton?.closest('.site-header')?.addEventListener('click',event=>{if(event.target===event.currentTarget&&nav?.classList.contains('is-open'))setMenu(false)});
addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open')){setMenu(false);menuButton?.focus()}});
document.querySelectorAll('.detail-film-trigger[data-youtube-id]').forEach((trigger)=>{trigger.addEventListener('click',()=>{const frame=trigger.closest('.detail-film-frame');const videoId=trigger.dataset.youtubeId;if(!frame||!videoId)return;const player=document.createElement('iframe');player.className='detail-film-embed';player.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;player.title=trigger.getAttribute('aria-label')||'Project film';player.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';player.allowFullscreen=true;frame.replaceChildren(player)})});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-shown');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
addEventListener('load',()=>{const rail=document.querySelector('.recent-rail');const card=rail?.querySelector('.recent-card');if(rail&&card){requestAnimationFrame(()=>{const width=card.getBoundingClientRect().width;rail.scrollLeft=width+16-(rail.clientWidth-width)/2})}},{once:true});
const heroCopy=document.querySelector('[data-tune-id="hero-title"],[data-tune-id="about-hero-title"]')?.closest('.hero-content');
if(heroCopy&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  // Home and About hero: as the page scrolls, the whole text group sinks into the hero frame at 40% of the scroll speed.
  const hero=heroCopy.closest('.hero');
  let heroFrame;
  const updateHero=()=>{heroFrame=undefined;const y=Math.min(Math.max(scrollY,0),hero.offsetTop+hero.offsetHeight);heroCopy.style.transform=y?`translate3d(0,${(y*.4).toFixed(1)}px,0)`:''};
  const requestHero=()=>{if(!heroFrame)heroFrame=requestAnimationFrame(updateHero)};
  addEventListener('scroll',requestHero,{passive:true});addEventListener('resize',requestHero);requestHero();
}
// Bundle 5 motion standard. Children marked data-rise come up in turn when their data-rise-group first comes into view;
// only groups below the fold are hidden first, so a visitor never sees content disappear.
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const riseGroups=[...document.querySelectorAll('[data-rise-group]')];
if(riseGroups.length&&!reduceMotion&&'IntersectionObserver' in window){
  const riseObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;riseObserver.unobserve(entry.target);entry.target.classList.add('rise-in')}),{threshold:.2});
  riseGroups.forEach(group=>{group.querySelectorAll('[data-rise]').forEach((element,index)=>element.style.setProperty('--rise-i',index));const first=group.querySelector('[data-rise]');if(first&&first.getBoundingClientRect().top>innerHeight){group.classList.add('rise-ready');riseObserver.observe(group)}});
}
// About (redesign, director 2026-10-04): the big text's words fill from pale to ink as the page passes and the Korean
// line comes up when the last one fills (the words are spans baked from the Tune text, data-tune-words). 01's film frame
// comes up at half size, starts growing as soon as it is fully in view (its middle at 80% of the screen height), is held
// in the middle of the screen and finishes growing in the first 60% of the hold (--hold in about-intro.css), so it rests
// full size for a moment before it moves on. Without the script, or with reduced motion, both simply show.
const aboutScrubs=[];
const manifesto=document.querySelector('.about-manifesto h2');
if(manifesto&&!reduceMotion){
  const words=[...manifesto.querySelectorAll('.tune-w')],korean=manifesto.parentElement.querySelector('.manifesto-ko');
  if(words.length){
    manifesto.classList.add('fill-ready');
    aboutScrubs.push(()=>{const box=manifesto.getBoundingClientRect(),h=innerHeight,progress=Math.min(1,Math.max(0,(h*.85-box.top)/(box.height+h*.25))),lit=Math.round(progress*words.length);words.forEach((word,i)=>word.classList.toggle('is-on',i<lit));korean?.classList.toggle('is-on',progress>=.98)});
  }
}
const introStage=document.querySelector('[data-stage]'),introFrame=introStage?.querySelector('[data-open-frame]');
if(introStage&&introFrame&&!reduceMotion){
  // The small frame's clipped part would add to the space under the Korean line: pull the stage up (--pull) until the
  // small picture sits the head row's gap below the big text (director 2026-10-06), never closer than 60% of that part
  // so the growing picture keeps clear of the line while both are on screen.
  const introCopy=document.querySelector('.about-manifesto-copy'),introHead=introStage.parentElement.querySelector('.intro-head');
  const measure=()=>{
    const fh=introFrame.offsetHeight;introStage.style.setProperty('--frame-h',`${fh}px`);
    if(!introCopy||!introHead)return;
    const pulled=parseFloat(introStage.style.getPropertyValue('--pull'))||0,clipped=(1-(parseFloat(getComputedStyle(introStage).getPropertyValue('--s0'))||.52))/2*fh,gap=Math.max(parseFloat(getComputedStyle(introHead).marginTop)||0,clipped*.6);
    introStage.style.setProperty('--pull',`${Math.max(0,introStage.getBoundingClientRect().top+pulled-introCopy.getBoundingClientRect().bottom+clipped-gap).toFixed(1)}px`);
  };
  introStage.classList.add('is-held');measure();addEventListener('resize',measure);document.fonts?.ready.then(measure);
  aboutScrubs.push(()=>{const box=introStage.getBoundingClientRect(),h=innerHeight,fh=introFrame.offsetHeight,hold=introStage.offsetHeight-fh,start=h*.8-fh/2,end=(h-fh)/2-hold*.6,t=Math.min(1,Math.max(0,(start-box.top)/Math.max(1,start-end)));introFrame.style.setProperty('--p',(t*t*(3-2*t)).toFixed(4))});
}
if(aboutScrubs.length){let scrubFrame=0;const scrub=()=>{scrubFrame=0;aboutScrubs.forEach(update=>update())};const requestScrub=()=>{if(!scrubFrame)scrubFrame=requestAnimationFrame(scrub)};addEventListener('scroll',requestScrub,{passive:true});addEventListener('resize',requestScrub);requestScrub()}
// About 01 on a phone (director 2026-10-06): the 16:9 frame is small there, so a touch on it opens the picture large,
// with no button on the page. The page's copy shows at once and the full-size file, fetched on that touch, replaces it
// when loaded; it fills the screen's height from the middle and a finger pans it sideways. Opening adds a history step,
// so the round close at the foot, the back gesture or Escape all close it on the page as it was.
if(introFrame){
  const phone=matchMedia('(max-width:720px)'),pageImg=introFrame.querySelector('img');
  let viewer=null,pan=null,shown=null,centre=.5;
  const isOpen=()=>!!viewer&&viewer.classList.contains('is-open');
  const place=()=>{pan.scrollLeft=centre*pan.scrollWidth-pan.clientWidth/2};
  const close=()=>{viewer.classList.remove('is-open');document.documentElement.style.overflow='';if(phone.matches)introFrame.focus({preventScroll:true})};
  const leave=()=>{if(history.state&&history.state.introViewer)history.back();else close()};
  const build=()=>{
    viewer=document.createElement('div');viewer.className='intro-viewer';viewer.setAttribute('role','dialog');viewer.setAttribute('aria-modal','true');viewer.setAttribute('aria-label','사진 크게 보기');
    viewer.innerHTML='<div class="intro-viewer-pan"><img alt="" decoding="async"></div><button class="intro-viewer-close" type="button" aria-label="닫기"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1 1 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>';
    pan=viewer.firstElementChild;shown=pan.firstElementChild;shown.setAttribute('width',pageImg.getAttribute('width'));shown.setAttribute('height',pageImg.getAttribute('height'));
    pan.addEventListener('scroll',()=>{centre=(pan.scrollLeft+pan.clientWidth/2)/Math.max(1,pan.scrollWidth)},{passive:true});
    viewer.lastElementChild.addEventListener('click',leave);
    addEventListener('resize',()=>{if(isOpen())place()});
    document.body.append(viewer);
  };
  const open=()=>{
    if(!viewer)build();
    const full=introFrame.dataset.full||pageImg.currentSrc||pageImg.src;
    if(shown.dataset.full!==full){shown.dataset.full=full;shown.src=pageImg.currentSrc||pageImg.src;const sharp=new Image();sharp.onload=()=>{shown.src=full};sharp.src=full}
    centre=.5;viewer.classList.add('is-open');document.documentElement.style.overflow='hidden';place();
    viewer.lastElementChild.focus({preventScroll:true});history.pushState({introViewer:1},'');
  };
  addEventListener('popstate',()=>{if(isOpen())close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen())leave()});
  introFrame.addEventListener('click',()=>{if(phone.matches&&!isOpen())open()});
  introFrame.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&phone.matches&&!isOpen()){e.preventDefault();open()}});
  const sync=()=>{if(phone.matches){introFrame.setAttribute('role','button');introFrame.tabIndex=0;introFrame.setAttribute('aria-label','사진 크게 보기')}else{introFrame.removeAttribute('role');introFrame.removeAttribute('tabindex');introFrame.removeAttribute('aria-label')}};
  sync();phone.addEventListener('change',sync);
}
// About 01 principles: a click on a closed panel opens it and closes the open one, so one is always open. A loop in a
// panel (the director's pictures may become short loops) plays only while its panel is open.
document.querySelectorAll('[data-panes]').forEach(row=>{
  const panes=[...row.querySelectorAll('.pane')];
  const open=pane=>panes.forEach(item=>{const on=item===pane;item.classList.toggle('is-open',on);item.querySelector('.pane-hit').setAttribute('aria-expanded',String(on));item.querySelector('.pane-body').inert=!on;const loop=item.querySelector('.pane-pic video');if(loop){if(on&&!reduceMotion)loop.play().catch(()=>{});else loop.pause()}});
  panes.forEach(pane=>pane.querySelector('.pane-hit').addEventListener('click',()=>{if(!pane.classList.contains('is-open'))open(pane)}));
});
// About 02 콘티 → finished frame, after the director's reference (Framer "Split Image Compare"): the line follows the
// mouse (director 2026-10-03), a finger moves it with a sideways drag (an upward or downward swipe still scrolls the
// page), and it stays where it is left; arrow keys, Home and End move a focused handle. The first time the frame comes
// into view the line sweeps once from all 콘티 to the middle — the finished frame opening out of the 콘티 (redesign
// 2026-10-04) — and a mouse or finger on the frame takes over at once. A data-split="y" frame splits top and bottom
// instead, its line moved by the handle on a touch screen.
document.querySelectorAll('[data-split]').forEach(frame=>{
  const vertical=frame.dataset.split==='y',handle=frame.querySelector('.craft-handle');
  let value=50,target=50,loop=0,drag=null,sweep=0,touched=false;
  const set=v=>{value=v;frame.style.setProperty('--split',v.toFixed(2));handle?.setAttribute('aria-valuenow',String(Math.round(v)))};
  const follow=()=>{loop=0;if(Math.abs(target-value)<.05){set(target);return}set(value+(target-value)*.35);loop=requestAnimationFrame(follow)};
  const go=v=>{target=Math.min(100,Math.max(0,v));if(!loop)loop=requestAnimationFrame(follow)};
  const at=event=>{const box=frame.getBoundingClientRect();return vertical?(event.clientY-box.top)/box.height*100:(event.clientX-box.left)/box.width*100};
  const takeOver=()=>{touched=true;cancelAnimationFrame(sweep);sweep=0};
  frame.addEventListener('pointerdown',event=>{
    takeOver();
    const mouse=event.pointerType==='mouse';
    if(vertical&&!mouse&&!event.target.closest('.craft-handle'))return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY,live:mouse||vertical};
    if(drag.live){frame.setPointerCapture?.(event.pointerId);go(at(event))}
  });
  frame.addEventListener('pointermove',event=>{
    takeOver();
    if(event.pointerType==='mouse'){go(at(event));return}
    if(!drag||drag.id!==event.pointerId)return;
    if(!drag.live){const dx=Math.abs(event.clientX-drag.x),dy=Math.abs(event.clientY-drag.y);if(dx<6||dx<dy)return;drag.live=true;frame.setPointerCapture?.(event.pointerId)}
    go(at(event));
  });
  ['pointerup','pointercancel'].forEach(type=>frame.addEventListener(type,()=>{drag=null}));
  handle?.addEventListener('keydown',event=>{
    takeOver();
    const step={ArrowLeft:-5,ArrowUp:-5,ArrowRight:5,ArrowDown:5}[event.key];
    if(step!=null)go(target+step);else if(event.key==='Home'||event.key==='End')go(event.key==='Home'?0:100);else return;
    event.preventDefault();
  });
  // The sweep: only for a frame first seen below the fold; 350ms after most of it is in view, 1.5s, ease in and out.
  if(!reduceMotion&&'IntersectionObserver' in window&&frame.getBoundingClientRect().top>=innerHeight){
    set(100);target=100;
    const watch=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;watch.disconnect();if(touched)return;
      const start=performance.now()+350;
      const step=now=>{if(touched)return;const t=Math.min(1,Math.max(0,(now-start)/1500)),eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;target=100-50*eased;set(target);sweep=t<1?requestAnimationFrame(step):0};
      sweep=requestAnimationFrame(step);
    },{threshold:.6});
    watch.observe(frame);
  }
});
// About 02 process: the violet line draws through the four steps once, when the process comes into view; each point
// lights and its step comes up as the line reaches it (about-craft.css). Only for a process first seen below the fold.
if(!reduceMotion&&'IntersectionObserver' in window)document.querySelectorAll('[data-flow]').forEach(flow=>{
  if(flow.getBoundingClientRect().top<innerHeight*.9)return;
  flow.classList.add('flow-ready');
  const watch=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;watch.disconnect();flow.classList.add('is-drawn')},{threshold:.45});
  watch.observe(flow);
});
// About 03 gallery, after the director's reference (Framer "Infinite Img Gallery"), reworked with the director
// (2026-10-04; in space since 2026-10-05, stars further down): pictures in three sizes laid out once in the HTML (1920 px, see about-gallery.css),
// repeating in every direction. Entry: the pictures in view lie in a pile in the middle until most of the frame is on
// screen, then spread out to their places at once while the Node8 logo shows in the space they leave. After that the
// table moves only when dragged — 1:1 under the pointer with a short soft follow and a short coast after a flick, as the
// reference — and while it is dragged it steps back a little to show more (the point under the pointer stays under it),
// coming back when let go. A finger that starts sideways takes the table and then moves it any way (director 2026-10-05);
// one that starts upward or downward still scrolls the page, and the wheel always scrolls the page. A click opens the picture in the night sky, at its own ratio, inside 72% × 82% of
// the window, with its project name bottom left as under the mouse (director 2026-10-04); arrows, ← → and a sideways
// swipe go through the pictures in reading order, and a click on the picture, outside it or Esc puts it back into its
// card. The large pictures are fetched once the page has finished loading.
document.querySelectorAll('[data-gallery]').forEach(gallery=>{
  const field=gallery.querySelector('.gallery-field'),zoom=gallery.querySelector('.gallery-zoom'),world=gallery.querySelector('.gallery-world'),logo=gallery.querySelector('.gallery-logo');
  const tileStyle=getComputedStyle(gallery),tileW=Number(tileStyle.getPropertyValue('--tile-w')),tileH=Number(tileStyle.getPropertyValue('--tile-h'));
  const [restU,restV]=gallery.dataset.rest.split(' ').map(Number);
  // Dragging steps back to 0.85. No picture reaches more than 400 (1920 px) past its tile, so the visible part of the
  // world starts that far in, and as many copies of the tile are made as cover the frame at the smallest scale.
  const back=reduceMotion?1:.85,reach=400;
  const originals=[...world.children];
  const num=(tile,name)=>Number(tile.style.getPropertyValue(name));
  const made=new Set(['0,0']);
  const cover=(nx,ny)=>{for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){if(made.has(`${i},${j}`))continue;made.add(`${i},${j}`);originals.forEach(tile=>{const copy=tile.cloneNode(true);copy.style.setProperty('--x',num(tile,'--x')+i*tileW);copy.style.setProperty('--y',num(tile,'--y')+j*tileH);copy.setAttribute('aria-hidden','true');copy.querySelector('button').tabIndex=-1;world.appendChild(copy)})}};
  const items=originals.map(tile=>{const b=tile.querySelector('button');return{full:b.dataset.full,w:Number(b.dataset.w),h:Number(b.dataset.h),card:b.querySelector('img').getAttribute('src'),title:b.textContent.trim(),kinds:(b.dataset.kind||'').split(',').map(k=>k.trim()).filter(Boolean)}});
  const mod=(a,n)=>(a%n+n)%n;
  let x=0,y=0,tx=0,ty=0,z=1,tz=1,tau=.07,frame=0,last=0,drag=null,dragged=false,W=0,H=0,u=1,fieldW=0,fieldH=0,restX=0,restY=0,padX=0,padY=0;
  const render=()=>{
    if(!W)return;
    world.style.transform=`translate3d(${(-padX-mod(-(x+restX)-padX,W)).toFixed(2)}px,${(-padY-mod(-(y+restY)-padY,H)).toFixed(2)}px,0)`;
    zoom.style.transform=z===1?'':`scale(${z.toFixed(4)})`;
    drawSky();
  };
  // Space (director 2026-10-05: "우주가 블랙이니까"): small stars on near-black in three depths, laid out from a fixed
  // seed — far ones small and faint, near ones a little larger — behind the table and, when a picture is opened, across
  // the whole window. They shift a little against the mouse; behind the table they also drift slower than the pictures
  // while it is dragged (stepping back less), so the pictures float in front of them. Nothing moves on its own; with
  // reduced motion the sky stays still.
  const depthPan=[.05,.12,.24],depthSway=[5,11,20],depthBack=[.25,.4,.6];
  const makeStars=(canvas,w,h)=>{
    const ratio=Math.min(2,devicePixelRatio||1);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);canvas.getContext('2d').setTransform(ratio,0,0,ratio,0,0);
    let seed=20261005;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
    return Array.from({length:Math.round(w*h/3400)},()=>{const d=rand(),depth=d<.62?0:d<.92?1:2;return{x:rand()*w,y:rand()*h,depth,r:[.5,.75,1.1][depth]*(.75+rand()*.5),a:[.42,.62,.88][depth]*(.7+rand()*.3)}});
  };
  const paintStars=(canvas,list,w,h,shiftX,shiftY,scale)=>{
    const ctx=canvas.getContext('2d'),cx=w/2,cy=h/2,live=reduceMotion?0:1;
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff';
    for(const s of list){const b=1-(1-scale)*depthBack[s.depth],px=cx+(mod(s.x+shiftX(s.depth)*live,w)-cx)*b,py=cy+(mod(s.y+shiftY(s.depth)*live,h)-cy)*b;ctx.globalAlpha=s.a;ctx.beginPath();ctx.arc(px,py,s.r,0,6.2832);ctx.fill()}
  };
  // Eases toward the mouse and runs only while it settles.
  const swayer=paint=>{
    const s={x:0,y:0,tx:0,ty:0,loop:0,last:0};
    const step=now=>{const dt=Math.min(.05,Math.max(0,(now-s.last)/1000));s.last=now;const k=1-Math.exp(-dt/.45);s.x+=(s.tx-s.x)*k;s.y+=(s.ty-s.y)*k;paint();s.loop=Math.abs(s.tx-s.x)+Math.abs(s.ty-s.y)>.0005?requestAnimationFrame(step):0};
    s.steer=(nx,ny)=>{if(reduceMotion)return;s.tx=nx;s.ty=ny;if(!s.loop){s.last=performance.now();s.loop=requestAnimationFrame(step)}};
    s.rest=()=>{cancelAnimationFrame(s.loop);Object.assign(s,{x:0,y:0,tx:0,ty:0,loop:0})};
    return s;
  };
  const sky=document.createElement('canvas');
  sky.className='gallery-stars';sky.setAttribute('aria-hidden','true');gallery.prepend(sky);
  let stars=[],skyW=0,skyH=0;
  const fitSky=()=>{const w=gallery.clientWidth,h=gallery.clientHeight;if(!w||!h||(w===skyW&&h===skyH))return;skyW=w;skyH=h;stars=makeStars(sky,w,h)};
  const drawSky=()=>{if(skyW)paintStars(sky,stars,skyW,skyH,depth=>x*depthPan[depth]+tableSway.x*depthSway[depth],depth=>y*depthPan[depth]+tableSway.y*depthSway[depth],z)};
  const tableSway=swayer(drawSky);
  gallery.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;const box=gallery.getBoundingClientRect();tableSway.steer(.5-(event.clientX-box.left)/box.width,.5-(event.clientY-box.top)/box.height)});
  gallery.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')tableSway.steer(0,0)});
  // At rest the middle of the tile (kept clear in the layout) sits in the middle of the frame, round the logo.
  const measure=()=>{
    const fw=field.clientWidth,fh=field.clientHeight,w=world.offsetWidth,h=world.offsetHeight;
    if(!w||(fw===fieldW&&fh===fieldH&&w===W&&h===H))return false;
    if(W){const s=w/W;x*=s;tx*=s;y*=s;ty*=s}
    W=w;H=h;u=W/tileW;fieldW=fw;fieldH=fh;
    restX=fw/2-restU*u;restY=fh/2-restV*u;
    padX=fw/2*(1/back-1)+reach*u;padY=fh/2*(1/back-1)+reach*u;
    cover(Math.ceil((W+fw/back+reach*u)/W),Math.ceil((H+fh/back+reach*u)/H));
    fitSky();render();return true;
  };
  const follow=()=>{tx=drag.cx+(drag.px-drag.left-drag.cx)/z-restX-drag.gx;ty=drag.cy+(drag.py-drag.top-drag.cy)/z-restY-drag.gy};
  const step=now=>{
    const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
    z+=(tz-z)*(1-Math.exp(-dt/.16));if(Math.abs(tz-z)<.0005)z=tz;
    if(drag&&drag.moved)follow();
    const k=1-Math.exp(-dt/tau);x+=(tx-x)*k;y+=(ty-y)*k;
    if(!drag&&z===tz&&Math.abs(tx-x)<.1&&Math.abs(ty-y)<.1){x=tx;y=ty;frame=0;render();return}
    render();frame=requestAnimationFrame(step);
  };
  const run=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(step)}};
  // Entry (director 2026-10-04): the pictures in view lie in a pile in the middle until 70% of the frame is on screen,
  // then spread out at once on the site's curve (fast out, soft landing) while the logo shows where they were.
  let piled=false,pile=[];
  const makePile=()=>{
    pile.forEach(({tile})=>{tile.style.transform='';tile.style.zIndex=''});pile=[];
    const f=field.getBoundingClientRect(),cx=f.left+f.width/2,cy=f.top+f.height/2;
    world.querySelectorAll('.gallery-card').forEach(tile=>{
      const r=tile.getBoundingClientRect();
      if(r.right<f.left||r.left>f.right||r.bottom<f.top||r.top>f.bottom)return;
      const dx=cx+(Math.random()-.5)*80*u-(r.left+r.width/2),dy=cy+(Math.random()-.5)*60*u-(r.top+r.height/2),turn=(Math.random()-.5)*18;
      pile.push({tile,from:`translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) rotate(${turn.toFixed(1)}deg) scale(.55)`,delay:Math.round(Math.random()*120)});
    });
    pile.sort(()=>Math.random()-.5).forEach((p,k)=>{p.tile.style.zIndex=k+1;p.tile.style.transform=p.from});
  };
  const spread=()=>{
    if(!piled)return;piled=false;gallery.classList.remove('is-piled');
    pile.forEach(({tile,from,delay})=>{tile.style.transform='';tile.animate([{transform:from},{transform:'none'}],{duration:1300,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}).onfinish=()=>{tile.style.zIndex=''}});
    pile=[];
    logo.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.94)'},{opacity:1,transform:'translate(-50%,-50%)'}],{duration:900,delay:650,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
  };
  measure();
  addEventListener('resize',()=>{if(measure()&&piled)makePile()});
  if(!reduceMotion&&'IntersectionObserver' in window){
    makePile();piled=true;gallery.classList.add('is-piled');
    const watch=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.intersectionRatio>=.69))return;watch.disconnect();spread()},{threshold:[.7]});
    watch.observe(gallery);
  }
  field.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    spread();
    drag={id:event.pointerId,touch:event.pointerType==='touch',sx:event.clientX,sy:event.clientY,px:event.clientX,py:event.clientY,moved:false,trail:[[event.timeStamp,event.clientX,event.clientY]]};dragged=false;
  });
  field.addEventListener('pointermove',event=>{
    if(!drag||drag.id!==event.pointerId)return;
    const dx=event.clientX-drag.sx,dy=event.clientY-drag.sy;
    if(!drag.moved){
      if(drag.touch?(Math.abs(dx)<6||Math.abs(dx)<Math.abs(dy)):Math.hypot(dx,dy)<5)return;
      // Take over from wherever the table is: the point now under the pointer stays under it while the table steps back.
      const f=field.getBoundingClientRect();
      drag.moved=dragged=true;drag.left=f.left;drag.top=f.top;drag.cx=f.width/2;drag.cy=f.height/2;
      tx=x;ty=y;tau=.07;tz=back;
      drag.gx=drag.cx+(event.clientX-f.left-drag.cx)/z-(x+restX);drag.gy=drag.cy+(event.clientY-f.top-drag.cy)/z-(y+restY);
      field.setPointerCapture?.(event.pointerId);field.classList.add('is-dragging');
    }
    drag.px=event.clientX;drag.py=event.clientY;
    drag.trail.push([event.timeStamp,event.clientX,event.clientY]);if(drag.trail.length>8)drag.trail.shift();
    run();
  });
  const release=event=>{
    if(!drag||drag.id!==event.pointerId)return;
    const done=drag;drag=null;field.classList.remove('is-dragging');tz=1;
    if(!done.moved)return;
    // Coast: the speed of the last 100ms for a tenth of a second, as the reference's throw.
    const recent=done.trail.filter(point=>event.timeStamp-point[0]<100);
    if(event.type==='pointerup'&&recent.length>1){const a=recent[0],b=recent[recent.length-1],dt=Math.max(16,b[0]-a[0])/1000;tx+=(b[1]-a[1])/dt*.1/z;ty+=(b[2]-a[2])/dt*.1/z}
    run();
  };
  field.addEventListener('pointerup',release);field.addEventListener('pointercancel',release);
  field.addEventListener('dragstart',event=>event.preventDefault());
  field.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopPropagation();dragged=false}},true);
  // Tab reaches the forty original cards; one outside the field is brought to the middle.
  world.addEventListener('focusin',event=>{
    const tile=event.target.closest('.gallery-card');if(!tile||!event.target.matches(':focus-visible'))return;
    spread();
    const f=field.getBoundingClientRect(),r=tile.getBoundingClientRect();
    if(r.left>=f.left+f.width*.1&&r.right<=f.right-f.width*.1&&r.top>=f.top+f.height*.1&&r.bottom<=f.bottom-f.height*.1)return;
    tx=x+(f.left+f.width/2-(r.left+r.width/2))/z;ty=y+(f.top+f.height/2-(r.top+r.height/2))/z;tau=.21;run();
  });
  // Large view.
  const view=document.createElement('div');
  view.className='gallery-view';view.hidden=true;view.setAttribute('role','dialog');view.setAttribute('aria-modal','true');
  const chevron=d=>`<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  view.innerHTML=`<div class="gallery-view-veil"><canvas class="gallery-view-stars" aria-hidden="true"></canvas></div><button class="gallery-view-pic" type="button" aria-label="사진 닫기"><img alt=""><span class="gallery-view-title"><span class="gallery-view-chips"></span><span class="gallery-view-name"></span></span></button><button class="gallery-view-arrow is-prev" type="button" aria-label="이전 사진">${chevron('M12.5 4 6.5 10l6 6')}</button><button class="gallery-view-arrow is-next" type="button" aria-label="다음 사진">${chevron('M7.5 4l6 6-6 6')}</button>`;
  document.body.appendChild(view);
  const veil=view.querySelector('.gallery-view-veil'),pic=view.querySelector('.gallery-view-pic'),picImg=pic.querySelector('img'),picTitle=pic.querySelector('.gallery-view-title'),picName=picTitle.querySelector('.gallery-view-name'),picChips=picTitle.querySelector('.gallery-view-chips');
  // The enlarged picture floats in the same night (director 2026-10-05): the stars across the whole window.
  const viewSky=view.querySelector('.gallery-view-stars');
  let viewStars=[],viewW=0,viewH=0;
  const drawViewSky=()=>{if(viewW)paintStars(viewSky,viewStars,viewW,viewH,depth=>viewSway.x*depthSway[depth],depth=>viewSway.y*depthSway[depth],1)};
  const viewSway=swayer(drawViewSky);
  const fitViewSky=()=>{const w=document.documentElement.clientWidth,h=innerHeight;if(w!==viewW||h!==viewH){viewW=w;viewH=h;viewStars=makeStars(viewSky,w,h)}drawViewSky()};
  view.addEventListener('pointermove',event=>{if(event.pointerType==='mouse'&&viewW)viewSway.steer(.5-event.clientX/viewW,.5-event.clientY/viewH)});
  const prev=view.querySelector('.is-prev'),next=view.querySelector('.is-next');
  let current=-1,lifted=null,opener=null,closing=false,turn=0,swipe=null,swiped=false;
  const phone=()=>matchMedia('(max-width:720px)').matches;
  const fit=item=>{
    const vw=document.documentElement.clientWidth,vh=innerHeight,small=phone();
    const s=Math.min((small?vw-32:vw*.72)/item.w,(small?vh*.7:vh*.82)/item.h),w=Math.round(item.w*s),h=Math.round(item.h*s);
    return{left:Math.round((vw-w)/2),top:Math.round((vh-h)/2-(small?36:0)),width:w,height:h};
  };
  const place=r=>{pic.style.left=`${r.left}px`;pic.style.top=`${r.top}px`;pic.style.width=`${r.width}px`;pic.style.height=`${r.height}px`};
  const rectOf=tile=>{const r=tile.querySelector('button').getBoundingClientRect();return{left:r.left,top:r.top,width:r.width,height:r.height}};
  const preload=item=>{if(!item.big){item.big=new Image();item.big.decoding='async';item.big.src=item.full}return item.big};
  // A large picture is fetched when it opens, with the ones either side so the arrows turn to a sharp picture; until it
  // arrives the card picture stands in (director 2026-10-07: fetching all 40 after load, about 12 MB, held up the hero on slow phones).
  const showPicture=i=>{
    const item=items[i],big=preload(item);
    preload(items[(i+1)%items.length]);preload(items[(i-1+items.length)%items.length]);
    view.setAttribute('aria-label',item.title);picName.textContent=item.title;picChips.replaceChildren(...item.kinds.map(kind=>Object.assign(document.createElement('span'),{className:'gallery-view-chip',textContent:kind})));
    if(big.complete&&big.naturalWidth){picImg.src=item.full;return}
    picImg.src=item.card;
    big.decode().then(()=>{if(current===i)picImg.src=item.full}).catch(()=>{});
  };
  const lift=tile=>{if(lifted)lifted.classList.remove('is-lifted');lifted=tile;tile?.classList.add('is-lifted')};
  // The nearest card of that picture still well inside the field, if any.
  const homeOf=i=>{
    const f=field.getBoundingClientRect();let best=null,bestDistance=Infinity;
    world.querySelectorAll(`button[data-i="${i}"]`).forEach(button=>{
      const r=button.getBoundingClientRect();
      if(r.left<f.left+8||r.right>f.right-8||r.top<f.top+8||r.bottom>f.bottom-8||r.bottom<0||r.top>innerHeight)return;
      const d=Math.hypot(r.left+r.width/2-(f.left+f.width/2),r.top+r.height/2-(f.top+f.height/2));
      if(d<bestDistance){bestDistance=d;best=button.closest('.gallery-card')}
    });
    return best;
  };
  const onKey=event=>{
    if(event.key==='Escape')close();
    else if(event.key==='ArrowLeft')go(-1);
    else if(event.key==='ArrowRight')go(1);
    else if(event.key==='Tab'){const order=[prev,pic,next],at=order.indexOf(document.activeElement);order[(at+(event.shiftKey?-1:1)+order.length)%order.length].focus()}
    else if(!['PageUp','PageDown','Home','End','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();
  };
  const open=(i,button)=>{
    if(current>=0)return;
    current=i;opener=button;closing=false;
    const tile=button.closest('.gallery-card');
    view.hidden=false;fitViewSky();pic.classList.remove('is-flying');pic.style.opacity='';
    place(rectOf(tile));showPicture(i);lift(tile);
    pic.getBoundingClientRect();
    requestAnimationFrame(()=>{view.classList.add('is-open');if(!reduceMotion)pic.classList.add('is-flying');place(fit(items[i]))});
    pic.focus({preventScroll:true});
    document.addEventListener('keydown',onKey);
  };
  const close=()=>{
    if(current<0||closing)return;closing=true;turn++;
    pic.getAnimations().forEach(animation=>animation.cancel());
    const home=homeOf(current);
    view.classList.remove('is-open');
    const finish=()=>{if(!closing)return;view.hidden=true;pic.classList.remove('is-flying');pic.getAnimations().forEach(animation=>animation.cancel());lift(null);viewSway.rest();current=-1;closing=false;document.removeEventListener('keydown',onKey);if(opener&&opener.tabIndex>=0)opener.focus({preventScroll:true})};
    if(home&&!reduceMotion){lift(home);pic.classList.add('is-flying');place(rectOf(home));setTimeout(finish,720)}
    else{pic.animate([{opacity:1},{opacity:0}],{duration:300,easing:'ease-out',fill:'forwards'});setTimeout(finish,300)}
  };
  const go=step=>{
    if(current<0||closing)return;
    current=(current+step+items.length)%items.length;lift(null);
    const mine=++turn;
    pic.classList.remove('is-flying');pic.getAnimations().forEach(animation=>animation.cancel());
    if(reduceMotion){place(fit(items[current]));showPicture(current);return}
    const out=pic.animate([{opacity:1,transform:'none'},{opacity:0,transform:`translateX(${-step*24}px)`}],{duration:160,easing:'ease-in',fill:'forwards'});
    out.onfinish=()=>{if(mine!==turn)return;place(fit(items[current]));showPicture(current);pic.animate([{opacity:0,transform:`translateX(${step*24}px)`},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'});out.cancel()};
  };
  world.addEventListener('click',event=>{const button=event.target.closest('button[data-i]');if(button)open(Number(button.dataset.i),button)});
  pic.addEventListener('click',()=>{if(swiped){swiped=false;return}close()});
  veil.addEventListener('click',()=>{if(swiped){swiped=false;return}close()});
  prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
  view.addEventListener('wheel',event=>event.preventDefault(),{passive:false});
  // A sideways swipe on the picture or the veil turns the picture; a tap still closes it.
  view.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'&&!event.target.closest('.gallery-view-arrow')){swipe={x:event.clientX,y:event.clientY};swiped=false}});
  view.addEventListener('pointerup',event=>{if(!swipe)return;const dx=event.clientX-swipe.x,dy=event.clientY-swipe.y;swipe=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){swiped=true;go(dx<0?1:-1)}});
  addEventListener('resize',()=>{if(current>=0&&!closing){pic.classList.remove('is-flying');place(fit(items[current]));fitViewSky()}});
});
// Header (redesign 2026-10-04): the studio's place and time, Seoul.
const studioClock=document.querySelector('[data-clock]');
if(studioClock){const format=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',hour12:false});const tick=()=>{studioClock.textContent=format.format(new Date())};tick();setInterval(tick,15000)}
// Main 03 Now Booking (redesign 2026-10-04, take B): the row under the mouse or keyboard focus, or a tapped one, shows
// its picture with its short line, the usual length of the work and the page with examples. Lines: the director's
// (2026-10-04); lengths: the director's values (2026-10-07). No-break spaces keep
// the last phrase whole where a phone or tablet wraps the line (after the comma, not inside 키 비주얼).
const booking=document.querySelector('[data-booking]');
if(booking){
  // Lines wrap only at the plain spaces between phrases; \u00a0 keeps a phrase together (tablet/phone, director 2026-10-05).
  const lines=[
    {line:'브랜드의\u00a0정수를 한\u00a0편에\u00a0담은 시네마틱\u00a0필름',time:'제작 2주~',link:['commercial/','Commercial']},
    {line:'단편·장편·세로형\u00a0시리즈, 이야기\u00a0설계부터\u00a0완성까지',time:'제작 4주~',link:['cinematic/','Cinematic']},
    {line:'스크롤을\u00a0멈추고 공유를\u00a0부르는 세로형\u00a0숏폼',time:'제작 1주~',link:['commercial/','Commercial']},
    {line:'곡의\u00a0세계관과\u00a0서사를 감각적인\u00a0비주얼로\u00a0재해석',time:'제작 4주~',link:['cinematic/','Cinematic']},
    {line:'제품\u00a0연출\u00a0컷과\u00a0모델\u00a0컷, 브랜드를\u00a0대표하는 키\u00a0비주얼까지',time:'제작 2주~',link:['commercial/','Commercial']}
  ];
  const tabs=[...booking.querySelectorAll('[data-booking-item]')],pics=[...booking.querySelectorAll('.booking-pic img')];
  const line=booking.querySelector('[data-booking-line]'),time=booking.querySelector('[data-booking-time]'),link=booking.querySelector('[data-booking-link]');
  let current=0;
  const show=i=>{
    if(i===current)return;current=i;
    tabs.forEach((tab,k)=>tab.setAttribute('aria-selected',String(k===i)));
    pics.forEach((pic,k)=>pic.classList.toggle('is-on',k===i));
    const item=lines[i];line.textContent=item.line;time.textContent=item.time;link.href=item.link[0];link.innerHTML=`${item.link[1]} <span>↗</span>`;
  };
  const hover=matchMedia('(hover: hover)').matches;
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>show(i));tab.addEventListener('focus',()=>show(i));if(hover)tab.addEventListener('mouseenter',()=>show(i))});
}
// Home M2 numbers: fast start, long soft landing (2s, 130ms apart).
const statsGrid=document.querySelector('.home-stats-grid');
if(statsGrid&&!reduceMotion&&'IntersectionObserver' in window&&statsGrid.getBoundingClientRect().top>innerHeight){
  const counters=[...statsGrid.querySelectorAll('[data-count-to]')];
  counters.forEach(counter=>{counter.textContent='0'});
  const easeOutExpo=t=>t>=1?1:1-Math.pow(2,-10*t);
  const countObserver=new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.isIntersecting))return;
    countObserver.disconnect();
    const start=performance.now();
    const tick=now=>{let done=true;counters.forEach((counter,index)=>{const t=Math.min(1,Math.max(0,(now-start-index*130)/2000));counter.textContent=Math.round(Number(counter.dataset.countTo)*easeOutExpo(t)).toLocaleString('en-US');if(t<1)done=false});if(!done)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  },{threshold:.4});
  countObserver.observe(statsGrid);
}
// Home M2 logos: a constant flow that eases to a stop under the mouse or a finger and eases back up.
const logoRow=document.querySelector('.home-logos');
const logoTrack=logoRow?.querySelector('.home-logos-track');
if(logoTrack){
  const originals=[...logoTrack.children];
  originals.forEach(node=>{const copy=node.cloneNode(true);copy.alt='';copy.setAttribute('aria-hidden','true');logoTrack.appendChild(copy)});
  if(!reduceMotion){
    const base=42;let x=0,speed=base,target=base,last=0,period=0,frame=0;
    const measure=()=>{period=logoTrack.children[originals.length].offsetLeft-logoTrack.children[0].offsetLeft};
    measure();addEventListener('resize',measure);addEventListener('load',measure);
    const step=now=>{const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;speed+=(target-speed)*(1-Math.exp(-dt*3.2));x-=speed*dt;if(period>0&&-x>=period)x+=period;logoTrack.style.transform=`translate3d(${x.toFixed(2)}px,0,0)`;frame=requestAnimationFrame(step)};
    const run=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(step)}};
    const halt=()=>{cancelAnimationFrame(frame);frame=0};
    new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting?run():halt())).observe(logoRow);
    logoRow.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')target=0});
    logoRow.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')target=base});
    logoRow.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;target=0;const logo=event.target.closest('img');if(logo){logo.classList.add('is-pressed');logoTrack.classList.add('has-press')}});
    ['pointerup','pointercancel','pointerleave'].forEach(type=>logoRow.addEventListener(type,event=>{if(event.pointerType==='mouse')return;target=base;logoTrack.classList.remove('has-press');logoTrack.querySelectorAll('.is-pressed').forEach(logo=>logo.classList.remove('is-pressed'))}));
  }
}
