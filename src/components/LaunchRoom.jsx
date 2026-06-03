import React, { useState, useEffect } from 'react';

const CHECKLIST_ITEMS = [
  { id: 'landing', label: 'Landing page copy & design complete 🌐' },
  { id: 'waitlist', label: 'Waitlist collection form integrated 📥' },
  { id: 'content', label: 'Social media content calendar written 📅' },
  { id: 'beta', label: 'Private Beta testers group created (Slack/Discord) 👥' },
  { id: 'assets', label: 'Marketing graphics & branding assets exported 🎨' },
  { id: 'email', label: 'Email autoresponder & newsletter template active ✉️' },
  { id: 'channels', label: 'Distribution channels verified (ProductHunt/X/LinkedIn) 🚀' }
];

export default function LaunchRoom({ launchState, onToggleLaunchItem, onTriggerLaunch }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState([]);

  const completedCount = CHECKLIST_ITEMS.filter(item => launchState[item.id]).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);
  const isReadyToLaunch = progressPercent === 100;

  const handleLaunchClick = () => {
    if (!isReadyToLaunch) {
      alert("Your launch preparation is incomplete! Tick all checklist items to unlock the launch engine.");
      return;
    }
    
    // Spawn CSS confetti particles
    const newParticles = [];
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a855f7'];
    
    for (let i = 0; i < 70; i++) {
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 2}s`,
        size: `${Math.random() * 8 + 6}px`,
        rotation: `${Math.random() * 360}deg`
      });
    }

    setParticles(newParticles);
    setShowConfetti(true);
    onTriggerLaunch();

    setTimeout(() => {
      setShowConfetti(false);
      setParticles([]);
    }, 5000);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Confetti Overlay */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 999 }}>
          {particles.map(p => (
            <div 
              key={p.id}
              className="confetti-particle"
              style={{
                left: p.left,
                backgroundColor: p.color,
                animationDelay: p.delay,
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotation})`
              }}
            />
          ))}
        </div>
      )}

      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 7: Launch Room</h1>
          <p className="workspace-subtitle">Verify your operational preparation checklist and push the launch toggle.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Quest Reward:</span>
          <span className="text-amber">+1000 XP</span>
          <span className="text-emerald">Launch Commander Badge 🚀</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Launch Checklist */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-indigo" style={{ marginBottom: '16px' }}>Pre-Launch Checklist</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CHECKLIST_ITEMS.map(item => (
              <label 
                key={item.id} 
                className={`glass-card flex-between`}
                style={{ 
                  padding: '14px 20px', 
                  cursor: 'pointer',
                  borderLeft: launchState[item.id] ? '4px solid var(--color-emerald)' : '1px solid rgba(255,255,255,0.05)',
                  background: launchState[item.id] ? 'rgba(16, 185, 129, 0.05)' : 'rgba(30, 41, 59, 0.25)',
                  textTransform: 'none'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '500', color: launchState[item.id] ? '#a7f3d0' : 'var(--text-primary)' }}>
                  {item.label}
                </span>
                <input 
                  type="checkbox" 
                  checked={!!launchState[item.id]} 
                  onChange={() => onToggleLaunchItem(item.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Action / Gauge Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 className="text-cyan font-display" style={{ marginBottom: '20px' }}>Launch Control Engine</h3>
          
          {/* Circular Progress Gauge */}
          <div className="launch-gauge flex-center">
            <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
              <circle 
                cx="100" 
                cy="100" 
                r="85" 
                fill="none" 
                stroke={isReadyToLaunch ? 'var(--color-emerald)' : 'var(--color-indigo)'} 
                strokeWidth="10" 
                strokeDasharray={2 * Math.PI * 85}
                strokeDashoffset={2 * Math.PI * 85 - (progressPercent / 100) * (2 * Math.PI * 85)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            
            <button 
              className="launch-btn-large" 
              onClick={handleLaunchClick}
              style={{
                background: isReadyToLaunch 
                  ? 'linear-gradient(135deg, var(--color-emerald), var(--color-cyan))' 
                  : 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: isReadyToLaunch ? 'black' : 'var(--text-muted)',
                boxShadow: isReadyToLaunch ? '0 10px 30px rgba(16, 185, 129, 0.4)' : 'none',
                cursor: isReadyToLaunch ? 'pointer' : 'not-allowed'
              }}
            >
              {launchState.launched ? 'LAUNCHED 🟢' : 'LAUNCH 🚀'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-display)' }} className="text-cyan">
              {progressPercent}% Complete
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {isReadyToLaunch 
                ? "Systems Go! Toggle the physical engine switch to launch." 
                : `Ready checklist items: ${completedCount} of ${CHECKLIST_ITEMS.length}`}
            </p>
          </div>

          {launchState.launched && (
            <div className="glass-card mt-20" style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '4px solid var(--color-emerald)', width: '100%' }}>
              <h4 className="text-emerald">✨ Blast Off Complete!</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                You have launched your startup! You are now eligible to enter the **Pitch Chamber** to build an investor deck.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
