// ══════════════════════════════════════════════════════════════
//  app-pdf-bc3.jsx — PDF Viewer BC3
//  REMPLACE app-pdf.jsx pour le repo BC3
//  · 2 documents : Brief Alter Scope + Rapport Yassine
//  · Sélecteur de document en en-tête
//  · GuideApp mis à jour BC3
// ══════════════════════════════════════════════════════════════

// ─── Guide de mission BC3 ─────────────────────────────────────
function GuideApp() {
  const G = {
    app: { display: 'flex', flexDirection: 'column', height: '100%', background: '#1a2436', overflow: 'hidden' },
    header: { padding: '20px 28px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 },
    eyebrow: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(196,66,15,0.8)', marginBottom: 6 },
    title: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2 },
    body: { flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 },
    section: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '16px 20px' },
    sectionDay: { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,66,15,0.7)', marginBottom: 8 },
    sectionTitle: { fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: 8 },
    tip: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, fontFamily: 'var(--font-display)', fontStyle: 'italic' },
    action: { marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 5, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' },
    divider: { height: 1, background: 'rgba(255,255,255,0.06)' },
    footer: { padding: '12px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', flexShrink: 0 }
  };

  const tips = [
    {
      day: 'J−18 · Entrée dans la mission',
      title: 'Par où commencer ?',
      body: 'C\'est une urgence. Sonia t\'a écrit ce matin — il y a plusieurs problèmes distincts dans cette campagne. Commence par Mail pour lire son brief et le mail confidentiel de Théo.',
      action: '→ Mail → Mission de pilotage campagne (Sonia Ferracci)'
    },
    {
      day: 'J−14 · Reconstituer la chronologie',
      title: 'Lire dans l\'ordre',
      body: 'Il y a 4 problèmes distincts : juridique (claim), éthique (visuel), budgétaire (dépassement), et process (publication non validée). Pour chacun, identifie QUI a pris quelle décision, QUAND. Le brief Alter Scope et le rapport Yassine sont dans l\'Aperçu.',
      action: '→ Aperçu (PDF) → Brief initial + Résultats Yassine'
    },
    {
      day: 'J−10 · La question inconfortable',
      title: 'À qui appartient ce rapport ?',
      body: 'Camille te le dit clairement dans ses mémos : "La question que Lou doit se poser : mon rapport protège qui ?" Tu travailles pour Sonia. Mais Théo présente au board lundi. Ce n\'est pas neutre — prends position.',
      action: '→ Mémos vocaux → 3 enregistrements de Camille Ott'
    },
    {
      day: 'J−7 · Passer à l\'action',
      title: 'Écrire à Sonia avant de rédiger',
      body: 'Envoie ta première lecture à Sonia sur Slack. Elle a besoin d\'entendre ce que tu vois, pas juste le rapport final. Si tu identifies bien le problème, elle va creuser. Si tu l\'évites, elle te le dira.',
      action: '→ Slack → DM Sonia Ferracci'
    },
    {
      day: 'J−3 · Finaliser',
      title: 'Deux livrables, pas un',
      body: 'Tu dois produire un rapport d\'étape (C.10 — factuel, lisible par Théo) ET un plan de reprise (C.11 — opérationnel, 7 jours). Ce ne sont pas le même document. Le rapport décrit. Le plan prescrit.',
      action: '→ Dock → Livrable (icône verte avec coche)'
    }
  ];

  return (
    <div style={G.app}>
      <div style={G.header}>
        <div style={G.eyebrow}>Guide de mission · BC3 · PASS</div>
        <div style={G.title}>Lumio Health — aide au parcours</div>
      </div>
      <div style={G.body}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontFamily: 'var(--font-display)', padding: '0 0 4px' }}>
          Ce guide est là si tu te sens bloqué. Il ne donne pas les réponses — il indique où chercher.
        </div>
        {tips.map((t, i) => (
          <div key={i} style={G.section}>
            <div style={G.sectionDay}>{t.day}</div>
            <div style={G.sectionTitle}>{t.title}</div>
            <div style={G.tip}>{t.body}</div>
            <div style={G.action}>{t.action}</div>
          </div>
        ))}
        <div style={G.divider} />
        <div style={{ ...G.section, background: 'rgba(26,102,65,0.08)', borderColor: 'rgba(26,102,65,0.2)' }}>
          <div style={{ ...G.sectionDay, color: 'rgba(26,102,65,0.8)' }}>Rappel · Livrable final</div>
          <div style={G.sectionTitle}>Ce que tu dois produire</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {[
              ['C.7 / C.8', 'Analyse des écarts et des responsabilités — les 4 problèmes nommés et attribués.'],
              ['C.9', 'Matrice des risques actifs — nature, urgence, impact pour chaque problème.'],
              ['C.10', 'Rapport d\'étape — factuel, chiffré, sans euphémisme. Format board.'],
              ['C.11', 'Plan de reprise — STOP / ADJUST / KEEP sur 7 jours. Responsable + délai + critère.'],
              ['C.12', 'Note réflexive E5 — ce que cette situation t\'a appris sur ta posture de consultant·e.']
            ].map(([badge, desc]) => (
              <div key={badge} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 7px', background: 'rgba(26,102,65,0.2)', color: 'rgba(26,102,65,0.9)', borderRadius: 4, flexShrink: 0, marginTop: 2 }}>{badge}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={G.footer}>Ce guide est disponible à tout moment via le bouton ? en bas à gauche du desktop.</div>
    </div>
  );
}

// ─── PDF Viewer BC3 ───────────────────────────────────────────
const { useState: usePdfState } = React;

function PdfApp({ openGuide }) {
  const D = window.LUMIO_DATA;
  const [docId, setDocId] = usePdfState('brief'); // 'brief' | 'yassine'

  if (openGuide) return <GuideApp />;

  const docs = [
    { id: 'brief', label: 'Brief Alter Scope', subtitle: 'Brief créatif — oct. 2026', icon: '📄', pages: 4 },
    { id: 'yassine', label: 'Rapport Yassine', subtitle: 'Résultats & Budget — jan. 2027', icon: '📊', pages: 3 },
  ];
  const activeDoc = docs.find(d => d.id === docId);
  const [page, setPage] = usePdfState(1);

  // Reset page when switching doc
  const switchDoc = (id) => { setDocId(id); setPage(1); };

  return (
    <div style={pdfStyles.app}>
      {/* ── Toolbar ── */}
      <div style={pdfStyles.toolbar}>
        <div style={pdfStyles.tbGroup}>
          <button style={pdfStyles.tbBtn}>↩</button>
          <button style={pdfStyles.tbBtn}>↪</button>
        </div>
        <div style={pdfStyles.tbDivider} />
        {/* Sélecteur de document */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flex: 1, padding: '0 8px' }}>
          {docs.map(doc => (
            <button
              key={doc.id}
              onClick={() => switchDoc(doc.id)}
              style={{
                padding: '3px 10px',
                borderRadius: 5,
                border: 'none',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                background: docId === doc.id ? 'var(--ink)' : 'transparent',
                color: docId === doc.id ? 'white' : 'var(--ink-mute)',
                fontWeight: docId === doc.id ? 600 : 400,
                transition: 'all .15s'
              }}
            >{doc.icon} {doc.label}</button>
          ))}
        </div>
        <div style={pdfStyles.tbDivider} />
        <div style={pdfStyles.tbGroup}>
          <button style={pdfStyles.tbBtn} onClick={() => setPage(Math.max(1, page-1))}>‹</button>
          <span style={pdfStyles.pageInd}>{page} / {activeDoc.pages}</span>
          <button style={pdfStyles.tbBtn} onClick={() => setPage(Math.min(activeDoc.pages, page+1))}>›</button>
        </div>
        <div style={pdfStyles.tbDivider} />
        <div style={pdfStyles.tbGroup}>
          <button style={pdfStyles.tbBtn}>—</button>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)', minWidth: 36, textAlign: 'center' }}>100 %</span>
          <button style={pdfStyles.tbBtn}>+</button>
        </div>
        <div style={{ flex: 0 }} />
        <button style={pdfStyles.tbBtn}>🔍</button>
        <button style={pdfStyles.tbBtn}>🖨</button>
      </div>

      <div style={pdfStyles.body}>
        {/* Miniatures */}
        <div style={pdfStyles.thumbCol} className="scroll">
          {Array.from({ length: activeDoc.pages }, (_, i) => i+1).map(p => (
            <div
              key={p}
              onClick={() => setPage(p)}
              style={{ ...pdfStyles.thumb, ...(page===p ? pdfStyles.thumbActive : {}) }}>
              <div style={pdfStyles.thumbPage}>
                <div style={{ height: 4, background: '#1a2436', width: '70%', margin: '4px auto' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '85%', margin: '3px auto' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '85%', margin: '2px auto' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '60%', margin: '2px auto' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '85%', margin: '6px auto 2px' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '85%', margin: '2px auto' }} />
                <div style={{ height: 2, background: '#9a9ea8', width: '50%', margin: '2px auto' }} />
              </div>
              <div style={pdfStyles.thumbLabel}>{p}</div>
            </div>
          ))}
        </div>

        {/* Contenu */}
        <div style={pdfStyles.pageWrap} className="scroll">
          {docId === 'brief' && page === 1 && <BriefPage1 />}
          {docId === 'brief' && page === 2 && <BriefPage2 />}
          {docId === 'brief' && page === 3 && <BriefPage3 />}
          {docId === 'brief' && page === 4 && <BriefPage4 />}
          {docId === 'yassine' && page === 1 && <YassinePage1 />}
          {docId === 'yassine' && page === 2 && <YassinePage2 />}
          {docId === 'yassine' && page === 3 && <YassinePage3 />}
        </div>
      </div>
    </div>
  );
}

