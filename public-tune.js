window.NODE8_TUNE_OVERRIDES={
  "desktop": {
    "hero-eyebrow": {
      "x": 6,
      "fontSize": 17,
      "letterSpacing": -1.1,
      "content": "© 2024 — 2026",
      "y": 14
    },
    "hero-title": {
      "letterSpacing": -4.3,
      "x": 0,
      "y": 0,
      "content": "Node8 Studio",
      "lineHeight": 0.87,
      "fontSize": 145
    },
    "hero-note": {
      "content": "Lights down. Story begins.\n",
      "x": -29
    },
    "intro-label": {
      "content": "01 / Node8 Studio",
      "fontSize": 16,
      "fontWeight": 400,
      "letterSpacing": -0.6
    },
    "intro-copy": {
      "content": "Heart first, then technology. Bold, original stories.",
      "fontSize": 44
    },
    "intro-subcopy": {
      "content": "우리는 사람의 마음에 기술을 더해, 대담하고 독창적인 이야기를 만듭니다.",
      "fontSize": 20,
      "fontWeight": 400
    },
    "recent-label": {
      "content": "02 / Now Showing",
      "fontSize": 16,
      "fontWeight": 400,
      "letterSpacing": -0.2
    },
    "recent-title": {
      "content": "Recent Projects.",
      "fontSize": 72,
      "fontWeight": 600
    },
    "footer-copy": {
      "content": "아직 한 줄뿐인 아이디어여도 괜찮습니다.\n카카오톡이나 메일로 편하게 들려주세요.\n자료를 함께 보내주시면 더 깊이 이야기 나눌 수 있습니다."
    },
    "footer-title": {
      "content": "Where Stories Begin",
      "letterSpacing": -8.2,
      "fontSize": 198
    },
    "about-hero-title": {
      "content": "Images. Stories. Moments.\n",
      "letterSpacing": -2.6,
      "fontWeight": 600
    },
    "footer-media": {
      "x": 12,
      "width": 509
    },
    "about-intro-body": {
      "content": "우리는 오리지널 영화와 광고를 만듭니다.\n새로운 기술로, 마음에 오래 남을 독창적인 이야기를 만드는 일\n노드8이 가장 사랑하는 일입니다.",
      "fontSize": 20,
      "fontWeight": 400,
      "letterSpacing": -0.5,
      "lineHeight": 1.31
    },
    "about-intro-title": {
      "content": "Made to be remembered.",
      "fontSize": 65
    },
    "about-intro-label": {
      "content": "01 / Who We Are",
      "fontSize": 16,
      "letterSpacing": -0.6
    },
    "about-direction-label": {
      "content": "02 / Our Craft",
      "fontSize": 16,
      "letterSpacing": -0.6
    },
    "about-direction-layout": {
      "imageWidth": 280,
      "textGap": 96
    },
    "about-direction-title": {
      "content": "Trained on\nFilm Sets.",
      "fontSize": 72,
      "letterSpacing": -3.5
    },
    "about-direction-lead": {
      "content": "오랫동안 현장에서 미술과 연출을 해 온 노드8 팀은\n공간과 빛, 소품 하나까지 화면의 모든 레이어를 세공합니다.",
      "fontSize": 20
    },
    "about-direction-body": {
      "content": "\n"
    },
    "about-diptych": {
      "diptychDrift": 8
    },
    "about-chapter-body": {
      "content": "연출가와 아트디렉터로 현장에서 일해 온 방식 그대로\n공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.",
      "fontWeight": 400,
      "fontSize": 20
    },
    "about-manifesto-label": {
      "content": "",
      "fontSize": 16
    },
    "about-chapter-label": {
      "content": "02 / Our Craft",
      "fontSize": 16,
      "fontWeight": 400
    },
    "about-manifesto-title": {
      "content": "New tools.\nOriginal stories.\nMade to stay.",
      "letterSpacing": -8
    },
    "about-manifesto-body": {
      "content": ""
    },
    "about-chapter-title": {
      "content": "Trained on Film Sets.",
      "letterSpacing": -7.4
    },
    "footer-address": {
      "content": "서울 성동구 성수일로12길 17, 2층 Node8 Studio",
      "fontSize": 20
    },
    "footer-tagline": {
      "content": "We blend AI and human sensibility\nto craft distinctive visuals for brands"
    }
  },
  "tablet": {},
  "mobile": {
    "intro-copy": {
      "content": "Heart first,\nthen technology.\nBold, original stories."
    },
    "about-manifesto-title": {
      "letterSpacing": -2.7,
      "lineHeight": 1
    },
    "about-chapter-body": {
      "content": "연출가와 아트디렉터로 현장에서 일해 온 방식\n그대로 공간과 빛, 소품 하나까지 화면에 담기는\n모든 레이어를 설계합니다.",
      "fontSize": 17,
      "lineHeight": 1.55,
      "letterSpacing": -0.25
    }
  }
};

