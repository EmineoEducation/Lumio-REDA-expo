// ══════════════════════════════════════════════════════════════
//  MAIL APP — BC3 · Campagne qui déraille
// ══════════════════════════════════════════════════════════════
const { useState: useStateMail, useEffect: useEffectMail, useRef: useRefMail } = React;

function MailApp({ winId, openId }) {
  const D = window.LUMIO_DATA;

  // Build mailbox
  const inbox = [
    {
      id: 'brief',
      from: 'Sonia Ferracci',
      fromEmail: 'sonia@lumio-health.com',
      avatar: 'SF',
      avatarColor: '#c4420f',
      subject: 'Mission de pilotage campagne — urgent — confidentiel',
      date: '19/01/27 · 07:15',
      preview: 'Lou, Je te contacte en urgence. J\'ai besoin de toi aujourd\'hui…',
      unread: false,
      flagged: true,
      body: D.briefEmail.body,
      tags: ['URGENT', 'MISSION']
    },
    {
      id: 'theo',
      from: 'Théo Marczak',
      fromEmail: 'theo@lumio-health.com',
      avatar: 'TM',
      avatarColor: '#5c2d8f',
      subject: 'FWD : Réactions jury — Campagne Fantôme de Soi',
      date: '18/01/27 · 22:47',
      preview: 'Sonia, Je te transmets les retours du jury interne sur la campagne…',
      unread: false,
      forwarded: true,
      body: D.ceoEmail.body,
      tags: ['TRANSFÉRÉ', 'CONFIDENTIEL'],
      header: {
        from: D.ceoEmail.from,
        to: D.ceoEmail.to,
        cc: D.ceoEmail.cc,
        subject: D.ceoEmail.subject,
        date: D.ceoEmail.date
      }
    },
    {
      id: 'decathlon',
      from: 'Hélène Marchand',
      fromEmail: 'h.marchand@decathlon.com',
      avatar: 'HM',
      avatarColor: '#0055a5',
      subject: 'Retour sur votre campagne actuelle',
      date: '17/01/27 · 11:34',
      preview: 'Bonjour Sonia, Je me permets de vous écrire directement car nous avons une relation de confiance…',
      unread: true,
      flagged: true,
      body: D.decathlonEmail.body,
      tags: ['CLIENT', 'RISQUE'],
      header: {
        from: D.decathlonEmail.from,
        to: D.decathlonEmail.to,
        cc: D.decathlonEmail.cc,
        subject: D.decathlonEmail.subject,
        date: D.decathlonEmail.date
      }
    },
    // Emails distracteurs
    {
      id: 'd1', from: 'LinkedIn', fromEmail: 'no-reply@linkedin.com',
      avatar: 'in', avatarColor: '#0a66c2',
      subject: 'Yassine Morel a publié un post qui suscite des réactions',
      date: '15/01/27 · 14:22',
      preview: '87 personnes ont réagi au post de Yassine Morel. Fantôme de Soi — 4,2M d\'impressions…',
      unread: true, distractor: true,
      body: 'Yassine Morel a publié un post sur LinkedIn.\n\n87 likes · 14 partages en 6 heures.\n\n"Fiers de l\'impact de la campagne Fantôme de Soi — 4,2 millions d\'impressions en 8 semaines. La santé invisible prend de la visibilité 💙"\n\nVoir le post →'
    },
    {
      id: 'd2', from: 'Alter Scope', fromEmail: 'production@alterscope.fr',
      avatar: 'AS', avatarColor: '#1a3a5c',
      subject: 'BAT Forum Préventica — validation demandée',
      date: '12/01/27 · 16:40',
      preview: 'Suite à votre confirmation d\'inscription au Forum Préventica, nous avons préparé les BAT stand…',
      unread: false, distractor: true,
      body: 'Suite à votre confirmation d\'inscription au Forum Préventica 2027 (Lyon, 18-20 mars),\nnous avons préparé les BAT stand et documentation.\n\nDevis complémentaire pour habillage stand : 12 400 € HT.\n\nAttendons votre validation avant le 20 janvier.\n\nAlter Scope — Production'
    },
    {
      id: 'd3', from: 'URSSAF', fromEmail: 'no-reply@urssaf.fr',
      avatar: 'U', avatarColor: '#003671',
      subject: 'Échéance trimestrielle — déclaration à venir',
      date: '01/01/27 · 06:00',
      preview: 'Madame, Monsieur, Votre déclaration trimestrielle doit être effectuée avant le 31 janvier 2027…',
      unread: false, distractor: true,
      body: 'Madame, Monsieur,\n\nVotre déclaration trimestrielle doit être effectuée avant le 31 janvier 2027.\n\nCordialement, vos services URSSAF.'
    }
  ];

  // Injecter l'email bonus Camille si disponible
  const camilleEmail = window.LUMIO_DATA?._camilleEmail;
  const inboxFull = camilleEmail
    ? [inbox[0], inbox[1], inbox[2], camilleEmail, ...inbox.slice(3)]
    : inbox;

  const [selectedId, setSelectedId] = useStateMail(openId || 'brief');
  useEffectMail(() => { if (openId) setSelectedId(openId); }, [openId]);

  const [refresh, setRefresh] = useStateMail(0);
  useEffectMail(() => {
    const interval = setInterval(() => {
      if (window.LUMIO_DATA?._camilleEmail) setRefresh(r => r + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const selected = inboxFull.find(m => m.id === selectedId) || inboxFull[0];

  return (
    <div style={mailStyles.app}>
      <div style={mailStyles.sidebar} className="scroll">
        <div style={mailStyles.sbHead}>Boîtes</div>
        <div style={{...mailStyles.sbItem, ...mailStyles.sbActive}}>
          <span>📥</span><span>Réception</span>
          <span style={mailStyles.sbCount}>3</span>
        </div>
        <div style={mailStyles.sbItem}><span>⭐</span><span>Suivis</span></div>
        <div style={mailStyles.sbItem}><span>📤</span><span>Envoyés</span></div>
        <div style={mailStyles.sbItem}><span>📝</span><span>Brouillons</span></div>
        <div style={mailStyles.sbItem}><span>🗑</span><span>Corbeille</span></div>
        <div style={{...mailStyles.sbHead, marginTop: 16}}>Dossiers intelligents</div>
        <div style={mailStyles.sbItem}><span>🔴</span><span>Mission Lumio</span><span style={mailStyles.sbCount}>3</span></div>
      </div>

      <div style={mailStyles.list} className="scroll">
        <div style={mailStyles.listHead}>
          <div style={mailStyles.listHeadTitle}>Réception</div>
          <div style={mailStyles.listHeadSub}>{inboxFull.length} messages · {inboxFull.filter(m=>m.unread).length} non lus</div>
        </div>
        {inboxFull.map(m => (
          <div
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            style={{
              ...mailStyles.listRow,
              ...(selectedId === m.id ? mailStyles.listRowSelected : {}),
              ...(m.unread ? mailStyles.listRowUnread : {})
            }}>
            {m.unread && <div style={mailStyles.unreadDot} />}
            <div style={{ ...mailStyles.avatar, background: m.avatarColor }}>{m.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={mailStyles.rowTop}>
                <div style={mailStyles.rowFrom}>{m.from}</div>
                <div style={mailStyles.rowDate}>{m.date.split(' · ')[0]}</div>
              </div>
              <div style={mailStyles.rowSubj}>{m.subject}</div>
              <div style={mailStyles.rowPreview}>{m.preview}</div>
              {m.tags && (
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {m.tags.map((t, i) => (
                    <span key={i} style={mailStyles.tag}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={mailStyles.reader} className="scroll">
        <div style={mailStyles.readerToolbar}>
          <button style={mailStyles.tbBtn}>↩ Répondre</button>
          <button style={mailStyles.tbBtn}>↪ Transférer</button>
          <button style={mailStyles.tbBtn}>🗑</button>
          <button style={mailStyles.tbBtn}>⭐</button>
          <div style={{ flex: 1 }} />
          <button style={mailStyles.tbBtn}>⋯</button>
        </div>
        <div style={mailStyles.readerBody}>
          <h1 style={mailStyles.subjectLine}>{selected.subject}</h1>
          <div style={mailStyles.metaBlock}>
            <div style={{ display:'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ ...mailStyles.avatar, width: 36, height: 36, fontSize: 13, background: selected.avatarColor }}>{selected.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{selected.from} <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>&lt;{selected.fromEmail}&gt;</span></div>
                <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>À : {window.LUMIO_DATA?.student?.name || "Lou Bertrand"} · {selected.date}</div>
              </div>
            </div>
          </div>
          {selected.forwarded && (
            <div style={mailStyles.forwardBlock}>
              <div style={mailStyles.forwardLabel}>— Message d'origine transféré —</div>
              <div style={mailStyles.forwardMeta}>
                <div><strong>De :</strong> {selected.header.from}</div>
                <div><strong>À :</strong> {selected.header.to}</div>
                {selected.header.cc && <div><strong>Cc :</strong> {selected.header.cc}</div>}
                <div><strong>Date :</strong> {selected.header.date}</div>
              </div>
            </div>
          )}
          {selected.header && !selected.forwarded && (
            <div style={mailStyles.forwardBlock}>
              <div style={mailStyles.forwardMeta}>
                <div><strong>De :</strong> {selected.header.from}</div>
                <div><strong>À :</strong> {selected.header.to}</div>
                {selected.header.cc && <div><strong>Cc :</strong> {selected.header.cc}</div>}
                <div><strong>Date :</strong> {selected.header.date}</div>
              </div>
            </div>
          )}
          <div style={mailStyles.bodyText}>
            {selected.body.split('\n').map((line, i) => (
              <p key={i} style={{ margin: line.trim() === '' ? '0.6em 0' : '0 0 0.55em 0' }}>{line || '\u00A0'}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mailStyles = {
  app: { display: 'flex', height: '100%', background: '#fff', color: 'var(--ink)', overflow: 'hidden' },
  sidebar: {
    width: 200, flexShrink: 0,
    background: 'rgba(244,242,238,0.6)',
    borderRight: '1px solid var(--rule)',
    padding: '14px 0',
    fontSize: 13,
    overflowY: 'auto'
  },
  sbHead: { padding: '4px 16px', fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 },
  sbItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '5px 16px', fontSize: 13, color: 'var(--ink-soft)',
    cursor: 'pointer'
  },
  sbActive: { background: 'rgba(60, 100, 180, 0.18)', color: 'var(--ink)', fontWeight: 500 },
  sbCount: { marginLeft: 'auto', fontSize: 11, color: 'var(--ink-faint)' },
  list: {
    width: 320, flexShrink: 0,
    borderRight: '1px solid var(--rule)',
    background: '#fafaf8',
    overflowY: 'auto'
  },
  listHead: { padding: '14px 16px 10px', borderBottom: '1px solid var(--rule)', position: 'sticky', top: 0, background: '#fafaf8', zIndex: 2 },
  listHeadTitle: { fontSize: 17, fontWeight: 700, color: 'var(--ink)' },
  listHeadSub: { fontSize: 11, color: 'var(--ink-faint)', marginTop: 2 },
  listRow: {
    position: 'relative',
    display: 'flex', gap: 10,
    padding: '12px 16px 12px 22px',
    borderBottom: '1px solid var(--rule)',
    cursor: 'pointer'
  },
  listRowSelected: { background: 'rgba(60, 100, 180, 0.14)' },
  listRowUnread: { fontWeight: 600 },
  unreadDot: { position: 'absolute', left: 8, top: 18, width: 8, height: 8, borderRadius: '50%', background: '#3a7bd5' },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontSize: 11, fontWeight: 600,
    flexShrink: 0
  },
  rowTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  rowFrom: { fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  rowDate: { fontSize: 11, color: 'var(--ink-faint)', flexShrink: 0, marginLeft: 8, fontWeight: 400 },
  rowSubj: { fontSize: 12.5, color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 },
  rowPreview: { fontSize: 11.5, color: 'var(--ink-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 400, marginTop: 2 },
  tag: { fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: 'rgba(196,66,15,0.12)', color: 'var(--accent)', letterSpacing: '0.04em' },
  reader: { flex: 1, background: 'white', minWidth: 0, overflowY: 'auto', minHeight: 0 },
  readerToolbar: {
    display: 'flex', gap: 4, padding: '8px 14px',
    borderBottom: '1px solid var(--rule)',
    position: 'sticky', top: 0, background: 'white', zIndex: 2
  },
  tbBtn: {
    background: 'transparent', border: '1px solid var(--rule)',
    padding: '5px 12px', borderRadius: 5,
    fontSize: 12, color: 'var(--ink-soft)', cursor: 'pointer'
  },
  readerBody: { padding: '20px 28px 40px' },
  subjectLine: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 14 },
  metaBlock: { paddingBottom: 14, borderBottom: '1px solid var(--rule)' },
  forwardBlock: { borderLeft: '2px solid var(--ink-faint)', padding: '10px 14px', margin: '14px 0', background: 'rgba(20,24,36,0.03)', fontSize: 12 },
  forwardLabel: { fontSize: 10, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontWeight: 600 },
  forwardMeta: { color: 'var(--ink-soft)', lineHeight: 1.7 },
  bodyText: {
    marginTop: 18,
    fontFamily: 'var(--font-sans)',
    fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)'
  }
};

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.mail = MailApp;
