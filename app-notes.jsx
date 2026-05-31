// ══════════════════════════════════════════════════════════════
//  NOTES APP — BC3 · Notes personnelles + contexte Lumio
// ══════════════════════════════════════════════════════════════

function NotesApp({ openNote }) {
  const D = window.LUMIO_DATA;
  const notes = [
    {
      id: 'contexte',
      title: 'Fiche contexte — Lumio Health',
      date: 'Mise à jour jan. 2027',
      preview: 'Lumio Health est une medtech parisienne fondée en 2018…',
      body: 'LUMIO HEALTH — FICHE CONTEXTE\n\nFondée en 2018 par Théo Marczak. Wearable de mesure du stress chronique (variabilité cardiaque + capteurs cutanés). 180 clients B2B facturés — DRH, médecins du travail, mutuelles. CA 2026 estimé : 3,2 M€.\n\nFonds Northgate Capital (Jakob Rein) — entrée jan. 2025. Pousse vers un pivot B2C d\'ici 36 mois.\n\nÉquipe marketing : Sonia Ferracci (DirMkt, arrivée jan. 2026), Yassine Morel (Content Manager), Camille Ott (Partenariats B2B).\n\nCampagne en cours : "Fantôme de Soi" — agence Alter Scope. Lancée nov. 2026. En crise depuis jan. 2027.'
    },
    {
      id: 'chrono',
      title: 'Chronologie de la crise — à reconstituer',
      date: 'jan. 2027',
      preview: 'À compléter au fil de ta lecture…',
      body: '[ Zone de prise de notes libre ]\n\nChronologie à reconstituer :\n\n15 oct. 2026 — Brief Alter Scope\n2 nov. — Lancement sans validation juridique claim\n3 nov. — Ajout YouTube pre-roll (+22K€)\n15 nov. — Extension Lyon (+11K€)\n1er déc. — Inscription Préventica (+19K€)\n14 jan. 2027 — Post LinkedIn Yassine non validé\n17 jan. — Email Decathlon\n18 jan. 22h47 — Mail confidentiel Théo\n19 jan. 07h15 — Mission Sonia'
    },
    {
      id: 'd1', title: 'Notes perso', date: '19 jan. 2027',
      preview: 'Prendre de la distance — noter ce qu\'on voit…',
      distractor: false,
      body: '[ Zone libre — utilisez cet espace pour vos notes de travail ]'
    },
    {
      id: 'd2', title: 'Liste courses', date: '18 jan. 2027',
      preview: 'Pain, café, batteries AA…',
      distractor: true,
      body: '— Pain\n— Café (il n\'en reste plus)\n— Batteries AA\n— Appeler le plombier\n— Renouveler abonnement Spotify'
    }
  ];

  const [selectedId, setSelectedId] = React.useState(openNote || 'contexte');
  const note = notes.find(n => n.id === selectedId) || notes[0];

  return (
    <div style={notesStyles.app}>
      <div style={notesStyles.sidebar} className="scroll">
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Toutes les notes</div>
        </div>
        {notes.map(n => (
          <div
            key={n.id}
            onClick={() => setSelectedId(n.id)}
            style={{ ...notesStyles.row, ...(selectedId === n.id ? notesStyles.rowActive : {}) }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{n.title}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 500 }}>{n.date}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.preview}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={notesStyles.editor} className="scroll">
        <div style={{ padding: '8px 28px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--ink-faint)' }}>
          <span>Aa</span><span>•</span><span>—</span><span>𝐁 𝑰 𝑈̲</span><span>· · ·</span>
          <div style={{ flex: 1 }} />
          <span>{note.date}</span>
        </div>
        <div style={{ padding: '24px 32px', fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.8, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, marginBottom: 10 }}>{note.title}</h1>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 20 }}>{note.date}</div>
          {note.body}
        </div>
      </div>
    </div>
  );
}

function TheoNoteRender({ data }) {
  return (
    <div style={{ padding: '28px 36px', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', color: '#c4420f', textTransform: 'uppercase', marginBottom: 12 }}>{data.tag} — {data.author}</div>
      <h1 style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 4 }}>{data.title}</h1>
      <div style={{ fontSize: 12, color: 'var(--ink-mute)', borderBottom: '1px solid var(--rule)', paddingBottom: 14, marginBottom: 20 }}>
        {data.author} · {data.date}
      </div>
      <div style={{ background: '#fff8d8', border: '1px solid #c4420f', padding: '10px 14px', borderRadius: 4, fontSize: 12, color: '#5a3010', lineHeight: 1.55, marginBottom: 20, fontFamily: 'var(--font-sans)' }}>
        ⚠ Ce document n'est pas destiné à être partagé. Il a été mis dans votre espace par Sonia — « à vous de juger comment l'utiliser ».
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-wrap' }}>
        {data.body}
      </div>
    </div>
  );
}

function ContexteNoteRender({ data }) {
  return (
    <div style={{ padding: '28px 36px', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', color: '#1b3a6b', textTransform: 'uppercase', marginBottom: 12 }}>FICHE CONTEXTE — Lumio Health</div>
      <h1 style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.15, marginBottom: 4 }}>{data.title}</h1>
      <div style={{ fontSize: 12, color: 'var(--ink-mute)', borderBottom: '1px solid var(--rule)', paddingBottom: 14, marginBottom: 20 }}>{data.subtitle}</div>
      <div style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-wrap' }}>
        {data.body}
      </div>
    </div>
  );
}

const notesStyles = {
  app: { display: 'flex', height: '100%', background: 'white', overflow: 'hidden' },
  sidebar: { width: 240, flexShrink: 0, borderRight: '1px solid var(--rule)', background: '#fafaf8', overflowY: 'auto' },
  row: { padding: '10px 16px', borderBottom: '1px solid var(--rule)', cursor: 'pointer' },
  rowActive: { background: 'rgba(224,181,58,0.18)', borderLeft: '3px solid #e0b53a', paddingLeft: 13 },
  editor: { flex: 1, background: 'white', overflowY: 'auto', minHeight: 0 }
};

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.notes = NotesApp;
