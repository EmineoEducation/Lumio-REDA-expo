// ══════════════════════════════════════════════════════════════
//  JEFFERSON — Guide procédural PAC · BC01 REDA
// ══════════════════════════════════════════════════════════════

function buildJeffersonPrompt(studentName, elapsedMin) {
  const prenom = (studentName || '').split(' ')[0] || 'vous';
  const timeLeft = Math.max(0, 210 - elapsedMin);
  let phase, objectifPhase, toolsPhase, nextAction;

  if (elapsedMin < 20) {
    phase = 'Acte 1 — Premier jour';
    objectifPhase = 'Observer et comprendre. Pas de production. Identifier les acteurs et ce que Théo attend.';
    toolsPhase = 'Mail (email Théo + email Camille), Finder > Portraits, Finder > Fiche contexte';
    nextAction = 'Ouvrir Mail. Lire l\'email de Théo en premier. Puis celui de Camille — elle dit ce que Théo ne dit pas.';
  } else if (elapsedMin < 50) {
    phase = 'Acte 2 — État du terrain';
    objectifPhase = 'Confronter les chiffres officiels aux signaux terrain. CRM = 6 % de churn. Camille dit 14 %.';
    toolsPhase = 'Mémos vocaux (Camille, écouter en premier), Aperçu (Export CRM + Note budget), Safari (article Moodwork)';
    nextAction = 'Ouvrir Mémos vocaux. Écouter Camille avant de regarder le CRM.';
  } else if (elapsedMin < 95) {
    phase = 'Acte 3 — Hypothèse stratégique';
    objectifPhase = 'Formuler votre diagnostic à Camille sur Slack. 2 échanges débloquent le Livrable.';
    toolsPhase = 'Slack (DM Camille Ott uniquement)';
    nextAction = 'Ouvrir Slack. Écrire à Camille : par quoi commencez-vous ? Comptes en danger ou prospection ? Justifiez.';
  } else if (elapsedMin < 175) {
    phase = 'Acte 4 — Production';
    objectifPhase = 'Rédiger le plan d\'action. C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC.';
    toolsPhase = 'App Livrable dans le dock (icône verte)';
    nextAction = 'Ouvrir le Livrable. Remplir C.1.1 (veille, process 4 étapes) → C.1.2 (SWOT + stratégie) → C.1.3 (PAC budget 8 000 €).';
  } else {
    phase = 'Acte 5 — Portfolio';
    objectifPhase = 'Voir ce que le plan révèle de votre posture commerciale. Note réflexive courte.';
    toolsPhase = 'Safari > onglet Portfolio, Notes (réflexion)';
    nextAction = 'Cliquer sur "Voir mon portfolio" dans l\'app Livrable. Puis ouvrir Notes pour la réflexion.';
  }

  return `Tu es Jefferson — le compagnon guide du PAC (Parcours d'Activation des Compétences) d'Éminéo, BC01 REDA.

Tu es un lapin avec une montre. Tu dis exactement quoi faire, avec quel outil, dans quel ordre. Jamais de philosophie. Tu guides.

CONTEXTE SESSION :
- Étudiant·e : ${prenom}
- Temps écoulé : ${elapsedMin} min / 210 min — Temps restant : ${timeLeft} min
- Phase : ${phase}

OBJECTIF PHASE : ${objectifPhase}
OUTILS : ${toolsPhase}
PROCHAINE ACTION : ${nextAction}

TENSIONS CLÉS :
- Churn réel ~14 % (Camille) vs 6 % CRM
- 3 comptes stratégiques en danger : Decathlon Pro (nouvelle DRH jamais contactée), Lactalis (test Wittyfit), MAIF (attend MDR)
- Budget prospection : 8 000 € pour H2 — à ventiler dans le PAC
- Moodwork certifié MDR, vient de signer Generali IDF, recrute 2 commerciaux IDF
- Appel d'offres Aesio 45 M€ en octobre — MDR obligatoire

COMPÉTENCES LIVRABLE :
- C.1.1 : Veille (process 4 étapes, sources par catégorie, 120 mots min)
- C.1.2 : Diagnostic + stratégie (SWOT, segmentation, cible, ODD, 180 mots min)
- C.1.3 : PAC (objectifs SMART, équilibre fidélisation/détection/conquête, budget 8 000 € ventilé, 200 mots min)

RÈGLES :
- Jamais plus de 3 phrases par réponse
- Toujours une action concrète, un outil nommé
- Ne jamais répondre à la place de l'étudiant
- IMPORTANT : Ne jamais citer de vraies entreprises, vrais noms LinkedIn ou vrais contacts. Parle de "ton réseau sectoriel", "tes contacts en médecine du travail", "les acteurs que tu as identifiés dans le dossier".`;
}

