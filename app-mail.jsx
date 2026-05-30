// ══════════════════════════════════════════════════════════════
//  MAIL APP — BC01 REDA
//  Boîte mail : Théo Marczak (mission) + Camille Ott (brief terrain)
// ══════════════════════════════════════════════════════════════
const { useState: useStateMail, useEffect: useEffectMail, useRef: useRefMail } = React;

function MailApp({ winId, openId }) {
  const D = window.LUMIO_DATA;

  const inbox = [
    {
      id: 'brief',
      from: 'Théo Marczak',
      fromEmail: 'theo@lumio-health.com',
      avatar: 'TM', avatarColor: '#5c2d8f',
      subject: 'Bienvenue — et première mission',
      date: '01/09/26 · 08:07',
      preview: 'Je vais être direct — c\'est ma façon de fonctionner. Le périmètre IDF est en souffrance…',
      unread: false, flagged: true,
      body: D.briefEmail.body,
      tags: ['URGENT', 'MISSION']
    },
    {
      id: 'camille',
      from: 'Camille Ott',
      fromEmail: 'c.ott@lumio-health.com',
      avatar: 'CO', avatarColor: '#0a7a6e',
      subject: 'Ce que j\'attends de toi — et ce que le CRM ne te dira pas',
      date: '01/09/26 · 09:44',
      preview: 'Bonjour, Théo m\'a dit que tu commences aujourd\'hui. Je vais aller droit au but…',
      unread: true, flagged: true,
      body: D.camilleEmail.body,
      tags: ['TERRAIN', 'CONFIDENTIEL']
    },
    // Distracteurs
    {
      id: 'd1', from: 'LinkedIn', fromEmail: 'no-reply@linkedin.com',
      avatar: 'in', avatarColor: '#0a66c2',
      subject: 'Vous avez 3 nouvelles opportunités en Île-de-France',
      date: '31/08/26 · 18:00',
      preview: 'Responsable Commercial IDF · MedTech · Avec·Soin…',
      unread: true, distractor: true,
      body: 'Nouvelles offres pour votre profil : Responsable Commercial IDF · MedTech · Avec·Soin — Paris.'
    },
    {
      id: 'd2', from: 'Salesforce', fromEmail: 'noreply@salesforce.com',
      avatar: 'SF', avatarColor: '#0070d2',
      subject: 'Rapport hebdo CRM — périmètre IDF · Semaine 35',
      date: '30/08/26 · 07:00',
      preview: 'Votre rapport automatique : 47 comptes · 8 opportunités ouvertes…',
      unread: false, distractor: true,
      body: 'Rapport hebdomadaire CRM — Périmètre IDF\nSemaine 35 · 26 août 2026\n\n47 comptes actifs\n8 opportunités ouvertes\nValeur pipeline : 180 000 €\n\nDernière mise à jour : 30/08/2026'
    },
    {
      id: 'd3', from: 'Espace RH', fromEmail: 'rh@lumio-health.com',
      avatar: 'RH', avatarColor: '#8a6eaf',
      subject: 'Dossier d\'intégration — Documents à retourner avant vendredi',
      date: '29/08/26 · 14:22',
      preview: 'Bienvenue chez Lumio Health ! Merci de retourner les documents suivants…',
      unread: false, distractor: true,
      body: 'Bienvenue chez Lumio Health !\n\nMerci de retourner avant vendredi :\n→ Contrat signé\n→ RIB\n→ Copie carte d\'identité\n→ Formulaire mutuelle\n\nCordialement, l\'équipe RH.'
    }
  ];

  const [selected, setSelected] = useStateMail(openId || 'brief');
  const [readIds, setReadIds] = useStateMail(new Set(['brief', 'd2', 'd3']));
  const mail = inbox.find(m => m.id === selected) || inbox[0];

  const markRead = (id) => setReadIds(s => new Set([...s, id]));

  const unreadCount = inbox.filter(m => !m.distractor && !readIds.has(m.id)).length;

  return (
    <div style={{ height: '100%', display: 'flex', background: '#f4f2ee', fontFamily: 'var(--font-sans)' }}>

      {/* Sidebar */}
      <div style={{ width: 260, borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', background: '#eceae4' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Boîte de réception</div>
          {unreadCount > 0 && <div style={{ fontSize: 10, color: '#0a7a6e', fontFamily: 'var(--font-mono)' }}>{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</div>}
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {inbox.map(m => {
            const isUnread = !readIds.has(m.id);
            const isActive = selected === m.id;
            return (
              <div
                key={m.id}
                onClick={() => { setSelected(m.id); markRead(m.id); }}
                style={{
                  padding: '10px 14px',
                  background: isActive ? 'rgba(10,122,110,0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #0a7a6e' : '3px solid transparent',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(20,24,36,0.06)',
                  opacity: m.distractor ? 0.65 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: isUnread ? 700 : 500, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    {isUnread && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0a7a6e', flexShrink: 0, display: 'inline-block' }} />}
                    {m.from}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{m.date}</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: isUnread ? 600 : 400, color: 'var(--ink-soft)', marginBottom: 2 }}>{m.subject}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{m.preview}</div>
                {m.tags && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: '#0a7a6e', background: 'rgba(10,122,110,0.1)', padding: '1px 6px', borderRadius: 100 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mail body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {mail && (
          <>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--rule)', background: 'white', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 10 }}>{mail.subject}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: mail.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{mail.avatar}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{mail.from} <span style={{ fontWeight: 400, color: 'var(--ink-mute)' }}>{'<'}{mail.fromEmail}{'>'}</span></div>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>À : {D.student.email || 'vous'} · {mail.date}</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: 'white' }}>
              <pre style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-wrap', margin: 0 }}>{mail.body}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.mail = MailApp;