// ══ BRIEF ALTER SCOPE ═══════════════════════════════════════════

const BriefPage1 = () => {
  const b = window.LUMIO_DATA.alterScopeBrief;
  return (
    <div style={pdfStyles.page}>
      <div style={{ borderBottom: '2px solid #1a2436', paddingBottom: 14, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#c4420f', textTransform: 'uppercase' }}>Document interne · Octobre 2026 · Confidentiel</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9a9ea8', marginTop: 3 }}>Lumio Health × Alter Scope Agency</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9a9ea8' }}>AS-LH-2026-047</div>
      </div>
      <h1 style={pdfStyles.title}>{b.title}</h1>
      <div style={pdfStyles.byline}>{b.author} · {b.date}</div>

      <h2 style={pdfStyles.h2}>Contexte client</h2>
      <p style={pdfStyles.p}>Lumio Health relance sa communication suite au repositionnement « santé invisible » validé en septembre 2026. L'objectif est de faire connaître la marque auprès d'une cible B2B (DRH, médecins du travail) et d'amorcer une présence B2C (actifs urbains 30-50 ans).</p>

      <div style={{ background: '#f9f7f3', border: '1px solid #e6e1d8', borderRadius: 6, padding: '12px 16px', margin: '16px 0', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: '#5c6b7a' }}>Budget validé</span>
          <span style={{ fontWeight: 700, color: '#1a2436' }}>200 000 €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: '#5c6b7a' }}>Production créa</span>
          <span style={{ color: '#1a2436' }}>35% (≈ 70 000 €)</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: '#5c6b7a' }}>Médias</span>
          <span style={{ color: '#1a2436' }}>40% (≈ 80 000 €)</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#5c6b7a' }}>Activation événementielle</span>
          <span style={{ color: '#1a2436' }}>25% (≈ 50 000 €)</span>
        </div>
      </div>

      <h2 style={pdfStyles.h2}>Insight central</h2>
      <p style={pdfStyles.p}>Le stress chronique est un fantôme — présent partout, visible nulle part. Les gens le ressentent mais ne le voient pas. Les médecins ne l'objectivent pas. Les DRH ne savent pas le mesurer. Lumio rend le fantôme visible.</p>

      <div style={pdfStyles.pageNum}>— 1 —</div>
    </div>
  );
};

