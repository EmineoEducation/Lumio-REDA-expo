// ══════════════════════════════════════════════════════════════
//  LIVRABLE APP — BC01 REDA
//  PAC · Parcours Activation Compétences · Éminéo
//  · Compétences C.1.1 · C.1.2 · C.1.3
//  · Feedback Claude IA — bilan de compétences
//  · Génération portfolio après soumission
// ══════════════════════════════════════════════════════════════

const wc = (txt) => (txt || '').trim() ? (txt || '').trim().split(/\s+/).length : 0;
const GLOBAL_MIN = 500;

// ─── Prompt feedback IA — bilan de compétences BC01 ──────────
const FEEDBACK_PROMPT = `Tu es un accompagnateur de parcours de compétences pour le Bach REDA (RNCP 31733), bloc BC01 — "Concevoir le plan d'action commerciale du périmètre en responsabilité".

Tu produis un bilan de compétences à partir du travail d'un·e étudiant·e. Ton rôle n'est PAS d'évaluer un livrable certifiant — c'est de rendre visible ce qui s'est passé dans la tête de cette personne pendant qu'elle construisait ce plan.

Contexte Lumio Health IDF — Septembre 2026 :
- Nouveau·elle Responsable commercial IDF, première semaine
- 47 comptes B2B actifs dont 3 comptes stratégiques en danger silencieux
- Churn réel ~14 % (Camille Ott) vs 6 % affiché dans le CRM
- Budget prospection : 8 000 € pour H2 (vs 22 000 € H1)
- Concurrent Moodwork certifié MDR, vient de signer Generali IDF
- Appel d'offres Aesio mutuelles 45 M€ en octobre — MDR obligatoire
- Accord Darty Santé (50 000 unités B2C, conditionné MDR) signé par Théo en secret

Format de réponse STRICT — JSON uniquement, aucun texte avant ou après :

{
  "competences": [
    {
      "code": "C.1.1",
      "label": "Dispositif de veille",
      "niveau": "Acquis | En cours d'acquisition | À consolider",
      "visible": "Ce que le texte révèle de la façon dont cette personne pense et organise l'information — pas un résumé du contenu.",
      "invisible": "Ce qui n'est pas dit mais que le choix des sources, la structure ou les priorités révèle sur la posture professionnelle."
    },
    {
      "code": "C.1.2",
      "label": "Diagnostic et stratégie commerciale",
      "niveau": "Acquis | En cours d'acquisition | À consolider",
      "visible": "Ce que le texte révèle sur la façon dont cette personne lit une situation et en tire une position.",
      "invisible": "Ce que les arbitrages révèlent — ce qu'elle a choisi de prioriser, ce qu'elle a mis de côté, et pourquoi ça dit quelque chose."
    },
    {
      "code": "C.1.3",
      "label": "Plan d'action commerciale",
      "niveau": "Acquis | En cours d'acquisition | À consolider",
      "visible": "Ce que le texte révèle sur la capacité à traduire une analyse en actions concrètes.",
      "invisible": "Ce que la structure du plan révèle sur la posture face à l'incertitude et aux contraintes réelles."
    }
  ],
  "recit": "2-3 phrases à la première personne (je) qui reconstituent le fil du raisonnement de l'étudiant·e — comme si la personne racontait ce qu'elle a compris et choisi pendant cette session. Doit être spécifique au contenu produit, pas générique.",
  "signature": "Une seule phrase commençant par 'Dans cette affaire, j'ai choisi de…' qui exprime la posture professionnelle la plus caractéristique révélée par le plan produit. Ce que personne d'autre n'aurait forcément écrit."
}`;

// ─── Pré-remplissage démo ─────────────────────────────────────
function getDemoAnswers() {
  const cfg = window.PASS_CONFIG;
  if (!cfg || !cfg.demoMode) return null;
  return Object.fromEntries(
    (cfg.competences || []).map(c => [c.code, c.demo || ''])
  );
}

