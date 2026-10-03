const currentScript=document.currentScript;
const carouselScript=document.createElement('script');carouselScript.src=new URL('recent-carousel.js?v=stack-20261003',currentScript.src).href;carouselScript.defer=true;document.head.appendChild(carouselScript);
if(!document.querySelector('script[data-node8-cms]')){const cmsScript=document.createElement('script');cmsScript.src=new URL('cms-public.js?v=stack-20261003',currentScript.src).href;cmsScript.defer=true;document.head.appendChild(cmsScript);}

const footerVideo=document.querySelector('.node8-footer-media video');
if(footerVideo){footerVideo.muted=true;if('IntersectionObserver' in window){const playObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)footerVideo.play().catch(()=>{});else footerVideo.pause()}));playObserver.observe(footerVideo)}else footerVideo.play().catch(()=>{})}

const button=document.querySelector('.top-button');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
const menuStyles=document.createElement('style');
menuStyles.textContent='@media(max-width:720px){.nav.is-open{position:absolute;top:64px;right:20px;display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-width:156px;padding:18px 20px;border-radius:14px;background:rgba(18,18,18,.86);color:#fff;backdrop-filter:blur(14px)}.site-header.on-light .nav.is-open{background:rgba(255,255,255,.9);color:#131313}}';
document.head.appendChild(menuStyles);
addEventListener('scroll',()=>button?.classList.toggle('is-visible',scrollY>440),{passive:true});
button?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.detail-film-trigger[data-youtube-id]').forEach((trigger)=>{trigger.addEventListener('click',()=>{const frame=trigger.closest('.detail-film-frame');const videoId=trigger.dataset.youtubeId;if(!frame||!videoId)return;const player=document.createElement('iframe');player.className='detail-film-embed';player.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;player.title=trigger.getAttribute('aria-label')||'Project film';player.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';player.allowFullscreen=true;frame.replaceChildren(player)})});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-shown');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const aboutDiptych=document.querySelector('.about-diptych');
if(aboutDiptych&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const panels=[...aboutDiptych.querySelectorAll('.about-diptych-panel')];
  let diptychFrame;
  const updateDiptych=()=>{diptychFrame=undefined;const bounds=aboutDiptych.getBoundingClientRect();const distance=Math.max(-1,Math.min(1,(innerHeight*.5-(bounds.top+bounds.height*.5))/innerHeight));const drift=parseFloat(getComputedStyle(aboutDiptych).getPropertyValue('--about-diptych-drift'))||8;panels.forEach((panel,index)=>panel.style.setProperty('--diptych-drift',`${Math.round(distance*(index?drift:-drift))}px`))};
  const requestDiptych=()=>{if(!diptychFrame)diptychFrame=requestAnimationFrame(updateDiptych)};
  addEventListener('scroll',requestDiptych,{passive:true});addEventListener('resize',requestDiptych);requestDiptych();
}
addEventListener('load',()=>{const rail=document.querySelector('.recent-rail');const card=rail?.querySelector('.recent-card');if(rail&&card){requestAnimationFrame(()=>{const width=card.getBoundingClientRect().width;rail.scrollLeft=width+16-(rail.clientWidth-width)/2})}},{once:true});
const heroCopy=document.querySelector('[data-tune-id="hero-title"]')?.closest('.hero-content');
if(heroCopy&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  // Home hero: as the page scrolls, the whole text group sinks into the hero frame at 40% of the scroll speed.
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
