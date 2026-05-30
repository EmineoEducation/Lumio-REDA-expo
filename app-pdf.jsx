// ══════════════════════════════════════════════════════════════
//  PDF VIEWER + GUIDE — BC01 REDA
//  Documents : Export CRM IDF · Note budget · Guide mission
// ══════════════════════════════════════════════════════════════

function GuideApp() {
  const G = {
    app: { display: 'flex', flexDirection: 'column', height: '100%', background: '#1a2436', overflow: 'hidden' },
    header: { padding: '20px 28px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 },
    eyebrow: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(10,122,110,0.8)', marginBottom: 6 },
    title: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2 },
    body: { flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 },
    section: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '16px 20px' },
    sectionDay: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,122,110,0.7)', marginBottom: 8 },
    sectionTitle: { fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: 8 },
    tip: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, fontFamily: 'var(--font-display)', fontStyle: 'italic' },
    action: { marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 5, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' },
    footer: { padding: '12px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', flexShrink: 0 }
  };

  const tips = [
    {
      day: 'J−1 · Premier jour',
      title: 'Par où commencer ?',
      body: 'Théo t\'a écrit ce matin à 08h07. Son email de mission est dans Mail. Lis-le en premier. Puis celui de Camille — elle dit ce que Théo ne dit pas.',
      action: '→ Mail → "Bienvenue — et première mission"'
    },
    {
      day: 'J−2 · Après les emails',
      title: 'Confronter les chiffres',
      body: 'Le CRM affiche 6 % de churn. Camille dit 14 %. Ces deux chiffres ne peuvent pas être vrais en même temps. Écoute le mémo vocal de Camille, puis compare avec l\'export CRM dans Aperçu.',
      action: '→ Mémos vocaux → Camille Ott · 11h22 → Aperçu → Export CRM IDF'
    },
    {
      day: 'J−3 · Formuler une hypothèse',
      title: 'Camille attend ta position',
      body: 'Tu n\'as pas besoin d\'avoir tout compris pour écrire à Camille. Dis-lui ta première lecture — par quoi tu commences et pourquoi. Elle va tester chaque point. 2 échanges débloquent le Livrable.',
      action: '→ Slack → DM Camille Ott'
    },
    {
      day: 'J−4 · Rédiger le plan',
      title: 'Le Livrable t\'attend',
      body: 'L\'app Livrable est dans le dock (icône verte). 3 compétences RNCP : C.1.1 Veille, C.1.2 Diagnostic, C.1.3 PAC. Ce n\'est pas un résumé de documents — c\'est un plan commercial défendable devant Théo vendredi.',
      action: '→ Dock → Livrable BC01'
    },
    {
      day: 'En cas de blocage',
      title: 'Ce que tu cherches est ici',
      body: 'Finder → Dossier "Mission IDF" → tous les documents. Si tu ne sais pas par quoi commencer le plan, écris : "Ma priorité en semaine 1 est… parce que…" et force-toi à compléter.',
      action: '→ Finder → Mission IDF'
    }
  ];

  return (
    <div style={G.app}>
      <div style={G.header}>
        <div style={G.eyebrow}>PAC · Bach REDA · BC01</div>
        <div style={G.title}>Guide de mission</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Prendre les commandes · Lumio Health IDF</div>
      </div>
      <div style={G.body}>
        {tips.map((t, i) => (
          <div key={i} style={G.section}>
            <div style={G.sectionDay}>{t.day}</div>
            <div style={G.sectionTitle}>{t.title}</div>
            <div style={G.tip}>{t.body}</div>
            <div style={G.action}>{t.action}</div>
          </div>
        ))}
      </div>
      <div style={G.footer}>PAC · Éminéo · Bach REDA · BC01 RNCP 31733</div>
    </div>
  );
}

function PdfApp({ openDoc }) {
  const D = window.LUMIO_DATA;
  const [activeDoc, setActiveDoc] = React.useState(openDoc || 'crm');

  const docs = [
    { id: 'crm', label: 'Export CRM IDF', tag: 'Salesforce · 31/08/26', content: D.crmExport },
    { id: 'budget', label: 'Note budget prospection', tag: 'Confidentiel · DG', content: D.noteBudget },
    { id: 'guide', label: 'Guide de mission', tag: 'PAC BC01', special: 'guide' }
  ];

  const doc = docs.find(d => d.id === activeDoc) || docs[0];

  if (doc.special === 'guide') return <GuideApp />;

  return (
    <div style={{ height: '100%', display: 'flex', background: '#f0ede6' }}>
      {/* Sidebar docs */}
      <div style={{ width: 200, background: '#e8e4dc', borderRight: '1px solid rgba(20,24,36,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Documents</div>
        {docs.map(d => (
          <div key={d.id} onClick={() => setActiveDoc(d.id)} style={{
            padding: '10px 14px', cursor: 'pointer',
            background: activeDoc === d.id ? 'rgba(10,122,110,0.1)' : 'transparent',
            borderLeft: activeDoc === d.id ? '3px solid #0a7a6e' : '3px solid transparent'
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>{d.label}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 2 }}>{d.tag}</div>
          </div>
        ))}
      </div>

      {/* Doc viewer */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: 8, padding: '32px 36px', boxShadow: '0 4px 24px rgba(20,24,36,0.08)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a7a6e', marginBottom: 8 }}>{doc.content?.subtitle || doc.tag}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>{doc.content?.title || doc.label}</div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-wrap', margin: 0 }}>{doc.content?.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.pdf = PdfApp;
window.LUMIO_APPS.guide = GuideApp;
