// ══════════════════════════════════════════════════════════════
//  LOGIN SCREEN + ROOT APP — BC01 REDA
//  PAC · Parcours Activation Compétences · Éminéo
// ══════════════════════════════════════════════════════════════
const { useState: useRootState, useEffect: useRootEffect } = React;

// ─── Session backend ─────────────────────────────────────────
function makeSessionId(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = Math.imul(31, h) + name.charCodeAt(i) | 0;
  return 'reda_bc01_' + Math.abs(h).toString(36);
}
async function apiSession(method, id, data) {
  try {
    if (method === 'GET') {
      const r = await fetch(`/api/session?id=${encodeURIComponent(id)}`);
      if (r.status === 404) return null;
      return (await r.json()).session || null;
    }
    const opts = { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, session: data }) };
    if (method === 'DELETE') opts.body = JSON.stringify({ id });
    await fetch('/api/session', opts);
  } catch(e) { console.warn('Session error:', e); }
  return null;
}
window.LUMIO_SESSION = {
  save: (id, data) => apiSession('POST', id, data),
  load: (id) => apiSession('GET', id),
  clear: (id) => apiSession('DELETE', id),
};

// ─── Name Screen ─────────────────────────────────────────────
function NameScreen({ onConfirm }) {
  const [prenom, setPrenom] = useRootState('');
  const [nom, setNom] = useRootState('');
  const [email, setEmail] = useRootState('');
  const [shake, setShake] = useRootState(false);
  const [emailError, setEmailError] = useRootState('');

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const confirm = () => {
    setEmailError('');
    if (!prenom.trim()) { setShake(true); setTimeout(() => setShake(false), 500); return; }
    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Un email valide est requis.');
      setShake(true); setTimeout(() => setShake(false), 500); return;
    }
    const full = `${prenom.trim()}${nom.trim() ? ' ' + nom.trim() : ''}`;
    window.LUMIO_DATA.student.name = full;
    window.LUMIO_DATA.student.email = email.trim().toLowerCase();
    window.LUMIO_DATA.student.initial = prenom.trim()[0].toUpperCase();
    onConfirm(full, email.trim().toLowerCase());
  };

  const inputStyle = (filled) => ({
    width: '100%', padding: '10px 14px',
    border: filled ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid rgba(255,255,255,0.2)',
    borderRadius: 10, background: 'rgba(255,255,255,0.12)',
    color: 'white', fontSize: 14, outline: 'none', transition: 'border-color .2s'
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 25% 25%, #0d5a4e 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #1a3a5c 0%, transparent 55%), linear-gradient(160deg, #0B2B2D 0%, #1a2a3a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>PAC · Bach REDA · BC01</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 200, letterSpacing: '-0.02em', marginBottom: 6, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>Lumio Health</div>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, opacity: 0.6, marginBottom: 40 }}>Un périmètre à reprendre</div>

      <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: '32px 36px', width: '100%', maxWidth: 440, textAlign: 'center', animation: shake ? 'shake 0.4s ease' : 'none' }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 22, lineHeight: 1.6 }}>
          Tu vas entrer dans cette affaire en tant que<br/>
          <strong>Responsable commercial Île-de-France</strong>.<br/>
          <span style={{ opacity: 0.6 }}>Identifie-toi pour recevoir ton portfolio de compétences.</span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <input value={prenom} onChange={e => setPrenom(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirm()} placeholder="Prénom *" autoFocus className="placeholder-dark" style={inputStyle(prenom.trim())} />
          <input value={nom} onChange={e => setNom(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirm()} placeholder="Nom" className="placeholder-dark" style={inputStyle(nom.trim())} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(''); }} onKeyDown={e => e.key === 'Enter' && confirm()} placeholder="Email école" className="placeholder-dark" style={{ ...inputStyle(isValidEmail(email)), width: '100%' }} />
          {emailError && <div style={{ fontSize: 11, color: '#f5a623', marginTop: 4 }}>{emailError}</div>}
        </div>
        <button onClick={confirm} style={{ width: '100%', padding: '11px', background: prenom.trim() ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)', color: prenom.trim() ? '#0B2B2D' : 'rgba(255,255,255,0.4)', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: prenom.trim() ? 'pointer' : 'default', transition: 'all .2s', fontFamily: 'inherit' }}>
          Entrer dans l'affaire →
        </button>
      </div>
    </div>
  );
}

