// ══════════════════════════════════════════════════════════════
//  DESKTOP — BC01 REDA v3
//  ErrorBoundary par fenêtre, "App indisponible" après timeout,
//  navigation clavier ← →, timer fictif
// ══════════════════════════════════════════════════════════════

var APP_META = {
  mail:      { title:'Mail',                   w:1000, h:660 },
  browser:   { title:'Safari',                 w:1060, h:700 },
  pdf:       { title:'Aperçu',                 w:860,  h:680 },
  voice:     { title:'Mémos vocaux',           w:760,  h:540 },
  notes:     { title:'Notes',                  w:860,  h:620 },
  slack:     { title:'Slack — Lumio Health',   w:960,  h:620 },
  finder:    { title:'Finder',                 w:800,  h:520 },
  calendar:  { title:'Calendrier — Sept. 2026', w:760,  h:560 },
  trash:     { title:'Corbeille',              w:480,  h:360 },
  livrable:  { title:'Livrable — BC01 REDA',   w:900,  h:600 },
  jefferson: { title:'Jefferson · Guide PAC',  w:460,  h:540 },
};

var ACTES = [
  { n:1, label:'Premier jour',   dur:20,  color:'#5c6878', desc:"L'étudiant entre dans l'univers. Il lit les emails de Théo et Camille.", tips:['Mail → email de Théo','Mail → email de Camille'] },
  { n:2, label:'État du terrain',dur:30,  color:'#1b4f8a', desc:'CRM affiché : 6% de churn. Camille dit 14%. Mémo vocal + article Moodwork.', tips:['Mémos vocaux → Camille','Aperçu → Export CRM','Safari → Moodwork/Generali'] },
  { n:3, label:'Hypothèse',      dur:45,  color:'#0a7a6e', desc:'Formuler le diagnostic à Camille sur Slack. 2 échanges → Livrable débloqué.', tips:['Slack → DM Camille Ott','2 échanges → Livrable débloqué'] },
  { n:4, label:'Production',     dur:80,  color:'#c4420f', desc:'Rédiger le plan. C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC.', tips:['Livrable → C.1.1 (120 mots)','C.1.2 (180 mots)','C.1.3 PAC (200 mots)','Soumettre → feedback IA'] },
  { n:5, label:'Portfolio',      dur:35,  color:'#0a7a6e', desc:'Portfolio généré dynamiquement. Rend visible ce que le plan révèle.', tips:['Safari → onglet Portfolio','Visible / invisible','Signature de posture'] },
];

var TOTAL_MIN = ACTES.reduce(function(s,a){return s+a.dur;},0); // 210

var _acteStart = [];
(function(){ var c=0; ACTES.forEach(function(a,i){_acteStart[i]=c; c+=a.dur;}); })();

function getFictifLabel(elapsedMin){
  var RATIO = 18*24*60/210;
  var total = 8*60+7 + elapsedMin*RATIO;
  var day   = Math.min(1+Math.floor(total/(24*60)), 19);
  var tod   = total%(24*60);
  var hh    = String(Math.floor(tod/60)).padStart(2,'0');
  var mm    = String(Math.floor(tod%60)).padStart(2,'0');
  var days  = ['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'];
  return days[(1+Math.floor(total/(24*60)))%7]+' '+day+' sept.  '+hh+':'+mm;
}

