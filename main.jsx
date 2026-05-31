// ══════════════════════════════════════════════════════════════
//  ROOT APP — BC01 REDA · version simplifiée
//  Session : localStorage uniquement (pas de Redis)
//  Reload → desktop direct si nom déjà saisi
// ══════════════════════════════════════════════════════════════

const { useState, useEffect } = React;

const LS_NAME  = 'lumio_reda_name';
const LS_EMAIL = 'lumio_reda_email';
const LS_TIMER = 'lumio_reda_timer';

function patchData(name, email) {
  if (!window.LUMIO_DATA) return;
  window.LUMIO_DATA.student.name  = name;
  window.LUMIO_DATA.student.email = email || '';
  window.LUMIO_DATA.student.initial = (name[0] || '?').toUpperCase();
  const prenom = name.split(' ')[0];
  if (window.LUMIO_DATA.briefEmail)
    window.LUMIO_DATA.briefEmail.body =
      window.LUMIO_DATA.briefEmail.body.replace(/^Bonjour,/m, 'Bonjour ' + prenom + ',');
  if (window.LUMIO_DATA.camilleEmail)
    window.LUMIO_DATA.camilleEmail.body =
      window.LUMIO_DATA.camilleEmail.body.replace(/^Bonjour,/m, 'Bonjour ' + prenom + ',');
}

function NameScreen({ onDone }) {
  const [prenom, setPrenom] = useState('');
  const [nom,    setNom]    = useState('');
  const [email,  setEmail]  = useState('');
  const [err,    setErr]    = useState('');

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canGo = prenom.trim().length > 0 && validEmail;

  const go = () => {
    if (!prenom.trim()) { setErr('Prénom requis.'); return; }
    if (!validEmail)    { setErr('Email valide requis.'); return; }
    const full = [prenom.trim(), nom.trim()].filter(Boolean).join(' ');
    localStorage.setItem(LS_NAME,  full);
    localStorage.setItem(LS_EMAIL, email.trim().toLowerCase());
    patchData(full, email.trim().toLowerCase());
    onDone(full);
  };

  const inp = {
    padding: '10px 14px', border: '1.5px solid rgba(255,255,255,0.25)',
    borderRadius: 10, background: 'rgba(255,255,255,0.1)',
    color: 'white', fontSize: 14, outline: 'none', fontFamily: 'inherit', width: '100%'
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'radial-gradient(ellipse at 25% 25%, #0d5a4e 0%, transparent 55%), linear-gradient(160deg,#0B2B2D 0%,#1a2a3a 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', padding:'2rem' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.5, marginBottom:8 }}>PAC · Bach REDA · BC01</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:44, fontWeight:200, marginBottom:4 }}>Lumio Health</div>
      <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:17, opacity:0.5, marginBottom:36 }}>Un périmètre à reprendre</div>
      <div style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:14, padding:'28px 32px', width:'100%', maxWidth:420, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ fontSize:13, opacity:0.8, lineHeight:1.6, marginBottom:4, textAlign:'center' }}>
          Tu joues le rôle de <strong>Responsable commercial IDF</strong>.<br/>
          <span style={{ opacity:0.6 }}>Identifie-toi pour recevoir ton portfolio.</span>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <input value={prenom} onChange={e=>setPrenom(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Prénom *" autoFocus style={inp} />
          <input value={nom}    onChange={e=>setNom(e.target.value)}    onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Nom"      style={inp} />
        </div>
        <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr('');}} onKeyDown={e=>e.key==='Enter'&&go()} placeholder="Email école *" style={inp} />
        {err && <div style={{ fontSize:11, color:'#f5a623' }}>{err}</div>}
        <button onClick={go} style={{ padding:'11px', background:canGo?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.15)', color:canGo?'#0B2B2D':'rgba(255,255,255,0.3)', border:'none', borderRadius:10, fontSize:13, fontWeight:700, cursor:canGo?'pointer':'default', fontFamily:'inherit', marginTop:4 }}>
          Entrer dans l'affaire →
        </button>
      </div>
    </div>
  );
}

