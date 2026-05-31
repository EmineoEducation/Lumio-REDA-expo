// LIVRABLE APP · PAC BC01 · Responsable du développement des affaires
// Compétences : 1.1.1, 1.1.2, 1.2.1, 1.3.1, 1.4.1
// TODO : implémenter LivrableApp() selon le pattern app-livrable.jsx BC5

const wc = (t) => (t||'').trim() ? (t||'').trim().split(/\s+/).length : 0;
const GLOBAL_MIN = 520;

const JURY_PROMPT = `Tu es jury certifiant BC01.
Contexte : Opération Northgate : conquérir les grands comptes de santé au travail avant la saison Q4 · Lundi 9 septembre 2024.
Critères éliminatoires :
- Le PAC ne comporte pas les 6 éléments minimaux requis (objectif, actions par objectif, responsable ET collaborateurs, budget alloué, dates de début et fin, résultat/indicateur obtenu) : livrable considéré comme incomplet.
- Les rôles et responsabilités des membres de l'équipe Lumio (Sonia Ferracci, Camille Ott, Yassine Morel, Théo Marczak) ne sont pas distingués et attribués dans le PAC : absence de maîtrise de la dimension managériale du périmètre en responsabilité.
- Aucun indicateur d'impact mesurable (KPI chiffré, seuil de performance, date d'échéance) n'est associé aux actions du PAC ou aux objectifs de la stratégie commerciale.
- Le diagnostic stratégique ne mobilise aucun outil d'analyse nommé et structuré (SWOT, PESTEL, Porter ou équivalent) : l'absence de méthode invalide la compétence 1.1.2.
- Les objectifs de développement (compétence 1.2.1) ne respectent pas les critères SMART et/ou ne sont associés à aucun ODD identifié et justifié.
- Le parcours client ne mentionne ni les critères de choix BtoB (prix, délai, modalités de commande/paiement), ni les points de contact numériques conformes au RGAA 4.1.2, ni aucun usage de l'IA.
- Le dispositif de veille ne distingue pas les quatre étapes (collecte, exploitation, diffusion, conservation) et ne cite pas de sources diversifiées cohérentes avec le secteur medtech/santé au travail.
Format STRICT :
### 1.1.1 — [Satisfaisant / Insuffisant / Absent]\nUne phrase de retour précise.\n\n### 1.1.2 — [Satisfaisant / Insuffisant / Absent]\nUne phrase de retour précise.\n\n### 1.2.1 — [Satisfaisant / Insuffisant / Absent]\nUne phrase de retour précise.\n\n### 1.3.1 — [Satisfaisant / Insuffisant / Absent]\nUne phrase de retour précise.\n\n### 1.4.1 — [Satisfaisant / Insuffisant / Absent]\nUne phrase de retour précise.

## Niveau global
**[Non conforme / Partiellement conforme / Conforme / Conforme avec distinction]**

## Question de jury
Une question dérangeante.`;

// Référence : app-livrable.jsx du repo lumio-bc5