// ── ErrorBoundary par fenêtre ─────────────────────────────────
var WinErrorBoundary = window.ErrorBoundary || (function(){
  class EB extends React.Component {
    constructor(p){super(p);this.state={err:null};}
    static getDerivedStateFromError(e){return {err:e};}
    render(){
      if(this.state.err) return (
        <div style={{padding:24,textAlign:'center',color:'var(--ink-mute)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:8}}>
          <div style={{fontSize:22}}>⚠️</div>
          <div style={{fontSize:12,fontWeight:600,color:'#c4420f'}}>Application indisponible</div>
          <div style={{fontSize:11,color:'var(--ink-faint)',maxWidth:280}}>{this.state.err.message}</div>
          <button onClick={()=>this.setState({err:null})} style={{padding:'5px 14px',background:'#0a7a6e',color:'white',border:'none',borderRadius:6,cursor:'pointer',fontSize:11,marginTop:4}}>Réessayer</button>
        </div>
      );
      return this.props.children;
    }
  }
  return EB;
})();

// ── Composant fenêtre individuelle ────────────────────────────
function Win({win,onFocus,onClose,onMin,onMove,onResize}){
  // Polling pour l'app — résout le cas où l'app s'enregistre tardivement
  var [App,setApp] = React.useState(function(){return (window.LUMIO_APPS||{})[win.app]||null;});
  var [unavail,setUnavail] = React.useState(false);

  React.useEffect(function(){
    if(App) return;
    var attempts=0;
    var id=setInterval(function(){
      attempts++;
      var a=(window.LUMIO_APPS||{})[win.app];
      if(a){ setApp(function(){return a;}); clearInterval(id); }
      else if(attempts>30){ clearInterval(id); setUnavail(true); } // 3s max
    },100);
    return function(){clearInterval(id);};
  },[win.app]);

  var onDragStart=function(e){
    if(win.max) return;
    onFocus(win.id);
    var sx=e.clientX,sy=e.clientY,wx=win.x,wy=win.y;
    var mv=function(ev){onMove(win.id,wx+ev.clientX-sx,Math.max(28,wy+ev.clientY-sy));};
    var up=function(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);};
    document.addEventListener('mousemove',mv);
    document.addEventListener('mouseup',up);
  };
  var onResizeStart=function(e){
    e.stopPropagation();e.preventDefault();onFocus(win.id);
    var sx=e.clientX,sy=e.clientY,sw=win.w,sh=win.h;
    var mv=function(ev){onResize(win.id,Math.max(360,sw+ev.clientX-sx),Math.max(280,sh+ev.clientY-sy));};
    var up=function(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);};
    document.addEventListener('mousemove',mv);
    document.addEventListener('mouseup',up);
  };

  var meta=APP_META[win.app]||{title:win.app};
  var style=win.max
    ?{left:0,top:28,width:'100%',height:'calc(100% - 28px - 76px)'}
    :{left:win.x,top:win.y,width:win.w,height:win.h};

  var tl=function(c){return {width:12,height:12,borderRadius:'50%',background:c,border:'none',padding:0,cursor:'pointer',boxShadow:'inset 0 0 0 0.5px rgba(0,0,0,0.2)',flexShrink:0};};

  return (
    <div onMouseDown={function(){onFocus(win.id);}} style={{position:'absolute',...style,background:'white',borderRadius:10,boxShadow:win.focused?'0 24px 60px rgba(20,24,36,0.32),0 6px 18px rgba(20,24,36,0.18),0 0 0 0.5px rgba(20,24,36,0.4)':'0 10px 24px rgba(20,24,36,0.18),0 0 0 0.5px rgba(20,24,36,0.3)',zIndex:win.z,display:win.min?'none':'flex',flexDirection:'column',overflow:'hidden',opacity:win.focused?1:0.97}}>
      <div onMouseDown={onDragStart} onDoubleClick={function(){onFocus(win.id,'toggleMax');}} style={{height:32,background:win.focused?'linear-gradient(180deg,#f4f2ee,#e8e6e0)':'#f0eee8',borderBottom:'1px solid rgba(20,24,36,0.12)',display:'flex',alignItems:'center',padding:'0 10px',flexShrink:0,cursor:'grab',userSelect:'none',gap:7}}>
        <button onClick={function(e){e.stopPropagation();onClose(win.id);}} style={tl('#fc615d')}/>
        <button onClick={function(e){e.stopPropagation();onMin(win.id);}} style={tl('#fdbc40')}/>
        <button onClick={function(e){e.stopPropagation();onFocus(win.id,'toggleMax');}} style={tl('#34c84a')}/>
        <div style={{flex:1,textAlign:'center',fontSize:12,fontWeight:600,color:win.focused?'var(--ink)':'var(--ink-mute)'}}>{meta.title}</div>
        <div style={{width:36}}/>
      </div>
      <div style={{flex:1,minHeight:0,position:'relative',overflow:'hidden'}}>
        <WinErrorBoundary>
          {unavail
            ? <div style={{padding:32,textAlign:'center',color:'var(--ink-mute)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:8}}><div style={{fontSize:22}}>⚠️</div><div style={{fontSize:12,fontWeight:600,color:'#c4420f'}}>Application indisponible</div><div style={{fontSize:11,color:'var(--ink-faint)'}}>Le composant "{win.app}" n'a pas pu se charger.</div></div>
            : App ? React.createElement(App,win.props||{}) : <div style={{padding:32,textAlign:'center',color:'var(--ink-faint)',fontSize:12,fontFamily:'var(--font-mono)'}}>Chargement…</div>
          }
        </WinErrorBoundary>
      </div>
      {!win.max&&<div onMouseDown={onResizeStart} style={{position:'absolute',right:0,bottom:0,width:16,height:16,cursor:'nwse-resize',background:'linear-gradient(135deg,transparent 50%,rgba(20,24,36,0.18) 50%)',zIndex:10}}/>}
    </div>
  );
}

// ── Menu bar ─────────────────────────────────────────────────
function MenuBar({activeApp,onLogout,timeLabel}){
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,height:28,background:'rgba(20,24,36,0.72)',backdropFilter:'blur(20px)',display:'flex',alignItems:'center',padding:'0 16px',zIndex:9000,userSelect:'none',gap:0}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <span style={{fontSize:14,color:'white'}}>🍎</span>
        <span style={{fontSize:12,fontWeight:700,color:'white'}}>{activeApp||'Finder'}</span>
        {['Fichier','Édition','Présentation','Fenêtre'].map(function(m){return <span key={m} style={{fontSize:12,color:'rgba(255,255,255,0.7)',cursor:'default',marginLeft:14}}>{m}</span>;})}
      </div>
      <div style={{flex:1}}/>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.6)',marginRight:16}}>IDF · Lumio Health</span>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.85)',marginRight:16}}>{timeLabel}</span>
      <button onClick={onLogout} style={{background:'none',border:'none',color:'rgba(255,255,255,0.55)',fontSize:11,cursor:'pointer'}}>⏻</button>
    </div>
  );
}

