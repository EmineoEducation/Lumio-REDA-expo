// VOICE MEMO — BC01 REDA v3
function VoiceApp(){
  var D=window.LUMIO_DATA||{};
  var transcription=D.memoVocal?.transcription??'Transcription non disponible.';
  var [playing,setPlaying]=React.useState(false);
  var [progress,setProgress]=React.useState(0);
  var ref=React.useRef(null);
  var DURATION=134;

  var play=function(){
    if(progress>=DURATION) setProgress(0);
    setPlaying(true);
    ref.current=setInterval(function(){
      setProgress(function(p){
        if(p>=DURATION){clearInterval(ref.current);setPlaying(false);return DURATION;}
        return p+1;
      });
    },100);
  };
  var pause=function(){clearInterval(ref.current);setPlaying(false);};
  React.useEffect(function(){return function(){clearInterval(ref.current);};}, []);

  var fmt=function(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+(s%60);};
  var pct=(progress/DURATION)*100;

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',background:'#1a1d21',fontFamily:'var(--font-sans)'}}>
      <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#0a7a6e',marginBottom:4}}>Mémos vocaux</div>
        <div style={{fontSize:16,fontWeight:600,color:'white'}}>1 message vocal reçu</div>
      </div>
      <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
        <div style={{padding:'10px 14px',background:'rgba(10,122,110,0.1)',borderRadius:10,border:'1px solid rgba(10,122,110,0.2)',display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:34,height:34,borderRadius:7,background:'#0a7a6e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'white',flexShrink:0}}>CO</div>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:'white'}}>Camille Ott</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',fontFamily:'var(--font-mono)'}}>Lun. 1er sept · 11h22 · 2:14</div>
          </div>
          <div style={{marginLeft:'auto',fontSize:11,fontStyle:'italic',color:'#0a7a6e'}}>Les vrais chiffres</div>
        </div>
      </div>
      <div style={{padding:'16px 22px',borderBottom:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:2,height:36,marginBottom:12}}>
          {Array.from({length:60},function(_,i){
            var h=6+Math.abs(Math.sin(i*.8)*18+Math.sin(i*.3)*8);
            return <div key={i} style={{width:3,height:h,borderRadius:2,background:(i/60)*100<pct?'#0a7a6e':'rgba(255,255,255,0.15)'}}/>;
          })}
        </div>
        <div style={{height:3,background:'rgba(255,255,255,0.1)',borderRadius:2,overflow:'hidden',marginBottom:4}}>
          <div style={{height:'100%',width:pct+'%',background:'#0a7a6e',transition:'width 0.1s'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,fontFamily:'var(--font-mono)',color:'rgba(255,255,255,0.35)',marginBottom:14}}>
          <span>{fmt(progress)}</span><span>{fmt(DURATION)}</span>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <button onClick={playing?pause:play} style={{width:48,height:48,borderRadius:'50%',background:'#0a7a6e',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(10,122,110,0.4)'}}>
            {playing
              ?<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              :<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            }
          </button>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'14px 18px'}}>
        <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'14px 16px',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'.15em',textTransform:'uppercase',color:'#0a7a6e',marginBottom:10}}>Transcription automatique</div>
          <pre style={{fontFamily:'var(--font-sans)',fontSize:12,color:'rgba(255,255,255,0.75)',lineHeight:1.8,whiteSpace:'pre-wrap',margin:0}}>{transcription}</pre>
        </div>
      </div>
    </div>
  );
}
window.LUMIO_APPS=window.LUMIO_APPS||{};
window.LUMIO_APPS.voice=VoiceApp;
