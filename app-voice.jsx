// ══════════════════════════════════════════════════════════════
//  VOICE MEMO APP — BC01 REDA · Mémo Camille Ott
// ══════════════════════════════════════════════════════════════
function VoiceApp() {
  const D = window.LUMIO_DATA;
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const intervalRef = React.useRef(null);

  const DURATION = 134; // 2 min 14 sec en secondes

  const play = () => {
    if (done) { setProgress(0); setDone(false); }
    setPlaying(true);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= DURATION) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          setDone(true);
          return DURATION;
        }
        return p + 1;
      });
    }, 100); // accéléré ×10 pour la démo
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setPlaying(false);
  };

  React.useEffect(() => () => clearInterval(intervalRef.current), []);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const pct = (progress / DURATION) * 100;

  const memos = [
    { id: 'camille', from: 'Camille Ott', date: 'Lun. 1er sept · 11h22', duration: '2:14', desc: 'Les vrais chiffres terrain' },
  ];

  return (
    <div style={{ height: '100%', background: '#1a1d21', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a7a6e', marginBottom: 4 }}>Mémos vocaux</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>1 message vocal</div>
      </div>

      {/* Liste */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {memos.map(m => (
          <div key={m.id} style={{ padding: '12px 14px', background: 'rgba(10,122,110,0.1)', borderRadius: 10, border: '1px solid rgba(10,122,110,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: '#0a7a6e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>CO</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{m.from}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{m.date} · {m.duration}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Player */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 28px', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 4 }}>Camille Ott</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Lun. 1er septembre · 11h22</div>
        </div>

        {/* Waveform simulée */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 48, justifyContent: 'center' }}>
          {Array.from({ length: 60 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.8) * 24 + Math.sin(i * 0.3) * 12);
            const played = (i / 60) * 100 < pct;
            return (
              <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: played ? '#0a7a6e' : 'rgba(255,255,255,0.2)', transition: 'background 0.1s' }} />
            );
          })}
        </div>

        {/* Progress bar */}
        <div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#0a7a6e', borderRadius: 2, transition: 'width 0.1s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(DURATION)}</span>
          </div>
        </div>

        {/* Bouton play/pause */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={playing ? pause : play}
            style={{ width: 56, height: 56, borderRadius: '50%', background: '#0a7a6e', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(10,122,110,0.4)' }}
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
        </div>

        {/* Transcription */}
        {(done || progress > 10) && (
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a7a6e', marginBottom: 10 }}>Transcription automatique</div>
            <pre style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, whiteSpace: 'pre-wrap', margin: 0 }}>{D.memoVocal.transcription}</pre>
          </div>
        )}
        {!done && progress <= 10 && (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
            Appuie sur play pour écouter le mémo de Camille
          </div>
        )}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.voice = VoiceApp;
