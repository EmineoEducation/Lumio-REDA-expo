// PORTFOLIO DE COMPÉTENCES — BC01 REDA v3
// Structure fidèle au modèle BEC : volet image gauche + compétences droite

function PortfolioApp(){
  var raw=window.LUMIO_PORTFOLIO_DATA;

  // Écran vide si pas de données
  if(!raw||typeof raw!=='object'||!raw.feedback){
    return (
      <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F2F0EB',gap:12,padding:40}}>
        <div style={{fontSize:32}}>📋</div>
        <div style={{fontSize:14,color:'#8A8680',textAlign:'center'}}>Portfolio disponible après soumission du livrable.</div>
        <div style={{fontSize:11,color:'#C8C4BA',textAlign:'center',maxWidth:280}}>Remplis et soumets le Livrable pour générer ton portfolio.</div>
      </div>
    );
  }

  var feedback=raw.feedback||{};
  var competences=Array.isArray(feedback.competences)?feedback.competences:[];
  var studentName=typeof raw.studentName==='string'?raw.studentName:'';
  var globalWords=typeof raw.globalWords==='number'?raw.globalWords:0;
  var recit=typeof feedback.recit==='string'?feedback.recit:'';
  var signature=typeof feedback.signature==='string'?feedback.signature:'';

  if(competences.length===0){
    return (
      <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F2F0EB',gap:12,padding:40}}>
        <div style={{fontSize:22}}>⚠️</div>
        <div style={{fontSize:14,color:'#c4420f',fontWeight:600}}>Données incomplètes</div>
        <div style={{fontSize:12,color:'#8A8680',textAlign:'center',maxWidth:300}}>Le feedback IA n'a pas pu être parsé. Retourne dans le Livrable et réessaie.</div>
      </div>
    );
  }

  var prenom=(studentName||'').split(' ')[0]||'';
  var nom=(studentName||'').split(' ').slice(1).join(' ')||'';

  // Niveau global
  var niveaux=competences.map(function(c){return c.niveau||'';});
  var gNiveau=niveaux.every(function(n){return n==='Acquis';})?'Acquis':niveaux.some(function(n){return n==='Acquis';})?'En cours':'À consolider';
  var gColor=gNiveau==='Acquis'?'#5C7A6A':gNiveau==='En cours'?'#C4730F':'#A09030';
  var gBg=gNiveau==='Acquis'?'#D8E8E0':gNiveau==='En cours'?'#FDF0E8':'#F5F0D8';

  // Compétences reformulées en "j'ai su…"
  var compLabels=competences.map(function(c){
    var map={'C.1.1':'Structurer un dispositif de veille commerciale','C.1.2':'Produire un diagnostic stratégique et définir une posture commerciale','C.1.3':'Élaborer un plan d\'action commercial sous contrainte réelle'};
    return map[c.code]||c.label||c.code;
  });

  // Image contextuelle — illustration SVG Lumio IDF
  var ContextImage=function(){
    return (
      <div style={{width:'100%',height:'100%',background:'linear-gradient(160deg,#0B2B2D 0%,#1a3a4a 50%,#0d5a4e 100%)',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'1.75rem'}}>
        {/* Motif décoratif */}
        <svg style={{position:'absolute',top:0,right:0,opacity:.08}} width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle cx="200" cy="80" r="120" stroke="white" strokeWidth="1"/>
          <circle cx="200" cy="80" r="80" stroke="white" strokeWidth="1"/>
          <circle cx="200" cy="80" r="40" stroke="white" strokeWidth="1"/>
        </svg>
        {/* Wearable icon */}
        <div style={{position:'absolute',top:'2rem',left:'1.75rem',width:52,height:52,borderRadius:14,background:'rgba(255,255,255,0.1)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>💚</div>
        {/* Badge */}
        <div style={{position:'absolute',top:'2rem',right:'1.75rem',background:'rgba(255,255,255,0.15)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:100,padding:'5px 14px',fontSize:10,fontWeight:500,letterSpacing:'.14em',textTransform:'uppercase',color:'white'}}>BC01 REDA · 3h30</div>
        {/* Overlay gradient */}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(11,43,45,0.8) 100%)'}}/>
        {/* Titre affaire */}
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)',marginBottom:6,fontFamily:'IBM Plex Mono,monospace'}}>Lumio Health · IDF · Sept. 2026</div>
          <div style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontSize:26,fontStyle:'italic',fontWeight:400,color:'white',lineHeight:1.25,marginBottom:10}}>« Prendre les commandes »</div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.6)',lineHeight:1.6}}>Concevoir le plan d'action commerciale<br/>du périmètre en responsabilité</div>
        </div>
      </div>
    );
  };

  // Check SVG
  var CheckSVG=function(){
    return (
      <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:9,height:9,flexShrink:0}}>
        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#5C7A6A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div style={{height:'100%',overflowY:'auto',background:'#F2F0EB',fontFamily:'"IBM Plex Sans",-apple-system,sans-serif',WebkitFontSmoothing:'antialiased'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        .port-card{background:#FAFAF8;border-radius:16px;overflow:hidden;max-width:860px;margin:0 auto;box-shadow:0 8px 48px rgba(28,43,58,.10),0 1px 3px rgba(28,43,58,.06)}
        .port-main{display:grid;grid-template-columns:360px 1fr;min-height:480px}
        .comp-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #E8E6E0}
        .comp-item:last-child{border-bottom:none}
        .comp-bullet{width:22px;height:22px;border-radius:50%;background:#D8E8E0;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        @media print{.no-print{display:none!important}}
      `}</style>

      <div style={{padding:'2rem 1.5rem'}}>
        {/* Header */}
        <div style={{maxWidth:860,margin:'0 auto 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',color:'#8A8680',marginBottom:4}}>PAC · Éminéo · Bach REDA</div>
            <div style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontSize:22,fontWeight:600,color:'#1C2B3A'}}>Portfolio de compétences</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:11,color:gColor,background:gBg,padding:'5px 14px',borderRadius:100,fontWeight:600}}>{gNiveau}</div>
            <button className="no-print" onClick={function(){window.print();}} style={{padding:'7px 16px',background:'transparent',border:'1.5px solid #C8C4BA',borderRadius:100,fontSize:12,color:'#6A7A88',cursor:'pointer'}}>↓ Imprimer</button>
          </div>
        </div>

        <div className="port-card">
          <div className="port-main">
            {/* Volet gauche — image contextuelle */}
            <div style={{position:'relative',overflow:'hidden',borderRadius:'16px 0 0 0'}}>
              <ContextImage/>
            </div>

            {/* Volet droit — compétences + identité */}
            <div style={{padding:'2rem 2rem 1.5rem',display:'flex',flexDirection:'column',gap:0}}>
              {/* Identité */}
              <div style={{marginBottom:'1.5rem',paddingBottom:'1.25rem',borderBottom:'1px solid #E8E6E0'}}>
                <div style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontSize:28,fontWeight:400,color:'#1C2B3A',lineHeight:1.15,marginBottom:4}}>{prenom} <span style={{fontWeight:300,color:'#6A7A88'}}>{nom}</span></div>
                <div style={{fontSize:11,color:'#8A8680',letterSpacing:'.1em',textTransform:'uppercase'}}>Responsable commercial IDF · Lumio Health</div>
              </div>

              {/* Compétences activées */}
              <div style={{marginBottom:'1.5rem',flex:1}}>
                <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:'0.75rem',fontWeight:500}}>Compétences activées</div>
                <div>
                  {competences.map(function(c,i){
                    return (
                      <div key={c.code} className="comp-item">
                        <div className="comp-bullet"><CheckSVG/></div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:10,fontFamily:'IBM Plex Mono,monospace',color:'#5C7A6A',letterSpacing:'.1em',marginBottom:2}}>{c.code}</div>
                          <div style={{fontSize:13,color:'#3A4A58',lineHeight:1.55,fontWeight:400}}>{compLabels[i]}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Volume */}
              <div style={{display:'flex',alignItems:'center',gap:16,padding:'10px 0',borderTop:'1px solid #E8E6E0',marginBottom:'1rem'}}>
                <div style={{fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',color:'#8A8680'}}>Volume produit</div>
                <div style={{fontFamily:'IBM Plex Mono,monospace',fontSize:20,fontWeight:600,color:'#5C7A6A'}}>{globalWords}</div>
                <div style={{fontSize:11,color:'#C8C4BA'}}>mots · session unique</div>
              </div>
            </div>
          </div>

          {/* Footer — récit + signature */}
          <div style={{padding:'1.75rem 2rem',borderTop:'1px solid #E8E6E0',background:'#FAFAF8'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem'}}>
              {recit&&(
                <div>
                  <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:'0.75rem',display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:20,height:1,background:'#C8C4BA'}}/>
                    Fil du raisonnement
                  </div>
                  <div style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontSize:16,fontStyle:'italic',color:'#3A4A58',lineHeight:1.8}}>"{recit}"</div>
                </div>
              )}
              {signature&&(
                <div>
                  <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:'0.75rem',display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:20,height:1,background:'#C8C4BA'}}/>
                    Posture professionnelle
                  </div>
                  <div style={{fontFamily:'Cormorant Garamond,Georgia,serif',fontSize:16,fontWeight:600,color:'#1C2B3A',lineHeight:1.8}}>{signature}</div>
                </div>
              )}
            </div>
            <div style={{marginTop:'1.25rem',paddingTop:'1rem',borderTop:'1px solid #E8E6E0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:10,color:'#C8C4BA'}}>PAC · Éminéo · {new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</div>
              <div style={{fontSize:10,color:'#C8C4BA',fontFamily:'IBM Plex Mono,monospace',letterSpacing:'.1em'}}>BC01 REDA · RNCP 31733</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PortfolioApp=PortfolioApp;
window.__openPortfolio=function(){
  if(window.__openApp){ window.__openApp('browser',{openPortfolio:true}); return; }
  if(window.__openAppInBrowser){ window.__openAppInBrowser('portfolio'); }
};
