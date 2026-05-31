// ══════════════════════════════════════════════════════════════
//  DATA — PAC Bach REDA · BC01
//  PAC · Parcours Activation Compétences · Éminéo
//  RNCP 31733 · Responsable du développement des affaires
//  Affaire : "Prendre les commandes"
//  Moment : Septembre 2026 · Semaine 1 du Responsable commercial IDF
// ══════════════════════════════════════════════════════════════

window.LUMIO_DATA = {

  // ─── Identité de l'étudiant·e ────────────────────────────
  student: {
    name: "{{PRENOM}} {{NOM}}",
    role: "Responsable commercial Île-de-France",
    email: "{{EMAIL_ETUDIANT}}",
    company: "Lumio Health"
  },

  // ─── Contexte Lumio IDF ───────────────────────────────────
  contexte: {
    title: "Fiche contexte — Lumio Health · Périmètre IDF",
    subtitle: "À lire en premier si vous découvrez l'univers",
    body: `QUI EST LUMIO HEALTH ?

Lumio Health est une medtech parisienne fondée en 2018 par Théo Marczak,
spécialisée dans la mesure du stress chronique en milieu professionnel.

Son produit phare : le Lumio Patch — un capteur physiologique porté au poignet
qui mesure variabilité cardiaque, conductance cutanée et température, traités
par un algorithme propriétaire pour produire un « score de stress » continu.

Pendant 8 ans, Lumio a vendu exclusivement en B2B — DRH de grandes entreprises
et ETI, médecins du travail, mutuelles. 180 références actives en France.

VOTRE PÉRIMÈTRE — IDF

Le périmètre Île-de-France représente 47 comptes B2B actifs sur les 180
references nationales. C'est historiquement le périmètre le plus dense —
et le plus négligé depuis 6 mois, suite au départ de votre prédécesseur.

Répartition actuelle :
— 12 comptes "stratégiques" (CA > 40 000 €/an) — dont 3 signaux d'alerte
— 22 comptes "actifs" (CA 10 000–40 000 €/an)
— 13 comptes "dormants" (dernier contact > 4 mois)

Budget prospection alloué pour H2 2026 : 8 000 €
(Décision Théo Marczak — gel budgétaire lié aux incertitudes MDR)

LE CONTEXTE STRATÉGIQUE

Northgate Capital (fonds américain, entré en 2025) pousse Lumio vers un pivot
B2C. Théo résiste. La certification MDR européenne (obligatoire pour revendiquer
une fonction médicale) est attendue au mieux en Q2 2027.

Sur le terrain, le concurrent Moodwork vient de signer Generali IDF —
un compte que Lumio avait prospecté pendant 18 mois.

LES PERSONNAGES CLÉS

— Théo Marczak · CEO fondateur
  Pro-B2B, anti-pivot précipité, gèle les budgets.

— Camille Ott · Responsable partenariats B2B
  8 ans de terrain. Connaît les vrais chiffres. Sera votre interlocutrice
  directe pendant cette première semaine.

— Sonia Ferracci · Directrice Marketing
  Arrivée janvier 2026 avec mandat de pivot B2C. Tension avec Camille.

OÙ EN ÊTES-VOUS ?

Premier lundi. Vous avez les clés du bureau, un accès CRM et un mail de
Théo qui vous demande un plan d'action complet pour le CODIR de rentrée —
vendredi 19 septembre. En 10 jours fictifs, dans l'univers Lumio.`
  },

  // ─── Email de mission — Théo → étudiant·e ────────────────
  briefEmail: {
    from: "Théo Marczak <theo@lumio-health.com>",
    to: "{{EMAIL_ETUDIANT}}",
    subject: "Bienvenue — et première mission",
    date: "Lundi 1er septembre 2026, 08h07",
    body: `Bienvenue dans l'équipe.

Je vais être direct — c'est ma façon de fonctionner.

Le périmètre IDF est en souffrance depuis six mois. Votre prédécesseur
est parti en juillet sans passation sérieuse. J'ai trois clients qui
ne répondent plus à mes appels. J'ai un concurrent — Moodwork — qui
a signé Generali la semaine dernière. Et j'ai un CODIR de rentrée
vendredi 19 septembre où les associés vont me demander ce qu'on fait
sur l'IDF.

Ce que je vous demande : un plan d'action commercial complet pour votre
périmètre. Pas un audit. Un plan. Avec des objectifs, des actions, un
budget, un calendrier.

Vous avez accès au CRM, aux documents du dossier Mission, et à Camille
Ott — Responsable partenariats B2B — qui connaît l'IDF mieux que moi.
Sollicitez-la.

Une chose à savoir : le budget prospection pour H2 est de 8 000 €.
Je sais que c'est serré. Faites avec.

Une chose à ne pas savoir, officiellement : les chiffres dans le CRM
ne reflètent pas l'état réel du terrain. Camille vous dira le reste.

Théo Marczak
CEO — Lumio Health
+33 6 ▒▒ ▒▒ ▒▒ ▒▒

— 
Lumio Health · 14 rue de la Paix, 75002 Paris
📱 Disponible sur WhatsApp : +33 6 ▒▒ ▒▒ ▒▒ ▒▒`
  },

  // ─── Email Camille — brief terrain ───────────────────────
  camilleEmail: {
    from: "Camille Ott <c.ott@lumio-health.com>",
    to: "{{EMAIL_ETUDIANT}}",
    subject: "Ce que j'attends de toi — et ce que le CRM ne te dira pas",
    date: "Lundi 1er septembre 2026, 09h44",
    body: `Bonjour,

Théo m'a dit que tu commences aujourd'hui. Bienvenue.

Je vais aller droit au but parce qu'on n'a pas beaucoup de temps.

Le CRM affiche un taux de churn IDF de 6 %. C'est faux. J'ai les
chiffres réels : on est autour de 14 % sur les 12 derniers mois,
si on compte les non-renouvellements et les comptes gelés.

Les trois comptes "stratégiques" que Théo surveille :
— Decathlon Pro (DRH Île-de-France) → dernier contact : 17 avril
— Groupe Lactalis (direction santé au travail) → RFP concurrent en cours
— MAIF Entreprises (convention mutuelles) → attend la MDR pour décider

Ces trois-là, si on les perd, c'est 180 000 € de CA récurrent.

Sur la prospection : Moodwork est très agressif en ce moment. Ils
viennent de recruter deux commerciaux IDF. L'appel d'offres mutuelles
45 M€ (réseau Aesio) sort en octobre — MDR obligatoire pour répondre.

Mon conseil : commence par les comptes en danger. La prospection peut
attendre une semaine. La fidélisation, non.

Je suis disponible sur Slack si tu veux qu'on échange sur ta stratégie.
Je ne validerai pas tout — c'est ton plan, pas le mien. Mais je te dirai
ce qui tient la route et ce qui ne tient pas.

Camille Ott
Responsable partenariats B2B · Lumio Health`
  },

  // ─── Export CRM IDF (données officielles — tronquées) ────
  crmExport: {
    title: "Export CRM — Périmètre IDF · Lumio Health",
    subtitle: "Données au 31 août 2026 · Salesforce",
    body: `SYNTHÈSE PÉRIMÈTRE IDF — AOÛT 2026
Données Salesforce · Exporté le 31/08/2026

─────────────────────────────────────────────
INDICATEURS CLÉS (affichés dashboard)
─────────────────────────────────────────────
Nombre de comptes actifs       : 47
CA récurrent annuel IDF        : 1 240 000 €
Taux de renouvellement H1 2026 : 94,1 %
Taux de churn déclaré          : 6,0 %
Comptes sans activité >60j     : 8
NPS moyen IDF                  : 47

─────────────────────────────────────────────
COMPTES STRATÉGIQUES (CA > 40 000 €)
─────────────────────────────────────────────
1. Decathlon Pro (DRH IDF)
   CA annuel : 68 000 € · Statut : Actif
   Dernier contact CRM : 17/04/2026 ✓
   Note interne : "Compte stable — renouvellement automatique prévu"

2. Groupe Lactalis (Direction santé travail)
   CA annuel : 54 000 € · Statut : Actif
   Dernier contact CRM : 12/03/2026 ✓
   Note interne : "Satisfait du produit — fidèle depuis 2021"

3. MAIF Entreprises (Convention mutuelles)
   CA annuel : 58 000 € · Statut : En négociation
   Dernier contact CRM : 08/06/2026 ✓
   Note interne : "Renouvellement conditionné à MDR — suivi en cours"

4. Sodexo Services (DRH groupe)
   CA annuel : 47 000 € · Statut : Actif
   Dernier contact CRM : 22/07/2026 ✓

5. Generali Assurances (Prévoyance santé)
   CA annuel : 43 000 € · Statut : PERDU
   Note : Passage chez concurrent (Moodwork) · Août 2026

─────────────────────────────────────────────
PIPELINE PROSPECTION IDF
─────────────────────────────────────────────
Opportunités ouvertes          : 7
Valeur pipeline estimée        : 180 000 €
Taux de conversion moyen       : 22 %
Durée moyenne cycle de vente   : 4,2 mois

─────────────────────────────────────────────
NOTE SYSTÈME
─────────────────────────────────────────────
Export généré automatiquement depuis Salesforce.
Certaines données peuvent présenter un délai
de mise à jour de 30 à 45 jours.`
  },

  // ─── Mémo vocal Camille ───────────────────────────────────
  memoVocal: {
    from: "Camille Ott",
    duree: "2 min 14 sec",
    date: "Lundi 1er sept · 11h22",
    transcription: `[Transcription automatique — Voice Memo]

"Ok donc je t'enregistre ça rapidement parce que c'est plus simple
que d'écrire tout ça.

Les chiffres du CRM. Écoute, le 94 % de renouvellement c'est calculé
sur les contrats formellement résiliés. Ce que ça ne compte pas, c'est
les comptes gelés, les comptes qui ont réduit leur licence de moitié,
les comptes qui répondent plus aux mails depuis quatre mois.

Moi j'ai un tableau que je fais à la main. Le vrai churn IDF sur les
douze derniers mois c'est autour de 14 %. Pas 6. Quatorze.

Decathlon Pro — je sais pas ce qui se passe là-bas. Kevin Margot,
le DRH, il a changé de poste en mai. La nouvelle DRH s'appelle... je
sais plus le nom, Stéphanie quelque chose. Elle a jamais été contactée.
Personne. C'est une relation à reconstruire de zéro.

Lactalis — j'ai eu un écho que leur DSI a testé l'offre Wittyfit ce
trimestre. Ça c'est pas dans le CRM. Ça me vient d'un contact terrain.
Peut-être rien, peut-être important.

Moodwork — ils ont deux nouveaux commerciaux IDF. J'en connais un,
on s'est croisés chez un client commun. Ils vont être très agressifs
cet automne. L'appel d'offres Aesio en octobre, c'est eux qui vont
le gagner si on n'a pas la MDR. Parce qu'eux ils l'ont.

Voilà. Appelle-moi si tu veux qu'on en parle. Mais pour le plan —
commence par les comptes en danger. Vraiment."`
  },

  // ─── Note confidentielle budget ───────────────────────────
  noteBudget: {
    title: "Note interne — Budget prospection H2 2026",
    from: "Direction générale",
    date: "28 août 2026",
    body: `NOTE INTERNE — CONFIDENTIELLE
Budget commercial H2 2026 · Périmètre IDF

Suite à la décision du CODIR du 25 août 2026, le budget prospection
alloué au périmètre Île-de-France pour le second semestre 2026 est
fixé à 8 000 € (huit mille euros).

Cette décision tient compte des incertitudes liées à la procédure MDR
en cours et de la décision de gel des investissements commerciaux
au-delà des comptes existants jusqu'à obtention de la certification.

Ventilation indicative proposée par la direction :
— Déplacements et visites terrain    : 2 500 €
— Événementiel / participation salons : 2 000 €
— Outils et ressources marketing      : 1 500 €
— Réserve imprévus                    : 2 000 €

Pour rappel, le budget H1 2026 (périmètre IDF) était de 22 000 €.

Cette enveloppe est définitive pour H2 2026. Toute demande
d'augmentation devra être soumise au CODIR de décembre.

Théo Marczak · CEO
Direction générale · Lumio Health`
  },

  // ─── Article presse — Moodwork / Generali ─────────────────
  pressArticles: [
    {
      source: "Les Échos",
      date: "Vendredi 29 août 2026",
      headline: "Moodwork signe Generali IDF et annonce deux recrutements commerciaux en Île-de-France",
      url: "lesechos.fr/tech-medias/wearables-sante-moodwork-generali-idf",
      body: `Moodwork, la startup de bien-être au travail certifiée MDR depuis mars 2026,
a annoncé jeudi la signature d'un contrat avec Generali Assurances pour
le déploiement de sa solution sur l'ensemble du périmètre Île-de-France.

Le contrat, dont le montant n'a pas été divulgué, porte sur 1 200 collaborateurs
et inclut une option de renouvellement sur 3 ans. Il s'agit de la troisième
grande signature B2B de Moodwork en Île-de-France depuis l'obtention de
sa certification MDR de classe IIa au premier trimestre 2026.

"La certification MDR est devenue un critère éliminatoire pour les DRH
des grands groupes", a déclaré le co-fondateur de Moodwork. "Les acheteurs
ne peuvent plus se permettre de déployer un outil qui n'a pas passé les
exigences réglementaires européennes."

La société a également annoncé le recrutement de deux responsables commerciaux
dédiés à l'Île-de-France, en anticipation de l'appel d'offres lancé par
le réseau Aesio Mutuelles, attendu en octobre 2026.

Pour rappel, Lumio Health — principal concurrent de Moodwork sur le segment
wearable stress B2B — est toujours en procédure d'obtention de la certification
MDR, avec une échéance estimée au mieux à Q2 2027.`
    }
  ],

  // ─── Fausse Une Les Échos ─────────────────────────────────
  fausseUne: {
    titre: "Wearables santé : Moodwork s'impose en IDF pendant que ses concurrents attendent leur MDR",
    surtitre: "MARCHÉ · BIEN-ÊTRE AU TRAVAIL",
    date: "Vendredi 29 août 2026",
    chapeau: "La startup certifiée MDR enchaîne les signatures. Ses rivaux non certifiés voient leurs clients hésiter.",
    source: "Les Échos"
  },

  // ─── Easter egg WhatsApp ──────────────────────────────────
  whatsapp: {
    participants: ["Théo Marczak", "Camille Ott"],
    messages: [
      { from: "Théo Marczak", time: "Sam 30 août · 18h41", text: "Camille — j'ai signé un accord de principe avec Darty Santé. 50 000 unités B2C, conditionné à la MDR. Je l'ai pas annoncé en interne." },
      { from: "Camille Ott", time: "18h52", text: "Tu rigoles." },
      { from: "Théo Marczak", time: "18h53", text: "Non. Northgate m'a forcé la main. Ils voulaient un signal B2C avant le board de décembre." },
      { from: "Camille Ott", time: "18h55", text: "Et si la MDR arrive pas en Q2 ? On livre quoi à Darty ?" },
      { from: "Théo Marczak", time: "18h57", text: "On gère à ce moment-là. Pour l'instant ça reste entre nous." },
      { from: "Camille Ott", time: "19h03", text: "Le/la nouveau·elle commercial IDF va trouver ça dans les docs ?" },
      { from: "Théo Marczak", time: "19h05", text: "Peut-être. S'il/elle est curieux·se." }
    ]
  },

  // ─── Personnages ──────────────────────────────────────────
  personnages: {
    commanditaire: { nom: 'Théo Marczak', role: 'CEO fondateur', avatar: 'TM', couleur: '#5c2d8f' },
    terrain: { nom: 'Camille Ott', role: 'Responsable partenariats B2B', avatar: 'CO', couleur: '#0a7a6e' },
    marketing: { nom: 'Sonia Ferracci', role: 'Directrice Marketing', avatar: 'SF', couleur: '#c4420f' }
  }
};

