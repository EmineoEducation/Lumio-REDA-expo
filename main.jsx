// ══════════════════════════════════════════════════════════════
//  ROOT — BC01 REDA v3
//  safeStorage wrapper, gardes LumioDesktop, ErrorBoundary global
// ══════════════════════════════════════════════════════════════

// ── safeStorage : wrapper localStorage avec fallback RAM ──────
var _mem = {};
var safeStorage = {
  get: function(k){ try{ return localStorage.getItem(k); }catch(e){ return _mem[k]||null; } },
  set: function(k,v){ try{ localStorage.setItem(k,v); }catch(e){ _mem[k]=v; } },
  remove: function(k){ try{ localStorage.removeItem(k); }catch(e){ delete _mem[k]; } }
};
window.safeStorage = safeStorage;

var LS_NAME  = 'lumio_reda_name';
var LS_EMAIL = 'lumio_reda_email';
var LS_TIMER = 'lumio_reda_timer';

function patchData(name, email){
  var D = window.LUMIO_DATA;
  if(!D) return;
  D.student = D.student || {};
  D.student.name  = name  || '';
  D.student.email = email || '';
  D.student.initial = name ? name[0].toUpperCase() : '?';
  var prenom = name ? name.split(' ')[0] : '';
  if(D.briefEmail && D.briefEmail.body)
    D.briefEmail.body = D.briefEmail.body.replace(/^Bonjour,/m,'Bonjour '+prenom+',');
  if(D.camilleEmail && D.camilleEmail.body)
    D.camilleEmail.body = D.camilleEmail.body.replace(/^Bonjour,/m,'Bonjour '+prenom+',');
}

// ── ErrorBoundary global ──────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state={error:null}; }
  static getDerivedStateFromError(e){ return {error:e}; }
  componentDidCatch(e,info){ console.error('[LUMIO ErrorBoundary]',e,info); }
  render(){
    if(this.state.error) return (
      <div style={{padding:32,background:'#fff8f8',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
        <div style={{fontSize:28}}>⚠️</div>
        <div style={{fontSize:14,fontWeight:600,color:'#c4420f'}}>{this.props.label||'Erreur'}</div>
        <div style={{fontSize:12,color:'#888',fontFamily:'var(--font-mono)',maxWidth:400,textAlign:'center'}}>{this.state.error.message}</div>
        <button onClick={()=>this.setState({error:null})} style={{padding:'7px 18px',background:'#0a7a6e',color:'white',border:'none',borderRadius:7,cursor:'pointer',fontSize:12}}>Réessayer</button>
      </div>
    );
    return this.props.children;
  }
}
window.ErrorBoundary = ErrorBoundary;

// ── Écran saisie nom ──────────────────────────────────────────
function NameScreen({onDone}){
  var S=React.useState, useE=React.useEffect;
  var [prenom,setP]=S(''), [nom,setN]=S(''), [email,setE]=S(''), [err,setErr]=S('');
  var validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  var canGo=prenom.trim().length>0&&validEmail;
  var go=function(){
    if(!prenom.trim()){setErr('Prénom requis.');return;}
    if(!validEmail){setErr('Email valide requis.');return;}
    var full=[prenom.trim(),nom.trim()].filter(Boolean).join(' ');
    safeStorage.set(LS_NAME,full);
    safeStorage.set(LS_EMAIL,email.trim().toLowerCase());
    patchData(full,email.trim().toLowerCase());
    onDone(full);
  };
  var inp={padding:'10px 14px',border:'1.5px solid rgba(255,255,255,0.25)',borderRadius:10,background:'rgba(255,255,255,0.1)',color:'white',fontSize:14,outline:'none',fontFamily:'inherit',width:'100%'};
  return (
    <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse at 25% 25%,#0d5a4e 0%,transparent 55%),linear-gradient(160deg,#0B2B2D 0%,#1a2a3a 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:'2rem'}}>
      <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'.3em',textTransform:'uppercase',opacity:.5,marginBottom:8}}>PAC · Bach REDA · BC01</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:44,fontWeight:200,marginBottom:4}}>Lumio Health</div>
      <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:17,opacity:.5,marginBottom:36}}>Un périmètre à reprendre</div>
      <div style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:14,padding:'28px 32px',width:'100%',maxWidth:420,display:'flex',flexDirection:'column',gap:12}}>
        <div style={{fontSize:13,opacity:.8,lineHeight:1.6,textAlign:'center'}}>Tu joues le rôle de <strong>Responsable commercial IDF</strong>.<br/><span style={{opacity:.6}}>Identifie-toi pour recevoir ton portfolio.</span></div>
        <div style={{display:'flex',gap:10}}>
          <input value={prenom} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Prénom *" autoFocus className="placeholder-dark" style={inp}/>
          <input value={nom} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Nom" className="placeholder-dark" style={inp}/>
        </div>
        <input type="email" value={email} onChange={e=>{setE(e.target.value);setErr('');}} onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Email école *" className="placeholder-dark" style={inp}/>
        {err&&<div style={{fontSize:11,color:'#f5a623'}}>{err}</div>}
        <button onClick={go} style={{padding:'11px',background:canGo?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.15)',color:canGo?'#0B2B2D':'rgba(255,255,255,0.3)',border:'none',borderRadius:10,fontSize:13,fontWeight:700,cursor:canGo?'pointer':'default',marginTop:4}}>Entrer dans l'affaire →</button>
      </div>
    </div>
  );
}