const BriefPage2 = () => (
  <div style={pdfStyles.page}>
    <h2 style={pdfStyles.h2}>Territoire créatif</h2>
    <p style={pdfStyles.p}><strong>« Fantôme de Soi »</strong> — la version de soi que le stress chronique efface progressivement. La campagne montre des moments du quotidien où quelqu'un est là physiquement mais absent mentalement.</p>

    <div style={{ background: '#1a2436', borderRadius: 8, padding: '16px 20px', margin: '16px 0', color: 'rgba(255,255,255,0.9)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(196,66,15,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Claim principal</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3 }}>
        « Votre corps parle avant vous. »
      </div>
    </div>

    <div style={pdfStyles.warningBox}>
      ⚠ <strong>Note interne Alter Scope</strong> — validation juridique du claim en cours au moment de la rédaction de ce brief (18 oct.). À boucler avant lancement. <em>Décision de lancement anticipé prise par Sonia Ferracci le 2 novembre — validation juridique décalée pour tenir le planning.</em>
    </div>

    <h2 style={pdfStyles.h2}>Déclinaisons visuelles (validées en réunion du 18 oct.)</h2>
    {[
      { n: 1, titre: 'Visuel "Réunion"', desc: 'Salarié en réunion, regard vague, post-its autour de lui invisibles' },
      { n: 2, titre: 'Visuel "Métro"', desc: 'Femme assise, yeux dans le vide, cercles noirs, foule floue autour d\'elle', note: 'Recall +34% en tests internes — maintenu malgré alertes internes sur risque de stigmatisation' },
      { n: 3, titre: 'Visuel "Dîner"', desc: 'Homme regardant son assiette, famille floue, silence visible' }
    ].map(v => (
      <div key={v.n} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #e6e1d8' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: '#c4420f', minWidth: 20 }}>{v.n}.</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2436', marginBottom: 3 }}>{v.titre}</div>
          <div style={{ fontSize: 12, color: '#5c6b7a', lineHeight: 1.5 }}>{v.desc}</div>
          {v.note && <div style={{ fontSize: 11, color: '#c4420f', marginTop: 4, fontStyle: 'italic' }}>⚠ {v.note}</div>}
        </div>
      </div>
    ))}

    <div style={pdfStyles.pageNum}>— 2 —</div>
  </div>
);

const BriefPage3 = () => (
  <div style={pdfStyles.page}>
    <h2 style={pdfStyles.h2}>Formats et canaux</h2>
    {[
      ['Display B2B', 'LinkedIn Sponsored Content, Newsletter RH Partenaires'],
      ['Affichage', '8 × 2 Paris + Lyon (quartiers d\'affaires)'],
      ['Digital B2C', 'Instagram, YouTube pre-roll'],
      ['Événementiel', 'Forum Préventica — prévu mars 2027'],
    ].map(([canal, detail]) => (
      <div key={canal} style={{ display: 'flex', gap: 16, padding: '8px 0', borderBottom: '1px solid #f0ece5', fontSize: 13 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#c4420f', minWidth: 110 }}>{canal}</div>
        <div style={{ color: '#3a4050' }}>{detail}</div>
      </div>
    ))}

    <h2 style={{ ...pdfStyles.h2, marginTop: 28 }}>Calendrier</h2>
    {[
      ['Semaine 46 (nov.)', 'BAT visuels + finalisation claim'],
      ['Semaine 47', 'Lancement campagne display B2B'],
      ['Semaine 50', 'Lancement affichage + digital B2C'],
      ['Janvier 2027', 'Bilan mi-parcours (prévu)'],
      ['Mars 2027', 'Événement Préventica'],
    ].map(([date, action]) => (
      <div key={date} style={{ display: 'flex', gap: 16, padding: '7px 0', borderBottom: '1px solid #f0ece5', fontSize: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#5c6b7a', minWidth: 110 }}>{date}</div>
        <div style={{ color: '#3a4050' }}>{action}</div>
      </div>
    ))}

    <div style={pdfStyles.pageNum}>— 3 —</div>
  </div>
);

const BriefPage4 = () => (
  <div style={pdfStyles.page}>
    <h2 style={pdfStyles.h2}>Notes et observations Alter Scope</h2>
    <p style={pdfStyles.p}>L'équipe créative note trois points de vigilance non résolus au moment de la livraison du brief :</p>

    {[
      { n: '01', titre: 'Validation juridique claim', corps: 'Le claim "Votre corps parle avant vous" n\'a pas encore été soumis à clearance. Alter Scope recommande une vérification des claims similaires dans le secteur santé-bien-être, en particulier sur les marchés UK et DACH.' },
      { n: '02', titre: 'Risque éthique visuel Métro', corps: 'Le visuel de la femme en état de surmenage visible présente un fort recall en test mais a suscité des réserves de deux membres de l\'équipe créative sur la représentation de la souffrance psychologique. Nous recommandons un test sur panel incluant des personnes concernées avant déploiement. Si le client décide de maintenir ce visuel, la responsabilité éditoriale lui revient.' },
      { n: '03', titre: 'Activation événementielle Préventica', corps: 'L\'inscription au Forum Préventica (mars 2027) n\'est pas dans l\'enveloppe budgétaire initiale. Si cette activation est confirmée, un avenant budgétaire devra être signé.' },
    ].map(item => (
      <div key={item.n} style={{ marginBottom: 20, padding: '14px 16px', background: '#faf8f5', border: '1px solid #e6e1d8', borderLeft: '3px solid #c4420f', borderRadius: '0 6px 6px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#c4420f', fontWeight: 700 }}>{item.n}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2436' }}>{item.titre}</span>
        </div>
        <p style={{ fontSize: 12, color: '#3a4050', lineHeight: 1.7, margin: 0 }}>{item.corps}</p>
      </div>
    ))}

    <div style={{ marginTop: 24, padding: '12px 14px', background: '#f0f7f3', border: '1px solid #c8e0d4', borderRadius: 6, fontSize: 11, color: '#1a6641' }}>
      Ce document constitue le brief créatif contractuel. Toute modification de périmètre, de budget ou de planning doit faire l'objet d'un avenant signé par les deux parties.
    </div>

    <div style={pdfStyles.pageNum}>— 4 —</div>
  </div>
);

// ══ RAPPORT YASSINE ═════════════════════════════════════════════

const YassinePage1 = () => {
  const r = window.LUMIO_DATA.yassineReport;
  return (
    <div style={pdfStyles.page}>
      <div style={{ borderBottom: '2px solid #1a2436', paddingBottom: 14, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#c4420f', textTransform: 'uppercase' }}>Document interne · 14 janvier 2027</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9a9ea8', marginTop: 3 }}>Yassine Morel · Content Manager</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#c4420f', background: '#fff0ea', padding: '3px 8px', borderRadius: 4 }}>AVANT VALIDATION</div>
      </div>
      <h1 style={pdfStyles.title}>{r.title}</h1>
      <div style={pdfStyles.byline}>{r.subtitle} · {r.author}</div>

      <h2 style={pdfStyles.h2}>Résumé des performances</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '16px 0' }}>
        {[
          { label: 'Impressions totales', val: '4 200 000', status: 'ok' },
          { label: 'Taux engagement LinkedIn', val: '2,1%', sub: 'obj. 1,5%', status: 'ok' },
          { label: 'CPM Display B2B', val: '14,20 €', sub: 'obj. 12,00 €', status: 'warn' },
          { label: 'Leads DRH entrants', val: '23', sub: 'obj. 15/mois', status: 'ok' },
        ].map(m => (
          <div key={m.label} style={{ background: m.status === 'ok' ? '#f0f7f3' : '#fff5f0', border: `1px solid ${m.status === 'ok' ? '#c8e0d4' : '#f0c8b0'}`, borderRadius: 6, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, color: '#5c6b7a', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: m.status === 'ok' ? '#1a6641' : '#c4420f' }}>{m.val}</div>
            {m.sub && <div style={{ fontSize: 10, color: '#9a9ea8', marginTop: 2 }}>{m.sub}</div>}
          </div>
        ))}
      </div>

      <div style={pdfStyles.pageNum}>— 1 —</div>
    </div>
  );
};

const YassinePage2 = () => (
  <div style={pdfStyles.page}>
    <h2 style={pdfStyles.h2}>Répartition budgétaire au 14 janvier 2027</h2>

    <div style={{ margin: '16px 0' }}>
      {[
        { ligne: 'Production créa', engage: 89400, alloue: 70000 },
        { ligne: 'Médias display/social', engage: 142000, alloue: 80000 },
        { ligne: 'Affichage Paris + Lyon', engage: 61200, alloue: 50000 },
        { ligne: 'Activation Préventica', engage: 19400, alloue: 0 },
      ].map(row => {
        const pct = row.alloue > 0 ? Math.round((row.engage / row.alloue - 1) * 100) : null;
        const over = row.engage > row.alloue;
        return (
          <div key={row.ligne} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: 8, padding: '8px 0', borderBottom: '1px solid #f0ece5', fontSize: 12, alignItems: 'center' }}>
            <div style={{ color: '#1a2436' }}>{row.ligne}</div>
            <div style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: over ? '#c4420f' : '#1a6641', fontWeight: 600 }}>{row.engage.toLocaleString('fr-FR')} €</div>
            <div style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#9a9ea8' }}>{row.alloue > 0 ? row.alloue.toLocaleString('fr-FR') + ' €' : '—'}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textAlign: 'right', color: over ? '#c4420f' : '#9a9ea8' }}>
              {pct !== null ? `+${pct}%` : 'hors budget'}
            </div>
          </div>
        );
      })}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: 8, padding: '10px 0 0', fontSize: 13, fontWeight: 700 }}>
        <div style={{ color: '#1a2436' }}>TOTAL ENGAGÉ</div>
        <div style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#c4420f' }}>312 000 €</div>
        <div style={{ fontFamily: 'var(--font-mono)', textAlign: 'right', color: '#9a9ea8' }}>200 000 €</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'right', color: '#c4420f' }}>+56%</div>
      </div>
    </div>

    <h2 style={pdfStyles.h2}>Origine des dépassements</h2>
    {[
      'Ajout format YouTube pre-roll (décision Sonia, 3 nov.) : +22 000 €',
      'Extension affichage Lyon (décision Sonia, 15 nov.) : +11 200 €',
      'Inscription Préventica (décision Sonia + Yassine, 1 déc.) : +19 400 €',
      'Surcoûts production retouches Alter Scope : +19 400 €',
    ].map((item, i) => (
      <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', fontSize: 12, color: '#3a4050', borderBottom: '1px solid #f5f2ed' }}>
        <span style={{ color: '#c4420f', fontFamily: 'var(--font-mono)', fontSize: 10, marginTop: 2 }}>→</span>
        <span>{item}</span>
      </div>
    ))}

    <div style={pdfStyles.pageNum}>— 2 —</div>
  </div>
);

