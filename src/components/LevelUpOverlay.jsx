import React, { useEffect, useState } from 'react';

const RANKS = {
  0: { title: 'Unranked 👥', perk: 'Customizing passport...' },
  1: { title: 'Dreamer 🏹', perk: 'Log ideas, inspect market feasibility metrics.' },
  2: { title: 'Explorer 🗣️', perk: 'Customer Validation and interviews tracker active.' },
  3: { title: 'Researcher 🧭', perk: 'TAM/SAM/SOM arena and comparative competitor grids.' },
  4: { title: 'Builder 🔧', perk: 'Interactive MVP scope Kanban board.' },
  5: { title: 'Operator 👔', perk: 'Runway simulator & cost health meters unlocked.' },
  6: { title: 'Financer 💰', perk: 'Brand positioning matrix and visual archetypes forge.' },
  7: { title: 'Launcher 🚀', perk: 'Countdown room and launching checklist triggers.' },
  8: { title: 'Strategist 📈', perk: 'Pitch deck creator and fullscreen slide presenter.' },
  9: { title: 'Visionary 🪐', perk: 'Growth KPI scale dashboard and scaling streaks.' }
};

export default function LevelUpOverlay({ level, rankTitle, onClose }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate celebration particles
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#a855f7'];
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 1.5}s`,
        size: `${Math.random() * 8 + 4}px`
      });
    }
    setParticles(list);
  }, [level]);

  const details = RANKS[level] || { title: 'Incubated Founder', perk: 'Continuing scale operations' };

  return (
    <div className="modal-overlay" style={{ background: 'rgba(3, 5, 9, 0.95)', zIndex: 1000 }}>
      {/* Background Falling Confetti */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
        {particles.map(p => (
          <div 
            key={p.id}
            className="confetti-particle"
            style={{
              left: p.left,
              backgroundColor: p.color,
              animationDelay: p.delay,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      <div className="level-up-overlay-container">
        <div className="level-up-badge-logo">⚡</div>
        
        <p className="quest-level" style={{ color: 'var(--color-cyan)', letterSpacing: '0.2em', fontWeight: 'bold' }}>
          LEVEL UP ACHIEVED
        </p>
        
        <h1 className="level-up-title">Level {level}: {rankTitle}</h1>
        
        <p className="level-up-subtitle">
          "Your business acumen surges! You have reached a new rank."
        </p>

        <div className="glass-panel" style={{ padding: '20px 40px', maxWidth: '500px', marginBottom: '30px' }}>
          <h4 className="text-cyan font-display" style={{ marginBottom: '6px' }}>Unlocked Ability:</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {details.perk}
          </p>
        </div>

        <button className="btn btn-primary" onClick={onClose} style={{ padding: '12px 30px', fontSize: '15px' }}>
          Claim Level Rewards 🎁
        </button>
      </div>
    </div>
  );
}