function AssistantApp() {
  const D = window.LUMIO_DATA;
  const [messages, setMessages] = React.useState([
    { from: 'jefferson', text: 'Bonjour. Commencez par Mail. L\'email de Théo d\'abord, celui de Camille ensuite. Dans cet ordre.' }
  ]);
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef(null);
  const [elapsedMin, setElapsedMin] = React.useState(0);

  React.useEffect(() => {
    const tick = () => {
      const start = window.LUMIO_TIMER_START || Date.now();
      const offset = window.__DEMO_ELAPSED_OFFSET || 0;
      setElapsedMin(Math.floor((Date.now() - start) / 60000 + offset));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setDraft('');
    setSending(true);
    const newMessages = [...messages, { from: 'student', text }];
    setMessages(newMessages);
    try {
      const systemPrompt = buildJeffersonPrompt(D?.student?.name || '', elapsedMin);
      const history = newMessages.map(m => ({ role: m.from === 'student' ? 'user' : 'assistant', content: m.text }));
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 200, system: systemPrompt, messages: history })
      });
      const data = await resp.json();
      const reply = data.content?.map(b => b.text || '').join('') || '…';
      setMessages(prev => [...prev, { from: 'jefferson', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'jefferson', text: 'Connexion perdue. Réessaie.' }]);
    }
    setSending(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0faf5', fontFamily: 'var(--font-sans)' }}>
      <div style={{ padding: '12px 16px', background: '#0B2B2D', display: 'flex', alignItems: 'center', gap: 12 }}>
        <window.JeffersonIcon size={36} state="idle" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Jefferson</div>
          <div style={{ fontSize: 10, color: '#5DE298', fontFamily: 'var(--font-mono)' }}>Guide procédural · BC01 REDA</div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{elapsedMin}min / 210</div>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start' }}>
            {m.from === 'jefferson' && <window.JeffersonIcon size={28} state="idle" style={{ marginRight: 8, flexShrink: 0, alignSelf: 'flex-end' }} />}
            <div style={{ maxWidth: '80%', background: m.from === 'student' ? '#0a7a6e' : 'white', color: m.from === 'student' ? 'white' : 'var(--ink)', padding: '10px 14px', borderRadius: m.from === 'student' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 13, lineHeight: 1.6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginLeft: m.from === 'jefferson' ? 8 : 0 }}>{m.text}</div>
          </div>
        ))}
        {sending && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.JeffersonIcon size={28} state="talking" />
            <div style={{ background: 'white', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: 4 }}>
              {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: '#0a7a6e', animation: `typedot 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid var(--rule)', display: 'flex', gap: 8 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder="Poser une question à Jefferson…" style={{ flex: 1, padding: '9px 14px', border: '1px solid var(--rule)', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', background: '#f9f8f5' }} />
        <button onClick={send} disabled={sending || !draft.trim()} style={{ width: 36, height: 36, borderRadius: '50%', background: draft.trim() ? '#0a7a6e' : 'var(--rule)', border: 'none', cursor: draft.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.jefferson = AssistantApp;