const YassinePage3 = () => (
  <div style={pdfStyles.page}>
    <h2 style={pdfStyles.h2}>Signaux entrants</h2>
    {[
      { type: 'positif', icone: '✓', texte: '3 DRH ont demandé une démo suite au visuel "Réunion"' },
      { type: 'ambigu', icone: '~', texte: '1 cliente DRH : le visuel "Métro" était "fort mais dur" (neutre/ambigu)' },
      { type: 'negatif', icone: '!', texte: 'Decathlon : email DRH reçu le 17 janvier — "Retour sur campagne Lumio" — transmis à Sonia' },
      { type: 'negatif', icone: '!', texte: '12 commentaires "stigmatisation" sur Instagram — tous supprimés par modération le 15 jan.' },
    ].map((s, i) => (
      <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #f0ece5', fontSize: 12, alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: s.type === 'positif' ? '#1a6641' : s.type === 'ambigu' ? '#8a6e1a' : '#c4420f', minWidth: 16 }}>{s.icone}</span>
        <span style={{ color: '#3a4050', lineHeight: 1.5 }}>{s.texte}</span>
      </div>
    ))}

    <h2 style={{ ...pdfStyles.h2, marginTop: 28 }}>Publication LinkedIn du 14 janvier</h2>
    <div style={{ background: '#f0f4fb', border: '1px solid #c8d4e8', borderRadius: 6, padding: '14px 16px', fontSize: 12, color: '#3a4050', lineHeight: 1.6 }}>
      <p style={{ margin: '0 0 10px' }}><em>Post publié le 14 jan. à 11h32, sans validation préalable :</em></p>
      <p style={{ margin: '0 0 10px', fontStyle: 'italic', color: '#1a2436' }}>« Fiers de l'impact de la campagne Fantôme de Soi — 4,2 millions d'impressions en 8 semaines. La santé invisible prend de la visibilité 💙 #LumioHealth #FantômeDeSoi #SantéAuTravail »</p>
      <div style={{ fontSize: 11, color: '#9a9ea8' }}>87 likes · 14 partages · Sonia a demandé la suppression le 15 jan. · Post toujours en ligne au 19 jan.</div>
    </div>

    <div style={{ marginTop: 24, padding: '12px 14px', background: '#fff5f0', border: '1px solid #f0c8b0', borderRadius: 6, fontSize: 11, color: '#c4420f', lineHeight: 1.5 }}>
      <strong>Note Yassine :</strong> Je retire le post si confirmation explicite de Sonia ou de la direction. Compte tenu de l'engagement déjà généré, un retrait brutal pourrait susciter des questions. Je recommande un message d'accompagnement.
    </div>

    <div style={pdfStyles.pageNum}>— 3 —</div>
  </div>
);

