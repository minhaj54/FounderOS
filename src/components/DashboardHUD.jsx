import React from 'react';

const XP_LEVEL_MAP = [
  { level: 0, minXp: 0, title: 'Unranked 👥' },
  { level: 1, minXp: 100, title: 'Dreamer 🏹' },
  { level: 2, minXp: 300, title: 'Explorer 🗣️' },
  { level: 3, minXp: 500, title: 'Researcher 🧭' },
  { level: 4, minXp: 800, title: 'Builder 🔧' },
  { level: 5, minXp: 1100, title: 'Operator 👔' },
  { level: 6, minXp: 1500, title: 'Financer 💰' },
  { level: 7, minXp: 2000, title: 'Launcher 🚀' },
  { level: 8, minXp: 2700, title: 'Strategist 📈' },
  { level: 9, minXp: 3700, title: 'Visionary 🪐' }
];

export default function DashboardHUD({ xp, level, rankTitle, character, streakCount, ideasCount, badgesCount, onOpenTrophies }) {
  
  // Find current and next level thresholds
  const currentLvlIdx = level;
  const currentThreshold = XP_LEVEL_MAP[currentLvlIdx]?.minXp || 0;
  const nextThreshold = XP_LEVEL_MAP[currentLvlIdx + 1]?.minXp || (currentThreshold + 1000);
  
  const xpInCurrentLevel = xp - currentThreshold;
  const xpNeededForNext = nextThreshold - currentThreshold;
  
  let xpPercent = 0;
  if (level === 9) {
    xpPercent = 100;
  } else {
    xpPercent = Math.max(0, Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100));
  }

  // Calculate generic score
  const businessScore = Math.min(100, Math.round(
    (level * 8) + 
    (ideasCount * 2) + 
    (badgesCount * 4) + 
    (streakCount * 1.5)
  ));

  const getUnlockPreview = () => {
    if (level === 0) return 'Founder Passport';
    if (level === 1) return 'Idea Hunter';
    if (level === 2) return 'Customer Validation';
    if (level === 3) return 'Kanban Board';
    if (level === 4) return 'Financial Dungeon';
    if (level === 5) return 'Brand positioning';
    if (level === 6) return 'Launch Check';
    if (level === 7) return 'Pitch Slides';
    if (level === 8) return 'Scale KPIs';
    return 'Ultimate scale';
  };

  return (
    <header className="hud-header glass-panel">
      {/* Profile Card HUD */}
      <div className="hud-profile">
        <div className="hud-avatar">
          {character ? character.emoji : '👤'}
        </div>
        <div className="hud-info">
          <div className="hud-name">
            {character ? character.name : 'Unknown Hero'}
            {character && <span className="hud-class-tag">{character.founderClass}</span>}
          </div>
          <div className="hud-rank">
            Level {level}: <strong className="text-cyan">{rankTitle}</strong>
          </div>
        </div>
      </div>

      {/* XP Progression HUD */}
      <div className="xp-container">
        <div className="xp-label-row">
          <span className="text-muted">Progression to Next Level</span>
          <span className="text-cyan" style={{ fontWeight: 'bold' }}>
            {level === 9 ? 'MAX LEVEL' : `${xp} / ${nextThreshold} XP`}
          </span>
        </div>
        <div className="xp-bar-bg">
          <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
          <span>Unlock: {getUnlockPreview()}</span>
          <span>{Math.round(xpPercent)}%</span>
        </div>
      </div>

      {/* Ratios and Numbers HUD */}
      <div className="hud-stats-group">
        <div className="hud-stat">
          <span className="hud-stat-label">Daily Streak</span>
          <div className="hud-stat-value text-amber">
            🔥 {streakCount} Days
          </div>
        </div>
        <div className="hud-stat">
          <span className="hud-stat-label">Idea Vault</span>
          <div className="hud-stat-value text-cyan">
            💡 {ideasCount} Ideas
          </div>
        </div>
        <div className="hud-stat" style={{ cursor: 'pointer' }} onClick={onOpenTrophies}>
          <span className="hud-stat-label">Achievements</span>
          <div className="hud-stat-value text-emerald">
            🏆 {badgesCount} Badges
          </div>
        </div>
        <div className="hud-stat">
          <span className="hud-stat-label">Startup Rating</span>
          <div className="hud-stat-value text-purple">
            📈 {businessScore}%
          </div>
        </div>
      </div>
    </header>
  );
}
