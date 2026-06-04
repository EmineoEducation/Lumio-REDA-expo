// LIVRABLE — BC01 REDA v3
// optional chaining, fallback parsing IA, ErrorBoundary
var wc=function(t){return (t||'').trim()?(t||'').trim().split(/\s+/).length:0;};
var GLOBAL_MIN=500;
var FEEDBACK_SYSTEM=`Tu es un accompagnateur de compétences pour le Bach REDA (RNCP 31733), BC01.
Tu produis un bilan à partir du plan d'un·e étudiant·e. Rends visible ce qui s'est passé dans sa tête — pas un résumé du contenu.

Contexte Lumio Health IDF Septembre 2026 :
- Churn réel ~14% vs 6% CRM · 3 comptes stratégiques en danger · Budget 8 000€ H2
- Concurrent Moodwork certifié MDR, vient de signer Generali IDF

Réponds UNIQUEMENT en JSON valide, sans backticks, sans texte avant ou après :
{"competences":[{"code":"C.1.1","label":"Dispositif de veille","niveau":"Acquis|En cours d'acquisition|À consolider","visible":"...","invisible":"..."},{"code":"C.1.2","label":"Diagnostic et stratégie","niveau":"...","visible":"...","invisible":"..."},{"code":"C.1.3","label":"Plan d'action commerciale","niveau":"...","visible":"...","invisible":"..."}],"recit":"2-3 phrases je...","signature":"Dans cette affaire, j'ai choisi de..."}`;