function IntroSlides({ name, onDone }) {
  const [i, setI] = useState(0);
  const slides = [
    { icon:'🏢', titre:'Lumio Health', corps:'Medtech parisienne fondée en 2018. Spécialiste des wearables de mesure du stress en entreprise. 180 clients B2B actifs en France.' },
    { icon:'📍', titre:'Ton périmètre — Île-de-France', corps:'47 comptes B2B actifs. CA récurrent 1,24 M€. Périmètre sans pilote depuis 6 mois. 3 comptes stratégiques en danger silencieux.' },
    { icon:'⚡', titre:'La tension principale', corps:'Moodwork vient d\'obtenir la certification MDR et signe des comptes en IDF. Lumio attend la sienne (Q2 2027). Budget prospection gelé à 8 000 € pour H2.' },
    { icon:'🎯', titre:'Ta mission', corps:'Théo Marczak te demande un plan d\'action commercial pour le CODIR du vendredi 19 septembre. 10 jours fictifs = 3h30 réelles. Commence par les emails.' },
  ];
  const s = slides[i];
  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(11,43,45,0.97)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:500, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:16, padding:'36px 40px', textAlign:'center', color:'white' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:28 }}>
          {slides.map((_,j)=><div key={j} onClick={()=>setI(j)} style={{ width:6, height:6, borderRadius:'50%', background:j===i?'#5DE298':'rgba(255,255,255,0.2)', cursor:'pointer', transition:'all 0.2s' }} />)}
        </div>
        <div style={{ fontSize:36, marginBottom:14 }}>{s.icon}</div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:500, marginBottom:12 }}>{s.titre}</div>
        <div style={{ fontSize:14, opacity:0.7, lineHeight:1.75, marginBottom:30 }}>{s.corps}</div>
        <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
          {i > 0 && <button onClick={()=>setI(i-1)} style={{ padding:'10px 20px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, color:'white', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>← Précédent</button>}
          {i < slides.length-1
            ? <button onClick={()=>setI(i+1)} style={{ padding:'10px 24px', background:'#0a7a6e', border:'none', borderRadius:8, color:'white', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Suivant →</button>
            : <button onClick={onDone} style={{ padding:'10px 28px', background:'#5DE298', border:'none', borderRadius:8, color:'#0B2B2D', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Commencer →</button>
          }
        </div>
      </div>
      <div style={{ marginTop:14, fontSize:11, color:'rgba(255,255,255,0.3)', fontFamily:'var(--font-mono)' }}>{name.split(' ')[0]} · Responsable commercial IDF</div>
    </div>
  );
}

function Brief({ name, onStart, onShowIntro }) {
  const [ok, setOk] = useState(false);
  const actes = [
    { n:'1', label:'Premier jour',  dur:'20 min', color:'#5c6878' },
    { n:'2', label:'État terrain',  dur:'30 min', color:'#1b4f8a' },
    { n:'3', label:'Hypothèse',     dur:'45 min', color:'#0a7a6e' },
    { n:'4', label:'Production',    dur:'1h20',   color:'#c4420f', bold:true },
    { n:'5', label:'Portfolio',     dur:'35 min', color:'#0a7a6e' },
  ];
  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(20,24,36,0.7)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', overflowY:'auto' }}>
      <div style={{ width:'100%', maxWidth:560, background:'white', borderRadius:14, padding:'30px 34px', boxShadow:'0 30px 80px rgba(0,0,0,0.4)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.25em', color:'#0a7a6e', textTransform:'uppercase', marginBottom:8 }}>PAC · Bach REDA · BC01</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:600, color:'var(--ink)', marginBottom:12 }}>Bienvenue, {name.split(' ')[0]}.</h1>
        <p style={{ fontSize:13, lineHeight:1.7, color:'var(--ink-soft)', marginBottom:14 }}>
          Tu es <strong>{name}</strong>, Responsable commercial IDF chez Lumio Health. Théo Marczak te demande un <strong>plan d'action commercial</strong> pour le CODIR du vendredi 19 septembre. <em>Budget : 8 000 €. Les vrais chiffres ne sont pas dans le CRM.</em>
        </p>
        <div style={{ background:'#0B2B2D', borderRadius:10, padding:'14px 18px', marginBottom:14 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:700, color:'white', marginBottom:10 }}>3h30 <span style={{ fontSize:13, fontWeight:400, opacity:0.6 }}>= 18 jours fictifs</span></div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
            {actes.map(a=>(
              <div key={a.n} style={{ flex:'1 1 70px', background:a.bold?a.color:'rgba(255,255,255,0.07)', border:'1px solid ' + (a.bold?'transparent':'rgba(255,255,255,0.1)'), borderRadius:7, padding:'7px 9px' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:8, color:'rgba(255,255,255,0.4)', marginBottom:2 }}>ACTE {a.n}</div>
                <div style={{ fontSize:10, color:a.bold?'white':'rgba(255,255,255,0.65)', fontWeight:a.bold?600:400, marginBottom:3 }}>{a.label}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:a.bold?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.4)', fontWeight:a.bold?700:400 }}>{a.dur}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:'#f7f4ef', borderRadius:8, padding:'12px 16px', marginBottom:14, display:'flex', flexDirection:'column', gap:8 }}>
          {[
            ['📄','Les vrais chiffres ne sont pas dans le CRM. Écoute le mémo vocal de Camille en premier.'],
            ['💬','Envoie tes hypothèses à Camille sur Slack. 2 échanges débloquent le Livrable.'],
            ['✅','Livrable : C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC. Portfolio généré à la soumission.'],
            ['⚠️','Personnages et entreprises entièrement fictifs. Ne pas tenter de les contacter.'],
          ].map(([ico,txt],j)=>(
            <div key={j} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ fontSize:15, flexShrink:0 }}>{ico}</span>
              <span style={{ fontSize:12, color:j===3?'#c4420f':'#2a2620', lineHeight:1.55, fontWeight:j===3?500:400 }}>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, cursor:'pointer' }} onClick={()=>setOk(v=>!v)}>
          <div style={{ width:18, height:18, borderRadius:4, flexShrink:0, border:ok?'none':'1.5px solid #0a7a6e', background:ok?'#0a7a6e':'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {ok && <span style={{ color:'white', fontSize:11, fontWeight:700 }}>✓</span>}
          </div>
          <span style={{ fontSize:12, color:'var(--ink-soft)' }}>J'ai lu les règles. Je comprends que les personnages sont fictifs.</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', gap:10 }}>
          <button onClick={()=>ok&&onShowIntro()} style={{ padding:'10px 18px', background:ok?'rgba(10,122,110,0.08)':'#f0ede6', color:ok?'#0a7a6e':'#9a9690', border:'1px solid ' + (ok?'#0a7a6e':'transparent'), borderRadius:8, fontSize:12, fontWeight:500, cursor:ok?'pointer':'default', fontFamily:'inherit' }}>
            Présentation Lumio →
          </button>
          <button onClick={()=>ok&&onStart()} style={{ padding:'10px 24px', background:ok?'#0B2B2D':'#d8d2c6', color:ok?'white':'#9a9690', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:ok?'pointer':'default', fontFamily:'inherit' }}>
            Commencer →
          </button>
        </div>
      </div>
    </div>
  );
}

function Lock({ name, onUnlock }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'radial-gradient(ellipse at 25% 25%, #0d5a4e 0%, transparent 55%), linear-gradient(160deg,#0B2B2D 0%,#1a2a3a 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18 }}>
      <div style={{ width:70, height:70, borderRadius:'50%', background:'#0a7a6e', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'white' }}>{(name[0]||'?').toUpperCase()}</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:22, color:'white', fontWeight:300 }}>{name}</div>
      <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'var(--font-mono)' }}>Responsable commercial IDF · Lumio Health</div>
      <button onClick={onUnlock} style={{ marginTop:8, padding:'10px 28px', background:'rgba(255,255,255,0.15)', border:'1.5px solid rgba(255,255,255,0.25)', borderRadius:24, color:'white', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
        Déverrouiller ↑
      </button>
    </div>
  );
}

