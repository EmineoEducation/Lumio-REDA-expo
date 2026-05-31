# PAC · Bach REDA · BC01 — Prendre les commandes

**Parcours Activation Compétences · Éminéo**  
RNCP 31733 · Responsable du développement des affaires  
BC01 — Concevoir le plan d'action commerciale du périmètre en responsabilité

---

## Deploy

```bash
git clone https://github.com/EmineoEducation/lumio-reda-bc01
vercel --prod
```

## Variables d'environnement Vercel

```
ANTHROPIC_API_KEY=sk-ant-...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## Structure

```
/
├── index.html          # Entrée — React Babel CDN
├── data.js             # Données univers Lumio IDF + PAC_CONFIG BC01
├── main.jsx            # Login + Welcome + Root
├── desktop.jsx         # Window manager + dock + timer fictif
├── app-mail.jsx        # Boîte mail (Théo + Camille + distracteurs)
├── app-slack.jsx       # Slack — Camille Ott interlocutrice IA
├── app-browser.jsx     # Browser fictif + onglet portfolio
├── app-pdf.jsx         # PDF Viewer (CRM, budget) + Guide mission
├── app-voice.jsx       # Mémo vocal Camille Ott
├── app-notes.jsx       # Note réflexive Acte 5
├── app-livrable.jsx    # Formulaire BC01 (C.1.1 · C.1.2 · C.1.3)
├── app-portfolio.jsx   # Portfolio de compétences généré dynamiquement
├── app-assistant.jsx   # Jefferson — guide procédural
├── app-extras.jsx      # Finder + Calendar + WhatsApp easter egg
├── app-trash.jsx       # Corbeille
├── icons.jsx           # Stub icônes
├── vercel.json         # Config fonctions Vercel
└── api/
    ├── chat.js         # Proxy Anthropic API
    └── session.js      # Session persistante Upstash Redis
```

## Mode démo

Activé par défaut (`demoMode: true` dans `data.js`).

- Livrable pré-rempli avec des réponses imparfaites
- Livrable débloqué dès le démarrage (sans attendre 2 échanges Slack)
- Réponse Camille en 800ms (vs 2s en mode normal)

Pour désactiver le mode démo : `demoMode: false` dans `data.js` → `window.PASS_CONFIG`.

## Reset session

```js
window.LUMIO_RESET()
```

## Clé Redis

Format : `lumio:reda-bc01:session:{sessionId}`