// ── Slides présentation Lumio ─────────────────────────────────
function IntroSlides({name,onDone}){
  var [i,setI]=React.useState(0);
  var slides=[
    {icon:'🏢',titre:'Lumio Health',corps:'Medtech parisienne fondée en 2018. Spécialiste des wearables de mesure du stress en entreprise. 180 clients B2B actifs en France.'},
    {icon:'📍',titre:'Ton périmètre — Île-de-France',corps:'47 comptes B2B actifs. CA récurrent 1,24 M€. Périmètre sans pilote depuis 6 mois. 3 comptes stratégiques en danger silencieux que le CRM ne révèle pas.'},
    {icon:'⚡',titre:'La tension principale',corps:"Moodwork vient d'obtenir la certification MDR et signe des comptes en IDF. Lumio attend la sienne (Q2 2027). Budget prospection gelé à 8 000 € pour H2."},
    {icon:'🎯',titre:'Ta mission',corps:"Théo Marczak te demande un plan d'action commercial pour le CODIR du vendredi 19 septembre. 10 jours fictifs = 3h30 réelles. Commence par les emails."},
  ];
  var s=slides[i];
  return (
    <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(11,43,45,0.97)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:500,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:16,padding:'36px 40px',textAlign:'center',color:'white'}}>
        <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:28}}>
          {slides.map(function(_,j){return <div key={j} onClick={function(){setI(j);}} style={{width:6,height:6,borderRadius:'50%',background:j===i?'#5DE298':'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.2s'}}/>;  })}
        </div>
        <div style={{fontSize:36,marginBottom:14}}>{s.icon}</div>
        <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:500,marginBottom:12}}>{s.titre}</div>
        <div style={{fontSize:14,opacity:.7,lineHeight:1.75,marginBottom:30}}>{s.corps}</div>
        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
          {i>0&&<button onClick={function(){setI(i-1);}} style={{padding:'10px 20px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,color:'white',fontSize:13,cursor:'pointer'}}>← Précédent</button>}
          {i<slides.length-1
            ?<button onClick={function(){setI(i+1);}} style={{padding:'10px 24px',background:'#0a7a6e',border:'none',borderRadius:8,color:'white',fontSize:13,fontWeight:600,cursor:'pointer'}}>Suivant →</button>
            :<button onClick={onDone} style={{padding:'10px 28px',background:'#5DE298',border:'none',borderRadius:8,color:'#0B2B2D',fontSize:13,fontWeight:700,cursor:'pointer'}}>Commencer →</button>
          }
        </div>
      </div>
      <div style={{marginTop:14,fontSize:11,color:'rgba(255,255,255,0.3)',fontFamily:'var(--font-mono)'}}>{(name||'').split(' ')[0]} · Responsable commercial IDF</div>
    </div>
  );
}

// ── Brief + CGU ───────────────────────────────────────────────
function Brief({name,onStart,onShowIntro}){
  var [ok,setOk]=React.useState(false);
  var actes=[
    {n:'1',label:'Premier jour',dur:'20 min',color:'#5c6878'},
    {n:'2',label:'État terrain',dur:'30 min',color:'#1b4f8a'},
    {n:'3',label:'Hypothèse',dur:'45 min',color:'#0a7a6e'},
    {n:'4',label:'Production',dur:'1h20',color:'#c4420f',bold:true},
    {n:'5',label:'Portfolio',dur:'35 min',color:'#0a7a6e'},
  ];
  var prenom=(name||'').split(' ')[0]||'';
  return (
    <div style={{position:'fixed',inset:0,zIndex:100,background:'rgba(20,24,36,0.7)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem',overflowY:'auto'}}>
      <div style={{width:'100%',maxWidth:560,background:'white',borderRadius:14,padding:'30px 34px',boxShadow:'0 30px 80px rgba(0,0,0,0.4)'}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.25em',color:'#0a7a6e',textTransform:'uppercase',marginBottom:8}}>PAC · Bach REDA · BC01</div>
        <h1 style={{fontFamily:'var(--font-display)',fontSize:26,fontWeight:600,color:'var(--ink)',marginBottom:12}}>Bienvenue, {prenom}.</h1>
        <p style={{fontSize:13,lineHeight:1.7,color:'var(--ink-soft)',marginBottom:14}}>Tu es <strong>{name}</strong>, Responsable commercial IDF chez Lumio Health. Théo Marczak te demande un <strong>plan d'action commercial</strong> pour le CODIR du vendredi 19 septembre. <em>Budget : 8 000 €. Les vrais chiffres ne sont pas dans le CRM.</em></p>
        <div style={{background:'#0B2B2D',borderRadius:10,padding:'14px 18px',marginBottom:14}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:22,fontWeight:700,color:'white',marginBottom:10}}>3h30 <span style={{fontSize:13,fontWeight:400,opacity:.6}}>= 18 jours fictifs</span></div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {actes.map(function(a){return (
              <div key={a.n} style={{flex:'1 1 70px',background:a.bold?a.color:'rgba(255,255,255,0.07)',border:'1px solid '+(a.bold?'transparent':'rgba(255,255,255,0.1)'),borderRadius:7,padding:'7px 9px'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:8,color:'rgba(255,255,255,0.4)',marginBottom:2}}>ACTE {a.n}</div>
                <div style={{fontSize:10,color:a.bold?'white':'rgba(255,255,255,0.65)',fontWeight:a.bold?600:400,marginBottom:3}}>{a.label}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:a.bold?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.4)',fontWeight:a.bold?700:400}}>{a.dur}</div>
              </div>
            );})}
          </div>
        </div>
        <div style={{background:'#f7f4ef',borderRadius:8,padding:'12px 16px',marginBottom:14,display:'flex',flexDirection:'column',gap:8}}>
          {[
            ['📄',"Les vrais chiffres ne sont pas dans le CRM. Écoute le mémo vocal de Camille en premier."],
            ['💬',"Envoie tes hypothèses à Camille sur Slack. 2 échanges débloquent le Livrable."],
            ['✅',"Livrable : C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC. Portfolio généré à la soumission."],
            ['⚠️',"Personnages et entreprises entièrement fictifs. Ne pas tenter de les contacter."],
          ].map(function(r,j){return (
            <div key={j} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{fontSize:15,flexShrink:0}}>{r[0]}</span>
              <span style={{fontSize:12,color:j===3?'#c4420f':'#2a2620',lineHeight:1.55,fontWeight:j===3?500:400}}>{r[1]}</span>
            </div>
          );})}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18,cursor:'pointer'}} onClick={function(){setOk(function(v){return !v;});}}>
          <div style={{width:18,height:18,borderRadius:4,flexShrink:0,border:ok?'none':'1.5px solid #0a7a6e',background:ok?'#0a7a6e':'transparent',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {ok&&<span style={{color:'white',fontSize:11,fontWeight:700}}>✓</span>}
          </div>
          <span style={{fontSize:12,color:'var(--ink-soft)'}}>J'ai lu les règles. Je comprends que les personnages sont fictifs.</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',gap:10}}>
          <button onClick={function(){if(ok)onShowIntro();}} style={{padding:'10px 18px',background:ok?'rgba(10,122,110,0.08)':'#f0ede6',color:ok?'#0a7a6e':'#9a9690',border:'1px solid '+(ok?'#0a7a6e':'transparent'),borderRadius:8,fontSize:12,fontWeight:500,cursor:ok?'pointer':'default'}}>Présentation Lumio →</button>
          <button onClick={function(){if(ok)onStart();}} style={{padding:'10px 24px',background:ok?'#0B2B2D':'#d8d2c6',color:ok?'white':'#9a9690',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:ok?'pointer':'default'}}>Commencer →</button>
        </div>
      </div>
    </div>
  );
}