// ── PAC Timeline ─────────────────────────────────────────────
function Timeline({acteIdx,elapsed}){
  var a=ACTES[acteIdx]||ACTES[0];
  return (
    <div style={{position:'fixed',bottom:80,left:'50%',transform:'translateX(-50%)',zIndex:8000,pointerEvents:'none'}}>
      <div style={{background:'rgba(20,24,36,0.72)',backdropFilter:'blur(16px)',borderRadius:12,padding:'8px 14px',display:'flex',alignItems:'center',gap:10,border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display:'flex',gap:3}}>
          {ACTES.map(function(ac,i){
            var bg=i<acteIdx?'rgba(255,255,255,0.3)':i===acteIdx?ac.color:'rgba(255,255,255,0.1)';
            return <div key={i} style={{width:36,height:6,borderRadius:3,background:bg}}/>;
          })}
        </div>
        <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,0.7)',whiteSpace:'nowrap'}}>Acte {a.n} · {a.label}</span>
      </div>
    </div>
  );
}

// ── Demo Nav (flèches) ────────────────────────────────────────
function DemoNav({acteIdx,onPrev,onNext,flash}){
  var a=ACTES[acteIdx]||ACTES[0];
  var btnStyle=function(disabled){return {flex:1,padding:'7px',background:disabled?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,color:disabled?'rgba(255,255,255,0.2)':'white',fontSize:16,cursor:disabled?'not-allowed':'pointer',transition:'all 0.15s'};};
  return (
    <div style={{position:'fixed',bottom:90,left:16,zIndex:9800,display:'flex',flexDirection:'column',gap:6,width:240}}>
      {flash&&<div style={{background:'#0a7a6e',color:'white',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:6,fontFamily:'var(--font-mono)',textAlign:'center',animation:'fadeIn 0.2s ease'}}>Acte {a.n} — {a.label}</div>}
      <div style={{background:'rgba(20,24,36,0.88)',backdropFilter:'blur(16px)',borderRadius:12,padding:'10px 14px',border:'1px solid '+a.color+'44'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:a.color,flexShrink:0}}/>
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:a.color,letterSpacing:'.1em',textTransform:'uppercase'}}>Acte {a.n}</span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,0.3)'}}>{a.n}/{ACTES.length}</span>
        </div>
        <div style={{fontSize:12,fontWeight:600,color:'white',marginBottom:4}}>{a.label}</div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.5,marginBottom:8}}>{a.desc}</div>
        {a.tips.map(function(t,i){return <div key={i} style={{fontSize:10,color:'rgba(255,255,255,0.3)',fontFamily:'var(--font-mono)',marginBottom:2}}>→ {t}</div>;})}
      </div>
      <div style={{display:'flex',gap:6}}>
        <button onClick={onPrev} disabled={acteIdx===0} style={btnStyle(acteIdx===0)}>←</button>
        <div style={{display:'flex',alignItems:'center',gap:4,padding:'0 8px'}}>
          {ACTES.map(function(_,i){return <div key={i} style={{width:5,height:5,borderRadius:'50%',background:i===acteIdx?a.color:'rgba(255,255,255,0.2)',transition:'all 0.2s'}}/>;  })}
        </div>
        <button onClick={onNext} disabled={acteIdx===ACTES.length-1} style={btnStyle(acteIdx===ACTES.length-1)}>→</button>
      </div>
      <div style={{textAlign:'center',fontSize:9,color:'rgba(255,255,255,0.2)',fontFamily:'var(--font-mono)'}}>← → pour naviguer entre les actes</div>
    </div>
  );
}

