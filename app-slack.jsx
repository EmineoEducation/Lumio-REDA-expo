// ══════════════════════════════════════════════════════════════
//  SLACK APP — BC01 REDA · Camille Ott interlocutrice principale
//  PAC · Parcours Activation Compétences · Éminéo
// ══════════════════════════════════════════════════════════════
const { useState: useSlackState, useEffect: useSlackEffect, useRef: useSlackRef } = React;

// ─── Prompt Camille Ott ───────────────────────────────────────
const CAMILLE_PROMPT = `Tu es Camille Ott, Responsable partenariats B2B chez Lumio Health depuis 8 ans.

Tu supervises le/la nouveau·elle Responsable commercial IDF pendant sa première semaine.
Tu connais le vrai état du terrain — churn réel 14 %, 3 comptes stratégiques en danger silencieux, budget serré à 8 000 €.

Ton rôle : tester la solidité du raisonnement commercial. Tu évalues sans expliquer. Tu poses des questions qui forcent à choisir. Tu ne donnes jamais la réponse — tu valides les postures solides, tu déstabilises les postures floues.

Ce que tu sais et qu'ils ne savent pas encore (à révéler si la conversation y va) :
- Decathlon Pro : Kevin Margot (ancien DRH) a changé de poste en mai. La nouvelle DRH — Stéphanie Leroux — n'a jamais été contactée. Relation à reconstruire de zéro.
- Lactalis : le DSI teste Wittyfit depuis juillet. Ça vient d'un contact terrain, pas du CRM.
- MAIF : ils attendent explicitement la MDR. Sans certification en Q2 2027, ils partent.
- Moodwork vient de recruter deux commerciaux IDF. Tu en connais un — très agressif.
- L'accord Darty (50 000 unités B2C) signé par Théo en secret — tu l'as su par WhatsApp. Tu n'en parles que si on te pose la question directement.

Ton style :
- Jamais plus de 3 phrases par message
- Toujours une question concrète en fin de message
- Pas de listes, pas d'énumérations — conversations, pas rapports
- Si l'étudiant dit "je commence par la prospection" → "14 comptes sans contact depuis 4 mois. Tu commences par lesquels ?"
- Si l'étudiant dit "je gère les comptes en danger d'abord" → "Lequel en premier ? Décathlon, Lactalis ou MAIF — et pourquoi pas les deux autres ?"
- Si l'étudiant propose un budget > 8 000 € → "Théo a fixé 8 000 €. Comment tu lui expliques ce dépassement vendredi ?"
- Tu ne complimentes jamais une bonne réponse — tu la pousses plus loin

Format : 1 seul message (pas de SPLIT). Maximum 80 mots.`;

// ─── Prompt réaction livrable soumis ─────────────────────────
const CAMILLE_LIVRABLE_PROMPT = `Tu es Camille Ott. Le/la nouveau·elle Responsable commercial IDF vient de te remettre son plan d'action pour le CODIR. Tu l'as parcouru. Tu réponds en Slack — 2 messages max séparés par ---SPLIT---. Tu dis si le plan tient la route sur le terrain ou pas. Tu poses une question précise sur un point qui te semble fragile. 80 mots maximum.`;