// ─── Styles partagés ──────────────────────────────────────────
const pdfStyles = {
  app: { display: 'flex', flexDirection: 'column', height: '100%', background: '#e8e4dc', overflow: 'hidden' },
  toolbar: { background: '#f2ede6', borderBottom: '1px solid #dbd5cc', padding: '0 10px', height: 38, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 },
  tbGroup: { display: 'flex', gap: 2, alignItems: 'center' },
  tbBtn: { padding: '4px 8px', background: 'transparent', border: 'none', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: 'var(--ink-soft)' },
  tbDivider: { width: 1, height: 20, background: '#d0c9c0', margin: '0 4px' },
  pageInd: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', minWidth: 40, textAlign: 'center' },
  body: { display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 },
  thumbCol: { width: 64, background: '#ddd8d0', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flexShrink: 0 },
  thumb: { cursor: 'pointer', opacity: 0.6, transition: 'opacity .15s' },
  thumbActive: { opacity: 1 },
  thumbPage: { background: 'white', borderRadius: 3, aspectRatio: '0.77', padding: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' },
  thumbLabel: { fontSize: 9, textAlign: 'center', color: '#7a7570', fontFamily: 'var(--font-mono)', marginTop: 3 },
  pageWrap: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', justifyContent: 'center' },
  page: { width: '100%', maxWidth: 640, background: 'white', borderRadius: 4, padding: '40px 48px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', minHeight: 800, position: 'relative' },
  title: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: '#1a2436', margin: '0 0 6px' },
  byline: { fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9a9ea8', margin: '0 0 24px' },
  h2: { fontSize: 13, fontWeight: 700, color: '#1a2436', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '24px 0 10px', fontFamily: 'var(--font-mono)' },
  p: { fontSize: 13, color: '#3a4050', lineHeight: 1.75, margin: '0 0 12px' },
  ul: { paddingLeft: 20, margin: '0 0 12px' },
  warningBox: { background: '#fff5f0', border: '1px solid #f0c8b0', borderLeft: '3px solid #c4420f', borderRadius: '0 6px 6px 0', padding: '10px 14px', fontSize: 12, color: '#8a3010', lineHeight: 1.6, margin: '14px 0' },
  pageNum: { position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#c0bbb4' }
};
