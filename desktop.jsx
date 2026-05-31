// ══════════════════════════════════════════════════════════════
//  WINDOW MANAGER + DESKTOP + DOCK + MENU BAR — BC01 REDA
//  Timer fictif : lun. 1er sept → ven. 19 sept 2026 (18 jours)
//  Mode démo : navigation ← → entre actes
// ══════════════════════════════════════════════════════════════
const { useState: useWmState, useEffect: useWmEffect, useRef: useWmRef, useContext: useWmContext, createContext } = React;

const WindowsCtx = createContext(null);
window.useWindows = () => useWmContext(WindowsCtx);

// ─── App registry ───────────────────────────────────────────
const APP_META = {
  mail:      { title: 'Mail',                     w: 1000, h: 660 },
  browser:   { title: 'Safari',                   w: 1060, h: 700 },
  pdf:       { title: 'Aperçu',                   w:  860, h: 680 },
  voice:     { title: 'Mémos vocaux',             w:  760, h: 540 },
  notes:     { title: 'Notes',                    w:  860, h: 620 },
  slack:     { title: 'Slack — Lumio Health',     w:  960, h: 620 },
  finder:    { title: 'Finder',                   w:  800, h: 520 },
  trash:     { title: 'Corbeille',                w:  480, h: 340 },
  livrable:  { title: 'Livrable — BC01 REDA',     w:  900, h: 600 },
  jefferson: { title: 'Jefferson · Guide PAC',    w:  460, h: 540 },
};

// ─── Actes ───────────────────────────────────────────────────
const ACTES = [
  { n: 1, label: 'Premier jour',     dur: 20,  color: '#5c6878',
    desc: 'L\'étudiant entre dans l\'univers. Il lit les emails de Théo et de Camille, pose le contexte.',
    apps: ['mail'],
    tips: ['Mail → email de Théo', 'Mail → email de Camille'] },
  { n: 2, label: 'État du terrain',  dur: 30,  color: '#1b4f8a',
    desc: 'Confrontation chiffres CRM (6% churn) vs terrain réel (14%). Mémo vocal Camille. Article Moodwork.',
    apps: ['pdf', 'voice', 'browser'],
    tips: ['Mémos vocaux → Camille', 'Aperçu → Export CRM IDF', 'Safari → article Moodwork/Generali'] },
  { n: 3, label: 'Hypothèse',        dur: 45,  color: '#0a7a6e',
    desc: 'L\'étudiant formule son diagnostic à Camille sur Slack. Elle questionne sans valider. 2 échanges débloquent le Livrable.',
    apps: ['slack'],
    tips: ['Slack → DM Camille Ott', '2 échanges → Livrable débloqué'] },
  { n: 4, label: 'Production',       dur: 80,  color: '#c4420f',
    desc: 'Le livrable : C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC. Feedback Claude IA à la soumission.',
    apps: ['livrable'],
    tips: ['Livrable → C.1.1 Veille (120 mots min)', 'C.1.2 Diagnostic (180 mots min)', 'C.1.3 PAC (200 mots min)', 'Soumettre → feedback IA'] },
  { n: 5, label: 'Portfolio',        dur: 35,  color: '#0a7a6e',
    desc: 'Portfolio de compétences généré dynamiquement. Rend visible ce que le plan révèle — pas seulement ce qu\'il contient.',
    apps: ['browser'],
    tips: ['Safari → Portfolio de compétences', 'Visible / invisible par compétence', 'Signature de posture professionnelle'] },
];

// Temps cumulés par acte (en minutes réelles)
let _cur = 0;
const ACTES_BOUNDS = ACTES.map(a => { const s = _cur; _cur += a.dur; return { ...a, start: s, end: _cur }; });
const TOTAL = _cur; // 210 min

// ─── Timer fictif BC01 REDA ──────────────────────────────────
const FICTIF_START_MIN = 8 * 60 + 7;
const RATIO = 18 * 24 * 60 / (3 * 60 + 30);
const SEPT_DAYS = ['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'];

