// DATA · PAC BC01 · Responsable du développement des affaires
// Opération Northgate : conquérir les grands comptes de santé au travail avant la saison Q4 · Lundi 9 septembre 2024
// ⚠️  Compléter le contenu narratif des documents fictifs (// TODO)

window.LUMIO_DATA = {
  student: { name: "{{PRENOM}} {{NOM}}", role: "Consultant·e", email: "{{EMAIL_ETUDIANT}}", company: "Lumio Health" },
  contexte: { title: "Fiche contexte · Lundi 9 septembre 2024", body: "Lumio Health vient de finaliser la V2 de son wearable anti-stress AURA destiné aux entreprises. Sonia Ferracci, Directrice Marketing, lance en urgence un comité de pilotage après la réception d'un signal fort : Jakob Rein, DRH du groupe Northgate (4 200 salariés, 12 sites en Europe), a demandé une proposition commerciale complète sous 3 semaines. Théo Marczak (CEO) impose d'aligner cette proposition sur la feuille de route RSE 2025 de Lumio et d'intégrer les nouvelles capacités IA du parcours client. Camille Ott (responsable BtoB) dispose de données terrain contradictoires : le marché santé-travail est porteur (+18 % sur 2 ans) mais deux concurrents viennent de baisser leurs prix de 15 %. Yassine Morel doit synchroniser la production de contenus avec le PAC sans budget supplémentaire." },

  // Documents fictifs — TODO compléter le contenu de chacun
  // [Acte 1] DOC-01 (email) — Déclencheur de l'affaire : Jakob Rein formalise la demande de Northgate, précise ses critères de choix (prix, déploiement multi-sites, accessibilité numérique), son calendrier de décision (30 septembre) et mentionne qu'un concurrent a déjà présenté une offre 15 % moins chère.
  // [Acte 1] DOC-02 (note_interne) — Fixe les axes de croissance autorisés (grands comptes santé, Europe du Nord), les objectifs chiffrés de CA (+22 % sur grands comptes), les contraintes budgétaires et rappelle l'alignement obligatoire sur les ODD 3 (santé) et 8 (travail décent) de la feuille de route RSE 2025.
  // [Acte 2] DOC-03 (rapport) — Fournit les données de marché clés : croissance +18 % sur 2 ans, deux concurrents identifiés avec baisse tarifaire de 15 %, cartographie des segments prioritaires, retours qualitatifs de 6 prospects grands comptes. Matière première pour le diagnostic externe et la segmentation.
  // [Acte 2] DOC-04 (tableau_de_bord) — Présente les forces et faiblesses internes : taux de conversion prospects (12 %), churn clients (8 %), NPS (67), délai moyen de déploiement (6 semaines), budget marketing disponible Q4 (38 000 €). Alimente le diagnostic interne (SWOT) et le calibrage du PAC.
  // [Acte 3] DOC-05 (brief) — Expose les contraintes de production de contenu (aucun budget additionnel, équipe 1 personne), propose 3 formats de contenu low-cost adaptés au parcours client BtoB (livre blanc, webinar, séquence email IA-assisted). Sert à calibrer les actions du PAC sur les phases de détection et de nurturing.
  // [Acte 3] DOC-06 (compte_rendu_reunion) — Détaille les critères de choix exprimés par Jakob Rein lors du premier échange : accessibilité numérique de la plateforme (RGAA exigé contractuellement), délai de livraison maximal 3 semaines, paiement à 60 jours, modalité de commande via EDI. Indispensable pour la construction du parcours client.
  // [Acte 4] DOC-07 (fiche_produit_interne) — Décrit les nouvelles fonctionnalités AURA V2 (algorithme de scoring stress, chatbot d'onboarding RGAA-compliant, bilan carbone intégré), le positionnement prix premium justifié et les arguments de valeur RSE. Nourrit à la fois le positionnement stratégique et la section IA/accessibilité du parcours client.
  // [Acte 5] DOC-08 (email) — Jakob Rein signale deux points bloquants : le prix unitaire dépasse de 9 % l'enveloppe Northgate et la démonstration du chatbot n'était pas accessible (échec test RGAA). Crée une tension dramatique finale qui oblige à revoir le PAC et le parcours client pour les rendre décisifs avant le 30 septembre.

  slackMessages: {
    initial: [{ from: "Sonia Ferracci", time: "08:32", text: "Construire un Plan d'Action Commerciale structuré pour le périmètre grands comptes BtoB de Lumio Health, en s'appuyant sur un diagnostic interne/externe rigoureux, une stratégie ciblée et un parcours client accessible et RSE-compatible, pour décrocher Northgate et sécuriser le pipeline Q4.", read: true }],
    delayed: []
  }
};

