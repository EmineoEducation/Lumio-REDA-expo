// ══════════════════════════════════════════════════════════════
//  JEFFERSON — Guide procédural PAC · BC01 REDA
//  Charte Éminéo : #0B2B2D #5DE298 #E3FFF0 #E89B77
//  Posture : dit quoi faire, quand, avec quel outil
// ══════════════════════════════════════════════════════════════

function buildJeffersonPrompt(studentName, elapsedMin) {
  const prenom = (studentName || '').split(' ')[0] || 'vous';
  const timeLeft = Math.max(0, 210 - elapsedMin);

  let phase, objectifPhase, toolsPhase, nextAction;

  if (elapsedMin < 20) {
    phase = 'Acte 1 — Premier jour (0–20 min)';
    objectifPhase = 'Observer et comprendre. Pas de production. Identifier qui est qui, ce que Théo attend, et l\'état officiel du périmètre.';
    toolsPhase = 'Mail (email de mission de Théo + email de Camille), Finder > dossier Portraits (fiches équipe), Finder > Fiche contexte Lumio IDF';
    nextAction = 'Ouvrir Mail en premier. Lire l\'email de Théo — il dit ce qu\'il attend pour vendredi. Puis lire celui de Camille — elle dit ce que Théo ne dit pas.';
  } else if (elapsedMin < 50) {
    phase = 'Acte 2 — L\'état réel du terrain (20–50 min)';
    objectifPhase = 'Confronter les chiffres officiels aux signaux terrain. Le CRM montre 6 % de churn. Camille a dit 14 %. La vérité est dans les documents.';
    toolsPhase = 'PDF Viewer (export CRM IDF + note budget prospection), Voice Memo (mémo vocal Camille — écouter avant tout), Safari (article Les Échos Moodwork/Generali)';
    nextAction = 'Ouvrir Voice Memo. Écouter le mémo de Camille en premier — c\'est là que sont les vrais chiffres. Ensuite comparer avec l\'export CRM.';
  } else if (elapsedMin < 95) {
    phase = 'Acte 3 — Hypothèse stratégique (50–95 min)';
    objectifPhase = 'Formuler votre diagnostic et votre posture à Camille sur Slack. Elle va tester votre logique. 2 échanges débloquent l\'app Livrable.';
    toolsPhase = 'Slack (DM Camille Ott — interlocutrice principale), Notes (pour préparer votre hypothèse avant d\'écrire)';
    nextAction = 'Ouvrir Slack. Écrire à Camille votre première hypothèse : commencez-vous par les comptes en danger ou par la prospection ? Justifiez en une phrase.';
  } else if (elapsedMin < 175) {
    phase = 'Acte 4 — Production (95–175 min)';
    objectifPhase = 'Rédiger le plan d\'action commercial. 3 compétences RNCP : C.1.1 Veille · C.1.2 Diagnostic · C.1.3 PAC. Format bilan de compétences.';
    toolsPhase = 'App Livrable (débloquée après 2 échanges Slack) — 3 champs, minimums de mots, retour IA à la soumission';
    nextAction = 'Ouvrir l\'app Livrable. Remplir dans l\'ordre : C.1.1 (dispositif de veille) → C.1.2 (diagnostic + stratégie, SWOT explicite) → C.1.3 (PAC avec budget 8 000 € ventilé).';
  } else {
    phase = 'Acte 5 — Recul (175–210 min)';
    objectifPhase = 'Note réflexive. Qu\'est-ce que ce plan révèle de votre posture commerciale ? C\'est ce que le jury vous demandera à l\'oral.';
    toolsPhase = 'App Notes (note réflexive — champ disponible), App Livrable (bouton portfolio disponible)';
    nextAction = 'Ouvrir Notes. Écrire 5–8 lignes : quel choix avez-vous fait que d\'autres n\'auraient pas fait ? Pourquoi ? Quel risque avez-vous accepté ?';
  }

  return `Tu es Jefferson — le compagnon guide du PAC (Parcours d'Activation des Compétences) d'Éminéo, BC01 REDA — Concevoir le plan d'action commerciale.

Tu es un lapin avec une montre. Tu sais toujours où on en est. Tu dis exactement quoi faire, avec quel outil, dans quel ordre. Tu ne poses pas de questions philosophiques. Tu guides.

CONTEXTE SESSION BC01 REDA — Prendre les commandes :
- Étudiant·e : ${prenom}
- Temps écoulé : ${elapsedMin} min sur 210 min
- Temps restant : ${timeLeft} min
- Phase actuelle : ${phase}
- Mission : produire le plan d'action commercial IDF pour le CODIR du vendredi 19 septembre

OBJECTIF DE CETTE PHASE :
${objectifPhase}

OUTILS À UTILISER MAINTENANT :
${toolsPhase}

PROCHAINE ACTION CONCRÈTE :
${nextAction}

TENSIONS CLÉS DU CAS BC01 :
- Churn réel ~14 % (Camille, mémo vocal) vs 6 % affiché dans le CRM
- 3 comptes stratégiques en danger silencieux : Decathlon Pro (nouvelle DRH jamais contactée), Lactalis (concurrent Wittyfit testé), MAIF (attend MDR)
- Budget prospection : 8 000 € pour H2 (vs 22 000 € H1) — à ventiler dans le PAC
- Moodwork certifié MDR, vient de signer Generali IDF, recrute 2 commerciaux IDF
- Appel d'offres Aesio mutuelles 45 M€ en octobre — MDR obligatoire pour répondre
- Accord Darty Santé (50 000 unités B2C) signé par Théo en secret — easter egg dans signature mail

COMPÉTENCES BC01 RNCP (livrable) :
- C.1.1 : Dispositif de veille (process 4 étapes, sources par catégorie, 120 mots min)
- C.1.2 : Diagnostic + stratégie (SWOT, segmentation, cible, positionnement, RSE/ODD, 180 mots min)
- C.1.3 : PAC (objectifs SMART, équilibre fidélisation/détection/conquête, budget 8 000 € ventilé, 200 mots min)

RÈGLES DE POSTURE :
- Jamais plus de 3 phrases par réponse
- Toujours une action concrète, un outil nommé
- Ne jamais répondre à la place de l'étudiant
- Si l'étudiant hésite entre deux choix, lui demander lequel il défendrait devant Théo`;
}