// ─── Login (écran de veille) ──────────────────────────────────
function LoginScreen({ onLogin, studentName }) {
  const [stage, setStage] = useRootState('idle');
  const initial = window.LUMIO_DATA?.student?.initial || studentName?.[0]?.toUpperCase() || '?';

  const onUnlock = () => {
    if (stage === 'unlocking') return;
    setStage('unlocking');
    setTimeout(() => onLogin(), 1200);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 11000, background: 'radial-gradient(ellipse at 25% 25%, #0d5a4e 0%, transparent 55%), linear-gradient(160deg, #0B2B2D 0%, #1a2a3a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, animation: 'fadeIn 0.5s ease' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#0a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'white', boxShadow: '0 0 40px rgba(10,122,110,0.3)' }}>{initial}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', fontWeight: 300 }}>{studentName}</div>
      <div style={{ fontSize: 11, opacity: 0.5, color: 'white', fontFamily: 'var(--font-mono)' }}>Responsable commercial IDF · Lumio Health</div>
      <div style={{ position: 'relative', marginTop: 8 }}>
        <input onKeyDown={e => e.key === 'Enter' && onUnlock()} placeholder="Déverrouiller" className="placeholder-dark" style={{ width: 260, padding: '10px 48px 10px 16px', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 22, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'white', fontSize: 14, textAlign: 'center', outline: 'none' }} />
        <button onClick={onUnlock} style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14 }}>↑</button>
      </div>
      {stage === 'unlocking' && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Déverrouillage…</div>}
    </div>
  );
}