// ── Dock ─────────────────────────────────────────────────────
function Dock({openApp,wins,livrableOk}){
  var items=[
    {app:'mail',icon:'✉️',label:'Mail'},
    {app:'slack',icon:'💬',label:'Slack'},
    {app:'browser',icon:'🌐',label:'Safari'},
    {app:'pdf',icon:'📄',label:'Aperçu'},
    {app:'voice',icon:'🎙',label:'Mémos'},
    {app:'notes',icon:'📝',label:'Notes'},
    {app:'finder',icon:'📁',label:'Finder'},
    {app:'calendar',icon:'📅',label:'Calendrier'},
    {app:'jefferson',icon:'🐰',label:'Jefferson'},
    null,
    {app:'livrable',icon:'✅',label:'Livrable',locked:!livrableOk},
    null,
    {app:'trash',icon:'🗑',label:'Corbeille'},
  ];
  return (
    <div style={{position:'fixed',bottom:8,left:'50%',transform:'translateX(-50%)',zIndex:9000}}>
      <div style={{background:'rgba(255,255,255,0.18)',backdropFilter:'blur(20px)',borderRadius:18,padding:'8px 14px',display:'flex',alignItems:'flex-end',gap:8,border:'1px solid rgba(255,255,255,0.25)',boxShadow:'0 8px 32px rgba(0,0,0,0.3)'}}>
        {items.map(function(item,i){
          if(!item) return <div key={i} style={{width:1,height:40,background:'rgba(255,255,255,0.2)',margin:'0 2px',alignSelf:'center'}}/>;
          var isOpen=wins.some(function(w){return w.app===item.app&&!w.min;});
          return (
            <div key={item.app} title={item.label} onClick={function(){if(!item.locked)openApp(item.app);}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:item.locked?'not-allowed':'pointer',opacity:item.locked?0.4:1}}>
              <div style={{fontSize:28,lineHeight:1,transition:'transform 0.1s'}} onMouseEnter={function(e){if(!item.locked)e.currentTarget.style.transform='scale(1.2) translateY(-4px)';}} onMouseLeave={function(e){e.currentTarget.style.transform='none';}}>{item.icon}</div>
              {isOpen&&<div style={{width:4,height:4,borderRadius:'50%',background:'rgba(255,255,255,0.7)'}}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────
function Notifs({list,onDismiss,onClick}){
  return (
    <div style={{position:'fixed',top:36,right:12,zIndex:9500,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
      {list.map(function(n){return (
        <div key={n.id} onClick={function(){onClick(n);}} style={{width:320,background:'rgba(30,34,45,0.92)',backdropFilter:'blur(20px)',borderRadius:12,padding:'12px 14px',display:'flex',gap:10,pointerEvents:'all',cursor:'pointer',animation:'slideInNotif 0.3s ease-out',border:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{width:32,height:32,borderRadius:8,background:n.color||'#0a7a6e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>{n.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.5)',marginBottom:2}}>{n.app}</div>
            <div style={{fontSize:12,fontWeight:700,color:'white',marginBottom:2}}>{n.title}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.65)',lineHeight:1.4,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{n.body}</div>
          </div>
          <button onClick={function(e){e.stopPropagation();onDismiss(n.id);}} style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:14,padding:0,alignSelf:'flex-start'}}>✕</button>
        </div>
      );})}
    </div>
  );
}

// ── Desktop principal ─────────────────────────────────────────
function Desktop({onLogout,studentName,timerStart}){
  if(timerStart&&!window.LUMIO_TIMER_START) window.LUMIO_TIMER_START=timerStart;
  if(!window.LUMIO_TIMER_START) window.LUMIO_TIMER_START=Date.now();

  var [wins,setWins]           = React.useState([]);
  var [zTop,setZTop]           = React.useState(100);
  var [notifs,setNotifs]       = React.useState([]);
  var [livrableOk,setLivrable] = React.useState(true); // démo : toujours débloqué
  var [acteIdx,setActeIdx]     = React.useState(0);
  var [elapsed,setElapsed]     = React.useState(0);
  var [timeLabel,setTimeLabel] = React.useState('');
  var [flash,setFlash]         = React.useState(false);
  var nSeq                     = React.useRef(0);

  // Timer
  React.useEffect(function(){
    var tick=function(){
      var start=window.LUMIO_TIMER_START||Date.now();
      var off=window.__DEMO_ELAPSED_OFFSET||0;
      var e=Math.min(Math.floor((Date.now()-start)/60000+off),TOTAL_MIN);
      setElapsed(e);
      setTimeLabel(getFictifLabel(e));
    };
    tick();
    var id=setInterval(tick,15000);
    return function(){clearInterval(id);};
  },[]);

  // Flèches clavier
  React.useEffect(function(){
    var handler=function(e){
      var tag=(document.activeElement||{}).tagName||'';
      if(tag==='INPUT'||tag==='TEXTAREA') return;
      if(e.key==='ArrowRight'){
        setActeIdx(function(prev){
          var next=Math.min(prev+1,ACTES.length-1);
          if(next!==prev) jumpTo(next);
          return next;
        });
      }
      if(e.key==='ArrowLeft'){
        setActeIdx(function(prev){
          var next=Math.max(prev-1,0);
          if(next!==prev) jumpTo(next);
          return next;
        });
      }
    };
    document.addEventListener('keydown',handler);
    return function(){document.removeEventListener('keydown',handler);};
  },[]);

  function jumpTo(idx){
    window.__DEMO_ELAPSED_OFFSET=_acteStart[idx];
    setElapsed(_acteStart[idx]);
    setTimeLabel(getFictifLabel(_acteStart[idx]));
    setFlash(true);
    setTimeout(function(){setFlash(false);},1200);
    setWins([]);
    // Ouvrir la bonne app selon l'acte
    var appMap={1:'mail',2:'voice',3:'slack',4:'livrable',5:'browser'};
    setTimeout(function(){openApp(appMap[idx+1]||'mail');},120);
    if(idx===4&&window.LUMIO_PORTFOLIO_DATA){
      setTimeout(function(){openApp('browser',{openPortfolio:true});},300);
    }
  }

  // Hooks inter-apps
  React.useEffect(function(){
    window.__onSlackExchange=function(c){if(c>=2)setLivrable(true);};
    return function(){window.__onSlackExchange=null;};
  },[]);

  // ── Wiring global : ouverture d'apps depuis n'importe quel composant ──
  // Finder (useWindows), bouton portfolio (__openPortfolio), notifications, etc.
  React.useEffect(function(){
    // Finder appelle window.useWindows().open(appId, props)
    window.useWindows = function(){ return { open: openApp }; };
    // Ouverture directe générique
    window.__openApp = openApp;
    // Bouton "Voir mon portfolio" : ouvre Safari sur l'onglet portfolio,
    // que le navigateur soit déjà ouvert ou non.
    window.__openPortfolio = function(){
      openApp('browser', { openPortfolio: true });
    };
    return function(){
      window.useWindows = null;
      window.__openApp = null;
      window.__openPortfolio = null;
    };
  },[wins,zTop]);

  // ── Horloge fictive globale (Calendrier, etc.) ──
  React.useEffect(function(){
    window.__getFictifTime = function(){
      var start = window.LUMIO_TIMER_START || Date.now();
      var off   = window.__DEMO_ELAPSED_OFFSET || 0;
      var elapsedMin = Math.min(Math.floor((Date.now()-start)/60000 + off), TOTAL_MIN);
      var RATIO = 18*24*60/TOTAL_MIN;
      var totalFictifMin = 8*60+7 + elapsedMin*RATIO;
      var day = Math.min(1 + Math.floor(totalFictifMin/(24*60)), 19);
      return { day: day, elapsedMin: elapsedMin };
    };
    return function(){ window.__getFictifTime = null; };
  },[]);

  function openApp(appId,props){
    if(!appId) return;
    props=props||{};
    var ex=wins.find(function(w){return w.app===appId;});
    if(ex){
      var hasProps=Object.keys(props).length>0;
      setWins(function(ws){return ws.map(function(w){
        if(w.id===ex.id) return {...w,min:false,focused:true,z:zTop+1,props:hasProps?{...(w.props||{}),...props,_n:Date.now()}:w.props};
        return {...w,focused:false};
      });});
      setZTop(zTop+1);
      return;
    }
    var meta=APP_META[appId];
    if(!meta) return;
    var newZ=zTop+1; setZTop(newZ);
    var vw=window.innerWidth,vh=window.innerHeight;
    var x=Math.max(20,Math.min(vw-meta.w-20,80+wins.length*24));
    var y=Math.max(36,Math.min(vh-meta.h-80,48+wins.length*20));
    setWins(function(ws){return [...ws.map(function(w){return {...w,focused:false};}),{id:appId+'_'+Date.now(),app:appId,x:x,y:y,w:meta.w,h:meta.h,z:newZ,focused:true,min:false,max:false,props:props}];});
  }

  function focusWin(id,action){
    setWins(function(ws){
      var newZ=zTop+1; setZTop(newZ);
      return ws.map(function(w){return w.id===id?{...w,focused:true,z:newZ,...(action==='toggleMax'?{max:!w.max}:{})}:{...w,focused:false};});
    });
  }
  function closeWin(id){setWins(function(ws){return ws.filter(function(w){return w.id!==id;});});}
  function minWin(id){setWins(function(ws){return ws.map(function(w){return w.id===id?{...w,min:true,focused:false}:w;});});}
  function moveWin(id,x,y){setWins(function(ws){return ws.map(function(w){return w.id===id?{...w,x:x,y:y}:w;});});}
  function resizeWin(id,ww,hh){setWins(function(ws){return ws.map(function(w){return w.id===id?{...w,w:ww,h:hh}:w;});});}

  // Notifications scénarisées
  React.useEffect(function(){
    function push(n){
      var id=++nSeq.current;
      setNotifs(function(ns){return [...ns,{id:id,...n}];});
      setTimeout(function(){setNotifs(function(ns){return ns.filter(function(x){return x.id!==id;});});},12000);
    }
    var timers=[
      setTimeout(function(){push({app:'Slack',icon:'CO',color:'#0a7a6e',title:'Camille Ott',body:"Le CRM n'est pas à jour. Écoute mon mémo vocal avant de regarder les chiffres.",click:{app:'voice'}});},8000),
      setTimeout(function(){push({app:'Salesforce',icon:'📊',color:'#0070d2',title:'Alerte compte',body:'Decathlon Pro — aucun contact depuis 136 jours.',click:{app:'pdf',props:{openDoc:'crm'}}});},50000),
      setTimeout(function(){push({app:'Slack',icon:'CO',color:'#0a7a6e',title:'Camille Ott',body:"L'appel d'offres Aesio sort en octobre. MDR obligatoire.",click:{app:'slack'}});},90000),
    ];
    return function(){timers.forEach(function(t){clearTimeout(t);});};
  },[]);

  var focusedWin=wins.find(function(w){return w.focused;});
  var activeTitle=focusedWin?(APP_META[focusedWin.app]||{title:focusedWin.app}).title:'Finder';

  return (
    <div style={{position:'fixed',inset:0,overflow:'hidden',userSelect:'none',background:'radial-gradient(ellipse at 30% 30%,#0d3d35 0%,transparent 60%),radial-gradient(ellipse at 75% 75%,#1a3a5c 0%,transparent 55%),linear-gradient(160deg,#0B2B2D 0%,#1a2a3a 100%)'}}>
      <MenuBar activeApp={activeTitle} onLogout={onLogout} timeLabel={timeLabel}/>

      {/* Icônes bureau */}
      <div style={{position:'fixed',top:48,right:16,zIndex:100,display:'flex',flexDirection:'column',gap:12}}>
        {[{app:'pdf',label:'Export CRM',icon:'📊',props:{openDoc:'crm'}},{app:'pdf',label:'Note budget',icon:'💰',props:{openDoc:'budget'}}].map(function(ic,i){return (
          <div key={i} onClick={function(){openApp(ic.app,ic.props);}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:'pointer',width:64}}>
            <div style={{fontSize:28}}>{ic.icon}</div>
            <div style={{fontSize:10,color:'white',textAlign:'center',textShadow:'0 1px 4px rgba(0,0,0,0.8)',lineHeight:1.3}}>{ic.label}</div>
          </div>
        );})}
      </div>

      {wins.map(function(w){return (
        <Win key={w.id} win={w} onFocus={focusWin} onClose={closeWin} onMin={minWin} onMove={moveWin} onResize={resizeWin}/>
      );})}

      <Dock openApp={openApp} wins={wins} livrableOk={livrableOk}/>
      <Timeline acteIdx={acteIdx} elapsed={elapsed}/>
      <DemoNav
        acteIdx={acteIdx} flash={flash}
        onPrev={function(){var n=Math.max(acteIdx-1,0);setActeIdx(n);jumpTo(n);}}
        onNext={function(){var n=Math.min(acteIdx+1,ACTES.length-1);setActeIdx(n);jumpTo(n);}}
      />
      <Notifs list={notifs} onDismiss={function(id){setNotifs(function(ns){return ns.filter(function(n){return n.id!==id;});});}} onClick={function(n){if(n.click)openApp(n.click.app,n.click.props||{});setNotifs(function(ns){return ns.filter(function(x){return x.id!==n.id;});});}}/>

      {/* Bouton aide */}
      <button onClick={function(){openApp('pdf',{openDoc:'guide'});}} title="Guide de mission" style={{position:'fixed',bottom:90,right:16,zIndex:9998,width:32,height:32,borderRadius:'50%',background:'rgba(255,255,255,0.15)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.3)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} onMouseEnter={function(e){e.currentTarget.style.background='rgba(10,122,110,0.8)';}} onMouseLeave={function(e){e.currentTarget.style.background='rgba(255,255,255,0.15)';}}>?</button>
    </div>
  );
}

window.LumioDesktop = Desktop;