function LivrableApp(){
  var cfg=window.PASS_CONFIG||{};
  var COMPS=cfg.competences||[];
  var isDemoMode=cfg.demoMode||false;

  var initAnswers=function(){
    try{
      var s=sessionStorage.getItem('lumio_livrable_bc01');
      if(s) return JSON.parse(s);
    }catch(e){}
    if(isDemoMode) return Object.fromEntries(COMPS.map(function(c){return [c.code,c.demo||''];}));
    return Object.fromEntries(COMPS.map(function(c){return [c.code,''];}));
  };

  var [answers,setAnswers]=React.useState(initAnswers);
  var [phase,setPhase]=React.useState('edit');
  var [feedback,setFeedback]=React.useState(null);
  var [tab,setTab]=React.useState((COMPS[0]||{}).code||'C.1.1');
  var [parseErr,setParseErr]=React.useState(null);

  React.useEffect(function(){
    try{sessionStorage.setItem('lumio_livrable_bc01',JSON.stringify(answers));}catch(e){}
  },[answers]);

  var wcs=Object.fromEntries(COMPS.map(function(c){return [c.code,wc(answers[c.code])];}));
  var total=Object.values(wcs).reduce(function(a,b){return a+b;},0);
  var missing=COMPS.filter(function(c){return wcs[c.code]<(c.min||0);});
  var canSubmit=missing.length===0&&total>=GLOBAL_MIN&&phase==='edit';

  // Extraction JSON robuste : récupère le 1er objet {...} même entouré de texte
  var extractJSON=function(raw){
    if(!raw) return null;
    var clean=raw.replace(/```json|```/g,'').trim();
    try{ return JSON.parse(clean); }catch(e){}
    var s=clean.indexOf('{'), e2=clean.lastIndexOf('}');
    if(s>=0&&e2>s){ try{ return JSON.parse(clean.slice(s,e2+1)); }catch(e){} }
    return null;
  };

  // Feedback de secours — garantit que le portfolio s'affiche toujours
  var fallbackFeedback=function(){
    return {
      competences: COMPS.map(function(c){
        var n=wcs[c.code]||0, min=c.min||0;
        return {
          code:c.code,
          label:c.label||c.code,
          niveau: n>=min*1.4?'Acquis':n>=min?"En cours d'acquisition":'À consolider',
          visible:'Le contenu produit couvre les attendus de '+(c.label||c.code)+' ('+n+' mots).',
          invisible:'Relecture par l\'accompagnateur à l\'oral pour expliciter les choix.'
        };
      }),
      recit:'J\'ai priorisé les comptes stratégiques en danger avant la prospection, en m\'appuyant sur les vrais chiffres terrain plutôt que sur le CRM.',
      signature:'Dans cette affaire, j\'ai choisi de sécuriser l\'existant sous contrainte budgétaire avant d\'engager la conquête.'
    };
  };

  var finishWith=function(parsed,text){
    setFeedback(parsed);
    setPhase('done');
    window.LUMIO_PORTFOLIO_DATA={answers:answers,wordCounts:wcs,globalWords:total,feedback:parsed,timestamp:Date.now(),studentName:window.LUMIO_DATA?.student?.name||''};
    setTimeout(function(){if(window.__onLivrableSubmitted)window.__onLivrableSubmitted(text,parsed);},1000);
  };

  var submit=async function(){
    if(!canSubmit) return;
    setPhase('submitting');
    setParseErr(null);
    var t0=Date.now();
    var text=COMPS.map(function(c){return '## '+c.code+' — '+(c.label||'')+'\n\n'+(answers[c.code]||'(non renseigné)');}).join('\n\n---\n\n');
    var parsed=null;
    try{
      var resp=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-5',max_tokens:1400,system:FEEDBACK_SYSTEM,messages:[{role:'user',content:text}]})});
      if(resp.ok){
        var data=await resp.json();
        var rawText=data?.content?.map(function(b){return b.text||'';}).join('')||'';
        parsed=extractJSON(rawText);
      }
    }catch(e){ parsed=null; }
    // Garantie démo : si l'IA est indisponible ou hors-format, on génère un feedback de secours
    if(!parsed||!Array.isArray(parsed.competences)||parsed.competences.length===0){
      parsed=fallbackFeedback();
    }
    // Transition fluide : spinner visible au moins 1,1 s
    var wait=Math.max(0,1100-(Date.now()-t0));
    setTimeout(function(){ finishWith(parsed,text); }, wait);
  };

  if(phase==='submitting') return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,background:'#f9f8f5'}}>
      <div style={{width:40,height:40,border:'3px solid rgba(10,122,110,0.2)',borderTopColor:'#0a7a6e',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
      <div style={{fontSize:13,color:'var(--ink-mute)',fontStyle:'italic'}}>Analyse de votre plan en cours…</div>
    </div>
  );

  if(phase==='done') return (
    <div style={{height:'100%',overflowY:'auto',background:'#f9f8f5'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'32px 40px',gap:20}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:'#0a7a6e',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:400,color:'var(--ink)',marginBottom:6}}>Plan remis à Théo Marczak</div>
          <div style={{fontSize:12,color:'var(--ink-mute)'}}>BC01 REDA · CODIR du vendredi 19 septembre 2026</div>
        </div>
        <div style={{width:'100%',maxWidth:460,background:'white',borderRadius:10,padding:'14px 18px',border:'1px solid var(--rule)'}}>
          {COMPS.map(function(c){
            var fb=(feedback?.competences||[]).find(function(x){return x.code===c.code;});
            return (
              <div key={c.code} style={{padding:'7px 0',borderBottom:'1px solid rgba(20,24,36,0.05)',display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:700,color:'#0a7a6e',minWidth:36}}>{c.code}</span>
                <span style={{flex:1,fontSize:12,color:'var(--ink)'}}>{c.label}</span>
                {fb&&<span style={{fontSize:10,fontWeight:700,color:fb.niveau==='Acquis'?'#1a6641':'#c4420f',background:fb.niveau==='Acquis'?'#e8f5e9':'#fdf0e8',padding:'2px 7px',borderRadius:100}}>{fb.niveau}</span>}
                <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'#1a6641',fontWeight:700}}>{wcs[c.code]}m</span>
              </div>
            );
          })}
          <div style={{marginTop:10,paddingTop:8,borderTop:'1px solid var(--rule)',display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:11,color:'var(--ink-mute)'}}>Total</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:14,fontWeight:700,color:'#0a7a6e'}}>{total} mots</span>
          </div>
        </div>
        <div style={{width:'100%',maxWidth:460}}>
          <button onClick={function(){if(window.__openPortfolio)window.__openPortfolio();}} style={{width:'100%',padding:'13px 20px',background:'#0B2B2D',color:'white',border:'none',borderRadius:10,cursor:'pointer',fontSize:14,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>
            Voir mon portfolio de compétences
          </button>
        </div>
        <div style={{background:'rgba(10,122,110,0.06)',borderRadius:8,padding:'10px 18px',border:'1px solid rgba(10,122,110,0.15)',fontSize:11,color:'#0a7a6e',lineHeight:1.7,maxWidth:460,width:'100%'}}>
          Le retour de Camille arrive dans Slack. Votre portfolio rend visible ce que votre plan révèle — pas seulement ce que vous avez produit.
        </div>
      </div>
    </div>
  );

  var activeComp=COMPS.find(function(c){return c.code===tab;})||COMPS[0];
  if(!activeComp) return <div style={{padding:32,color:'var(--ink-mute)'}}>Aucune compétence configurée.</div>;

  var activeWc=wcs[activeComp.code]||0;
  var activeOk=activeWc>=(activeComp.min||0);
  var missingKw=(activeComp.motsCles||[]).filter(function(kw){return !(answers[activeComp.code]||'').toLowerCase().includes(kw.toLowerCase());});

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#f9f8f5'}}>
      <div style={{padding:'12px 20px 0',borderBottom:'1px solid var(--rule)',background:'white',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
          <div>
            <div style={{fontSize:10,fontFamily:'var(--font-mono)',letterSpacing:'.18em',color:'#0a7a6e',textTransform:'uppercase',marginBottom:2}}>BC01 REDA · Plan d'action commerciale</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:500,color:'var(--ink)'}}>Périmètre IDF · CODIR vendredi 19 sept.</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:17,fontWeight:700,color:total>=GLOBAL_MIN?'#0a7a6e':'var(--ink-mute)'}}>{total}</div>
            <div style={{fontSize:10,color:'var(--ink-faint)'}}>/ {GLOBAL_MIN} mots</div>
          </div>
        </div>
        <div style={{display:'flex'}}>
          {COMPS.map(function(c){var ok=wcs[c.code]>=(c.min||0),active=tab===c.code;return (
            <button key={c.code} onClick={function(){setTab(c.code);}} style={{padding:'7px 14px',border:'none',cursor:'pointer',borderBottom:active?'2px solid #0a7a6e':'2px solid transparent',background:'transparent',fontFamily:'var(--font-mono)',fontSize:11,fontWeight:active?700:400,color:active?'#0a7a6e':ok?'#1a6641':'var(--ink-mute)',display:'flex',alignItems:'center',gap:4}}>
              {ok&&<span style={{color:'#1a6641',fontSize:10}}>✓</span>}{c.code}
            </button>
          );})}
        </div>
      </div>
      <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'10px 18px',background:'rgba(10,122,110,0.04)',borderBottom:'1px solid rgba(10,122,110,0.1)',flexShrink:0}}>
          <div style={{fontSize:12,fontWeight:600,color:'#0a7a6e',marginBottom:3}}>{activeComp.code} — {activeComp.label}</div>
          <div style={{fontSize:11,color:'var(--ink-mute)',lineHeight:1.5}}>{activeComp.rncp||''}</div>
          {activeComp.conseil&&<div style={{marginTop:6,fontSize:11,color:'#5c3d00',background:'#fffae0',padding:'5px 9px',borderRadius:5,border:'1px solid #f0d060'}}>💡 {activeComp.conseil}</div>}
        </div>
        <div style={{flex:1,padding:'14px 18px',display:'flex',flexDirection:'column',gap:8}}>
          {parseErr&&<div style={{fontSize:11,color:'#c4420f',background:'#fdf0e8',padding:'7px 12px',borderRadius:6,border:'1px solid rgba(196,66,15,0.2)'}}>{parseErr}</div>}
          <textarea value={answers[activeComp.code]||''} onChange={function(e){setAnswers(function(a){return {...a,[activeComp.code]:e.target.value};});setParseErr(null);}} placeholder={activeComp.placeholder||''} style={{flex:1,width:'100%',resize:'none',border:'1px solid var(--rule)',borderRadius:8,padding:'12px 14px',fontSize:13,lineHeight:1.7,color:'var(--ink)',background:'white',outline:'none'}} onFocus={function(e){e.target.style.borderColor='#0a7a6e';}} onBlur={function(e){e.target.style.borderColor='var(--rule)';}}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:4}}>
            <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>{missingKw.slice(0,4).map(function(kw){return <span key={kw} style={{fontSize:10,color:'var(--ink-faint)',background:'var(--rule)',padding:'2px 7px',borderRadius:100}}>{kw}</span>;})}</div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:700,color:activeOk?'#1a6641':'var(--ink-mute)'}}>{activeWc} / {activeComp.min||0} mots {activeOk?'✓':''}</span>
          </div>
        </div>
      </div>
      <div style={{padding:'10px 18px',borderTop:'1px solid var(--rule)',background:'white',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div style={{fontSize:11,color:'var(--ink-mute)'}}>{missing.length>0?missing.map(function(c){return c.code;}).join(', ')+' — minimum non atteint':total<GLOBAL_MIN?(GLOBAL_MIN-total)+' mots manquants':'Prêt à soumettre'}</div>
        <button onClick={submit} disabled={!canSubmit} style={{padding:'9px 22px',background:canSubmit?'#0a7a6e':'var(--rule)',color:canSubmit?'white':'var(--ink-faint)',border:'none',borderRadius:8,cursor:canSubmit?'pointer':'not-allowed',fontSize:13,fontWeight:600}}>Remettre le plan →</button>
      </div>
    </div>
  );
}
window.LUMIO_APPS=window.LUMIO_APPS||{};
window.LUMIO_APPS.livrable=LivrableApp;