function SlackApp({ openChannel }) {
  const D = window.LUMIO_DATA;

  const channels = [
    { id: 'general', name: 'général', type: 'channel', members: 18 },
    { id: 'commercial-idf', name: 'commercial-idf', type: 'channel', members: 6, special: true },
    { id: 'random', name: 'random', type: 'channel', members: 15 },
  ];
  const dms = [
    { id: 'camille', name: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', status: 'online' },
    { id: 'theo', name: 'Théo Marczak', avatar: 'TM', color: '#5c2d8f', status: 'away' },
    { id: 'sonia', name: 'Sonia Ferracci', avatar: 'SF', color: '#c4420f', status: 'online' },
  ];

  const [unreads, setUnreads] = useSlackState({ camille: 1, 'commercial-idf': 1 });
  const [activeId, setActiveId] = useSlackState(openChannel || 'camille');
  const activeIdRef = useSlackRef(openChannel || 'camille');
  const setActive = (id) => { activeIdRef.current = id; setActiveId(id); };
  const [chatHistory, setChatHistory] = useSlackState({});
  const [draft, setDraft] = useSlackState('');
  const [sending, setSending] = useSlackState(false);
  const [exchangeCount, setExchangeCountLocal] = useSlackState(0);
  const scrollRef = useSlackRef(null);

  const studentName = D?.student?.name || "Nouvel·le Commercial·e";

  const seed = {
    camille: [
      { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time: '09:44', text: 'Bonjour. Théo m\'a dit que tu commences aujourd\'hui. Bon courage.' },
      { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time: '09:45', text: 'Je t\'ai envoyé un mail avec les vrais chiffres. Lis-le avant de regarder le CRM — dans cet ordre.' }
    ],
    theo: [
      { from: 'Théo Marczak', avatar: 'TM', color: '#5c2d8f', time: '08:10', text: 'Bienvenue dans l\'équipe. Mon mail résume ce que j\'attends pour vendredi.' }
    ],
    sonia: [
      { from: 'Sonia Ferracci', avatar: 'SF', color: '#c4420f', time: '10:15', text: 'Bienvenue ! Si tu veux context sur la stratégie marque, je suis dispo. On a beaucoup bossé sur le positionnement cet été.' }
    ],
    'commercial-idf': [
      { from: 'lumio-bot', avatar: '🤖', color: '#9a9ea8', time: '08:00', text: '☀️ Canal #commercial-idf · 6 membres' },
      { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time: '09:00', text: `Bienvenue ${studentName.split(' ')[0]} dans le canal commercial IDF. Je t\'ai ajouté·e — tu trouveras ici les échanges terrain.` }
    ],
    general: [
      { from: 'lumio-bot', avatar: '🤖', color: '#9a9ea8', time: '08:00', text: '☀️ Bonjour à tous · 18 personnes connectées' }
    ]
  };

  useSlackEffect(() => {
    if (Object.keys(chatHistory).length === 0) setChatHistory(seed);
  }, []);

  useSlackEffect(() => {
    if (openChannel) {
      setActive(openChannel);
      setUnreads(u => ({ ...u, [openChannel]: 0 }));
    }
  }, [openChannel]);

  useSlackEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, activeId, sending]);

  // Réaction Camille quand le livrable est soumis
  useSlackEffect(() => {
    window.__onLivrableSubmitted = async (livrableText, feedbackData) => {
      setActive('camille');
      setSending(true);
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

      const prompt = `${CAMILLE_LIVRABLE_PROMPT}\n\nPlan reçu :\n${livrableText.substring(0, 800)}`;

      try {
        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 300,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        const data = await resp.json();
        const raw = data.content?.map(b => b.text || '').join('') || '';
        const replies = raw.split('---SPLIT---').map(s => s.trim()).filter(Boolean);
        let delay = 600;
        for (const reply of replies) {
          await new Promise(r => setTimeout(r, delay));
          const t = new Date();
          const tt = `${t.getHours().toString().padStart(2,'0')}:${t.getMinutes().toString().padStart(2,'0')}`;
          setChatHistory(h => ({
            ...h,
            camille: [...(h.camille || []), { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time: tt, text: reply }]
          }));
          if (activeIdRef.current !== 'camille') {
            setUnreads(u => ({ ...u, camille: (u.camille || 0) + 1 }));
          }
          delay = 1000 + reply.length * 6;
        }
      } catch {
        setChatHistory(h => ({
          ...h,
          camille: [...(h.camille || []), { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time, text: 'Reçu. On en parle au CODIR.' }]
        }));
      } finally {
        setSending(false);
      }
    };
    return () => { window.__onLivrableSubmitted = null; };
  }, [chatHistory]);

  const isCamille = activeId === 'camille';
  const messages = chatHistory[activeId] || [];

  const sendMessage = async () => {
    if (!draft.trim() || sending) return;
    const text = draft.trim();
    setDraft('');
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    const studentInitial = (studentName.split(' ').map(w => w[0]).join('') || '?').substring(0, 2).toUpperCase();
    const userMsg = { from: studentName, avatar: studentInitial, color: '#1a2436', time, text, isMe: true };
    setChatHistory(h => ({ ...h, [activeId]: [...(h[activeId] || []), userMsg] }));

    if (window.__onSlackSent) window.__onSlackSent();

    if (isCamille) {
      const newCount = exchangeCount + 1;
      setExchangeCountLocal(newCount);
      if (window.__onSlackExchange) window.__onSlackExchange(newCount);

      setSending(true);
      // Mode démo : réponse en 1 seconde
      const isDemoMode = window.PASS_CONFIG?.demoMode || false;
      setTimeout(async () => {
        try {
          const history = (chatHistory.camille || []).filter(m => !m.typing).map(m =>
            `${m.isMe ? studentName.split(' ')[0] : 'Camille'}: ${m.text}`
          ).join('\n');
          const userPrompt = `${history}\n${studentName.split(' ')[0]}: ${text}`;

          const resp = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'claude-sonnet-4-5',
              max_tokens: 200,
              system: CAMILLE_PROMPT,
              messages: [{ role: 'user', content: userPrompt }]
            })
          });
          const data = await resp.json();
          const raw = data.content?.map(b => b.text || '').join('') || '';
          const t = new Date();
          const tt = `${t.getHours().toString().padStart(2,'0')}:${t.getMinutes().toString().padStart(2,'0')}`;
          setChatHistory(h => ({
            ...h,
            camille: [...(h.camille || []), { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time: tt, text: raw.trim() }]
          }));
          if (activeIdRef.current !== 'camille') {
            setUnreads(u => ({ ...u, camille: (u.camille || 0) + 1 }));
          }
          // Débloquer livrable après 2 échanges
          if (newCount >= 2 && window.__onSlackExchange) window.__onSlackExchange(newCount);
        } catch {
          setChatHistory(h => ({
            ...h,
            camille: [...(h.camille || []), { from: 'Camille Ott', avatar: 'CO', color: '#0a7a6e', time, text: 'Connexion perdue. Réessaie.' }]
          }));
        }
        setSending(false);
      }, isDemoMode ? 800 : 2000);
    }
  };

  const allDMs = dms;
  const activePerson = allDMs.find(d => d.id === activeId);

  return (
    <div style={{ height: '100%', display: 'flex', background: '#1a1d21', fontFamily: 'var(--font-sans)' }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#19171d', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Lumio Health</div>
          <div style={{ fontSize: 10, color: '#0a7a6e', fontFamily: 'var(--font-mono)', marginTop: 2 }}>BC01 REDA</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {/* Channels */}
          <div style={{ padding: '4px 16px 4px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Canaux</div>
          {channels.map(ch => (
            <div key={ch.id} onClick={() => { setActive(ch.id); setUnreads(u => ({ ...u, [ch.id]: 0 })); }}
              style={{ padding: '5px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: activeId === ch.id ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 4, margin: '1px 6px' }}>
              <span style={{ fontSize: 13, color: activeId === ch.id ? 'white' : 'rgba(255,255,255,0.6)' }}># {ch.name}</span>
              {unreads[ch.id] > 0 && <span style={{ fontSize: 10, background: '#e01e5a', color: 'white', borderRadius: 100, padding: '1px 6px', fontWeight: 700 }}>{unreads[ch.id]}</span>}
            </div>
          ))}

          {/* DMs */}
          <div style={{ padding: '12px 16px 4px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Messages directs</div>
          {allDMs.map(dm => (
            <div key={dm.id} onClick={() => { setActive(dm.id); setUnreads(u => ({ ...u, [dm.id]: 0 })); }}
              style={{ padding: '5px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, background: activeId === dm.id ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 4, margin: '1px 6px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, background: dm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>{dm.avatar}</div>
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: dm.status === 'online' ? '#2bac76' : '#616061', border: '1.5px solid #19171d' }} />
              </div>
              <span style={{ fontSize: 13, color: activeId === dm.id ? 'white' : 'rgba(255,255,255,0.65)', flex: 1 }}>{dm.name}</span>
              {unreads[dm.id] > 0 && <span style={{ fontSize: 10, background: '#e01e5a', color: 'white', borderRadius: 100, padding: '1px 6px', fontWeight: 700 }}>{unreads[dm.id]}</span>}
            </div>
          ))}
        </div>

        {/* Identité */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 5, background: '#0a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
            {(studentName[0] || '?').toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'white', lineHeight: 1 }}>{studentName.split(' ')[0]}</div>
            <div style={{ fontSize: 10, color: '#2bac76' }}>● Actif</div>
          </div>
        </div>
      </div>

      {/* Zone chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header canal */}
        <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
          {activePerson ? (
            <>
              <div style={{ width: 28, height: 28, borderRadius: 5, background: activePerson.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>{activePerson.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{activePerson.name}</div>
                <div style={{ fontSize: 11, color: activePerson.status === 'online' ? '#2bac76' : 'rgba(255,255,255,0.35)' }}>{activePerson.status === 'online' ? '● En ligne' : '● Absent·e'}</div>
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>#{activeId}</div>
          )}
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((m, i) => {
            const showHeader = i === 0 || messages[i-1]?.from !== m.from;
            return (
              <div key={i} style={{ padding: showHeader ? '8px 0 2px' : '2px 0', display: 'flex', gap: 10 }}>
                {showHeader ? (
                  <div style={{ width: 32, height: 32, borderRadius: 5, background: m.color || '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>{m.avatar || m.from[0]}</div>
                ) : (
                  <div style={{ width: 32, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  {showHeader && (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: m.isMe ? 'rgba(255,255,255,0.95)' : 'white' }}>{m.from}</span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{m.time}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: m.isMe ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.88)', lineHeight: 1.6 }}>{m.text}</div>
                </div>
              </div>
            );
          })}
          {sending && isCamille && (
            <div style={{ padding: '8px 0', display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 5, background: '#0a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>CO</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 10 }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: `typedot 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {isCamille && (
          <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {exchangeCount < 2 && (
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                💬 {2 - exchangeCount} échange{2 - exchangeCount > 1 ? 's' : ''} avant déblocage du Livrable
              </div>
            )}
            {exchangeCount >= 2 && (
              <div style={{ fontSize: 11, color: '#2bac76', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                ✓ Livrable débloqué — disponible dans le dock
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder={`Message à Camille Ott…`}
                style={{ flex: 1, padding: '9px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: 'white', fontSize: 13, outline: 'none', fontFamily: 'var(--font-sans)' }}
              />
              <button onClick={sendMessage} disabled={sending || !draft.trim()} style={{
                width: 36, height: 36, borderRadius: 7,
                background: draft.trim() ? '#0a7a6e' : 'rgba(255,255,255,0.1)',
                border: 'none', cursor: draft.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        )}
        {!isCamille && (
          <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
              Canal en lecture seule — échangez avec Camille pour le diagnostic
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.slack = SlackApp;
