// PDF VIEWER + GUIDE — BC01 REDA v3
function PdfApp({openDoc}){
  var D=window.LUMIO_DATA||{};
  var [active,setActive]=React.useState(openDoc||'crm');
  var docs={
    crm:{label:'Export CRM IDF',tag:'Salesforce · 31/08/26',title:D.crmExport?.title||'Export CRM',subtitle:D.crmExport?.subtitle||'',body:D.crmExport?.body||''},
    budget:{label:'Note budget',tag:'Confidentiel · DG',title:D.noteBudget?.title||'Note budget',subtitle:D.noteBudget?.date||'',body:D.noteBudget?.body||''},
    guide:{label:'Guide de mission',tag:'PAC BC01',special:true},
  };
  var doc=docs[active]||docs.crm;
  if(doc.special) return <GuideApp/>;
  return (
    <div style={{display:'flex',height:'100%',background:'#f0ede6'}}>
      <div style={{width:200,background:'#e8e4dc',borderRight:'1px solid rgba(20,24,36,0.1)',flexShrink:0}}>
        <div style={{padding:'12px 14px',fontSize:10,fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-mute)'}}>Documents</div>
        {Object.entries(docs).map(function(entry){var k=entry[0],d=entry[1];return (
          <div key={k} onClick={function(){setActive(k);}} style={{padding:'10px 14px',cursor:'pointer',background:active===k?'rgba(10,122,110,0.1)':'transparent',borderLeft:active===k?'3px solid #0a7a6e':'3px solid transparent'}}>
            <div style={{fontSize:12,fontWeight:500,color:'var(--ink)'}}>{d.label}</div>
            <div style={{fontSize:10,color:'var(--ink-faint)',marginTop:2}}>{d.tag}</div>
          </div>
        );})}
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'24px 32px'}}>
        <div style={{maxWidth:680,margin:'0 auto',background:'white',borderRadius:8,padding:'32px 36px',boxShadow:'0 4px 24px rgba(20,24,36,0.08)'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#0a7a6e',marginBottom:8}}>{doc.subtitle}</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:500,color:'var(--ink)',marginBottom:20,paddingBottom:16,borderBottom:'1px solid var(--rule)'}}>{doc.title}</div>
          <pre style={{fontFamily:'var(--font-mono)',fontSize:12,lineHeight:1.8,color:'var(--ink-soft)',whiteSpace:'pre-wrap',margin:0}}>{doc.body}</pre>
        </div>
      </div>
    </div>
  );
}

function GuideApp(){
  var tips=[
    {day:'Acte 1 — Premier jour',title:'Par où commencer ?',body:"Théo t'a écrit à 08h07. Son email est dans Mail. Lis-le en premier. Puis celui de Camille — elle dit ce que Théo ne dit pas.",action:'→ Mail → "Bienvenue — et première mission"'},
    {day:'Acte 2 — Terrain',title:'Confronter les chiffres',body:"Le CRM affiche 6% de churn. Camille dit 14%. Écoute son mémo vocal avant de regarder le CRM.",action:'→ Mémos vocaux → Camille Ott · 11h22'},
    {day:'Acte 3 — Hypothèse',title:'Camille attend ta position',body:"Dis-lui ta première lecture : par quoi commences-tu ? Pourquoi ? 2 échanges débloquent le Livrable.",action:'→ Slack → DM Camille Ott'},
    {day:'Acte 4 — Production',title:'Le Livrable t\'attend',body:"3 compétences RNCP : C.1.1 Veille, C.1.2 Diagnostic, C.1.3 PAC. Ce n'est pas un résumé — c'est un plan défendable.",action:'→ Dock → Livrable BC01'},
    {day:'En cas de blocage',title:'Jefferson peut t\'aider',body:"Jefferson est le lapin guide dans le dock. Il te dit quoi faire, avec quel outil, dans quel ordre.",action:'→ Dock → Jefferson 🐰'},
  ];
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#1a2436',overflow:'hidden'}}>
      <div style={{padding:'20px 28px 16px',borderBottom:'1px solid rgba(255,255,255,0.08)',flexShrink:0}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.25em',textTransform:'uppercase',color:'rgba(10,122,110,0.8)',marginBottom:6}}>PAC · BC01 REDA</div>
        <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:300,color:'rgba(255,255,255,0.92)'}}>Guide de mission</div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 28px',display:'flex',flexDirection:'column',gap:14}}>
        {tips.map(function(t,i){return (
          <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'14px 18px'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(10,122,110,0.7)',marginBottom:6}}>{t.day}</div>
            <div style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.88)',marginBottom:6}}>{t.title}</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.55)',lineHeight:1.65,fontStyle:'italic',marginBottom:8}}>{t.body}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontFamily:'var(--font-mono)',padding:'5px 10px',background:'rgba(255,255,255,0.04)',borderRadius:4}}>{t.action}</div>
          </div>
        );})}
      </div>
    </div>
  );
}

window.LUMIO_APPS=window.LUMIO_APPS||{};
window.LUMIO_APPS.pdf=PdfApp;
window.LUMIO_APPS.guide=GuideApp;