// ─── Welcome Brief ────────────────────────────────────────────
function WelcomeBriefCard({ onClose, studentName }) {
  const prenom = studentName.split(' ')[0];
  const [accepted, setAccepted] = useRootState(false);
  const cfg = window.PASS_CONFIG;

  const actes = [
    { n: '1', label: 'Premier jour', dur: '20 min', color: '#5c6878' },
    { n: '2', label: 'État du terrain', dur: '30 min', color: '#1b4f8a' },
    { n: '3', label: 'Hypothèse', dur: '45 min', color: '#0a7a6e' },
    { n: '4', label: 'Production', dur: '1h20', color: '#c4420f', bold: true },
    { n: '5', label: 'Recul', dur: '35 min', color: '#5c6878' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 12000, background: 'rgba(20,24,36,0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto', animation: 'fadeIn 400ms ease-out' }}>
      <div style={{ width: '100%', maxWidth: 580, background: 'white', borderRadius: 14, padding: '32px 36px', boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: '#0a7a6e', textTransform: 'uppercase', marginBottom: 10 }}>PAC · Bach REDA · BC01</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15, marginBottom: 14 }}>
          Bienvenue, {prenom}.
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 10 }}>
          Tu es <strong>{studentName}</strong>, Responsable commercial IDF chez Lumio Health. Premier jour. Théo Marczak te demande un <strong>plan d'action commercial complet</strong> pour le CODIR de vendredi 19 septembre. Tu as accès au CRM, aux emails, aux verbatims terrain. <em>Le budget est de 8 000 €. Les vrais chiffres ne sont pas dans le CRM.</em>
        </p>

        {/* Timeline actes */}
        <div style={{ background: '#0B2B2D', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'white' }}>3h30</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>=</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>18 jours dans l'univers Lumio (lun. 1→ven. 19 sept. 2026)</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {actes.map(a => (
              <div key={a.n} style={{ flex: '1 1 80px', background: a.bold ? a.color : 'rgba(255,255,255,0.07)', border: `1px solid ${a.bold ? 'transparent' : 'rgba(255,255,255,0.1)'}`, borderRadius: 7, padding: '8px 10px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 3 }}>ACTE {a.n}</div>
                <div style={{ fontSize: 11, color: a.bold ? 'white' : 'rgba(255,255,255,0.65)', fontWeight: a.bold ? 600 : 400, lineHeight: 1.3, marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: a.bold ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', fontWeight: a.bold ? 700 : 400 }}>{a.dur}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>⏱ L'horloge tourne dès que tu cliques sur "Commencer".</div>
        </div>

        {/* Règles */}
        <div style={{ background: '#f7f4ef', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Trois règles</div>
          {[
            { ico: '📄', txt: 'Les vrais chiffres ne sont pas dans le CRM. Écoute Camille avant de regarder Salesforce.' },
            { ico: '💬', txt: 'Envoie tes hypothèses à Camille sur Slack. Elle ne te dira pas si c\'est juste — elle te poussera dans tes retranchements.' },
            { ico: '✅', txt: 'Après 2 échanges Slack, le Livrable se débloque. C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC.' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{r.ico}</span>
              <span style={{ fontSize: 13, color: '#2a2620', lineHeight: 1.55 }}>{r.txt}</span>
            </div>
          ))}
        </div>

        {/* Checkbox + bouton */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, cursor: 'pointer' }} onClick={() => setAccepted(a => !a)}>
          <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, border: accepted ? 'none' : '1.5px solid #0a7a6e', background: accepted ? '#0a7a6e' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
            {accepted && <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4 }}>J'ai lu les règles. Je suis prêt·e à entrer dans l'affaire.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => accepted && onClose()} style={{ padding: '11px 26px', background: accepted ? '#0B2B2D' : '#d8d2c6', color: accepted ? 'white' : '#9a9690', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: accepted ? 'pointer' : 'default', transition: 'all .2s', fontFamily: 'inherit' }}>
            Commencer l'affaire →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────
function Root() {
  const [phase, setPhase] = useRootState('loading');
  const [studentName, setStudentName] = useRootState('');
  const [showLogin, setShowLogin] = useRootState(false);
  const [sessionId, setSessionId] = useRootState(null);
  const [timerStart, setTimerStart] = useRootState(null);

  useRootEffect(() => {
    const savedId = localStorage.getItem('lumio_reda_bc01_sid');
    if (!savedId) { setPhase('name'); return; }
    window.LUMIO_SESSION.load(savedId).then(session => {
      if (!session || !session.studentName) { setPhase('name'); return; }
      const n = session.studentName;
      setStudentName(n);
      setSessionId(savedId);
      if (session.timerStart) setTimerStart(session.timerStart);
      window.LUMIO_DATA.student.name = n;
      if (session.studentEmail) window.LUMIO_DATA.student.email = session.studentEmail;
      // Patcher les emails avec le prénom
      const prenom = n.split(' ')[0];
      window.LUMIO_DATA.briefEmail.body = window.LUMIO_DATA.briefEmail.body.replace(/^Bonjour,/m, `Bonjour ${prenom},`);
      setPhase('desktop');
    });
  }, []);

  const handleNameConfirm = (name, studentEmail) => {
    const sid = makeSessionId(name + Date.now());
    localStorage.setItem('lumio_reda_bc01_sid', sid);
    setSessionId(sid);
    setStudentName(name);
    window.LUMIO_DATA.student.name = name;
    window.LUMIO_DATA.student.email = studentEmail;
    const prenom = name.split(' ')[0];
    window.LUMIO_DATA.briefEmail.body = window.LUMIO_DATA.briefEmail.body.replace(/^Bonjour,/m, `Bonjour ${prenom},`);
    window.LUMIO_DATA.camilleEmail.body = window.LUMIO_DATA.camilleEmail.body.replace(/^Bonjour,/m, `Bonjour ${prenom},`);
    window.LUMIO_SESSION.save(sid, { studentName: name, studentEmail, phase: 'login' });
    setShowLogin(true);
    setPhase('login');
  };

  const handleLogin = () => {
    setShowLogin(false);
    window.LUMIO_SESSION.save(sessionId, { phase: 'brief' });
    setTimeout(() => setPhase('brief'), 200);
  };

  const dismissBrief = () => {
    const ts = Date.now();
    setTimerStart(ts);
    window.LUMIO_TIMER_START = ts;
    window.LUMIO_SESSION.save(sessionId, { phase: 'desktop', timerStart: ts });
    setPhase('desktop');
  };

  const logout = () => { window.LUMIO_SESSION.save(sessionId, { phase: 'login' }); setPhase('login'); setShowLogin(true); };

  const resetSession = () => {
    if (sessionId) window.LUMIO_SESSION.clear(sessionId);
    localStorage.removeItem('lumio_reda_bc01_sid');
    window.location.reload();
  };
  window.LUMIO_RESET = resetSession;

  if (phase === 'loading') return (
    <div style={{ position: 'fixed', inset: 0, background: '#0B2B2D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>RESTAURATION SESSION…</div>
    </div>
  );

  return (
    <>
      {phase === 'name' && <NameScreen onConfirm={handleNameConfirm} />}
      {phase === 'desktop' && <window.LumioDesktop onLogout={logout} studentName={studentName} timerStart={timerStart} />}
      {phase === 'brief' && <WelcomeBriefCard onClose={dismissBrief} studentName={studentName} />}
      {showLogin && phase !== 'name' && <LoginScreen onLogin={handleLogin} studentName={studentName} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
