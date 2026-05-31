// BROWSER — BC01 REDA v3
function BrowserApp({openTab,openPortfolio}){
  var D=window.LUMIO_DATA||{};
  var [portfolioReady,setPR]=React.useState(!!window.LUMIO_PORTFOLIO_DATA);
  var [activeTab,setActiveTab]=React.useState(
    (openPortfolio||!!window.LUMIO_PORTFOLIO_DATA)?'portfolio':(openTab||'article-moodwork')
  );

  // Polling données portfolio
  React.useEffect(function(){
    var id=setInterval(function(){
      if(window.LUMIO_PORTFOLIO_DATA){ setPR(true); clearInterval(id); }
    },500);
    return function(){clearInterval(id);};
  },[]);

  // Exposer la fonction d'ouverture depuis app-livrable
  // — force portfolioReady ET activeTab simultanément
  React.useEffect(function(){
    window.__openAppInBrowser=function(type){
      if(type==='portfolio'){
        setPR(true);
        setActiveTab('portfolio');
        if(window.__onAppOpened) window.__onAppOpened('browser');
      }
    };
    return function(){ window.__openAppInBrowser=null; };
  },[]);

  // Si ouvert en mode démo acte 5
  React.useEffect(function(){
    if(openPortfolio){ setPR(true); setActiveTab('portfolio'); }
  },[openPortfolio]);

  var article=D.pressArticles?.[0]||{};
  var fausse=D.fausseUne||{};

  var TABS=[
    {id:'article-moodwork',favicon:'LE',fc:'#0a3d62',title:'Moodwork signe Generali IDF · Les Échos',url:'https://lesechos.fr/tech-medias/wearables-sante-moodwork-generali-idf',type:'article'},
    {id:'fausse-une',      favicon:'LE',fc:'#0a3d62',title:"Wearables santé : Moodwork s'impose en IDF",url:'https://lesechos.fr/sante/wearables-moodwork-idf',type:'fausse-une'},
    {id:'lumio-site',      favicon:'L', fc:'#0a7a6e',title:'Lumio Health · Mesurez le stress invisible',url:'https://lumio-health.com',type:'corporate'},
    ...(portfolioReady?[{id:'portfolio',favicon:'📋',fc:'#1C2B3A',title:'Portfolio de compétences · BC01 REDA',url:'https://portfolio.lumio-interne.fr/bc01-reda',type:'portfolio'}]:[]),
  ];

  var tab=TABS.find(function(t){return t.id===activeTab;})||TABS[0];

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#f0ede6'}}>
      {/* Tabs */}
      <div style={{background:'#e8e4dc',borderBottom:'1px solid rgba(20,24,36,.1)',display:'flex',overflowX:'auto',padding:'4px 6px 0',gap:2,flexShrink:0}}>
        {TABS.map(function(t){
          var active=activeTab===t.id;
          return (
            <div key={t.id} onClick={function(){setActiveTab(t.id);}} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:'6px 6px 0 0',background:active?'white':'transparent',cursor:'pointer',maxWidth:200,flexShrink:0,borderBottom:active?'1px solid white':'none',marginBottom:active?-1:0}}>
              <div style={{width:13,height:13,borderRadius:3,background:t.fc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:6,color:'white',fontWeight:700,flexShrink:0}}>{t.favicon}</div>
              <span style={{fontSize:11,color:active?'var(--ink)':'var(--ink-mute)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.title}</span>
            </div>
          );
        })}
      </div>
      {/* URL bar */}
      <div style={{background:'white',borderBottom:'1px solid var(--rule)',padding:'5px 10px',flexShrink:0}}>
        <div style={{background:'#f4f2ee',borderRadius:7,padding:'4px 12px',fontSize:11,color:'var(--ink-mute)',fontFamily:'var(--font-mono)'}}>{tab.url||''}</div>
      </div>
      {/* Contenu */}
      <div style={{flex:1,overflowY:'auto'}}>
        {tab.type==='article'&&(
          <div style={{maxWidth:720,margin:'0 auto',padding:'32px 24px'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#0a3d62',marginBottom:8}}>Les Échos · {article.date||''}</div>
            <h1 style={{fontFamily:'var(--font-display)',fontSize:28,fontWeight:600,color:'var(--ink)',lineHeight:1.3,marginBottom:20}}>{article.headline||''}</h1>
            <p style={{fontSize:14,lineHeight:1.85,color:'var(--ink-soft)',whiteSpace:'pre-line'}}>{article.body||''}</p>
          </div>
        )}
        {tab.type==='fausse-une'&&(
          <div style={{background:'#0a1628',minHeight:'100%'}}>
            <div style={{background:'#0a1628',padding:'12px 24px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid rgba(255,255,255,.1)'}}>
              <div style={{fontSize:18,fontWeight:800,color:'white',fontFamily:'Georgia,serif'}}>Les Échos</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.4)',fontFamily:'var(--font-mono)'}}>{fausse.date||''}</div>
            </div>
            <div style={{maxWidth:760,margin:'0 auto',padding:'40px 24px'}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#f5a623',marginBottom:12}}>{fausse.surtitre||''}</div>
              <h1 style={{fontFamily:'Georgia,serif',fontSize:34,fontWeight:700,color:'white',lineHeight:1.25,marginBottom:14}}>{fausse.titre||''}</h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,.7)',lineHeight:1.7,fontStyle:'italic',borderLeft:'3px solid #f5a623',paddingLeft:16}}>{fausse.chapeau||''}</p>
            </div>
          </div>
        )}
        {tab.type==='corporate'&&(
          <div style={{background:'#0B2B2D',minHeight:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{textAlign:'center',padding:'60px 24px'}}>
              <div style={{fontSize:48,marginBottom:14}}>💚</div>
              <div style={{fontFamily:'var(--font-display)',fontSize:36,color:'white',fontWeight:300,marginBottom:8}}>Lumio Health</div>
              <div style={{fontSize:16,color:'rgba(255,255,255,.5)',fontStyle:'italic'}}>Mesurez le stress invisible</div>
            </div>
          </div>
        )}
        {tab.type==='portfolio'&&(function(){
          var P=window.PortfolioApp;
          if(P&&window.LUMIO_PORTFOLIO_DATA) return React.createElement(P);
          return (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--ink-faint)',fontStyle:'italic',padding:40,textAlign:'center',gap:8}}>
              <div style={{fontSize:28}}>📋</div>
              <div>Portfolio disponible après soumission du livrable.</div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
window.LUMIO_APPS=window.LUMIO_APPS||{};
window.LUMIO_APPS.browser=BrowserApp;