function getFictifTimeFromElapsed(elapsedMin) {
  const totalMin = FICTIF_START_MIN + elapsedMin * RATIO;
  const dayOffset = Math.floor(totalMin / (24 * 60));
  const day = Math.min(1 + dayOffset, 19);
  const minuteOfDay = totalMin % (24 * 60);
  const hh = Math.floor(minuteOfDay / 60).toString().padStart(2,'0');
  const mm = Math.floor(minuteOfDay % 60).toString().padStart(2,'0');
  const dow = SEPT_DAYS[(1 + dayOffset) % 7];
  return { label: `${dow} ${day} sept.  ${hh}:${mm}`, day };
}

function getFictifTime() {
  const startReal = window.LUMIO_TIMER_START || Date.now();
  const elapsedMin = (Date.now() - startReal) / 60000 + (window.__DEMO_ELAPSED_OFFSET || 0);
  return getFictifTimeFromElapsed(elapsedMin);
}
window.__getFictifTime = getFictifTime;

// ─── Win component ──────────────────────────────────────────
function Win({ win, onFocus, onClose, onMinimize, onMove, onResize }) {
  const onDragStart = (e) => {
    if (win.maximized) return;
    onFocus(win.id);
    const startX = e.clientX, startY = e.clientY;
    const startWX = win.x, startWY = win.y;
    const move = (ev) => onMove(win.id, startWX + ev.clientX - startX, Math.max(28, startWY + ev.clientY - startY));
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  const onResizeStart = (e) => {
    e.stopPropagation(); e.preventDefault();
    onFocus(win.id);
    const startX = e.clientX, startY = e.clientY;
    const startW = win.w, startH = win.h;
    const move = (ev) => onResize(win.id, Math.max(440, startW + ev.clientX - startX), Math.max(320, startH + ev.clientY - startY));
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  const meta = APP_META[win.app];
  const AppComp = (window.LUMIO_APPS || {})[win.app];
  const style = win.maximized
    ? { left: 0, top: 28, width: '100%', height: 'calc(100% - 28px - 76px)' }
    : { left: win.x, top: win.y, width: win.w, height: win.h };
  return (
    <div onMouseDown={() => onFocus(win.id)} style={{ position: 'absolute', ...style, background: 'white', borderRadius: 10, boxShadow: win.focused ? '0 24px 60px rgba(20,24,36,0.32), 0 6px 18px rgba(20,24,36,0.18), 0 0 0 0.5px rgba(20,24,36,0.4)' : '0 10px 24px rgba(20,24,36,0.18), 0 0 0 0.5px rgba(20,24,36,0.3)', zIndex: win.z, display: win.minimized ? 'none' : 'flex', flexDirection: 'column', overflow: 'hidden', opacity: win.focused ? 1 : 0.97, transition: 'opacity 120ms' }}>
      <div onMouseDown={onDragStart} onDoubleClick={() => onFocus(win.id, 'toggleMax')} style={{ height: 32, background: win.focused ? 'linear-gradient(180deg,#f4f2ee,#e8e6e0)' : '#f0eee8', borderBottom: '1px solid rgba(20,24,36,0.12)', display: 'flex', alignItems: 'center', padding: '0 10px', flexShrink: 0, cursor: 'grab', userSelect: 'none' }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <button onClick={(e) => { e.stopPropagation(); onClose(win.id); }} style={{ width:12,height:12,borderRadius:'50%',background:'#fc615d',border:'none',padding:0,cursor:'pointer',boxShadow:'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
          <button onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} style={{ width:12,height:12,borderRadius:'50%',background:'#fdbc40',border:'none',padding:0,cursor:'pointer',boxShadow:'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
          <button onClick={(e) => { e.stopPropagation(); onFocus(win.id, 'toggleMax'); }} style={{ width:12,height:12,borderRadius:'50%',background:'#34c84a',border:'none',padding:0,cursor:'pointer',boxShadow:'inset 0 0 0 0.5px rgba(0,0,0,0.2)' }} />
        </div>
        <div style={{ flex:1, textAlign:'center', fontSize:12, fontWeight:600, color: win.focused ? 'var(--ink)' : 'var(--ink-mute)' }}>{meta?.title || win.app}</div>
        <div style={{ width:60 }} />
      </div>
      <div style={{ flex:1, minHeight:0, position:'relative', overflow:'hidden' }}>
        {AppComp ? <AppComp {...(win.props || {})} /> : <div style={{ padding:40, color:'var(--ink-mute)' }}>Chargement…</div>}
      </div>
      {!win.maximized && <div onMouseDown={onResizeStart} style={{ position:'absolute',right:0,bottom:0,width:16,height:16,cursor:'nwse-resize',background:'linear-gradient(135deg,transparent 50%,rgba(20,24,36,0.18) 50%)',zIndex:10 }} />}
    </div>
  );
}

// ─── Menu Bar ────────────────────────────────────────────────
function MenuBar({ activeApp, openLogout, timeLabel }) {
  return (
    <div style={{ position:'fixed',top:0,left:0,right:0,height:28,background:'rgba(20,24,36,0.72)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',display:'flex',alignItems:'center',padding:'0 16px',zIndex:9000,userSelect:'none' }}>
      <div style={{ display:'flex',alignItems:'center',gap:20 }}>
        <span style={{ fontSize:14,color:'white' }}>🍎</span>
        <span style={{ fontSize:12,fontWeight:700,color:'white' }}>{activeApp || 'Finder'}</span>
        {['Fichier','Édition','Présentation','Fenêtre'].map(m => <span key={m} style={{ fontSize:12,color:'rgba(255,255,255,0.7)',cursor:'default' }}>{m}</span>)}
      </div>
      <div style={{ flex:1 }} />
      <div style={{ display:'flex',alignItems:'center',gap:16 }}>
        <span style={{ fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.6)' }}>IDF · Lumio Health</span>
        <span style={{ fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.85)' }}>{timeLabel}</span>
        <button onClick={openLogout} style={{ background:'none',border:'none',color:'rgba(255,255,255,0.6)',fontSize:11,cursor:'pointer',fontFamily:'var(--font-sans)' }}>⏻</button>
      </div>
    </div>
  );
}

// ─── Wallpaper ───────────────────────────────────────────────
function Wallpaper() {
  return <div style={{ position:'fixed',inset:0,zIndex:0,background:'radial-gradient(ellipse at 30% 30%, #0d3d35 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, #1a3a5c 0%, transparent 55%), linear-gradient(160deg, #0B2B2D 0%, #1a2a3a 100%)' }} />;
}

// ─── Demo Nav Overlay ─────────────────────────────────────────
// Affiché en bas à gauche. Navigation ← → entre actes.
function DemoNav({ acteIdx, onPrev, onNext, flash }) {
  const acte = ACTES[acteIdx];
  return (
    <div style={{ position:'fixed', bottom:90, left:16, zIndex:9800, display:'flex', flexDirection:'column', gap:6 }}>
      {/* Flash indicator */}
      {flash && (
        <div style={{ background: '#0a7a6e', color:'white', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:6, fontFamily:'var(--font-mono)', animation:'fadeIn 0.2s ease', textAlign:'center' }}>
          Acte {acte.n}
        </div>
      )}
      {/* Carte acte courant */}
      <div style={{ background:'rgba(20,24,36,0.88)', backdropFilter:'blur(16px)', borderRadius:12, padding:'10px 14px', border:`1px solid ${acte.color}44`, maxWidth:240, boxShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:acte.color,flexShrink:0 }} />
          <span style={{ fontFamily:'var(--font-mono)',fontSize:10,color:acte.color,letterSpacing:'0.1em',textTransform:'uppercase' }}>Acte {acte.n}</span>
          <span style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,0.3)' }}>{acte.dur} min</span>
        </div>
        <div style={{ fontSize:12,fontWeight:600,color:'white',marginBottom:4 }}>{acte.label}</div>
        <div style={{ fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.5,marginBottom:8 }}>{acte.desc}</div>
        {acte.tips.map((t,i) => (
          <div key={i} style={{ fontSize:10,color:'rgba(255,255,255,0.35)',fontFamily:'var(--font-mono)',marginBottom:2 }}>→ {t}</div>
        ))}
      </div>
      {/* Boutons nav */}
      <div style={{ display:'flex',gap:6 }}>
        <button onClick={onPrev} disabled={acteIdx === 0} style={{ flex:1,padding:'7px',background:acteIdx===0?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,color:acteIdx===0?'rgba(255,255,255,0.2)':'white',fontSize:16,cursor:acteIdx===0?'not-allowed':'pointer',fontFamily:'inherit',transition:'all 0.15s' }}>←</button>
        <div style={{ display:'flex',alignItems:'center',gap:4,padding:'0 8px' }}>
          {ACTES.map((_,i) => <div key={i} style={{ width:5,height:5,borderRadius:'50%',background:i===acteIdx?acte.color:'rgba(255,255,255,0.2)',transition:'all 0.2s' }} />)}
        </div>
        <button onClick={onNext} disabled={acteIdx === ACTES.length-1} style={{ flex:1,padding:'7px',background:acteIdx===ACTES.length-1?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,color:acteIdx===ACTES.length-1?'rgba(255,255,255,0.2)':'white',fontSize:16,cursor:acteIdx===ACTES.length-1?'not-allowed':'pointer',fontFamily:'inherit',transition:'all 0.15s' }}>→</button>
      </div>
      <div style={{ textAlign:'center',fontSize:9,color:'rgba(255,255,255,0.2)',fontFamily:'var(--font-mono)' }}>← → pour naviguer</div>
    </div>
  );
}

// ─── PAC Timeline ────────────────────────────────────────────
function PacTimeline({ acteIdx, elapsedMin }) {
  const currentActe = ACTES[acteIdx];
  const remaining = Math.max(0, TOTAL - elapsedMin);
  return (
    <div style={{ position:'fixed',bottom:80,left:'50%',transform:'translateX(-50%)',zIndex:8000 }}>
      <div style={{ background:'rgba(20,24,36,0.72)',backdropFilter:'blur(16px)',borderRadius:12,padding:'8px 14px',display:'flex',alignItems:'center',gap:10,border:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display:'flex',gap:3,alignItems:'center' }}>
          {ACTES_BOUNDS.map(a => (
            <div key={a.n} style={{ width:a.dur*1.4,height:6,borderRadius:3,background:elapsedMin>=a.end?'rgba(255,255,255,0.3)':elapsedMin>=a.start?a.color:'rgba(255,255,255,0.1)',transition:'background 0.4s' }} />
          ))}
        </div>
        <div style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,0.7)' }}>
          Acte {currentActe.n} · {remaining}min
        </div>
      </div>
    </div>
  );
}

// ─── Dock ────────────────────────────────────────────────────
function Dock({ openApp, openWindows, livrableUnlocked }) {
  const items = [
    { app:'mail',icon:'✉️',label:'Mail' },
    { app:'slack',icon:'💬',label:'Slack' },
    { app:'browser',icon:'🌐',label:'Safari' },
    { app:'pdf',icon:'📄',label:'Aperçu' },
    { app:'voice',icon:'🎙',label:'Mémos' },
    { app:'notes',icon:'📝',label:'Notes' },
    { app:'finder',icon:'📁',label:'Finder' },
    { app:'jefferson',icon:'🐰',label:'Jefferson' },
    null,
    { app:'livrable',icon:'✅',label:'Livrable',locked:!livrableUnlocked },
    null,
    { app:'trash',icon:'🗑',label:'Corbeille' },
  ];
  return (
    <div style={{ position:'fixed',bottom:8,left:'50%',transform:'translateX(-50%)',zIndex:9000 }}>
      <div style={{ background:'rgba(255,255,255,0.18)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderRadius:18,padding:'8px 14px',display:'flex',alignItems:'flex-end',gap:8,border:'1px solid rgba(255,255,255,0.25)',boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
        {items.map((item,i) => {
          if (!item) return <div key={i} style={{ width:1,height:40,background:'rgba(255,255,255,0.2)',margin:'0 2px',alignSelf:'center' }} />;
          const isOpen = openWindows.some(w => w.app===item.app && !w.minimized);
          return (
            <div key={item.app} title={item.label} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:item.locked?'not-allowed':'pointer',opacity:item.locked?0.4:1 }} onClick={() => !item.locked && openApp(item.app)}>
              <div style={{ fontSize:28,lineHeight:1,filter:item.locked?'grayscale(1)':'none',transition:'transform 0.1s' }} onMouseEnter={e=>!item.locked&&(e.currentTarget.style.transform='scale(1.2) translateY(-4px)')} onMouseLeave={e=>e.currentTarget.style.transform='none'}>{item.icon}</div>
              {isOpen && <div style={{ width:4,height:4,borderRadius:'50%',background:'rgba(255,255,255,0.7)' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop Icons ───────────────────────────────────────────
function DesktopIcons({ openApp }) {
  return (
    <div style={{ position:'fixed',top:48,right:16,zIndex:100,display:'flex',flexDirection:'column',gap:12 }}>
      {[
        { app:'pdf',label:'Export CRM IDF',icon:'📊',props:{openDoc:'crm'} },
        { app:'pdf',label:'Note budget',icon:'💰',props:{openDoc:'budget'} },
      ].map((ic,i) => (
        <div key={i} onClick={() => openApp(ic.app,ic.props||{})} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:'pointer',width:64 }}>
          <div style={{ fontSize:28 }}>{ic.icon}</div>
          <div style={{ fontSize:10,color:'white',textAlign:'center',textShadow:'0 1px 4px rgba(0,0,0,0.8)',lineHeight:1.3 }}>{ic.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Notification Stack ──────────────────────────────────────
function NotificationStack({ notifications, onDismiss, onClick }) {
  return (
    <div style={{ position:'fixed',top:36,right:12,zIndex:9500,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none' }}>
      {notifications.map(n => (
        <div key={n.id} onClick={() => onClick(n)} style={{ width:320,background:'rgba(30,34,45,0.92)',backdropFilter:'blur(20px)',borderRadius:12,padding:'12px 14px',display:'flex',gap:10,pointerEvents:'all',cursor:'pointer',animation:'slideInNotif 0.3s ease-out',border:'1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width:32,height:32,borderRadius:8,background:n.color||'#0a7a6e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0 }}>{n.icon}</div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.5)',marginBottom:2 }}>{n.app}</div>
            <div style={{ fontSize:12,fontWeight:700,color:'white',marginBottom:2 }}>{n.title}</div>
            <div style={{ fontSize:11,color:'rgba(255,255,255,0.65)',lineHeight:1.4,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' }}>{n.body}</div>
          </div>
          <button onClick={e=>{e.stopPropagation();onDismiss(n.id);}} style={{ background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:14,padding:0,alignSelf:'flex-start' }}>✕</button>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop (main) ──────────────────────────────────────────
function Desktop({ onLogout, studentName, timerStart }) {
  if (timerStart && !window.LUMIO_TIMER_START) window.LUMIO_TIMER_START = timerStart;
  if (!window.LUMIO_TIMER_START) window.LUMIO_TIMER_START = Date.now();

  const [windows, setWindows] = useWmState([]);
  const [zCounter, setZCounter] = useWmState(100);
  const [notifications, setNotifications] = useWmState([]);
  const [livrableUnlocked, setLivrableUnlocked] = useWmState(true); // démo : toujours débloqué
  const [acteIdx, setActeIdx] = useWmState(0);
  const [elapsedMin, setElapsedMin] = useWmState(0);
  const [timeLabel, setTimeLabel] = useWmState('');
  const [flash, setFlash] = useWmState(false);
  const notifSeqRef = useWmRef(0);

  // ── Timer réel + offset démo ──────────────────────────────
  useWmEffect(() => {
    const tick = () => {
      const start = window.LUMIO_TIMER_START || Date.now();
      const real = (Date.now() - start) / 60000;
      const offset = window.__DEMO_ELAPSED_OFFSET || 0;
      const total = real + offset;
      setElapsedMin(Math.min(Math.floor(total), TOTAL));
      setTimeLabel(getFictifTimeFromElapsed(total).label);
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  // ── Navigation clavier ← → ────────────────────────────────
  useWmEffect(() => {
    const handler = (e) => {
      // Ignorer si focus dans un champ de saisie
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight') {
        setActeIdx(prev => {
          const next = Math.min(prev + 1, ACTES.length - 1);
          if (next !== prev) jumpToActe(next);
          return next;
        });
      }
      if (e.key === 'ArrowLeft') {
        setActeIdx(prev => {
          const next = Math.max(prev - 1, 0);
          if (next !== prev) jumpToActe(next);
          return next;
        });
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // ── Jump vers un acte ─────────────────────────────────────
  const jumpToActe = (idx) => {
    const acte = ACTES_BOUNDS[idx];
    // Déplacer le timer fictif au début de cet acte
    window.__DEMO_ELAPSED_OFFSET = acte.start;
    const newElapsed = acte.start;
    setElapsedMin(newElapsed);
    setTimeLabel(getFictifTimeFromElapsed(newElapsed).label);

    // Flash indicator
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);

    // Fermer toutes les fenêtres + ouvrir l'app principale de l'acte
    setWindows([]);
    setTimeout(() => {
      const app = ACTES[idx].apps[0];
      if (app) openApp(app);
      // Acte 5 : ouvrir le portfolio si disponible
      if (idx === 4 && window.LUMIO_PORTFOLIO_DATA) {
        setTimeout(() => openApp('browser', { openPortfolio: true }), 300);
      }
    }, 100);
  };

  // ── Déblocage livrable ────────────────────────────────────
  useWmEffect(() => {
    window.__onSlackExchange = (count) => { if (count >= 2) setLivrableUnlocked(true); };
  }, []);

  // ── Open app ──────────────────────────────────────────────
  const openApp = (appId, props = {}) => {
    if (window.__onAppOpened) window.__onAppOpened(appId);
    const existing = windows.find(w => w.app === appId);
    if (existing) {
      if (existing.minimized) setWindows(ws => ws.map(w => w.id===existing.id ? {...w,minimized:false,focused:true,z:zCounter+1} : {...w,focused:false}));
      else focusWin(existing.id);
      return;
    }
    const meta = APP_META[appId];
    if (!meta) return;
    const newZ = zCounter + 1;
    setZCounter(newZ);
    const vw = window.innerWidth, vh = window.innerHeight;
    const x = Math.max(20, Math.min(vw-meta.w-20, 80+windows.length*24));
    const y = Math.max(36, Math.min(vh-meta.h-80, 48+windows.length*20));
    setWindows(ws => [...ws.map(w=>({...w,focused:false})), { id:`${appId}_${Date.now()}`,app:appId,x,y,w:meta.w,h:meta.h,z:newZ,focused:true,minimized:false,maximized:false,props }]);
  };

  const focusWin  = (id, action) => { setWindows(ws => { const z=zCounter+1; setZCounter(z); return ws.map(w=>w.id===id?{...w,focused:true,z,...(action==='toggleMax'?{maximized:!w.maximized}:{})}:{...w,focused:false}); }); };
  const closeWin  = (id) => setWindows(ws => ws.filter(w=>w.id!==id));
  const minimizeWin=(id) => setWindows(ws => ws.map(w=>w.id===id?{...w,minimized:true,focused:false}:w));
  const moveWin   = (id,x,y) => setWindows(ws => ws.map(w=>w.id===id?{...w,x,y}:w));
  const resizeWin = (id,w,h) => setWindows(ws => ws.map(win=>win.id===id?{...win,w,h}:win));

  // ── Notifications scénarisées ─────────────────────────────
  useWmEffect(() => {
    const events = [
      { t:8000,  n:{ app:'Slack',icon:'CO',color:'#0a7a6e',title:'Camille Ott',body:'Le CRM n\'est pas à jour. Écoute mon mémo vocal avant de regarder les chiffres 🙃',click:{app:'voice'} } },
      { t:50000, n:{ app:'Salesforce',icon:'📊',color:'#0070d2',title:'Alerte compte',body:'Decathlon Pro — aucun contact depuis 136 jours.',click:{app:'pdf',props:{openDoc:'crm'}} } },
      { t:90000, n:{ app:'Slack',icon:'CO',color:'#0a7a6e',title:'Camille Ott',body:'L\'appel d\'offres Aesio sort en octobre. MDR obligatoire. On ne pourra pas répondre.',click:{app:'slack'}} },
    ];
    const timers = events.map(ev => setTimeout(() => {
      const id = ++notifSeqRef.current;
      setNotifications(ns=>[...ns,{id,...ev.n}]);
      setTimeout(()=>setNotifications(ns=>ns.filter(n=>n.id!==id)),12000);
    }, ev.t));
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismissNotif = (id) => setNotifications(ns=>ns.filter(n=>n.id!==id));
  const clickNotif = (n) => { if(n.click) openApp(n.click.app,n.click.props||{}); dismissNotif(n.id); };
  const focusedWin = windows.find(w=>w.focused);
  const activeAppTitle = focusedWin ? (APP_META[focusedWin.app]?.title||focusedWin.app) : 'Finder';

  return (
    <WindowsCtx.Provider value={{ open: openApp }}>
      <div style={{ position:'fixed',inset:0,overflow:'hidden',userSelect:'none' }}>
        <Wallpaper />
        <MenuBar activeApp={activeAppTitle} openLogout={onLogout} timeLabel={timeLabel} />
        <DesktopIcons openApp={openApp} />
        {windows.map(w=>(
          <Win key={w.id} win={w} onFocus={focusWin} onClose={closeWin} onMinimize={minimizeWin} onMove={moveWin} onResize={resizeWin} />
        ))}
        <Dock openApp={openApp} openWindows={windows} livrableUnlocked={livrableUnlocked} />
        <PacTimeline acteIdx={acteIdx} elapsedMin={elapsedMin} />
        <DemoNav acteIdx={acteIdx} flash={flash}
          onPrev={() => { const next=Math.max(acteIdx-1,0); setActeIdx(next); jumpToActe(next); }}
          onNext={() => { const next=Math.min(acteIdx+1,ACTES.length-1); setActeIdx(next); jumpToActe(next); }}
        />
        <NotificationStack notifications={notifications} onDismiss={dismissNotif} onClick={clickNotif} />
        <button onClick={() => openApp('pdf',{openDoc:'guide'})} title="Guide de mission" style={{ position:'fixed',bottom:90,right:16,zIndex:9998,width:32,height:32,borderRadius:'50%',background:'rgba(255,255,255,0.15)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.3)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(10,122,110,0.8)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}>?</button>
      </div>
    </WindowsCtx.Provider>
  );
}

window.LumioDesktop = Desktop;
