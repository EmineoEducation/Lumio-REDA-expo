// ══════════════════════════════════════════════════════════════
//  EXTRAS — BC01 REDA
//  Finder · Calendrier sept. 2026 · Corbeille + WhatsApp easter egg
// ══════════════════════════════════════════════════════════════

// ─── FINDER BC01 REDA ────────────────────────────────────────
function FinderApp({ openFolder }) {
  const { open } = window.useWindows ? window.useWindows() : { open: () => {} };
  const [folder, setFolder] = React.useState(openFolder || 'mission');

  const folders = {
    mission: {
      title: 'Mission IDF · BC01 REDA',
      items: [
        { name: 'Email de mission — Théo Marczak.eml', kind: 'mail', app: 'mail', props: { openId: 'brief' }, label: 'EML' },
        { name: 'Email terrain — Camille Ott.eml', kind: 'mail', app: 'mail', props: { openId: 'camille' }, label: 'EML' },
        { name: 'Export CRM IDF — Salesforce.pdf', kind: 'pdf', app: 'pdf', props: { openDoc: 'crm' }, label: 'PDF' },
        { name: 'Note budget prospection H2.pdf', kind: 'pdf', app: 'pdf', props: { openDoc: 'budget' }, label: 'PDF' },
        { name: 'Mémo vocal Camille — 11h22.m4a', kind: 'audio', app: 'voice', label: 'M4A' },
        { name: 'Fiche contexte Lumio IDF.pdf', kind: 'pdf', app: 'pdf', label: 'PDF' },
        { name: 'Revue de presse', kind: 'folder', folder: 'press' },
        { name: 'Portraits équipe', kind: 'folder', folder: 'portraits' },
      ]
    },
    press: {
      title: 'Revue de presse',
      items: [
        { name: 'Moodwork signe Generali IDF — Les Échos.html', kind: 'doc', app: 'browser', props: { openTab: 'article-moodwork' }, label: 'WEB' },
        { name: 'Wearables santé — Fausse Une Les Échos.html', kind: 'doc', app: 'browser', props: { openTab: 'fausse-une' }, label: 'WEB' },
      ]
    },
    portraits: {
      title: 'Portraits — équipe Lumio',
      items: [
        { name: 'Théo Marczak — CEO.html', kind: 'doc', app: 'browser', props: { openTab: 'lumio-site' }, label: 'WEB' },
        { name: 'Camille Ott — Resp. partenariats.html', kind: 'doc', app: 'browser', props: { openTab: 'lumio-site' }, label: 'WEB' },
        { name: 'Sonia Ferracci — Dir. Marketing.html', kind: 'doc', app: 'browser', props: { openTab: 'lumio-site' }, label: 'WEB' },
      ]
    }
  };

  const cur = folders[folder] || folders.mission;

  return (
    <div style={{ display: 'flex', height: '100%', background: 'white' }}>
      <div style={{ width: 180, flexShrink: 0, background: '#e8eaee', padding: '16px 0', borderRight: '1px solid var(--rule)' }}>
        <div style={{ padding: '0 16px', fontSize: 11, color: 'var(--ink-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Favoris</div>
        {[
          { key: 'mission', label: '📂 Mission IDF', indent: false },
          { key: 'press', label: '📂 Revue de presse', indent: true },
          { key: 'portraits', label: '👤 Portraits', indent: false },
        ].map(f => (
          <div key={f.key} onClick={() => setFolder(f.key)} style={{ padding: `4px ${f.indent ? '28px' : '16px'}`, fontSize: 13, color: folder === f.key ? 'white' : 'var(--ink-soft)', background: folder === f.key ? '#3a7bd5' : 'transparent', cursor: 'pointer' }}>{f.label}</div>
        ))}
        <div onClick={() => open('pdf', { openDoc: 'guide' })} style={{ padding: '4px 16px', fontSize: 13, color: '#1a6641', fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>❓ Guide de mission</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{cur.title}</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{cur.items.length} éléments</div>
        </div>
        <div style={{ flex: 1, padding: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 18, alignContent: 'start', overflowY: 'auto' }}>
          {cur.items.map((item, i) => (
            <div key={i} onClick={() => {
              if (item.kind === 'folder') setFolder(item.folder);
              else if (item.app) open(item.app, item.props || {});
            }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: 6, borderRadius: 4, gap: 6 }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {item.kind === 'folder'
                ? <window.FolderIcon size={52} />
                : <window.FileIcon size={52} kind={item.kind} label={item.label} />
              }
              <div style={{ fontSize: 10, textAlign: 'center', color: 'var(--ink-soft)', lineHeight: 1.3, wordBreak: 'break-word' }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.finder = FinderApp;

// ─── CALENDRIER — Septembre 2026 ─────────────────────────────
function CalendarApp() {
  const [currentDay, setCurrentDay] = React.useState(() => window.__getFictifTime ? window.__getFictifTime().day : 1);
  React.useEffect(() => {
    const id = setInterval(() => { if (window.__getFictifTime) setCurrentDay(window.__getFictifTime().day); }, 15000);
    return () => clearInterval(id);
  }, []);

  const deadlineDay = 19; // CODIR vendredi 19 sept.
  const daysLeft = Math.max(0, deadlineDay - currentDay);
  const startOffset = 1; // 1er sept 2026 = mardi → offset 1 (lundi=0)

  const events = {
    1:  [{ label: '1er jour · Prise de poste', color: '#0a7a6e', bg: 'rgba(10,122,110,0.12)', bold: true }],
    3:  [{ label: 'RDV Camille Ott · bilan terrain', color: '#0a7a6e', bg: 'rgba(10,122,110,0.1)' }],
    8:  [{ label: 'Point pipeline Théo', color: '#5c2d8f', bg: 'rgba(92,45,143,0.1)' }],
    10: [{ label: '⚠ Draft PAC attendu', color: '#c4420f', bg: 'rgba(196,66,15,0.1)', bold: true }],
    15: [{ label: 'Révision PAC · Camille', color: '#0a7a6e', bg: 'rgba(10,122,110,0.1)' }],
    19: [{ label: '⚑ CODIR · Remise PAC', color: '#fff', bg: '#c4420f', bold: true }],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white', overflow: 'hidden' }}>
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>Septembre 2026</div>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>Périmètre IDF · Mission en cours</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ textAlign: 'center', padding: '8px 16px', background: daysLeft <= 3 ? 'rgba(196,66,15,0.1)' : 'rgba(10,122,110,0.06)', borderRadius: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: daysLeft <= 3 ? '#c4420f' : '#0a7a6e', lineHeight: 1 }}>J−{daysLeft}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginTop: 2 }}>AVANT LE CODIR</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--rule)', padding: 1 }}>
          {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(d => (
            <div key={d} style={{ background: '#f4f2ee', padding: '6px 8px', fontSize: 11, fontWeight: 700, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{d}</div>
          ))}
          {Array.from({ length: startOffset }).map((_, i) => <div key={'e'+i} style={{ background: '#fafaf8', minHeight: 80 }} />)}
          {Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
            const isToday = d === currentDay;
            const isPast = d < currentDay;
            const dayEvents = events[d] || [];
            return (
              <div key={d} style={{ background: isPast ? '#fafaf8' : 'white', padding: '6px 8px', minHeight: 80, opacity: isPast ? 0.45 : 1, borderTop: isToday ? '3px solid #0a7a6e' : d === 19 ? '3px solid #c4420f' : '3px solid transparent' }}>
                <div style={{ width: isToday ? 22 : 'auto', height: isToday ? 22 : 'auto', borderRadius: isToday ? '50%' : 0, background: isToday ? '#0a7a6e' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: isToday || d === 19 ? 700 : 400, color: isToday ? 'white' : d === 19 ? '#c4420f' : 'var(--ink)', marginBottom: 4 }}>{d}</div>
                {dayEvents.map((ev, ei) => (
                  <div key={ei} style={{ padding: '2px 5px', borderRadius: 3, fontSize: 9.5, lineHeight: 1.35, background: ev.bg, color: ev.color, fontWeight: ev.bold ? 700 : 400, marginBottom: 2 }}>{ev.label}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '10px 22px', borderTop: '1px solid var(--rule)', background: '#fafaf8', fontSize: 11, color: 'var(--ink-mute)', fontStyle: 'italic', flexShrink: 0 }}>
        Théo attend un plan. Pas un audit. <strong style={{ color: 'var(--ink)', fontStyle: 'normal' }}>Un PAC défendable devant le CODIR.</strong>
      </div>
    </div>
  );
}
window.LUMIO_APPS.calendar = CalendarApp;

// ─── CORBEILLE + EASTER EGG WHATSAPP BC01 ────────────────────
function TrashApp() {
  const D = window.LUMIO_DATA;
  const [showWhatsapp, setShowWhatsapp] = React.useState(false);
  const msgs = D?.whatsapp?.messages || [];

  if (showWhatsapp) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0d1117', fontFamily: 'var(--font-sans)' }}>
      <div style={{ padding: '12px 16px', background: '#1a2436', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => setShowWhatsapp(false)} style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer', fontSize: 18, padding: 0, marginRight: 4 }}>←</button>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#5c2d8f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>TM</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Théo & Camille</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>WhatsApp · privé</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 9, color: '#25D366', fontFamily: 'var(--font-mono)', background: 'rgba(37,211,102,0.1)', padding: '2px 8px', borderRadius: 100 }}>🔒 Chiffré</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#0d1117' }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', marginBottom: 8 }}>
          ⚠ Conversation privée — trouvée en cache dans la corbeille
        </div>
        {msgs.map((m, i) => {
          const isTheo = m.from === 'Théo Marczak';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: isTheo ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', background: isTheo ? '#005c4b' : '#1f2c34', borderRadius: isTheo ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding: '8px 12px' }}>
                {!isTheo && <div style={{ fontSize: 10, fontWeight: 700, color: '#0a7a6e', marginBottom: 3 }}>{m.from}</div>}
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{m.text}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{m.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '10px 16px', background: '#1f2c34', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', textAlign: 'center' }}>
        Accord Darty Santé · 50 000 unités B2C · conditionné MDR · non annoncé en interne
      </div>
    </div>
  );

  return (
    <div style={{ padding: 40, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', color: 'var(--ink-mute)', textAlign: 'center' }}>
      <div style={{ opacity: 0.4, marginBottom: 20 }}>
        <window.TrashIcon size={80} />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)', marginBottom: 8 }}>La corbeille est vide.</div>
      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginBottom: 24, lineHeight: 1.6 }}>
        Ou presque. Il y a quelque chose dans le cache…
      </div>
      <div onClick={() => setShowWhatsapp(true)} style={{ padding: '8px 20px', background: '#25D366', color: 'white', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Voir le cache WhatsApp
      </div>
    </div>
  );
}
window.LUMIO_APPS.trash = TrashApp;
