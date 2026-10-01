const initializeRecentCarousel=()=>{
  const rail=document.querySelector('.recent-rail')
  if(!rail||rail.dataset.carouselInitialized==='true')return
  const originals=[...rail.querySelectorAll('.recent-card')]
  if(originals.length<2)return

  rail.dataset.carouselInitialized='true'
  const pagination=document.querySelector('.recent-pagination')
  const lastClone=originals.at(-1).cloneNode(true)
  const firstClone=originals[0].cloneNode(true)
  lastClone.setAttribute('aria-hidden','true')
  firstClone.setAttribute('aria-hidden','true')
  rail.prepend(lastClone)
  rail.append(firstClone)

  if(pagination){
    const viewport=document.createElement('div')
    viewport.className='recent-viewport'
    rail.before(viewport)
    viewport.append(rail,pagination)
  }

  const cardWidth=()=>rail.querySelector('.recent-card')?.getBoundingClientRect().width||0
  const step=()=>cardWidth()+(parseFloat(getComputedStyle(rail).columnGap)||0)
  const inset=()=>Math.max(0,(rail.clientWidth-cardWidth())/2)
  const positionFor=index=>index*step()-inset()
  const centeredIndex=()=>Math.round((rail.scrollLeft+inset())/step())
  const setCardStates=()=>{
    const activeIndex=centeredIndex()
    ;[...rail.querySelectorAll('.recent-card')].forEach((card,index)=>{
      card.classList.toggle('is-active',index===activeIndex)
      card.classList.toggle('is-before',index===activeIndex-1)
      card.classList.toggle('is-after',index===activeIndex+1)
    })
    const activeProject=(activeIndex-1+originals.length)%originals.length
    pagination?.querySelectorAll('button').forEach((dot,index)=>{
      const active=index===activeProject
      dot.classList.toggle('is-active',active)
      dot.setAttribute('aria-current',active?'true':'false')
    })
  }
  const alignFirst=()=>{
    rail.scrollTo({left:positionFor(1),behavior:'auto'})
    setCardStates()
  }
  const normalizeLoop=()=>{
    const index=centeredIndex()
    if(index===0)rail.scrollTo({left:positionFor(originals.length),behavior:'auto'})
    if(index===originals.length+1)rail.scrollTo({left:positionFor(1),behavior:'auto'})
    setCardStates()
  }
  const goTo=index=>rail.scrollTo({left:positionFor(index),behavior:'smooth'})
  if(pagination){
    pagination.innerHTML=originals.map((_,index)=>`<button type="button" aria-label="${index+1}번째 프로젝트로 이동" aria-current="${index===0?'true':'false'}"></button>`).join('')
  }
  const autoplayQuery=matchMedia('(prefers-reduced-motion: no-preference)')
  let autoplayTimer
  let suppressClickUntil=0
  const autoplayDelay=()=>matchMedia('(max-width: 720px)').matches?3000:4000
  const stopAutoplay=()=>{
    clearTimeout(autoplayTimer)
    autoplayTimer=undefined
  }
  const scheduleAutoplay=()=>{
    stopAutoplay()
    if(!autoplayQuery.matches||pagination?.matches(':focus-within'))return
    autoplayTimer=setTimeout(()=>{
      if(pagination?.matches(':focus-within'))return
      goTo(centeredIndex()+1)
      scheduleAutoplay()
    },autoplayDelay())
  }
  requestAnimationFrame(alignFirst)
  addEventListener('resize',()=>{alignFirst();scheduleAutoplay()},{passive:true})
  autoplayQuery.addEventListener('change',scheduleAutoplay)
  scheduleAutoplay()

  pagination?.querySelectorAll('button').forEach((dot,index)=>dot.addEventListener('click',()=>{goTo(index+1);scheduleAutoplay()}))
  pagination?.addEventListener('focusin',stopAutoplay)
  pagination?.addEventListener('focusout',scheduleAutoplay)
  pagination?.parentElement?.addEventListener('mouseenter',stopAutoplay)
  pagination?.parentElement?.addEventListener('mouseleave',scheduleAutoplay)

  rail.addEventListener('click',event=>{
    if(Date.now()<suppressClickUntil){event.preventDefault();event.stopPropagation();return}
    const card=event.target.closest('.recent-card')
    const cardIndex=[...rail.querySelectorAll('.recent-card')].indexOf(card)
    if(cardIndex<0||cardIndex===centeredIndex())return
    event.preventDefault()
    event.stopPropagation()
    goTo(cardIndex)
    scheduleAutoplay()
  },true)

  let pointerId=null
  let startX=0
  let startScroll=0
  let startIndex=1
  let startTime=0
  let moved=false
  let pressedLink=null
  let pressedCardIndex=null
  let settleTimer
  rail.addEventListener('dragstart',event=>event.preventDefault())
  rail.addEventListener('pointerdown',event=>{
    if(event.target.closest('button'))return
    pointerId=event.pointerId
    startX=event.clientX
    startScroll=rail.scrollLeft
    startIndex=centeredIndex()
    startTime=event.timeStamp
    moved=false
    pressedLink=event.target.closest('.recent-card a')
    pressedCardIndex=[...rail.querySelectorAll('.recent-card')].indexOf(event.target.closest('.recent-card'))
    stopAutoplay()
    rail.classList.add('is-dragging')
    rail.setPointerCapture(pointerId)
  })
  rail.addEventListener('pointermove',event=>{
    if(event.pointerId!==pointerId)return
    const delta=event.clientX-startX
    if(Math.abs(delta)>2){
      moved=true
      rail.scrollLeft=startScroll-delta
      event.preventDefault()
    }
  })
  const release=event=>{
    if(event.pointerId!==pointerId)return
    rail.classList.remove('is-dragging')
    if(rail.hasPointerCapture(pointerId))rail.releasePointerCapture(pointerId)
    pointerId=null
    const delta=event.clientX-startX
    const duration=Math.max(1,event.timeStamp-startTime)
    const velocity=delta/duration
    const isMobile=matchMedia('(max-width: 720px)').matches
    const shouldAdvance=isMobile&&(Math.abs(delta)>=40||Math.abs(velocity)>=.35)
    const activeIndex=centeredIndex()
    if(isMobile&&moved)suppressClickUntil=Date.now()+400
    if(shouldAdvance){
      let targetIndex=startIndex+(delta<0?1:-1)
      if(targetIndex<0)targetIndex=originals.length
      if(targetIndex>originals.length+1)targetIndex=1
      goTo(targetIndex)
    }
    else if(moved)goTo(isMobile?startIndex:activeIndex)
    else if(pressedCardIndex!==null&&pressedCardIndex!==activeIndex)goTo(pressedCardIndex)
    else if(pressedLink?.href)location.assign(pressedLink.href)
    pressedLink=null
    pressedCardIndex=null
    scheduleAutoplay()
  }
  rail.addEventListener('pointerup',release)
  rail.addEventListener('pointercancel',event=>{
    if(event.pointerId!==pointerId)return
    rail.classList.remove('is-dragging')
    if(rail.hasPointerCapture(pointerId))rail.releasePointerCapture(pointerId)
    pointerId=null
    goTo(startIndex)
    pressedLink=null
    pressedCardIndex=null
    scheduleAutoplay()
  })
  rail.addEventListener('scroll',()=>{
    setCardStates()
    clearTimeout(settleTimer)
    settleTimer=setTimeout(normalizeLoop,160)
  },{passive:true})
}

window.node8InitializeRecentCarousel=initializeRecentCarousel
addEventListener('node8:recent-projects-ready',initializeRecentCarousel)
if(document.querySelector('.recent-rail')?.dataset.sanityLoaded)initializeRecentCarousel()
