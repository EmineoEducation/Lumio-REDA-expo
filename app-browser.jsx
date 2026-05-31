// ══════════════════════════════════════════════════════════════
//  BROWSER APP — BC01 REDA
//  Onglets : article Moodwork/Generali · Fausse Une · Portrait Camille
//  + onglet Portfolio (généré après soumission livrable)
// ══════════════════════════════════════════════════════════════
const { useState: useStateBrowser, useRef: useRefBrowser } = React;

function BrowserApp({ openTab, openPortfolio }) {
  const D = window.LUMIO_DATA;
  const [portfolioReady, setPortfolioReady] = React.useState(!!window.LUMIO_PORTFOLIO_DATA);

  // Vérifier si le portfolio est disponible
  React.useEffect(() => {
    const check = setInterval(() => {
      if (window.LUMIO_PORTFOLIO_DATA) {
        setPortfolioReady(true);
        clearInterval(check);
      }
    }, 2000);
    return () => clearInterval(check);
  }, []);

  // Exposer la fonction d'ouverture du portfolio
  React.useEffect(() => {
    window.__openAppInBrowser = (type) => {
      if (type === 'portfolio') {
        setActiveTab('portfolio');
        if (window.__onAppOpened) window.__onAppOpened('browser');
      }
    };
  }, []);

  const TABS = [
    {
      id: 'article-moodwork',
      favicon: 'LE', faviconColor: '#0a3d62',
      host: 'lesechos.fr',
      title: 'Moodwork signe Generali IDF · Les Échos',
      url: 'https://lesechos.fr/tech-medias/wearables-sante-moodwork-generali-idf',
      type: 'article',
      article: D.pressArticles[0]
    },
    {
      id: 'fausse-une',
      favicon: 'LE', faviconColor: '#0a3d62',
      host: 'lesechos.fr',
      title: 'Wearables santé : Moodwork s\'impose en IDF · Les Échos',
      url: 'https://lesechos.fr/sante/wearables-moodwork-idf',
      type: 'fausse-une'
    },
    {
      id: 'lumio-site',
      favicon: 'L', faviconColor: '#0a7a6e',
      host: 'lumio-health.com',
      title: 'Lumio Health · Mesurez le stress invisible',
      url: 'https://lumio-health.com',
      type: 'corporate'
    },
    ...(portfolioReady ? [{
      id: 'portfolio',
      favicon: '📋', faviconColor: '#1C2B3A',
      host: 'portfolio.lumio-interne.fr',
      title: 'Portfolio de compétences · BC01 REDA',
      url: `https://portfolio.lumio-interne.fr/bc01-reda`,
      type: 'portfolio'
    }] : [])
  ];

  const initialTab = openPortfolio ? 'portfolio' : openTab || 'article-moodwork';
  const [activeTab, setActiveTab] = useStateBrowser(initialTab);
  const tab = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0ede6', fontFamily: 'var(--font-sans)' }}>

      {/* Tab bar */}
      <div style={{ background: '#e8e4dc', borderBottom: '1px solid rgba(20,24,36,0.1)', display: 'flex', overflowX: 'auto', padding: '4px 6px 0', gap: 2 }}>
        {TABS.map(t => (
          <div
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: '6px 6px 0 0',
              background: activeTab === t.id ? 'white' : 'transparent',
              cursor: 'pointer', maxWidth: 200, flexShrink: 0,
              borderBottom: activeTab === t.id ? '1px solid white' : 'none',
              marginBottom: activeTab === t.id ? -1 : 0
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 3, background: t.faviconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'white', fontWeight: 700, flexShrink: 0 }}>{t.favicon}</div>
            <span style={{ fontSize: 11, color: activeTab === t.id ? 'var(--ink)' : 'var(--ink-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{t.title}</span>
          </div>
        ))}
      </div>

      {/* URL bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--rule)', padding: '6px 12px' }}>
        <div style={{ background: '#f4f2ee', borderRadius: 8, padding: '5px 12px', fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--font-mono)' }}>{tab.url}</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab.type === 'article' && tab.article && (
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a3d62', marginBottom: 8 }}>Les Échos · {tab.article.date}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 20 }}>{tab.article.headline}</h1>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--ink-soft)', whiteSpace: 'pre-line' }}>{tab.article.body}</p>
          </div>
        )}

        {tab.type === 'fausse-une' && (
          <div style={{ background: '#0a1628', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#0a1628', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>Les Échos</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{D.fausseUne.date}</div>
            </div>
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f5a623', marginBottom: 12 }}>{D.fausseUne.surtitre}</div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.25, marginBottom: 16 }}>{D.fausseUne.titre}</h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: '3px solid #f5a623', paddingLeft: 16 }}>{D.fausseUne.chapeau}</p>
            </div>
          </div>
        )}

        {tab.type === 'corporate' && (
          <div style={{ background: '#0B2B2D', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💚</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'white', fontWeight: 300, marginBottom: 8 }}>Lumio Health</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>Mesurez le stress invisible</div>
            </div>
          </div>
        )}

        {tab.type === 'portfolio' && (() => {
          const P = window.PortfolioApp;
          if (P && window.LUMIO_PORTFOLIO_DATA) return <P />;
          return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'var(--ink-faint)', fontStyle:'italic', padding:40 }}>Portfolio disponible après soumission du livrable.</div>;
        })()}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.browser = BrowserApp;