function Root() {
  const savedName  = localStorage.getItem(LS_NAME)  || '';
  const savedEmail = localStorage.getItem(LS_EMAIL) || '';
  const savedTimer = localStorage.getItem(LS_TIMER);

  const [phase,      setPhase]      = useState(savedName ? 'lock' : 'name');
  const [name,       setName]       = useState(savedName);
  const [showBrief,  setShowBrief]  = useState(false);
  const [showIntro,  setShowIntro]  = useState(false);
  const [timerStart, setTimerStart] = useState(savedTimer ? parseInt(savedTimer) : null);

  useEffect(() => { if (savedName) patchData(savedName, savedEmail); }, []);

  const startTimer = () => {
    const ts = Date.now();
    localStorage.setItem(LS_TIMER, String(ts));
    window.LUMIO_TIMER_START = ts;
    setTimerStart(ts);
  };

  const handleName = (full) => { setName(full); setShowBrief(true); setPhase('brief'); };

  const handleUnlock = () => {
    if (!window.LUMIO_TIMER_START && timerStart) window.LUMIO_TIMER_START = timerStart;
    setPhase('desktop');
  };

  const handleStart = () => {
    startTimer();
    setShowBrief(false);
    setShowIntro(false);
    setPhase('desktop');
  };

  window.LUMIO_RESET = () => {
    [LS_NAME, LS_EMAIL, LS_TIMER].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <>
      {(phase === 'desktop' || phase === 'lock') && window.LumioDesktop &&
        <window.LumioDesktop onLogout={()=>setPhase('lock')} studentName={name} timerStart={timerStart} />
      }
      {phase === 'name'    && <NameScreen onDone={handleName} />}
      {phase === 'brief'   && showBrief && !showIntro && <Brief name={name} onStart={handleStart} onShowIntro={()=>setShowIntro(true)} />}
      {showIntro           && <IntroSlides name={name} onDone={handleStart} />}
      {phase === 'lock'    && <Lock name={name} onUnlock={handleUnlock} />}
    </>
  );
}

function waitAndRender(attempts) {
  if (attempts > 100) { console.error('LumioDesktop not found after 5s'); return; }
  if (window.LumioDesktop) {
    ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
  } else {
    setTimeout(() => waitAndRender(attempts + 1), 50);
  }
}
waitAndRender(0);