function LivrableApp() {
  const cfg = window.PASS_CONFIG;
  const COMPETENCES = cfg ? cfg.competences : [];
  const isDemoMode = cfg?.demoMode || false;

  const [answers, setAnswers] = React.useState(() => {
    try {
      const saved = sessionStorage.getItem('lumio_livrable_bc01');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Mode démo : pré-remplir
    if (isDemoMode) return getDemoAnswers() || {};
    return Object.fromEntries(COMPETENCES.map(c => [c.code, '']));
  });

  const [phase, setPhase] = React.useState('edit'); // edit | submitting | done
  const [feedbackData, setFeedbackData] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(COMPETENCES[0]?.code || 'C.1.1');

  React.useEffect(() => {
    try { sessionStorage.setItem('lumio_livrable_bc01', JSON.stringify(answers)); } catch {}
    if (window.__onLivrableChange) window.__onLivrableChange(answers);
  }, [answers]);

  const wordCounts = Object.fromEntries(COMPETENCES.map(c => [c.code, wc(answers[c.code])]));
  const globalWords = Object.values(wordCounts).reduce((a, b) => a + b, 0);
  const missingMin = COMPETENCES.filter(c => wordCounts[c.code] < c.min);
  const canSubmit = missingMin.length === 0 && globalWords >= GLOBAL_MIN && phase === 'edit';
  const setAnswer = (code, val) => setAnswers(prev => ({ ...prev, [code]: val }));

  const getMissingKeywords = (c) => {
    if (!c.motsCles) return [];
    const text = (answers[c.code] || '').toLowerCase();
    return c.motsCles.filter(kw => !text.toLowerCase().includes(kw.toLowerCase()));
  };

  const submit = async () => {
    if (!canSubmit) return;
    setPhase('submitting');

    const livrableText = COMPETENCES.map(c =>
      `## ${c.code} — ${c.label}\n\n${answers[c.code] || '(non renseigné)'}`
    ).join('\n\n---\n\n');

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1400,
          system: FEEDBACK_PROMPT,
          messages: [{ role: 'user', content: livrableText }]
        })
      });
      const data = await resp.json();
      const rawText = data.content?.map(b => b.text || '').join('') || '';

      // Parser le JSON
      let parsed = null;
      try {
        const clean = rawText.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(clean);
      } catch {
        parsed = { error: rawText };
      }

      setFeedbackData(parsed);
      setPhase('done');

      // Stocker pour portfolio + Slack
      window.LUMIO_PORTFOLIO_DATA = {
        answers,
        wordCounts,
        globalWords,
        feedback: parsed,
        timestamp: Date.now(),
        studentName: window.LUMIO_DATA?.student?.name || ''
      };

      // Déclencher réaction Camille dans Slack
      setTimeout(() => {
        if (window.__onLivrableSubmitted) window.__onLivrableSubmitted(livrableText, parsed);
      }, 1200);

    } catch(e) {
      setPhase('edit');
      alert('Erreur de connexion. Réessaie dans un instant.');
    }
  };

  // ── Écran soumission ──────────────────────────────────────
  if (phase === 'submitting') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#f9f8f5' }}>
      <div style={{ width: 44, height: 44, border: '3px solid rgba(10,122,110,0.2)', borderTopColor: '#0a7a6e', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <div style={{ fontSize: 14, color: 'var(--ink-mute)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>Analyse de votre plan en cours…</div>
      <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>Le retour arrivera dans Slack · Camille Ott</div>
    </div>
  );

  // ── Écran final ───────────────────────────────────────────
  if (phase === 'done') return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f9f8f5', overflowY: 'auto' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 40px', gap: 20 }}>

        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#0a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, color: 'var(--ink)', marginBottom: 6 }}>
            Plan remis à Théo Marczak
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-mute)' }}>
            BC01 REDA · CODIR du vendredi 19 septembre 2026
          </div>
        </div>

        {/* Récap compétences */}
        <div style={{ width: '100%', maxWidth: 480, background: 'white', borderRadius: 10, padding: '16px 20px', border: '1px solid var(--rule)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--ink-mute)', textTransform: 'uppercase', marginBottom: 12 }}>Compétences soumises</div>
          {COMPETENCES.map(c => {
            const words = wordCounts[c.code];
            const ok = words >= c.min;
            const fb = feedbackData?.competences?.find(x => x.code === c.code);
            return (
              <div key={c.code} style={{ padding: '8px 0', borderBottom: '1px solid rgba(20,24,36,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: fb ? 4 : 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#0a7a6e', minWidth: 36 }}>{c.code}</span>
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--ink)' }}>{c.label}</span>
                  {fb && <span style={{ fontSize: 10, fontWeight: 700, color: fb.niveau === 'Acquis' ? '#1a6641' : fb.niveau === 'En cours d\'acquisition' ? '#c4420f' : '#8a6a00', background: fb.niveau === 'Acquis' ? '#e8f5e9' : fb.niveau === 'En cours d\'acquisition' ? '#fdf0e8' : '#fffae0', padding: '2px 8px', borderRadius: 100 }}>{fb.niveau}</span>}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: ok ? '#1a6641' : '#c4420f', fontWeight: 700 }}>{words}m</span>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#0a7a6e' }}>{globalWords} mots</span>
          </div>
        </div>

        {/* Bouton portfolio */}
        <div style={{ width: '100%', maxWidth: 480 }}>
          <button
            onClick={() => { if (window.__openPortfolio) window.__openPortfolio(); }}
            style={{
              width: '100%', padding: '14px 20px',
              background: '#0B2B2D', color: 'white',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-sans)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
            Voir mon portfolio de compétences
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-faint)', marginTop: 8 }}>
            Généré à partir de votre plan · BC01 REDA
          </div>
        </div>

        {/* Note portfolio */}
        <div style={{ background: 'rgba(10,122,110,0.06)', borderRadius: 8, padding: '12px 20px', border: '1px solid rgba(10,122,110,0.15)', fontSize: 12, color: '#0a7a6e', lineHeight: 1.7, maxWidth: 480, width: '100%', textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>📋 Le retour de Camille arrive dans Slack</div>
          <div style={{ color: 'var(--ink-mute)', fontSize: 11 }}>
            Votre portfolio de compétences est disponible dans le Navigateur.
            Il rend visible ce que votre plan révèle de votre raisonnement — pas seulement ce que vous avez produit.
          </div>
        </div>
      </div>
    </div>
  );

  // ── Éditeur principal ─────────────────────────────────────
  const activeComp = COMPETENCES.find(c => c.code === activeTab);
  const missingKw = activeComp ? getMissingKeywords(activeComp) : [];
  const activeWords = activeComp ? wordCounts[activeComp.code] : 0;
  const activeOk = activeComp ? activeWords >= activeComp.min : false;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f9f8f5', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px 0', borderBottom: '1px solid var(--rule)', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', color: '#0a7a6e', textTransform: 'uppercase', marginBottom: 2 }}>BC01 REDA · Plan d'action commerciale</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>Périmètre IDF · CODIR vendredi 19 sept.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: globalWords >= GLOBAL_MIN ? '#0a7a6e' : 'var(--ink-mute)' }}>{globalWords}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-faint)' }}>/ {GLOBAL_MIN} mots min</div>
          </div>
        </div>

        {/* Onglets compétences */}
        <div style={{ display: 'flex', gap: 0 }}>
          {COMPETENCES.map(c => {
            const ok = wordCounts[c.code] >= c.min;
            const active = activeTab === c.code;
            return (
              <button key={c.code} onClick={() => setActiveTab(c.code)} style={{
                padding: '8px 16px', border: 'none', cursor: 'pointer',
                borderBottom: active ? '2px solid #0a7a6e' : '2px solid transparent',
                background: 'transparent',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: active ? 700 : 400,
                color: active ? '#0a7a6e' : ok ? '#1a6641' : 'var(--ink-mute)',
                display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s'
              }}>
                {ok && <span style={{ color: '#1a6641', fontSize: 10 }}>✓</span>}
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Zone édition */}
      {activeComp && (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Info compétence */}
          <div style={{ padding: '12px 20px', background: 'rgba(10,122,110,0.04)', borderBottom: '1px solid rgba(10,122,110,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0a7a6e', marginBottom: 4 }}>{activeComp.code} — {activeComp.label}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', lineHeight: 1.5, marginBottom: 6 }}>{activeComp.rncp}</div>
            {activeComp.conseil && (
              <div style={{ fontSize: 11, color: '#5c3d00', background: '#fffae0', padding: '6px 10px', borderRadius: 6, border: '1px solid #f0d060' }}>
                💡 {activeComp.conseil}
              </div>
            )}
          </div>

          {/* Textarea */}
          <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <textarea
              value={answers[activeComp.code] || ''}
              onChange={e => setAnswer(activeComp.code, e.target.value)}
              placeholder={activeComp.placeholder}
              style={{
                flex: 1, width: '100%', resize: 'none',
                border: '1px solid var(--rule)', borderRadius: 8,
                padding: '12px 16px', fontSize: 13, lineHeight: 1.7,
                fontFamily: 'var(--font-sans)', color: 'var(--ink)',
                background: 'white', outline: 'none',
                transition: 'border-color 0.15s'
              }}
              onFocus={e => e.target.style.borderColor = '#0a7a6e'}
              onBlur={e => e.target.style.borderColor = 'var(--rule)'}
            />

            {/* Compteur + mots-clés manquants */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {missingKw.slice(0, 4).map(kw => (
                  <span key={kw} style={{ fontSize: 10, color: 'var(--ink-faint)', background: 'var(--rule)', padding: '2px 8px', borderRadius: 100 }}>
                    {kw}
                  </span>
                ))}
                {missingKw.length > 4 && <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>+{missingKw.length - 4}</span>}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: activeOk ? '#1a6641' : 'var(--ink-mute)' }}>
                {activeWords} / {activeComp.min} mots {activeOk ? '✓' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer soumettre */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--rule)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>
          {missingMin.length > 0
            ? `${missingMin.map(c => c.code).join(', ')} — minimum non atteint`
            : globalWords < GLOBAL_MIN
              ? `${GLOBAL_MIN - globalWords} mots manquants au total`
              : 'Prêt à soumettre'
          }
        </div>
        <button
          onClick={submit}
          disabled={!canSubmit}
          style={{
            padding: '10px 24px',
            background: canSubmit ? '#0a7a6e' : 'var(--rule)',
            color: canSubmit ? 'white' : 'var(--ink-faint)',
            border: 'none', borderRadius: 8, cursor: canSubmit ? 'pointer' : 'not-allowed',
            fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)',
            transition: 'all 0.2s'
          }}
        >
          Remettre le plan →
        </button>
      </div>
    </div>
  );
}
