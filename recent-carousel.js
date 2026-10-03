// Home M4 (bundle 5, director 2026-10-03): Recent Projects as a 3D card stack (see recent-stack.css).
// data-slot on each card: 0 middle, ±1 and ±2 either side, ±3 waiting out of sight on the side it enters from.
// Side cards bring themselves to the middle when clicked; drag or swipe, and ←/→ while the stack is on screen, also
// move it. The middle card links to its project. Autoplay every 7 s with a pause button and a violet time line;
// it waits while the stack is off screen or the tab is hidden, and is off for visitors who reduce motion.
const initializeRecentCarousel=()=>{
  const rail=document.querySelector('.recent-projects .recent-rail')
  if(!rail)return
  const cards=[...rail.querySelectorAll('.recent-card')]
  if(cards.length<2)return
  // The CMS script may redraw the cards after the snapshot; start again only when the cards are new.
  if(cards.every(card=>card.dataset.slot!==undefined)&&rail.querySelector('.recent-hud'))return
  rail.__stackAbort?.abort()
  const abort=new AbortController(),signal=abort.signal
  rail.__stackAbort=abort

  const count=cards.length
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches
  const DELAY=7000
  let active=0,paused=reduce,inView=false,timer=null,started=0,remaining=DELAY

  rail.querySelector('.recent-hud')?.remove()
  const hud=document.createElement('div')
  hud.className='recent-hud'
  hud.innerHTML='<button class="recent-pause" type="button"></button><div class="recent-progress" aria-hidden="true"><i></i></div>'
  rail.append(hud)
  const pauseButton=hud.querySelector('.recent-pause'),bar=hud.querySelector('.recent-progress i')
  const pauseIcon='<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M3 1.5h2.6v11H3zm5.4 0H11v11H8.4z"/></svg>'
  const playIcon='<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M3.5 1.5l9 5.5-9 5.5z"/></svg>'
  const drawPause=()=>{pauseButton.innerHTML=paused?playIcon:pauseIcon;pauseButton.setAttribute('aria-label',paused?'자동 넘김 다시 시작':'자동 넘김 멈춤')}
  cards.forEach(card=>{card.querySelectorAll('a,img').forEach(el=>el.setAttribute('draggable','false'))})

  // Shortest signed distance from the middle card, so the stack loops both ways.
  const offset=index=>{let d=((index-active)%count+count)%count;if(d>count/2)d-=count;return d}
  const place=(direction=0)=>{
    cards.forEach((card,index)=>{
      const before=card.dataset.slot===undefined?null:Number(card.dataset.slot)
      let next=offset(index)
      // Out of sight: a leaving card waits on the side it left from.
      if(Math.abs(next)>=3)next=3*Math.sign(before?before:(next||direction||1))
      // A card that has to change sides jumps to the far edge of its new side first, so it never crosses the stack.
      if(before&&next&&Math.sign(before)!==Math.sign(next)){
        card.classList.add('is-snap');card.dataset.slot=String(3*Math.sign(next));void card.offsetWidth;card.classList.remove('is-snap')
      }
      card.dataset.slot=String(next)
      const isMiddle=next===0
      card.setAttribute('aria-hidden',String(!isMiddle))
      card.querySelector('a')?.setAttribute('tabindex',isMiddle?'0':'-1')
    })
  }

  const freezeBar=()=>{bar.style.transition='none';bar.style.transform=`scaleX(${1-remaining/DELAY})`}
  const stopTimer=()=>{clearTimeout(timer);timer=null;if(started){remaining=Math.max(0,remaining-(performance.now()-started));started=0}freezeBar()}
  const startTimer=()=>{
    stopTimer()
    if(paused||!inView||document.hidden)return
    started=performance.now()
    timer=setTimeout(()=>go(active+1,1),remaining)
    bar.offsetWidth
    bar.style.transition=`transform ${remaining}ms linear`
    bar.style.transform='scaleX(1)'
  }
  const go=(target,direction)=>{
    active=((target%count)+count)%count
    place(direction)
    remaining=DELAY;started=0
    startTimer()
  }

  pauseButton.addEventListener('click',()=>{paused=!paused;drawPause();paused?stopTimer():startTimer()},{signal})

  // Clicks: a side card moves the stack; the middle card follows its link unless the pointer was dragging.
  let suppressClick=false
  rail.addEventListener('click',event=>{
    const link=event.target.closest('.recent-card a')
    if(!link)return
    if(suppressClick){event.preventDefault();suppressClick=false;return}
    const slot=Number(link.closest('.recent-card').dataset.slot)
    if(slot!==0){event.preventDefault();go(active+slot,Math.sign(slot))}
  },{capture:true,signal})

  // Drag or swipe sideways: past 40 px it moves one card.
  let press=null
  rail.addEventListener('pointerdown',event=>{if(event.button!==0||event.target.closest('.recent-pause'))return;press={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}},{signal})
  rail.addEventListener('pointermove',event=>{
    if(!press||event.pointerId!==press.id||press.moved)return
    const dx=event.clientX-press.x,dy=event.clientY-press.y
    if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)){press.moved=true;rail.setPointerCapture?.(event.pointerId)}
  },{signal})
  const release=event=>{
    if(!press||event.pointerId!==press.id)return
    const dx=event.clientX-press.x
    if(press.moved){suppressClick=true;setTimeout(()=>{suppressClick=false},0);if(Math.abs(dx)>40)go(active+(dx<0?1:-1),dx<0?1:-1)}
    if(rail.hasPointerCapture?.(event.pointerId))rail.releasePointerCapture(event.pointerId)
    press=null
  }
  rail.addEventListener('pointerup',release,{signal})
  rail.addEventListener('pointercancel',()=>{press=null},{signal})

  addEventListener('keydown',event=>{
    if(!inView||event.altKey||event.ctrlKey||event.metaKey||event.target.closest?.('input,textarea,select,[contenteditable]'))return
    if(event.key==='ArrowRight'){event.preventDefault();go(active+1,1)}
    if(event.key==='ArrowLeft'){event.preventDefault();go(active-1,-1)}
  },{signal})

  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting&&entry.intersectionRatio>=.35;inView?startTimer():stopTimer()},{threshold:[0,.35,.6]})
  observer.observe(rail)
  signal.addEventListener('abort',()=>{observer.disconnect();clearTimeout(timer)})
  document.addEventListener('visibilitychange',()=>{document.hidden?stopTimer():startTimer()},{signal})

  if(reduce)hud.querySelector('.recent-progress').hidden=true
  drawPause()
  place()
  freezeBar()
}

window.node8InitializeRecentCarousel=initializeRecentCarousel
addEventListener('node8:recent-projects-ready',initializeRecentCarousel)
initializeRecentCarousel()
