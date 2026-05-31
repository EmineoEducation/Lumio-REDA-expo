// PORTFOLIO DE COMPÉTENCES — BC01 REDA v3
// Validation stricte de LUMIO_PORTFOLIO_DATA avant rendu

function PortfolioApp(){
  var raw=window.LUMIO_PORTFOLIO_DATA;

  // Validation stricte
  if(!raw||typeof raw!=='object'){
    return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'#F2F0EB',fontFamily:'var(--font-sans)',flexDirection:'column',gap:12}}>
      <div style={{fontSize:32}}>📋</div>
      <div style={{fontSize:14,color:'#8A8680'}}>Portfolio disponible après soumission du livrable.</div>
    </div>;
  }

  var feedback=raw.feedback||{};
  var competences=Array.isArray(feedback.competences)?feedback.competences:[];
  var studentName=typeof raw.studentName==='string'?raw.studentName:'';
  var globalWords=typeof raw.globalWords==='number'?raw.globalWords:0;
  var recit=typeof feedback.recit==='string'?feedback.recit:'';
  var signature=typeof feedback.signature==='string'?feedback.signature:'';

  if(competences.length===0){
    return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:'#F2F0EB',fontFamily:'var(--font-sans)',flexDirection:'column',gap:12,padding:40}}>
      <div style={{fontSize:22}}>⚠️</div>
      <div style={{fontSize:14,color:'#c4420f',fontWeight:600}}>Données de portfolio incomplètes</div>
      <div style={{fontSize:12,color:'#8A8680',textAlign:'center',maxWidth:320}}>Le feedback IA n'a pas pu être parsé correctement. Retourne dans le Livrable et réessaie.</div>
    </div>;
  }

  var prenom=studentName.split(' ')[0]||'';
  var nom=studentName.split(' ').slice(1).join(' ')||'';
  var [activeI,setActiveI]=React.useState(0);
  var comp=competences[activeI]||competences[0];

  var lvlColor=function(n){
    if(n==='Acquis') return {bg:'#D8E8E0',text:'#3A6B58',dot:'#5C7A6A'};
    if(n==="En cours d'acquisition") return {bg:'#FDF0E8',text:'#8B4A1A',dot:'#C4730F'};
    return {bg:'#F5F0D8',text:'#6B5A1A',dot:'#A09030'};
  };

  var gNiveau=function(){
    var ns=competences.map(function(c){return c.niveau;});
    if(ns.every(function(n){return n==='Acquis';})) return 'Acquis';
    if(ns.some(function(n){return n==='Acquis';})) return "En cours d'acquisition";
    return 'À consolider';
  };
  var gn=gNiveau(); var gnc=lvlColor(gn);

  return (
    <div style={{minHeight:'100%',background:'#F2F0EB',fontFamily:'"IBM Plex Sans",-apple-system,sans-serif',padding:'2rem 1.5rem',WebkitFontSmoothing:'antialiased'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        .port-card{background:#FAFAF8;border-radius:16px;overflow:hidden;max-width:840px;margin:0 auto;box-shadow:0 8px 48px rgba(28,43,58,.10),0 1px 3px rgba(28,43,58,.06)}
        .port-main{display:grid;grid-template-columns:300px 1fr;min-height:460px}
        .ctab{padding:9px 13px;border-radius:8px;cursor:pointer;transition:all 0.2s;border:1.5px solid transparent;margin-bottom:4px}
        .ctab:hover{background:rgba(255,255,255,.08)}
        .ctab.active{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}
        .fade-in{animation:fadeIn .3s ease-out}
        @media print{.no-print{display:none!important}}
      `}</style>
      <div style={{maxWidth:840,margin:'0 auto 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',color:'#8A8680',marginBottom:4}}>PAC · Éminéo · Bach REDA</div>
          <div style={{fontFamily:'Cormorant Garamond',fontSize:22,fontWeight:600,color:'#1C2B3A'}}>Portfolio de compétences</div>
        </div>
        <button className="no-print" onClick={function(){window.print();}} style={{padding:'7px 16px',background:'transparent',border:'1.5px solid #C8C4BA',borderRadius:100,fontSize:12,color:'#6A7A88',cursor:'pointer'}}>↓ Imprimer</button>
      </div>
      <div className="port-card">
        <div className="port-main">
          {/* Volet gauche */}
          <div style={{background:'#1C2B3A',padding:'30px 26px',display:'flex',flexDirection:'column',gap:22}}>
            <div>
              <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(255,255,255,.4)',marginBottom:8}}>Candidat·e</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:26,fontWeight:400,color:'white',lineHeight:1.2}}>{prenom}</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:26,fontWeight:300,color:'rgba(255,255,255,.6)',lineHeight:1.2}}>{nom}</div>
            </div>
            <div style={{background:'rgba(255,255,255,.06)',borderRadius:10,padding:'13px 15px'}}>
              <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(255,255,255,.4)',marginBottom:6}}>Affaire</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:15,fontStyle:'italic',color:'rgba(255,255,255,.85)',marginBottom:4}}>« Prendre les commandes »</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.45)',lineHeight:1.5}}>BC01 REDA · Lumio Health IDF<br/>Septembre 2026</div>
            </div>
            <div>
              <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(255,255,255,.4)',marginBottom:10}}>Niveau global</div>
              <div style={{display:'inline-flex',alignItems:'center',gap:7,background:gnc.bg,borderRadius:100,padding:'5px 13px'}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:gnc.dot}}/>
                <span style={{fontSize:12,fontWeight:600,color:gnc.text}}>{gn}</span>
              </div>
            </div>
            <div style={{marginTop:'auto'}}>
              <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(255,255,255,.4)',marginBottom:10}}>Compétences</div>
              {competences.map(function(c,i){var cn=lvlColor(c.niveau||'');return (
                <div key={c.code} className={'ctab'+(activeI===i?' active':'')} onClick={function(){setActiveI(i);}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,.45)',marginBottom:2}}>{c.code}</div>
                      <div style={{fontSize:12,color:'rgba(255,255,255,.85)'}}>{c.label||''}</div>
                    </div>
                    <div style={{width:8,height:8,borderRadius:'50%',background:cn.dot,flexShrink:0}}/>
                  </div>
                </div>
              );})}
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:14}}>
              <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:6}}>Volume produit</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:28,color:'white',fontWeight:300}}>{globalWords}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>mots rédigés · session unique</div>
            </div>
          </div>
          {/* Volet droit */}
          <div style={{padding:'30px 30px',display:'flex',flexDirection:'column'}} key={activeI}>
            {comp&&<div className="fade-in" style={{flex:1}}>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:5}}>{comp.code||''}</div>
                <div style={{fontFamily:'Cormorant Garamond',fontSize:21,fontWeight:600,color:'#1C2B3A',marginBottom:10}}>{comp.label||''}</div>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,background:lvlColor(comp.niveau||'').bg,borderRadius:100,padding:'4px 12px'}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:lvlColor(comp.niveau||'').dot}}/>
                  <span style={{fontSize:11,fontWeight:600,color:lvlColor(comp.niveau||'').text}}>{comp.niveau||''}</span>
                </div>
              </div>
              <div style={{marginBottom:18}}>
                <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'#5C7A6A',fontWeight:500,marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:16,height:1,background:'#5C7A6A'}}/>Ce qui est visible
                </div>
                <div style={{fontSize:13,color:'#3A4A58',lineHeight:1.75}}>{comp.visible||''}</div>
              </div>
              <div style={{background:'rgba(92,122,106,.06)',borderRadius:10,padding:'14px 17px',border:'1px solid rgba(92,122,106,.15)'}}>
                <div style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'#5C7A6A',fontWeight:500,marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:16,height:1,background:'#5C7A6A'}}/>Ce qui ne l'est pas
                </div>
                <div style={{fontSize:13,color:'#3A4A58',lineHeight:1.75,fontStyle:'italic'}}>{comp.invisible||''}</div>
              </div>
            </div>}
            <div style={{display:'flex',justifyContent:'space-between',marginTop:18,paddingTop:14,borderTop:'1px solid #E8E6E0'}} className="no-print">
              <button onClick={function(){setActiveI(Math.max(0,activeI-1));}} disabled={activeI===0} style={{padding:'6px 14px',border:'1.5px solid #C8C4BA',borderRadius:100,background:'transparent',cursor:activeI===0?'default':'pointer',fontSize:12,color:'#8A8680',opacity:activeI===0?.3:1}}>← Précédent</button>
              <div style={{display:'flex',gap:5,alignItems:'center'}}>
                {competences.map(function(_,i){return <div key={i} onClick={function(){setActiveI(i);}} style={{width:6,height:6,borderRadius:'50%',background:i===activeI?'#5C7A6A':'#C8C4BA',cursor:'pointer',transition:'all 0.2s'}}/>;  })}
              </div>
              <button onClick={function(){setActiveI(Math.min(competences.length-1,activeI+1));}} disabled={activeI===competences.length-1} style={{padding:'6px 14px',border:'1.5px solid #C8C4BA',borderRadius:100,background:'transparent',cursor:activeI===competences.length-1?'default':'pointer',fontSize:12,color:'#8A8680',opacity:activeI===competences.length-1?.3:1}}>Suivant →</button>
            </div>
          </div>
        </div>
        {/* Footer récit + signature */}
        {(recit||signature)&&<div style={{padding:'26px 34px',borderTop:'1px solid #E8E6E0'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:30}}>
            {recit&&<div>
              <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:10,display:'flex',alignItems:'center',gap:8}}><div style={{width:20,height:1,background:'#C8C4BA'}}/>Fil du raisonnement</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:16,fontStyle:'italic',color:'#3A4A58',lineHeight:1.8}}>"{recit}"</div>
            </div>}
            {signature&&<div>
              <div style={{fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#8A8680',marginBottom:10,display:'flex',alignItems:'center',gap:8}}><div style={{width:20,height:1,background:'#C8C4BA'}}/>Posture professionnelle</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:16,fontWeight:600,color:'#1C2B3A',lineHeight:1.8}}>{signature}</div>
            </div>}
          </div>
          <div style={{marginTop:20,paddingTop:14,borderTop:'1px solid #E8E6E0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:10,color:'#C8C4BA'}}>PAC · Éminéo · {new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</div>
            <div style={{fontSize:10,color:'#C8C4BA',fontFamily:'var(--font-mono)',letterSpacing:'.1em'}}>BC01 REDA · RNCP 31733</div>
          </div>
        </div>}
      </div>
    </div>
  );
}

window.PortfolioApp=PortfolioApp;
window.__openPortfolio=function(){
  if(window.__openAppInBrowser) window.__openAppInBrowser('portfolio');
};