// ══════════════════════════════════════════════════════════════
//  PAC_CONFIG — BC01 REDA
// ══════════════════════════════════════════════════════════════
window.PASS_CONFIG = {
  bloc: 'BC01',
  diplome: 'Bach REDA',
  titre: 'Prendre les commandes',
  sousTitre: 'Concevoir le plan d\'action commerciale du périmètre en responsabilité',
  epreuve: 'Bilan de compétences · BC01 REDA',
  deadline: 'Vendredi 19 septembre 2026 · CODIR de rentrée',
  commanditaire: 'Théo Marczak',
  interlocuteurSlack: 'Camille Ott',
  dispositif: 'PAC',
  demoMode: true, // Mode démo — timer accéléré, docs pré-lus, livrable pré-rempli

  // ─── 5 actes ───────────────────────────────────────────────
  actes: [
    {
      n: 1, label: 'Premier jour', duree: 20,
      couleur: '#5c6878',
      objectif: 'Observer et comprendre. Lire les documents de démarrage, identifier les acteurs, saisir le contexte IDF. Pas de production.',
      docs: ['briefEmail', 'contexte', 'personnages']
    },
    {
      n: 2, label: 'L\'état réel du terrain', duree: 30,
      couleur: '#1b4f8a',
      objectif: 'Confronter les chiffres officiels (CRM) aux signaux terrain (Camille, presse). Identifier les tensions réelles.',
      docs: ['crmExport', 'memoVocal', 'noteBudget', 'pressArticles', 'fausseUne']
    },
    {
      n: 3, label: 'Hypothèse stratégique', duree: 45,
      couleur: '#0a7a6e',
      objectif: 'Formuler son diagnostic et sa posture sur Slack avec Camille. Elle questionne sans valider. 2 échanges débloquent le Livrable.',
      docs: ['slack-camille']
    },
    {
      n: 4, label: 'Production', duree: 80,
      couleur: '#c4420f',
      objectif: 'Rédiger le plan d\'action commercial. C.1.1 Veille · C.1.2 Diagnostic + Stratégie · C.1.3 PAC.',
      docs: ['livrable']
    },
    {
      n: 5, label: 'Recul', duree: 35,
      couleur: '#5c6878',
      objectif: 'Note réflexive : qu\'est-ce que ce plan révèle de ma posture commerciale ? Préparation à l\'oral.',
      docs: ['reflexion']
    }
  ],

  // ─── Compétences RNCP BC01 ─────────────────────────────────
  competences: [
    {
      code: 'C.1.1',
      label: 'Dispositif de veille',
      libelle: 'Veille',
      rncp: 'Développer un dispositif de veille basé sur un process structuré et des sources d\'information cohérentes avec les objectifs visés, en vue d\'identifier les opportunités de développement et de mesurer les menaces / risques de perte de marché.',
      placeholder: 'Décrivez votre dispositif de veille pour le périmètre IDF. Détaillez les étapes (collecte → exploitation → diffusion → conservation), les sources par catégorie (concurrentielle, sectorielle, réglementaire, commerciale…), et la fréquence. Appuyez-vous sur le contexte Lumio et les signaux identifiés.',
      min: 120,
      motsCles: ['collecte', 'exploitation', 'diffusion', 'sources', 'concurrentielle', 'sectorielle', 'veille', 'process', 'fréquence'],
      conseil: 'Le process de veille doit détailler clairement les 4 étapes : collecte, exploitation, diffusion, conservation. Les sources doivent être nommées par catégorie — pas juste "internet".',
      // Pré-rempli démo — volontairement imparfait
      demo: 'Je vais mettre en place une veille concurrentielle et sectorielle pour suivre les évolutions du marché des wearables santé en IDF. Je consulterai régulièrement les médias spécialisés comme Les Échos, La Tribune et les publications santé au travail. Je surveillerai aussi les activités de Moodwork et Biostream sur LinkedIn et leur site. Pour la veille réglementaire, je suivrai les actualités MDR. Je partagerai ces informations avec Camille Ott lors de nos points hebdomadaires. Je conserverai les informations dans un dossier partagé sur notre intranet.'
    },
    {
      code: 'C.1.2',
      label: 'Diagnostic + stratégie commerciale',
      libelle: 'Diagnostic',
      rncp: 'Etudier les opportunités et menaces, aux niveaux interne et externe, via un outil d\'analyse stratégique, pour définir l\'attractivité du marché potentiel ainsi que la compétitivité de l\'entreprise. Décliner la stratégie commerciale de l\'entreprise à l\'échelle du périmètre en responsabilité, en ciblant ses clients, en considérant les axes de croissance définis par la direction générale ainsi que par la dimension RSE.',
      placeholder: 'Produisez votre diagnostic interne et externe du périmètre IDF (forces, faiblesses, opportunités, menaces). Définissez ensuite votre stratégie commerciale : segmentation, cible prioritaire, positionnement. Intégrez les ODD et la dimension RSE de Lumio.',
      min: 180,
      motsCles: ['forces', 'faiblesses', 'opportunités', 'menaces', 'SWOT', 'segmentation', 'cible', 'positionnement', 'RSE', 'ODD'],
      conseil: 'Le diagnostic doit s\'appuyer sur les documents disponibles — pas sur des généralités. Les chiffres réels (churn 14 %, comptes en danger) doivent apparaître. La stratégie doit dériver du diagnostic.',
      demo: 'Le périmètre IDF présente plusieurs forces : une base de 47 clients actifs, un CA de 1,2M€ et une relation de confiance construite sur plusieurs années. Les faiblesses sont un taux de churn plus élevé que prévu et un budget prospection limité à 8000€. Les opportunités incluent l\'appel d\'offres Aesio en octobre et les entreprises non encore prospectées. Les menaces principales sont Moodwork qui vient d\'obtenir la MDR et recrute en IDF, et l\'incertitude autour de notre propre certification. Ma stratégie sera de prioriser la fidélisation des comptes stratégiques en danger avant d\'engager la prospection. La cible prioritaire sera les DRH d\'ETI et grandes entreprises IDF avec plus de 500 salariés.'
    },
    {
      code: 'C.1.3',
      label: 'Plan d\'action commerciale',
      libelle: 'PAC',
      rncp: 'Définir le Plan d\'Action Commerciale (PAC), à l\'aide de méthodes commerciales et marketing, afin de piloter la performance commerciale. Le PAC comprend à minima : objectif, actions par objectif, responsable, budget alloué, début et fin des actions, résultat obtenu. Les objectifs sont formulés de manière SMART. Le PAC respecte l\'équilibre de la répartition des actions de détection, de conquête et de fidélisation.',
      placeholder: 'Rédigez votre PAC pour le périmètre IDF sur H2 2026. Structurez-le en 3 axes : fidélisation (comptes en danger), détection (prospection ciblée) et conquête (nouveaux comptes). Pour chaque action : objectif SMART, responsable, budget alloué, dates, résultat attendu. Budget total disponible : 8 000 €.',
      min: 200,
      motsCles: ['SMART', 'fidélisation', 'détection', 'conquête', 'budget', 'objectif', 'actions', 'dates', 'résultat', '8 000', 'calendrier'],
      conseil: 'Chaque objectif doit être SMART : spécifique, mesurable, réalisable, pertinent, temporisé. Le budget 8 000 € doit être ventilé explicitement. L\'équilibre fidélisation / détection / conquête doit être visible.',
      demo: 'Plan d\'action commercial IDF · H2 2026\n\nAxe 1 — Fidélisation\nObjectif : Sécuriser les 3 comptes stratégiques en danger d\'ici fin octobre 2026\nActions : Prendre contact avec Decathlon Pro nouvelle DRH · Audit satisfaction Lactalis · Réunion MAIF sur calendrier MDR\nBudget : 2 500 €\n\nAxe 2 — Détection\nObjectif : Qualifier 15 nouveaux prospects en IDF d\'ici décembre 2026\nActions : Participation salon santé au travail octobre · Campagne LinkedIn ciblée DRH IDF · Réseau partenaires médecine du travail\nBudget : 3 500 €\n\nAxe 3 — Conquête\nObjectif : Signer 2 nouveaux contrats d\'ici fin H2 2026\nActions : Réponse appel d\'offres Aesio si MDR obtenue · Prospection ETI non adressées\nBudget : 2 000 €'
    }
  ]
};
