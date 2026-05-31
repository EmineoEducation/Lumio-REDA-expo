// MAIL — BC01 REDA v3
function MailApp({openId}){
  var D=window.LUMIO_DATA||{};
  var inbox=[
    {id:'brief', from:'Théo Marczak', email:'theo@lumio-health.com', av:'TM', color:'#5c2d8f', subject:'Bienvenue — et première mission', date:'01/09/26 · 08:07', tags:['URGENT','MISSION'], body:D.briefEmail?.body||''},
    {id:'camille',from:'Camille Ott',  email:'c.ott@lumio-health.com', av:'CO', color:'#0a7a6e', subject:"Ce que j'attends de toi — et ce que le CRM ne te dira pas", date:'01/09/26 · 09:44', tags:['TERRAIN','CONFIDENTIEL'], body:D.camilleEmail?.body||''},
    {id:'d1', from:'LinkedIn', email:'no-reply@linkedin.com', av:'in', color:'#0a66c2', subject:'Vous avez 3 nouvelles opportunités en IDF', date:'31/08/26', distractor:true, body:'Nouvelles offres pour votre profil : Responsable Commercial IDF · MedTech.'},
    {id:'d2', from:'Salesforce', email:'noreply@salesforce.com', av:'SF', color:'#0070d2', subject:'Rapport CRM IDF — Semaine 35', date:'30/08/26', distractor:true, body:'Rapport hebdomadaire CRM — Périmètre IDF\nSemaine 35 · 47 comptes actifs · 8 opportunités.'},
    {id:'d3', from:'Espace RH', email:'rh@lumio-health.com', av:'RH', color:'#8a6eaf', subject:"Documents d'intégration — à retourner vendredi", date:'29/08/26', distractor:true, body:"Bienvenue chez Lumio Health !\n\nMerci de retourner avant vendredi :\n→ Contrat signé\n→ RIB\n→ Copie pièce d'identité\n→ Formulaire mutuelle\n\nL'équipe RH"},
  ];
  var [sel,setSel]=React.useState(openId||'brief');
  var [read,setRead]=React.useState(function(){return new Set(['brief','d2','d3']);});
  var mail=inbox.find(function(m){return m.id===sel;})||inbox[0];

  return (
    <div style={{display:'flex',height:'100%',background:'white',overflow:'hidden'}}>
      {/* Sidebar nav */}
      <div style={{width:180,background:'rgba(244,242,238,0.6)',borderRight:'1px solid var(--rule)',padding:'14px 0',flexShrink:0}}>
        <div style={{padding:'4px 14px',fontSize:11,fontWeight:600,color:'var(--ink-faint)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:4}}>Boîtes</div>
        {[{icon:'📥',label:'Réception',active:true},{icon:'⭐',label:'Suivis'},{icon:'📤',label:'Envoyés'},{icon:'🗑',label:'Corbeille'}].map(function(b,i){return (
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 14px',background:b.active?'rgba(60,100,180,0.15)':'transparent',fontWeight:b.active?500:400,fontSize:13,color:'var(--ink-soft)',cursor:'default'}}>
            <span>{b.icon}</span><span>{b.label}</span>
          </div>
        );})}
      </div>
      {/* Liste */}
      <div style={{width:280,borderRight:'1px solid var(--rule)',background:'#fafaf8',overflowY:'auto',flexShrink:0}}>
        <div style={{padding:'12px 14px 10px',borderBottom:'1px solid var(--rule)',position:'sticky',top:0,background:'#fafaf8'}}>
          <div style={{fontSize:16,fontWeight:700,color:'var(--ink)'}}>Réception</div>
          <div style={{fontSize:11,color:'var(--ink-faint)',marginTop:2}}>{inbox.length} messages</div>
        </div>
        {inbox.map(function(m){return (
          <div key={m.id} onClick={function(){setSel(m.id);setRead(function(r){return new Set([...r,m.id]);});}} style={{position:'relative',display:'flex',gap:10,padding:'11px 14px 11px 20px',borderBottom:'1px solid var(--rule)',cursor:'pointer',background:sel===m.id?'rgba(60,100,180,0.12)':'transparent',opacity:m.distractor?0.6:1}}>
            {!read.has(m.id)&&<div style={{position:'absolute',left:7,top:17,width:7,height:7,borderRadius:'50%',background:'#0a7a6e'}}/>}
            <div style={{width:26,height:26,borderRadius:'50%',background:m.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:10,fontWeight:600,flexShrink:0}}>{m.av}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                <span style={{fontSize:12,fontWeight:read.has(m.id)?400:700,color:'var(--ink)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.from}</span>
                <span style={{fontSize:10,color:'var(--ink-faint)',flexShrink:0,marginLeft:6}}>{(m.date||'').split(' · ')[0]}</span>
              </div>
              <div style={{fontSize:11,color:'var(--ink-soft)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginTop:2}}>{m.subject}</div>
              {m.tags&&<div style={{display:'flex',gap:3,marginTop:3}}>{m.tags.map(function(t){return <span key={t} style={{fontSize:9,fontWeight:700,padding:'1px 5px',borderRadius:3,background:'rgba(10,122,110,0.12)',color:'#0a7a6e'}}>{t}</span>;})}</div>}
            </div>
          </div>
        );})}
      </div>
      {/* Lecteur */}
      <div style={{flex:1,overflowY:'auto',minWidth:0}}>
        <div style={{display:'flex',gap:4,padding:'8px 14px',borderBottom:'1px solid var(--rule)',position:'sticky',top:0,background:'white',zIndex:2}}>
          {['↩ Répondre','↪ Transférer','🗑','⭐'].map(function(b){return <button key={b} style={{background:'transparent',border:'1px solid var(--rule)',padding:'4px 10px',borderRadius:5,fontSize:12,color:'var(--ink-soft)',cursor:'pointer'}}>{b}</button>;})}
        </div>
        <div style={{padding:'20px 28px 40px'}}>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:24,fontWeight:400,color:'var(--ink)',marginBottom:14}}>{mail.subject}</h1>
          <div style={{paddingBottom:14,borderBottom:'1px solid var(--rule)',display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
            <div style={{width:34,height:34,borderRadius:'50%',background:mail.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:12,fontWeight:600,flexShrink:0}}>{mail.av}</div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{mail.from} <span style={{fontWeight:400,color:'var(--ink-faint)'}}>{'<'}{mail.email}{'>'}</span></div>
              <div style={{fontSize:12,color:'var(--ink-mute)'}}>À : {D.student?.name||'vous'} · {mail.date}</div>
            </div>
          </div>
          <div style={{fontFamily:'var(--font-sans)',fontSize:13,lineHeight:1.8,color:'var(--ink-soft)'}}>
            {(mail.body||'').split('\n').map(function(l,i){return <p key={i} style={{margin:l.trim()===''?'0.5em 0':'0 0 0.3em 0'}}>{l||'\u00A0'}</p>;})}
          </div>
        </div>
      </div>
    </div>
  );
}
window.LUMIO_APPS=window.LUMIO_APPS||{};
window.LUMIO_APPS.mail=MailApp;
