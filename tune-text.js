(()=>{
  const controls=['content','x','y','fontSize','fontWeight','letterSpacing','lineHeight','textAlign','maxWidth'];
  const definitions={
    'hero-eyebrow':{name:'Hero · Copyright',selector:'.hero:not(.about-services-hero) .eyebrow',controls},
    'hero-title':{name:'Hero · Node8 Studio',selector:'.hero:not(.about-services-hero) h1',controls},
    'hero-note':{name:'Hero · Right copy',selector:'.hero:not(.about-services-hero) .hero-note',controls},
    'intro-label':{name:'Positioning · Label',selector:'.home-intro .label',controls},
    'intro-copy':{name:'Positioning · Main copy',selector:'.home-intro .intro-copy',controls},
    'intro-subcopy':{name:'Positioning · Korean subcopy',selector:'.home-intro .intro-subcopy',controls},
    'about-intro-label':{name:'About · Intro label',selector:'.about-intro .label',controls},
    'about-intro-title':{name:'About · Intro title',selector:'.about-intro .intro-copy',controls},
    'recent-label':{name:'Recent · Label',selector:'.recent-projects .label',controls},
    'recent-title':{name:'Recent · Section title',selector:'.recent-projects .display-title',controls},
    'about-hero-title':{name:'About · Hero title',selector:'.about-services-hero h1',controls},
    'about-intro-body':{name:'About · Intro body',selector:'.about-intro-body',controls},
    'about-manifesto-label':{name:'About · Manifesto label',selector:'.about-manifesto .label',controls},
    'about-manifesto-title':{name:'About · Manifesto title',selector:'.about-manifesto h2',controls},
    'about-manifesto-body':{name:'About · Manifesto body',selector:'.about-manifesto-copy p',controls},
    'about-chapter-label':{name:'About · Craft label',selector:'.about-chapter-copy .label',controls},
    'about-chapter-title':{name:'About · Craft title',selector:'.about-chapter-copy h2',controls},
    'about-chapter-body':{name:'About · Craft body',selector:'.about-chapter-copy>p:not(.label)',controls},
    'about-direction-label':{name:'About · Direction label',selector:'.about-direction-copy .label',controls},
    'about-direction-title':{name:'About · Direction title',selector:'.about-direction-copy h2',controls},
    'about-direction-lead':{name:'About · Direction lead',selector:'.about-direction-lead',controls},
    'about-direction-body':{name:'About · Direction body',selector:'.about-direction-body',controls},
    'archive-title':{name:'Archive · Page title',selector:'.archive-header h1',controls},
    'archive-subtitle':{name:'Archive · Page subtitle',selector:'.archive-subtitle',controls},
    'footer-title':{name:'Footer · CTA title',selector:'.node8-footer-title',controls},
    'footer-copy':{name:'Footer · Body copy',selector:'.node8-footer-copy',controls},
    'footer-email':{name:'Footer · Email',selector:'.node8-footer-email',controls},
    'footer-address':{name:'Footer · Address',selector:'.node8-footer-address',controls},
    'footer-tagline':{name:'Footer · Tagline',selector:'.node8-footer-tagline',controls}
  };
  const register=()=>{Object.entries(definitions).forEach(([id,definition])=>{const element=document.querySelector(definition.selector);if(element)element.dataset.tuneId=id});window.NODE8_TUNE_TEXT_TARGETS=definitions;window.NODE8_TUNE_RUNTIME?.apply()};
  register();requestAnimationFrame(register);
})();
