// ══════════════════════════════════════════════════════════════
//  PORTFOLIO DE COMPÉTENCES — BC01 REDA
//  PAC · Parcours Activation Compétences · Éminéo
//
//  Rendu dans le Browser fictif après soumission du livrable.
//  Rend visible ce que le plan révèle — pas ce qu'il contient.
//
//  Structure :
//  · Volet gauche — identité, affaire, niveau global
//  · Volet droit — 3 compétences : visible / invisible / niveau
//  · Bas — récit en 1ère personne + signature de posture
//  · Bouton imprimer (démo)
// ══════════════════════════════════════════════════════════════

function PortfolioApp() {
  const data = window.LUMIO_PORTFOLIO_DATA;
  const cfg = window.PASS_CONFIG;
  const [activeComp, setActiveComp] = React.useState(0);

  if (!data || !data.feedback || data.feedback.error) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F0EB', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{ textAlign: 'center', color: '#8A8680' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 14 }}>Portfolio disponible après soumission du livrable.</div>
          <div style={{ fontSize: 11, marginTop: 6, color: '#C8C4BA' }}>Remettre le plan d'action dans l'app Livrable pour générer.</div>
        </div>
      </div>
    );
  }

  const { feedback, studentName, wordCounts, globalWords } = data;
  const competences = feedback.competences || [];
  const prenom = (studentName || '').split(' ')[0] || 'L\'étudiant·e';
  const nom = (studentName || '').split(' ').slice(1).join(' ') || '';

  const niveauColor = (n) => {
    if (n === 'Acquis') return { bg: '#D8E8E0', text: '#3A6B58', dot: '#5C7A6A' };
    if (n === 'En cours d\'acquisition') return { bg: '#FDF0E8', text: '#8B4A1A', dot: '#C4730F' };
    return { bg: '#F5F0D8', text: '#6B5A1A', dot: '#A09030' };
  };

  const globalNiveau = () => {
    const niveaux = competences.map(c => c.niveau);
    if (niveaux.every(n => n === 'Acquis')) return 'Acquis';
    if (niveaux.some(n => n === 'Acquis')) return 'En cours d\'acquisition';
    return 'À consolider';
  };

  const gn = globalNiveau();
  const gnColor = niveauColor(gn);

  const comp = competences[activeComp] || competences[0];

  return (
    <div style={{
      minHeight: '100%',
      background: '#F2F0EB',
      fontFamily: '"DM Sans", -apple-system, sans-serif',
      padding: '2rem 1.5rem',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .port-card { background: #FAFAF8; border-radius: 16px; overflow: hidden; max-width: 860px; margin: 0 auto; box-shadow: 0 8px 48px rgba(28,43,58,0.10), 0 1px 3px rgba(28,43,58,0.06); }
        .port-main { display: grid; grid-template-columns: 320px 1fr; min-height: 480px; }
        .comp-tab { padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 1.5px solid transparent; margin-bottom: 4px; }
        .comp-tab:hover { background: rgba(92,122,106,0.08); }
        .comp-tab.active { background: rgba(92,122,106,0.12); border-color: rgba(92,122,106,0.25); }
        .port-footer { padding: 28px 36px; border-top: 1px solid #E8E6E0; }
        @media print { .no-print { display: none !important; } body { background: white; padding: 0; } .port-card { box-shadow: none; } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeSlide 0.3s ease-out; }
      `}</style>

      {/* Header page */}
      <div style={{ maxWidth: 860, margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: '"DM Sans"', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A8680', marginBottom: 4 }}>PAC · Éminéo · Bach REDA</div>
          <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 22, fontWeight: 600, color: '#1C2B3A' }}>Portfolio de compétences</div>
        </div>
        <button
          className="no-print"
          onClick={() => window.print()}
          style={{
            padding: '8px 18px', background: 'transparent',
            border: '1.5px solid #C8C4BA', borderRadius: 100,
            fontSize: 12, color: '#6A7A88', cursor: 'pointer', fontFamily: '"DM Sans"'
          }}
        >
          ↓ Imprimer
        </button>
      </div>

      <div className="port-card">
        <div className="port-main">

          {/* ── Volet gauche ── */}
          <div style={{ background: '#1C2B3A', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Identité */}
            <div>
              <div style={{ fontFamily: '"DM Sans"', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Candidat·e</div>
              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 26, fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: 2 }}>{prenom}</div>
              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 26, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.2 }}>{nom}</div>
            </div>

            {/* Affaire */}
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Affaire</div>
              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>« Prendre les commandes »</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>BC01 REDA · Lumio Health IDF<br/>Septembre 2026</div>
            </div>

            {/* Niveau global */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>Niveau global</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: gnColor.bg, borderRadius: 100, padding: '6px 14px' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: gnColor.dot }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: gnColor.text }}>{gn}</span>
              </div>
            </div>

            {/* Tabs compétences */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>Compétences activées</div>
              {competences.map((c, i) => {
                const cn = niveauColor(c.niveau);
                return (
                  <div
                    key={c.code}
                    className={`comp-tab${activeComp === i ? ' active' : ''}`}
                    onClick={() => setActiveComp(i)}
                    style={{ background: activeComp === i ? 'rgba(255,255,255,0.1)' : 'transparent', borderColor: activeComp === i ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 10, fontFamily: '"DM Sans"', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{c.code}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{c.label}</div>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: cn.dot, flexShrink: 0 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mots */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Volume produit</div>
              <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 28, color: 'white', fontWeight: 300 }}>{globalWords}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>mots rédigés · session unique</div>
            </div>
          </div>

          {/* ── Volet droit ── */}
          <div style={{ padding: '32px 32px', display: 'flex', flexDirection: 'column' }} key={activeComp}>
            <div className="fade-in" style={{ flex: 1 }}>

              {comp && (
                <>
                  {/* En-tête compétence */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8680', marginBottom: 6 }}>{comp.code}</div>
                    <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 22, fontWeight: 600, color: '#1C2B3A', marginBottom: 10 }}>{comp.label}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: niveauColor(comp.niveau).bg, borderRadius: 100, padding: '5px 12px' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: niveauColor(comp.niveau).dot }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: niveauColor(comp.niveau).text }}>{comp.niveau}</span>
                    </div>
                  </div>

                  {/* Ce qui est visible */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C7A6A', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 16, height: 1, background: '#5C7A6A' }} />
                      Ce qui est visible
                    </div>
                    <div style={{ fontSize: 13, color: '#3A4A58', lineHeight: 1.75 }}>{comp.visible}</div>
                  </div>

                  {/* Ce qui ne l'est pas */}
                  <div style={{ background: 'rgba(92,122,106,0.06)', borderRadius: 10, padding: '16px 18px', border: '1px solid rgba(92,122,106,0.15)' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5C7A6A', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 16, height: 1, background: '#5C7A6A' }} />
                      Ce qui ne l'est pas
                    </div>
                    <div style={{ fontSize: 13, color: '#3A4A58', lineHeight: 1.75, fontStyle: 'italic' }}>{comp.invisible}</div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation compétences */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '1px solid #E8E6E0' }} className="no-print">
              <button
                onClick={() => setActiveComp(Math.max(0, activeComp - 1))}
                disabled={activeComp === 0}
                style={{ padding: '7px 16px', border: '1.5px solid #C8C4BA', borderRadius: 100, background: 'transparent', cursor: activeComp === 0 ? 'default' : 'pointer', fontSize: 12, color: '#8A8680', fontFamily: '"DM Sans"', opacity: activeComp === 0 ? 0.3 : 1 }}
              >← Précédent</button>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {competences.map((_, i) => (
                  <div key={i} onClick={() => setActiveComp(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === activeComp ? '#5C7A6A' : '#C8C4BA', cursor: 'pointer', transition: 'all 0.2s' }} />
                ))}
              </div>
              <button
                onClick={() => setActiveComp(Math.min(competences.length - 1, activeComp + 1))}
                disabled={activeComp === competences.length - 1}
                style={{ padding: '7px 16px', border: '1.5px solid #C8C4BA', borderRadius: 100, background: 'transparent', cursor: activeComp === competences.length - 1 ? 'default' : 'pointer', fontSize: 12, color: '#8A8680', fontFamily: '"DM Sans"', opacity: activeComp === competences.length - 1 ? 0.3 : 1 }}
              >Suivant →</button>
            </div>
          </div>
        </div>

        {/* ── Footer — récit + signature ── */}
        {(feedback.recit || feedback.signature) && (
          <div className="port-footer">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

              {/* Récit */}
              {feedback.recit && (
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8680', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 20, height: 1, background: '#C8C4BA' }} />
                    Fil du raisonnement
                  </div>
                  <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 16, fontStyle: 'italic', color: '#3A4A58', lineHeight: 1.8 }}>
                    "{feedback.recit}"
                  </div>
                </div>
              )}

              {/* Signature de posture */}
              {feedback.signature && (
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8680', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 20, height: 1, background: '#C8C4BA' }} />
                    Posture professionnelle
                  </div>
                  <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: 16, fontWeight: 600, color: '#1C2B3A', lineHeight: 1.8 }}>
                    {feedback.signature}
                  </div>
                </div>
              )}
            </div>

            {/* Pied de page */}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 10, color: '#C8C4BA', fontFamily: '"DM Sans"' }}>
                PAC · Éminéo · {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div style={{ fontSize: 10, color: '#C8C4BA', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.1em' }}>
                BC01 REDA · RNCP 31733
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Fonction d'ouverture depuis le Livrable ─────────────────
// Appelée via window.__openPortfolio() depuis app-livrable.jsx
// Ouvre le portfolio dans le Browser fictif (onglet dédié)
window.__openPortfolio = function() {
  if (window.__openAppInBrowser) {
    window.__openAppInBrowser('portfolio');
  } else {
    // Fallback : ouvrir dans une fenêtre séparée si le browser fictif n'est pas disponible
    const win = window.open('', '_blank');
    if (win) {
      win.document.write('<div id="portfolio-root"></div>');
      // Le composant sera rendu si React est disponible dans la fenêtre
    }
  }
};

window.PortfolioApp = PortfolioApp;
