const currentScript=document.currentScript;
const carouselScript=document.createElement('script');carouselScript.src=new URL('recent-carousel.js?v=mobile-recent-swipe-autoplay-v3-20260924',currentScript.src).href;carouselScript.defer=true;document.head.appendChild(carouselScript);
if(!document.querySelector('script[data-node8-cms]')){const cmsScript=document.createElement('script');cmsScript.src=new URL('cms-public.js?v=early-hero-20260929',currentScript.src).href;cmsScript.defer=true;document.head.appendChild(cmsScript);}

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