function AssistantApp() {
  const D = window.LUMIO_DATA;
  const [messages, setMessages] = React.useState([
    {
      from: 'jefferson',
      text: 'Bonjour. Je suis Jefferson — je sais où vous en êtes et ce que vous devez faire maintenant. Commencez par ouvrir Mail. L\'email de Théo d\'abord, celui de Camille ensuite.'
    }
  ]);
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef(null);
  const [elapsedMin, setElapsedMin] = React.useState(0);

  // Timer
  React.useEffect(() => {
    const start = window.LUMIO_TIMER_START || Date.now();
    const tick = () => {
      const mins = Math.floor((Date.now() - start) / 60000);
      setElapsedMin(mins);
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
      const studentName = D?.student?.name || '';
      const systemPrompt = buildJeffersonPrompt(studentName, elapsedMin);

      const history = newMessages.map(m => ({
        role: m.from === 'student' ? 'user' : 'assistant',
        content: m.text
      }));

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 200,
          system: systemPrompt,
          messages: history
        })
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

      {/* Header Jefferson */}
      <div style={{ padding: '12px 16px', background: '#0B2B2D', display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Avatar lapin */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: '#5DE298',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0
        }}>🐰</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Jefferson</div>
          <div style={{ fontSize: 10, color: '#5DE298', fontFamily: 'var(--font-mono)' }}>Guide procédural · BC01 REDA</div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
          {elapsedMin}min / 210
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start' }}>
            {m.from === 'jefferson' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#5DE298', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, marginRight: 8, flexShrink: 0, alignSelf: 'flex-end' }}>🐰</div>
            )}
            <div style={{
              maxWidth: '80%',
              background: m.from === 'student' ? '#0a7a6e' : 'white',
              color: m.from === 'student' ? 'white' : 'var(--ink)',
              padding: '10px 14px', borderRadius: m.from === 'student' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              fontSize: 13, lineHeight: 1.6,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {sending && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#5DE298', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🐰</div>
            <div style={{ background: 'white', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: 4 }}>
              {[0,1,2].map(j => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: '#0a7a6e', animation: `bounce 1s ease-in-out ${j * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid var(--rule)', display: 'flex', gap: 8 }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Poser une question à Jefferson…"
          style={{ flex: 1, padding: '9px 14px', border: '1px solid var(--rule)', borderRadius: 20, fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', background: '#f9f8f5' }}
        />
        <button onClick={send} disabled={sending || !draft.trim()} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: draft.trim() ? '#0a7a6e' : 'var(--rule)',
          border: 'none', cursor: draft.trim() ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}