// ── Verrou ────────────────────────────────────────────────────
function Lock({name,onUnlock}){
  var initial=(name&&name[0])?name[0].toUpperCase():'?';
  return (
    <div style={{position:'fixed',inset:0,zIndex:300,background:'radial-gradient(ellipse at 25% 25%,#0d5a4e 0%,transparent 55%),linear-gradient(160deg,#0B2B2D 0%,#1a2a3a 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18}}>
      <div style={{width:70,height:70,borderRadius:'50%',background:'#0a7a6e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:700,color:'white'}}>{initial}</div>
      <div style={{fontFamily:'var(--font-display)',fontSize:22,color:'white',fontWeight:300}}>{name||''}</div>
      <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',fontFamily:'var(--font-mono)'}}>Responsable commercial IDF · Lumio Health</div>
      <button onClick={onUnlock} style={{marginTop:8,padding:'10px 28px',background:'rgba(255,255,255,0.15)',border:'1.5px solid rgba(255,255,255,0.25)',borderRadius:24,color:'white',fontSize:13,cursor:'pointer'}}>Déverrouiller ↑</button>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
function Root(){
  var savedName  = safeStorage.get(LS_NAME)  || '';
  var savedEmail = safeStorage.get(LS_EMAIL) || '';
  var savedTimer = safeStorage.get(LS_TIMER);

  var [phase,setPhase]           = React.useState(savedName ? 'lock' : 'name');
  var [name,setName]             = React.useState(savedName);
  var [showBrief,setShowBrief]   = React.useState(false);
  var [showIntro,setShowIntro]   = React.useState(false);
  var [timerStart,setTimerStart] = React.useState(savedTimer ? parseInt(savedTimer,10) : null);
  var [desktopErr,setDesktopErr] = React.useState(false);

  // Patcher les données au démarrage si nom connu
  React.useEffect(function(){
    if(savedName) patchData(savedName, savedEmail);
  },[]);

  // Garde : vérifier que LumioDesktop est disponible avec timeout
  React.useEffect(function(){
    if(phase!=='desktop'&&phase!=='lock') return;
    var t=setTimeout(function(){
      if(!window.LumioDesktop) setDesktopErr(true);
    },5000);
    return function(){clearTimeout(t);};
  },[phase]);

  function startTimer(){
    var ts=Date.now();
    safeStorage.set(LS_TIMER,String(ts));
    window.LUMIO_TIMER_START=ts;
    setTimerStart(ts);
  }

  function handleName(full){
    setName(full);
    setShowBrief(true);
    setPhase('brief');
  }

  function handleUnlock(){
    if(!window.LUMIO_TIMER_START&&timerStart) window.LUMIO_TIMER_START=timerStart;
    setPhase('desktop');
  }

  function handleStart(){
    startTimer();
    setShowBrief(false);
    setShowIntro(false);
    setPhase('desktop');
  }

  window.LUMIO_RESET=function(){
    safeStorage.remove(LS_NAME);
    safeStorage.remove(LS_EMAIL);
    safeStorage.remove(LS_TIMER);
    window.location.reload();
  };

  // Écran erreur desktop
  if(desktopErr) return (
    <div style={{position:'fixed',inset:0,background:'#0B2B2D',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,color:'white',padding:40}}>
      <div style={{fontSize:32}}>⚠️</div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:14,color:'#ff6b6b'}}>Échec de chargement du bureau</div>
      <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'center',maxWidth:400}}>LumioDesktop n'a pas pu s'initialiser. Vérifiez la console pour les détails.</div>
      <button onClick={function(){location.reload();}} style={{padding:'9px 22px',background:'#0a7a6e',border:'none',color:'white',borderRadius:8,cursor:'pointer',fontSize:13}}>Recharger</button>
    </div>
  );

  var Desktop = window.LumioDesktop;

  return (
    <ErrorBoundary label="Bureau Lumio">
      {(phase==='desktop'||phase==='lock') && Desktop &&
        <Desktop onLogout={function(){setPhase('lock');}} studentName={name} timerStart={timerStart}/>
      }
      {phase==='name'  && <NameScreen onDone={handleName}/>}
      {phase==='brief' && showBrief && !showIntro && <Brief name={name} onStart={handleStart} onShowIntro={function(){setShowIntro(true);}}/>}
      {showIntro       && <IntroSlides name={name} onDone={handleStart}/>}
      {phase==='lock'  && <Lock name={name} onUnlock={handleUnlock}/>}
    </ErrorBoundary>
  );
}

// Attendre que tout soit prêt avant de monter React
(function waitDesktop(attempts){
  if(attempts>120){ console.error('[LUMIO] LumioDesktop jamais chargé'); return; }
  if(window.LumioDesktop){
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Root));
  } else {
    setTimeout(function(){waitDesktop(attempts+1);},50);
  }
})(0);
