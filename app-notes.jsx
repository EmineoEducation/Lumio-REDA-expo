// ══════════════════════════════════════════════════════════════
//  NOTES APP — BC01 REDA · Note réflexive Acte 5
// ══════════════════════════════════════════════════════════════
function NotesApp() {
  const [content, setContent] = React.useState(() => {
    try { return sessionStorage.getItem('lumio_notes_bc01') || ''; } catch { return ''; }
  });

  const save = (val) => {
    setContent(val);
    try { sessionStorage.setItem('lumio_notes_bc01', val); } catch {}
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isActe5 = true; // toujours accessible

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#faf8f3', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--rule)', background: '#f4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0a7a6e', marginBottom: 2 }}>Acte 5 — Recul</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Note réflexive personnelle</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: wordCount > 0 ? '#0a7a6e' : 'var(--ink-faint)' }}>
          {wordCount} mot{wordCount > 1 ? 's' : ''}
        </div>
      </div>

      {/* Prompt réflexif */}
      <div style={{ padding: '12px 20px', background: 'rgba(10,122,110,0.04)', borderBottom: '1px solid rgba(10,122,110,0.1)' }}>
        <div style={{ fontSize: 12, color: '#0a7a6e', fontWeight: 600, marginBottom: 6 }}>Questions pour vous guider</div>
        {[
          'Quel choix stratégique avez-vous fait que d\'autres n\'auraient pas forcément fait ?',
          'Qu\'est-ce que les vrais chiffres (churn 14 %) ont changé dans votre approche ?',
          'Quel risque avez-vous accepté dans ce plan — et pourquoi l\'assumez-vous ?',
          'Qu\'auriez-vous fait différemment avec 3 jours de plus ou le double du budget ?'
        ].map((q, i) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 4, paddingLeft: 12, borderLeft: '2px solid rgba(10,122,110,0.2)' }}>
            {q}
          </div>
        ))}
      </div>

      {/* Zone de saisie */}
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={content}
          onChange={e => save(e.target.value)}
          placeholder="Écrivez librement. Cette note est personnelle — elle n'est pas évaluée, mais elle vous prépare à l'oral."
          style={{
            flex: 1, width: '100%', resize: 'none',
            border: '1px solid var(--rule)', borderRadius: 8,
            padding: '14px 16px', fontSize: 13, lineHeight: 1.8,
            fontFamily: 'var(--font-display)', fontStyle: content ? 'normal' : 'italic',
            color: 'var(--ink)', background: 'white', outline: 'none'
          }}
          onFocus={e => e.target.style.borderColor = '#0a7a6e'}
          onBlur={e => e.target.style.borderColor = 'var(--rule)'}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-faint)', fontStyle: 'italic' }}>
          Sauvegardée automatiquement · Non transmise
        </div>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.notes = NotesApp;