window.PASS_CONFIG = {
  bloc: "BC01",
  titre: "CONCEVOIR LE PLAN D'ACTION COMMERCIALE DU PERIMETRE EN RESPONSABILITE",
  epreuve: "Mise en situation professionnelle reconstituée scénarisée - Epreuve individuelle à l'écrit",
  deadline: "Lundi 9 septembre 2024 · 18h00",
  commanditaire: "Sonia Ferracci",
  dispositif: "PAC",
  temps: [
  {
    "n": 1,
    "label": "Ancrage terrain",
    "debut": 0,
    "fin": 20,
    "couleur": "#7a756c"
  },
  {
    "n": 2,
    "label": "Entrée dans l'affaire",
    "debut": 20,
    "fin": 50,
    "couleur": "#1b4f8a"
  },
  {
    "n": 3,
    "label": "Diagnostic",
    "debut": 50,
    "fin": 95,
    "couleur": "#1a6641"
  },
  {
    "n": 4,
    "label": "Production",
    "debut": 95,
    "fin": 175,
    "couleur": "#c4420f"
  },
  {
    "n": 5,
    "label": "Réflexion",
    "debut": 175,
    "fin": 210,
    "couleur": "#7a756c"
  }
],
  competences: [
  {
    "code": "1.1.1",
    "label": "Développer un dispositif de veille basé sur un process structuré et des sources d'information cohérentes avec les objectifs visés, en vue d'identifier les opportunités de développement et de mesurer les menaces/risques de perte de marché",
    "libelle": "Développer un",
    "rncp": "Compétence présente en tout ou partie dans le référentiel 'Responsable du développement des affaires', RNCP n°34164",
    "placeholder": "Décrivez le plan de veille que vous mettez en place pour Lumio Health : quelles étapes (collecte, exploitation, diffusion, conservation), quelles sources (concurrentielle, réglementaire, sectorielle medtech, RSE…), quelle fréquence et quels outils ? Montrez en quoi ce dispositif alimente directement le diagnostic stratégique de l'entreprise.",
    "min": 200,
    "motsCles": [
      "collecte",
      "exploitation",
      "diffusion",
      "conservation",
      "sources",
      "veille concurrentielle",
      "veille réglementaire",
      "medtech",
      "fréquence",
      "outils de veille",
      "signal faible"
    ],
    "conseil": "Structurez votre réponse en 4 étapes clairement nommées. Citez au moins 4 types de sources différentes et précisez pour chacune l'objectif visé. Évitez les généralités : ancrez chaque élément dans l'univers Lumio (wearables, santé au travail, BtoB)."
  },
  {
    "code": "1.1.2",
    "label": "Etudier les opportunités et menaces, aux niveaux interne et externe, via un outil d'analyse stratégique, pour définir l'attractivité du marché potentiel ainsi que la compétitivité de l'entreprise/de la marque",
    "libelle": "Etudier les",
    "rncp": "Compétence présente en tout ou partie dans le référentiel 'Responsable du développement des affaires', RNCP n°34164",
    "placeholder": "Réalisez le diagnostic interne et externe de Lumio Health à l'aide d'un outil d'analyse stratégique (SWOT, PESTEL, Porter…). Identifiez les avantages concurrentiels décisifs, les faiblesses, les opportunités de développement les plus réalistes économiquement, et les menaces chiffrées (ex. : baisse tarifaire concurrente de 15 %).",
    "min": 250,
    "motsCles": [
      "SWOT",
      "diagnostic interne",
      "diagnostic externe",
      "avantage concurrentiel",
      "faiblesse",
      "opportunité",
      "menace",
      "attractivité",
      "compétitivité",
      "risque",
      "faisabilité économique"
    ],
    "conseil": "Nommez explicitement l'outil utilisé et justifiez ce choix. Pour chaque quadrant ou axe, donnez au moins deux éléments propres à Lumio. Quantifiez les menaces dès que possible (données du marché, chiffres concurrents fournis dans les documents fictifs)."
  },
  {
    "code": "1.2.1",
    "label": "Décliner la stratégie commerciale de l'entreprise à l'échelle du périmètre en responsabilité, en ciblant ses clients, en considérant les axes de croissance définis par la direction générale ainsi que par la dimension RSE, afin de définir les objectifs de développement",
    "libelle": "Décliner la",
    "rncp": "Compétence présente en tout ou partie dans le référentiel 'Responsable du développement des affaires', RNCP n°34164",
    "placeholder": "Définissez la stratégie commerciale de Lumio Health pour le périmètre grands comptes BtoB : segmentation retenue, cible prioritaire (caractérisez le profil type du décideur), positionnement différenciateur. Fixez des objectifs de développement SMART en cohérence avec les ODD applicables (indiquez lesquels et pourquoi).",
    "min": 220,
    "motsCles": [
      "segmentation",
      "cible",
      "positionnement",
      "BtoB",
      "grands comptes",
      "objectifs SMART",
      "ODD",
      "RSE",
      "différenciation",
      "axe de croissance",
      "direction générale"
    ],
    "conseil": "Formulez au moins deux objectifs en respectant les 5 critères SMART. Associez chaque objectif à un ODD précis (numéro + intitulé) et expliquez le lien concret avec l'activité de Lumio. Évitez les objectifs vagues comme 'augmenter les ventes'."
  },
  {
    "code": "1.3.1",
    "label": "Définir le Plan d'Action Commerciale (PAC), à l'aide de méthodes commerciales et marketing, afin de piloter la performance commerciale",
    "libelle": "Définir le",
    "rncp": "Compétence présente en tout ou partie dans le référentiel 'Responsable du développement des affaires', RNCP n°34164",
    "placeholder": "Construisez le PAC de Lumio Health pour Q4 2024 : présentez-le sous forme structurée avec, pour chaque action, l'objectif visé, le responsable, les collaborateurs impliqués, le budget alloué, les dates de début et fin, et l'indicateur de résultat. Veillez à équilibrer les actions de détection, de conquête et de fidélisation.",
    "min": 300,
    "motsCles": [
      "PAC",
      "objectif",
      "responsable",
      "budget",
      "planning",
      "KPI",
      "détection",
      "conquête",
      "fidélisation",
      "action commerciale",
      "méthode",
      "pilotage",
      "performance commerciale"
    ],
    "conseil": "Présentez le PAC sous forme de tableau ou de liste structurée avec les 6 colonnes minimales requises. Vérifiez que vous avez au moins une action par type (détection / conquête / fidélisation). Chaque objectif d'action doit être SMART. Nommez explicitement les membres de l'équipe Lumio dans la colonne 'responsable/collaborateurs'."
  },
  {
    "code": "1.4.1",
    "label": "Contribuer à l'élaboration du parcours client, en intégrant les principaux critères de choix des clients du secteur BtoB, et en le rendant accessible, dans une visée de satisfaction client ainsi qu'une démarche RSE",
    "libelle": "Contribuer à",
    "rncp": "Compétence présente en tout ou partie dans le référentiel 'Responsable du développement des affaires', RNCP n°34164",
    "placeholder": "Cartographiez le parcours prospect/client type pour un grand compte comme Northgate : identifiez les étapes clés, les points de contact (y compris numériques et IA/bots), les critères de choix BtoB intégrés (prix, délai, modalités de commande et paiement). Précisez comment le parcours respecte le RGAA 4.1.2 et prend en compte l'impact environnemental.",
    "min": 220,
    "motsCles": [
      "parcours client",
      "points de contact",
      "critères de choix",
      "BtoB",
      "prix",
      "délai de livraison",
      "passation de commande",
      "paiement",
      "IA",
      "bot",
      "RGAA 4.1.2",
      "accessibilité",
      "impact environnemental",
      "RSE"
    ],
    "conseil": "Décrivez le parcours étape par étape (au moins 5 étapes). Pour chaque point de contact numérique, mentionnez une exigence RGAA 4.1.2 concrète. Intégrez au moins un usage d'IA (chatbot, recommandation, scoring) et justifiez sa pertinence dans le contexte Lumio. N'oubliez pas de mentionner un critère environnemental mesurable."
  }
]
};
