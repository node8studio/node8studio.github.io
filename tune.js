(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('tune')!=='1')return;

  const targets={
    'hero-eyebrow':{name:'Hero · Copyright',selector:'.hero:not(.about-services-hero) .eyebrow',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'hero-title':{name:'Hero · Node8 Studio',selector:'.hero:not(.about-services-hero) h1',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'hero-note':{name:'Hero · Right copy',selector:'.hero:not(.about-services-hero) .hero-note',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'intro-label':{name:'Positioning · Label',selector:'.home-intro .label',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'intro-copy':{name:'Positioning · Main copy',selector:'.home-intro .intro-copy',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'intro-subcopy':{name:'Positioning · Korean subcopy',selector:'.home-intro .intro-subcopy',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'about-intro-label':{name:'About · Intro label',selector:'.about-intro .label',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'about-intro-title':{name:'About · Intro title',selector:'.about-intro .intro-copy',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'recent-label':{name:'Recent · Label',selector:'.recent-projects .label',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'recent-title':{name:'Recent · Section title',selector:'.recent-projects .display-title',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'recent-rail':{name:'Recent · Card width',selector:'.recent-rail',controls:['cardWidth']},
    'about-intro-body':{name:'About · Intro body',selector:'.about-intro-body',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'about-direction-layout':{name:'About · 12 Years layout',selector:'.about-direction',controls:['imageWidth','textGap']},
    'about-landscape':{name:'About · Landscape image',selector:'.about-landscape',controls:['x','y','width','cropX','cropY']},
    'about-diptych':{name:'About · Diptych composition',selector:'.about-diptych',controls:['x','y','width','diptychGap','diptychDrift']},
    'about-diptych-left':{name:'About · Diptych left image',selector:'.about-diptych-panel--left',controls:['x','y','cropX','cropY']},
    'about-diptych-right':{name:'About · Diptych right image',selector:'.about-diptych-panel--right',controls:['x','y','cropX','cropY']},
    'footer-title':{name:'Footer · CTA title',selector:'.node8-footer-title',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign']},
    'footer-copy':{name:'Footer · Body copy',selector:'.node8-footer-copy',controls:['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth']},
    'footer-media':{name:'Footer · Preview media',selector:'.node8-footer-media',controls:['x','y','width','cropX','cropY']}
  };
  Object.assign(targets,window.NODE8_TUNE_TEXT_TARGETS||{});
  Object.keys(targets).forEach(key=>{if(!document.querySelector(targets[key].selector))delete targets[key]});
  const labels={content:'Text',x:'X position',y:'Y position',fontSize:'Font size',fontWeight:'Weight',letterSpacing:'Letter spacing',lineHeight:'Line height',textAlign:'Alignment',maxWidth:'Max width',width:'Width',cropX:'Crop X',cropY:'Crop Y',cardWidth:'Card width',imageWidth:'Image width',textGap:'Text gap',diptychGap:'Image gap',diptychDrift:'Scroll drift'};
  const ranges={x:[-160,160,1,'px'],y:[-160,160,1,'px'],fontSize:[10,220,1,'px'],fontWeight:[300,800,100,''],letterSpacing:[-24,8,.1,'px'],lineHeight:[.7,2,.01,''],maxWidth:[120,1000,1,'px'],width:[160,1600,1,'px'],cropX:[0,100,1,'%'],cropY:[0,100,1,'%'],cardWidth:[65,96,1,'vw'],imageWidth:[280,650,1,'px'],textGap:[20,220,1,'px'],diptychGap:[0,32,1,'px'],diptychDrift:[0,24,1,'px']};
  const defaults={x:0,y:0,fontSize:null,fontWeight:null,letterSpacing:null,lineHeight:null,textAlign:null,maxWidth:null,width:null,cropX:50,cropY:50,cardWidth:null,imageWidth:446,textGap:null,diptychGap:12,diptychDrift:8};
  const storageKey='node8-tune-v1';
  const panelStorageKey='node8-tune-panel-v1';
  const multilineLines=value=>String(value).replace(/\r\n?/g,'\n').split('\n');
  const migrateDirectionCopy=values=>{const label=values['about-direction-label'];const title=values['about-direction-title'];const lead=values['about-direction-lead'];const layout=values['about-direction-layout'];if(typeof label?.content==='string'&&label.content.trim()==='02 / Who We Are')label.content='02 / Our Craft';if(typeof title?.content==='string'&&(title.content.replace(/\s+/g,' ').trim()==='Trained on Film Sets.'||title.content.replace(/\s+/g,' ').trim()==='Trained on Film Sets'))title.content='Trained on\nFilm Sets.';if(typeof lead?.content==='string'&&lead.content.replace(/\s+/g,' ').trim()==='오랫동안 현장에서 미술과 연출을 해 온 노드8 팀은 공간과 빛, 소품 하나까지 화면의 모든 레이어를 세공합니다.')lead.content='오랫동안 현장에서 미술과 연출을 해 온 노드8 팀은\n공간과 빛, 소품 하나까지 화면의 모든 레이어를 세공합니다.';if(Number(layout?.imageWidth)>400){layout.imageWidth=330;layout.textGap=96}};
  const migrateAboutEditorialCopy=values=>{let changed=false;const label=values['about-manifesto-label']??(values['about-manifesto-label']={});const body=values['about-manifesto-body']??(values['about-manifesto-body']={});if(['01 / Logline','01 / Studio statement'].includes(label.content?.trim())){label.content='';changed=true}if(body.content?.trim()==='기술은 도구일 뿐입니다. 오래 남는 장면은 언제나 사람의 마음에서 시작됩니다.'){body.content='';changed=true}const title=values['about-chapter-title'];if(typeof title?.content==='string'&&title.content.replace(/\s+/g,' ').trim()==='From instinct to image.'){title.content='Trained on Film Sets.';changed=true}return changed};
  const aboutCopyKeys=['about-manifesto-label','about-manifesto-title','about-manifesto-body','about-chapter-label','about-chapter-title','about-chapter-body'];
  const syncAboutCopyToResponsiveBreakpoints=()=>{let changed=false;const desktop=config.desktop||{};for(const breakpoint of ['tablet','mobile']){config[breakpoint]??={};for(const key of aboutCopyKeys){if(breakpoint==='mobile'&&key==='about-chapter-body')continue;const content=desktop[key]?.content;if(typeof content!=='string')continue;config[breakpoint][key]??={};if(config[breakpoint][key].content!==content){config[breakpoint][key].content=content;changed=true}}}return changed};
  const mergeConfig=(base,local)=>{for(const breakpoint of ['desktop','tablet','mobile']){base[breakpoint]??={};for(const [target,values] of Object.entries(local?.[breakpoint]||{}))base[breakpoint][target]={...(base[breakpoint][target]||{}),...(values||{})}}return base};
  let config=structuredClone(window.NODE8_TUNE_OVERRIDES||{desktop:{},tablet:{},mobile:{}});
  try{const local=localStorage.getItem(storageKey);if(local)config=mergeConfig(config,JSON.parse(local))}catch{}
  let editorialMigrated=false;
  for(const breakpointKey of ['desktop','tablet','mobile']){const saved=config[breakpointKey]||{};if(saved['intro-copy']?.content==='Made to be remembered.'){saved['about-intro-title']={...(saved['about-intro-title']||{}),...saved['intro-copy'],content:'Made to be remembered.'};saved['intro-copy']={...(saved['intro-copy']||{}),content:'Heart first, then technology. Bold, original stories.',fontSize:44}}if(typeof saved['about-intro-body']?.content==='string'&&saved['about-intro-body'].content.replace(/\s+/g,' ').trim()==='우리는 오리지널 영화와 광고를 만듭니다. 새로운 기술로, 마음에 오래 남을 독창적인 이야기를 만드는 일 노드8이 가장 사랑하는 일입니다.')saved['about-intro-body'].content='우리는 오리지널 영화와 광고를 만듭니다.\n새로운 기술로, 마음에 오래 남을 독창적인 이야기를 만드는 일\n노드8이 가장 사랑하는 일입니다.';if(typeof saved['about-manifesto-title']?.content==='string'&&saved['about-manifesto-title'].content.replace(/\s+/g,' ').trim()==='New tools. Original stories. Made to stay.')saved['about-manifesto-title'].content='New tools.\nOriginal stories.\nMade to stay.';if(typeof saved['about-chapter-body']?.content==='string'&&saved['about-chapter-body'].content.replace(/\s+/g,' ').trim()==='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로, 공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.')saved['about-chapter-body'].content='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로\n공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.';migrateDirectionCopy(saved);editorialMigrated=migrateAboutEditorialCopy(saved)||editorialMigrated}
  const mobileBody=config.mobile?.['about-chapter-body'];
  if(typeof mobileBody?.content==='string'&&mobileBody.content.replace(/\s+/g,' ').trim()==='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로 공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.'){mobileBody.content='연출가와 아트디렉터로 현장에서 일해 온 방식\n그대로 공간과 빛, 소품 하나까지 화면에 담기는\n모든 레이어를 설계합니다.';editorialMigrated=true}
  if(syncAboutCopyToResponsiveBreakpoints()||editorialMigrated){try{localStorage.setItem(storageKey,JSON.stringify(config))}catch{}}
  for(const key of ['desktop','tablet','mobile'])config[key]??={};
  let breakpoint='desktop';let selected=Object.keys(targets).find(key=>document.querySelector(targets[key].selector))||'hero-title';

  const panel=document.createElement('aside');panel.className='tune-panel';panel.setAttribute('aria-label','Node8 visual tuning panel');
  panel.innerHTML=`<div class="tune-head"><div class="tune-drag-handle" aria-label="Move Tune inspector"><h2>Tune</h2><p>Local director controls · ?tune=1</p></div><div class="tune-head-actions"><button type="button" data-action="collapse" aria-label="Collapse inspector">−</button><button type="button" data-action="hide" aria-label="Hide inspector">Hide</button><button class="tune-close" type="button" aria-label="Close Tune mode">×</button></div></div><div class="tune-body"><div class="tune-field"><label for="tune-breakpoint">Breakpoint</label><select id="tune-breakpoint"><option value="desktop">Desktop · 1440</option><option value="tablet">Tablet · 810</option><option value="mobile">Mobile · 390</option></select></div><div class="tune-field"><label for="tune-target">Target</label><select id="tune-target">${Object.entries(targets).map(([key,target])=>`<option value="${key}">${target.name}</option>`).join('')}</select></div><div class="tune-controls"></div><div class="tune-actions"><button type="button" data-action="save">Save local</button><button class="tune-secondary" type="button" data-action="copy">Copy config</button><button class="tune-secondary" type="button" data-action="reset-target">Reset target</button><button class="tune-secondary" type="button" data-action="reset-breakpoint">Reset breakpoint</button></div><p class="tune-status" aria-live="polite">Double-click fixed text to edit. Use the panel values for position.</p></div>`;
  const launcher=document.createElement('button');launcher.className='tune-launcher';launcher.type='button';launcher.textContent='Tune';launcher.setAttribute('aria-label','Show Tune inspector');
  const guide=document.createElement('div');guide.className='tune-guide';
  document.body.classList.add('tune-mode');document.body.append(panel,launcher,guide);
  const bpSelect=panel.querySelector('#tune-breakpoint');const targetSelect=panel.querySelector('#tune-target');const controlWrap=panel.querySelector('.tune-controls');const status=panel.querySelector('.tune-status');
  bpSelect.value=breakpoint;targetSelect.value=selected;

  const panelInset=8;
  const clampPanel=()=>{const rect=panel.getBoundingClientRect();const left=Math.min(Math.max(panelInset,rect.left),Math.max(panelInset,innerWidth-rect.width-panelInset));const top=Math.min(Math.max(panelInset,rect.top),Math.max(panelInset,innerHeight-rect.height-panelInset));panel.style.left=`${left}px`;panel.style.top=`${top}px`;panel.style.right='auto';panel.style.bottom='auto'};
  const savePanelPosition=()=>localStorage.setItem(panelStorageKey,JSON.stringify({left:panel.style.left,top:panel.style.top,collapsed:panel.classList.contains('is-collapsed')}));
  try{const savedPanel=JSON.parse(localStorage.getItem(panelStorageKey)||'null');if(savedPanel?.left&&savedPanel?.top){panel.style.left=savedPanel.left;panel.style.top=savedPanel.top;panel.style.right='auto';panel.style.bottom='auto'}if(savedPanel?.collapsed)panel.classList.add('is-collapsed')}catch{}

  const current=()=>config[breakpoint][selected]??{};
  const getElement=(key=selected)=>document.querySelector(targets[key].selector);
  const getDefault=(property,key=selected)=>{
    const element=getElement(key);if(!element)return defaults[property];const style=getComputedStyle(element);
    if(property==='fontSize')return parseFloat(style.fontSize);
    if(property==='fontWeight')return parseInt(style.fontWeight,10)||400;
    if(property==='letterSpacing')return parseFloat(style.letterSpacing)||0;
    if(property==='lineHeight')return parseFloat(style.lineHeight)/parseFloat(style.fontSize)||1;
    if(property==='textAlign')return style.textAlign;
    if(property==='content')return element.innerText;
    if(property==='maxWidth')return parseFloat(style.maxWidth)||ranges.maxWidth[0];
    if(property==='width')return element.getBoundingClientRect().width;
    if(property==='cardWidth')return Math.round((element.querySelector('.recent-card')?.getBoundingClientRect().width||0)/innerWidth*100);
    if(property==='imageWidth')return parseFloat(style.getPropertyValue('--about-direction-still-width'))||defaults.imageWidth;
    if(property==='textGap')return parseFloat(style.getPropertyValue('--about-direction-text-gap'))||Math.round(parseFloat(style.columnGap)||60);
    if(property==='diptychGap')return parseFloat(style.getPropertyValue('--about-diptych-gap'))||defaults.diptychGap;
    if(property==='diptychDrift')return parseFloat(style.getPropertyValue('--about-diptych-drift'))||defaults.diptychDrift;
    return defaults[property];
  };
  const valueFor=(property,key=selected)=>current()[property]??getDefault(property,key);
  const applyTarget=(key)=>{
    const element=getElement(key);if(!element)return;const values=config[breakpoint][key]||{};
    if(!element.dataset.tuneSourceHtml)element.dataset.tuneSourceHtml=element.innerHTML;
    element.style.translate=`${values.x??0}px ${values.y??0}px`;
    for(const property of ['fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth','width'])element.style.removeProperty(property.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`));
    if(values.content!=null){element.replaceChildren();multilineLines(values.content).forEach((line,index)=>{if(index)element.append(document.createElement('br'));element.append(document.createTextNode(line))})}else element.innerHTML=element.dataset.tuneSourceHtml;
    if(values.fontSize!=null)element.style.fontSize=`${values.fontSize}px`;
    if(values.fontWeight!=null)element.style.fontWeight=values.fontWeight;
    if(values.letterSpacing!=null)element.style.letterSpacing=`${values.letterSpacing}px`;
    if(values.lineHeight!=null)element.style.lineHeight=values.lineHeight;
    if(values.textAlign!=null)element.style.textAlign=values.textAlign;
    if(values.maxWidth!=null)element.style.maxWidth=`${values.maxWidth}px`;
    if(values.width!=null)element.style.width=`${values.width}px`;
    if(key==='about-direction-layout'){if(values.imageWidth!=null)element.style.setProperty('--about-direction-still-width',`${values.imageWidth}px`);else element.style.removeProperty('--about-direction-still-width');if(values.textGap!=null)element.style.setProperty('--about-direction-text-gap',`${values.textGap}px`);else element.style.removeProperty('--about-direction-text-gap')}
    if(key==='about-diptych'){if(values.diptychGap!=null)element.style.setProperty('--about-diptych-gap',`${values.diptychGap}px`);else element.style.removeProperty('--about-diptych-gap');if(values.diptychDrift!=null)element.style.setProperty('--about-diptych-drift',`${values.diptychDrift}px`);else element.style.removeProperty('--about-diptych-drift')}
    if(key==='footer-media'||key==='about-landscape'||key==='about-diptych-left'||key==='about-diptych-right'){const image=element.querySelector('img');if(image)image.style.objectPosition=`${values.cropX??50}% ${values.cropY??50}%`}
    if(key==='recent-rail')element.style.gridAutoColumns=values.cardWidth!=null?`${values.cardWidth}vw`:'';
  };
  const applyAll=()=>Object.keys(targets).forEach(applyTarget);
  const renderControls=()=>{
    controlWrap.innerHTML='';targets[selected].controls.forEach(property=>{
      if(property==='content'){const field=document.createElement('div');field.className='tune-field';field.innerHTML=`<label>${labels[property]}</label><textarea data-property="content" aria-label="Text">${valueFor(property).replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>`;controlWrap.append(field);return}
      if(property==='textAlign'){const field=document.createElement('div');field.className='tune-field';field.innerHTML=`<label>${labels[property]}</label><select data-property="textAlign"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select>`;field.querySelector('select').value=valueFor(property);controlWrap.append(field);return}
      const [min,max,step,unit]=ranges[property];const value=valueFor(property);
      const field=document.createElement('div');field.className='tune-field';field.innerHTML=`<label>${labels[property]}</label><div class="tune-control"><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-property="${property}"><input type="number" min="${min}" max="${max}" step="${step}" value="${value}" data-number="${property}" aria-label="${labels[property]} ${unit}"></div>`;controlWrap.append(field);
    });
  };
  const setValue=(property,value,refresh=true)=>{const range=ranges[property];const safe=range?Math.min(range[1],Math.max(range[0],Number(value))):String(value);config[breakpoint][selected]??={};config[breakpoint][selected][property]=safe;applyTarget(selected);if(refresh)renderControls();updateGuide();};
  const updateGuide=()=>{const element=getElement();if(!element){guide.classList.remove('is-visible');return}const rect=element.getBoundingClientRect();guide.style.left=`${rect.left}px`;guide.style.top=`${rect.top}px`;guide.style.width=`${rect.width}px`;guide.style.height=`${rect.height}px`;guide.classList.add('is-visible');};
  const selectTarget=(key)=>{selected=key;targetSelect.value=key;document.querySelectorAll('.tune-target').forEach(el=>el.classList.remove('tune-target'));const element=getElement();if(element){element.classList.add('tune-target');element.tabIndex=-1;element.focus({preventScroll:true})}renderControls();updateGuide();};
  controlWrap.addEventListener('input',event=>{const property=event.target.dataset.property||event.target.dataset.number;if(!property)return;setValue(property,event.target.value,property!=='content')});
  controlWrap.addEventListener('change',event=>{const property=event.target.dataset.property||event.target.dataset.number;if(!property)return;setValue(property,event.target.value)});
  bpSelect.addEventListener('change',()=>{breakpoint=bpSelect.value;applyAll();renderControls();updateGuide()});
  targetSelect.addEventListener('change',()=>selectTarget(targetSelect.value));
  document.addEventListener('dblclick',event=>{const element=event.target.closest('[data-tune-id]');const id=element?.dataset.tuneId;if(!id||!targets[id]?.controls.includes('content'))return;event.preventDefault();selectTarget(id);const hasPrevious=Object.hasOwn(current(),'content');const previous=hasPrevious?current().content:undefined;element.contentEditable='plaintext-only';element.dataset.tuneEditing='true';element.focus({preventScroll:true});const finish=(commit)=>{if(!element.dataset.tuneEditing)return;element.contentEditable='false';delete element.dataset.tuneEditing;if(commit)setValue('content',multilineLines(element.innerText).join('\n'));else{if(hasPrevious){config[breakpoint][id]??={};config[breakpoint][id].content=previous}else if(config[breakpoint][id])delete config[breakpoint][id].content;applyTarget(id);renderControls();updateGuide()}element.removeEventListener('blur',onBlur);element.removeEventListener('keydown',onKey)};const onBlur=()=>finish(true);const onKey=keyEvent=>{if(keyEvent.key==='Escape'){keyEvent.preventDefault();finish(false)}if((keyEvent.ctrlKey||keyEvent.metaKey)&&keyEvent.key==='Enter'){keyEvent.preventDefault();finish(true);element.blur()}};element.addEventListener('blur',onBlur);element.addEventListener('keydown',onKey)});
  panel.addEventListener('click',async event=>{const action=event.target.dataset.action;if(!action)return;if(action==='collapse'){panel.classList.toggle('is-collapsed');requestAnimationFrame(()=>{clampPanel();savePanelPosition()});return}if(action==='hide'){panel.classList.add('is-hidden');launcher.classList.add('is-visible');return}if(action==='reset-target'){delete config[breakpoint][selected];applyTarget(selected);renderControls();updateGuide();status.textContent='Target reset for this breakpoint.'}if(action==='reset-breakpoint'){config[breakpoint]={};applyAll();renderControls();updateGuide();status.textContent='Breakpoint reset.'}if(action==='copy'){await navigator.clipboard.writeText(JSON.stringify(config,null,2));status.textContent='Configuration copied.'}if(action==='save'){localStorage.setItem(storageKey,JSON.stringify(config));window.NODE8_TUNE_RUNTIME?.apply();try{const response=await fetch('/__tune/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(config)});if(!response.ok)throw new Error();status.textContent='Saved. The normal page now uses this setting.'}catch{status.textContent='Saved in this browser. Refresh the normal page to see it.'}}});
  launcher.addEventListener('click',()=>{panel.classList.remove('is-hidden');launcher.classList.remove('is-visible');requestAnimationFrame(clampPanel)});
  const dragHandle=panel.querySelector('.tune-drag-handle');let dragStart=null;
  dragHandle.addEventListener('pointerdown',event=>{if(event.button!==0)return;const rect=panel.getBoundingClientRect();dragStart={x:event.clientX,y:event.clientY,left:rect.left,top:rect.top};dragHandle.setPointerCapture(event.pointerId);panel.classList.add('is-moving');event.preventDefault()});
  dragHandle.addEventListener('pointermove',event=>{if(!dragStart)return;const width=panel.offsetWidth;const height=panel.offsetHeight;const left=Math.min(Math.max(panelInset,dragStart.left+event.clientX-dragStart.x),Math.max(panelInset,innerWidth-width-panelInset));const top=Math.min(Math.max(panelInset,dragStart.top+event.clientY-dragStart.y),Math.max(panelInset,innerHeight-height-panelInset));panel.style.left=`${left}px`;panel.style.top=`${top}px`;panel.style.right='auto';panel.style.bottom='auto'});
  const finishPanelDrag=event=>{if(!dragStart)return;dragStart=null;panel.classList.remove('is-moving');if(dragHandle.hasPointerCapture(event.pointerId))dragHandle.releasePointerCapture(event.pointerId);savePanelPosition()};
  dragHandle.addEventListener('pointerup',finishPanelDrag);dragHandle.addEventListener('pointercancel',finishPanelDrag);
  panel.querySelector('.tune-close').addEventListener('click',()=>{history.replaceState(null,'',location.pathname);location.reload()});
  addEventListener('resize',()=>{clampPanel();updateGuide()},{passive:true});requestAnimationFrame(clampPanel);applyAll();selectTarget(selected);
})();