(()=>{
  const targets={
    'hero-eyebrow':'.hero:not(.about-services-hero) .eyebrow','hero-title':'.hero:not(.about-services-hero) h1','hero-note':'.hero:not(.about-services-hero) .hero-note','intro-label':'.home-intro .label','intro-copy':'.home-intro .intro-copy','intro-subcopy':'.home-intro .intro-subcopy','about-intro-label':'.about-intro .label','about-intro-title':'.about-intro .intro-copy','about-intro-body':'.about-intro-body','about-direction-layout':'.about-direction','about-landscape':'.about-landscape','about-diptych':'.about-diptych','about-diptych-left':'.about-diptych-panel--left','about-diptych-right':'.about-diptych-panel--right','recent-label':'.recent-projects .label','recent-title':'.recent-projects .display-title','recent-rail':'.recent-rail','footer-title':'.node8-footer-title','footer-copy':'.node8-footer-copy','footer-media':'.node8-footer-media'
  };
  const storageKey='node8-tune-v1';
  const legacyFooterCopy='아직 한 줄뿐인 아이디어여도 괜찮습니다. 카카오톡이나 메일로 편하게 들려주세요. 자료를 함께 보내주시면 더 깊이 이야기 나눌 수 있습니다.';
  const currentFooterCopy='아직 한 줄뿐인 아이디어여도 괜찮습니다.\n카카오톡이나 메일로 편하게 들려주세요.\n자료를 함께 보내주시면 더 깊이 이야기 나눌 수 있습니다.';
  const legacyAboutIntroBody='우리는 오리지널 영화와 광고를 만듭니다. 새로운 기술로, 마음에 오래 남을 독창적인 이야기를 만드는 일 노드8이 가장 사랑하는 일입니다.';
  const currentAboutIntroBody='우리는 오리지널 영화와 광고를 만듭니다.\n새로운 기술로, 마음에 오래 남을 독창적인 이야기를 만드는 일\n노드8이 가장 사랑하는 일입니다.';
  const legacyDirectionTitle='Trained on Film Sets';
  const currentDirectionTitle='Trained on\nFilm Sets.';
  const legacyDirectionLead='오랫동안 현장에서 미술과 연출을 해 온 노드8 팀은 공간과 빛, 소품 하나까지 화면의 모든 레이어를 세공합니다.';
  const currentDirectionLead='오랫동안 현장에서 미술과 연출을 해 온 노드8 팀은\n공간과 빛, 소품 하나까지 화면의 모든 레이어를 세공합니다.';
  const multilineLines=value=>String(value).replace(/\r\n?/g,'\n').split('\n');
  const migrateLegacyFooterCopy=config=>{let changed=false;for(const breakpoint of ['desktop','tablet','mobile']){const copy=config[breakpoint]?.['footer-copy'];if(typeof copy?.content==='string'&&copy.content.replace(/\s+/g,' ').trim()===legacyFooterCopy){copy.content=currentFooterCopy;changed=true}}return changed};
  const migrateLegacyAboutIntro=config=>{let changed=false;for(const breakpoint of ['desktop','tablet','mobile']){const current=config[breakpoint]||{};const title=current['intro-copy'];if(title?.content==='Made to be remembered.'){current['about-intro-title']={...(current['about-intro-title']||{}),...title};current['about-intro-title'].content='Made to be remembered.';current['intro-copy']={...(current['intro-copy']||{}),content:'Heart first, then technology. Bold, original stories.',fontSize:44};changed=true}const body=current['about-intro-body'];if(typeof body?.content==='string'&&body.content.replace(/\s+/g,' ').trim()===legacyAboutIntroBody){body.content=currentAboutIntroBody;changed=true}}return changed};
  const migrateHomeIntroMobileCopy=config=>{const content=config.mobile?.['intro-copy']?.content;if(typeof content!=='string'||content.replace(/\s+/g,' ').trim()!=='Heart first, then technology. Bold, original stories.')return false;config.mobile['intro-copy'].content=['Heart first,','then technology.','Bold, original stories.'].join(String.fromCharCode(10));return true};
  const migrateAboutEditorialCopy=config=>{let changed=false;for(const breakpoint of ['desktop','tablet','mobile']){const current=config[breakpoint]||{};const manifesto=current['about-manifesto-title'];const manifestoLabel=current['about-manifesto-label']??(current['about-manifesto-label']={});const manifestoBody=current['about-manifesto-body']??(current['about-manifesto-body']={});const craftTitle=current['about-chapter-title'];const craftBody=current['about-chapter-body'];if(typeof manifesto?.content==='string'&&manifesto.content.replace(/\s+/g,' ').trim()==='New tools. Original stories. Made to stay.'){manifesto.content='New tools.\nOriginal stories.\nMade to stay.';changed=true}if(['01 / Logline','01 / Studio statement'].includes(manifestoLabel.content?.trim())){manifestoLabel.content='';changed=true}if(manifestoBody.content?.trim()==='기술은 도구일 뿐입니다. 오래 남는 장면은 언제나 사람의 마음에서 시작됩니다.'){manifestoBody.content='';changed=true}if(typeof craftTitle?.content==='string'&&craftTitle.content.replace(/\s+/g,' ').trim()==='From instinct to image.'){craftTitle.content='Trained on Film Sets.';changed=true}if(typeof craftBody?.content==='string'&&craftBody.content.replace(/\s+/g,' ').trim()==='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로, 공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.'){craftBody.content='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로\n공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.';changed=true}}return changed};
  const aboutCopyKeys=['about-manifesto-label','about-manifesto-title','about-manifesto-body','about-chapter-label','about-chapter-title','about-chapter-body'];
  const syncAboutCopyToResponsiveBreakpoints=config=>{let changed=false;const desktop=config.desktop||{};for(const breakpoint of ['tablet','mobile']){config[breakpoint]??={};for(const key of aboutCopyKeys){if(breakpoint==='mobile'&&key==='about-chapter-body')continue;const content=desktop[key]?.content;if(typeof content!=='string')continue;config[breakpoint][key]??={};if(config[breakpoint][key].content!==content){config[breakpoint][key].content=content;changed=true}}}return changed};
  const migrateDirectionCopy=config=>{let changed=false;for(const breakpoint of ['desktop','tablet','mobile']){const current=config[breakpoint]||{};const label=current['about-direction-label'];const title=current['about-direction-title'];const lead=current['about-direction-lead'];const layout=current['about-direction-layout'];if(typeof label?.content==='string'&&label.content.trim()==='02 / Who We Are'){label.content='02 / Our Craft';changed=true}if(typeof title?.content==='string'&&(title.content.replace(/\s+/g,' ').trim()===legacyDirectionTitle||title.content.replace(/\s+/g,' ').trim()==='Trained on Film Sets.')){title.content=currentDirectionTitle;changed=true}if(typeof lead?.content==='string'&&lead.content.replace(/\s+/g,' ').trim()===legacyDirectionLead){lead.content=currentDirectionLead;changed=true}if(Number(layout?.imageWidth)>400){layout.imageWidth=330;layout.textGap=96;changed=true}}return changed};
  const mergeConfig=(base,local)=>{for(const breakpoint of ['desktop','tablet','mobile']){base[breakpoint]??={};for(const [target,values] of Object.entries(local?.[breakpoint]||{}))base[breakpoint][target]={...(base[breakpoint][target]||{}),...(values||{})}}return base};
  const readConfig=()=>{let config=structuredClone(window.NODE8_TUNE_OVERRIDES||{desktop:{},tablet:{},mobile:{}});let usedLocal=false;try{const local=localStorage.getItem(storageKey);if(local){config=mergeConfig(config,JSON.parse(local));usedLocal=true}}catch{};for(const key of ['desktop','tablet','mobile'])config[key]??={};const footerMigrated=migrateLegacyFooterCopy(config);const aboutMigrated=migrateLegacyAboutIntro(config);const homeMobileIntroMigrated=migrateHomeIntroMobileCopy(config);const editorialMigrated=migrateAboutEditorialCopy(config);const mobileBody=config.mobile['about-chapter-body'];const oldMobileBody='연출가와 아트디렉터로 현장에서 일해 온 방식 그대로 공간과 빛, 소품 하나까지 화면에 담기는 모든 레이어를 설계합니다.';const approvedMobileBody='연출가와 아트디렉터로 현장에서 일해 온 방식\n그대로 공간과 빛, 소품 하나까지 화면에 담기는\n모든 레이어를 설계합니다.';const mobileBodyMigrated=typeof mobileBody?.content==='string'&&mobileBody.content.replace(/\s+/g,' ').trim()===oldMobileBody?(mobileBody.content=approvedMobileBody,true):false;const directionMigrated=migrateDirectionCopy(config);const responsiveCopySynced=syncAboutCopyToResponsiveBreakpoints(config);if((footerMigrated||aboutMigrated||homeMobileIntroMigrated||editorialMigrated||mobileBodyMigrated||directionMigrated||responsiveCopySynced)&&usedLocal){try{localStorage.setItem(storageKey,JSON.stringify(config))}catch{}}return config};
  const currentBreakpoint=()=>innerWidth<=720?'mobile':innerWidth<=1000?'tablet':'desktop';
  const apply=()=>{document.querySelectorAll('[data-tune-id]').forEach(element=>{targets[element.dataset.tuneId]=`[data-tune-id="${element.dataset.tuneId}"]`});const config=readConfig()[currentBreakpoint()]||{};Object.entries(targets).forEach(([key,selector])=>{const element=document.querySelector(selector);if(!element)return;const values=config[key]||{};if(!element.dataset.tuneSourceHtml)element.dataset.tuneSourceHtml=element.innerHTML;element.style.translate=`${values.x??0}px ${values.y??0}px`;for(const property of ['fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth','width'])element.style.removeProperty(property.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`));if(values.content!=null){element.replaceChildren();multilineLines(values.content).forEach((line,index)=>{if(index)element.append(document.createElement('br'));element.append(document.createTextNode(line))})}else if(key==='intro-copy'&&element.innerHTML!==element.dataset.tuneSourceHtml)element.innerHTML=element.dataset.tuneSourceHtml;if(values.fontSize!=null)element.style.fontSize=`${values.fontSize}px`;if(values.fontWeight!=null)element.style.fontWeight=values.fontWeight;if(values.letterSpacing!=null)element.style.letterSpacing=`${values.letterSpacing}px`;if(values.lineHeight!=null)element.style.lineHeight=values.lineHeight;if(values.textAlign!=null)element.style.textAlign=values.textAlign;if(values.maxWidth!=null)element.style.maxWidth=`${values.maxWidth}px`;if(values.width!=null)element.style.width=`${values.width}px`;if(key==='about-direction-layout'){if(values.imageWidth!=null)element.style.setProperty('--about-direction-still-width',`${values.imageWidth}px`);else element.style.removeProperty('--about-direction-still-width');if(values.textGap!=null)element.style.setProperty('--about-direction-text-gap',`${values.textGap}px`);else element.style.removeProperty('--about-direction-text-gap')}if(key==='about-diptych'){if(values.diptychGap!=null)element.style.setProperty('--about-diptych-gap',`${values.diptychGap}px`);else element.style.removeProperty('--about-diptych-gap');if(values.diptychDrift!=null)element.style.setProperty('--about-diptych-drift',`${values.diptychDrift}px`);else element.style.removeProperty('--about-diptych-drift')}if(key==='recent-rail')element.style.gridAutoColumns=values.cardWidth!=null?`${values.cardWidth}vw`:'';if(key==='footer-media'||key==='about-landscape'||key==='about-diptych-left'||key==='about-diptych-right'){const image=element.querySelector('img');if(image)image.style.objectPosition=`${values.cropX??50}% ${values.cropY??50}%`}})};
  window.NODE8_TUNE_RUNTIME={apply};
  requestAnimationFrame(apply);addEventListener('load',apply,{once:true});addEventListener('resize',()=>{clearTimeout(window.__node8TuneResize);window.__node8TuneResize=setTimeout(apply,120)},{passive:true});
})();
