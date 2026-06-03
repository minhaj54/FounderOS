import React from 'react';

const QUESTS = [
  { level: 0, title: 'Identity Setup', tag: 'Start Here', emoji: '🪪' },
  { level: 1, title: 'Idea Journal', tag: 'Dreamer', emoji: '🏹' },
  { level: 2, title: 'Validation Quest', tag: 'Explorer', emoji: '🗣️' },
  { level: 3, title: 'Market Arena', tag: 'Researcher', emoji: '🧭' },
  { level: 4, title: 'MVP Lab', tag: 'Builder', emoji: '🔧' },
  { level: 5, title: 'Financial Dungeon', tag: 'Operator', emoji: '💰' },
  { level: 6, title: 'Brand Forge', tag: 'Architect', emoji: '🎨' },
  { level: 7, title: 'Launch Room', tag: 'Launcher', emoji: '🚀' },
  { level: 8, title: 'Pitch Chamber', tag: 'Strategist', emoji: '💼' },
  { level: 9, title: 'Scale Mode', tag: 'Visionary', emoji: '🪐' }
];

export default function QuestNavigation({ activeTab, onSelectTab, highestUnlockedLevel }) {
  
  const handleSelect = (q) => {
    if (q.level > highestUnlockedLevel) {
      alert(`🔒 Level locked! You must complete prior level quests to unlock Level ${q.level}: ${q.title}.`);
      return;
    }
    onSelectTab(`level-${q.level}`);
  };

  return (
    <nav className="quest-nav glass-panel">
      <div className="quest-nav-title">RPG Quest Map</div>
      <ul className="quest-list">
        {QUESTS.map(q => {
          const isLocked = q.level > highestUnlockedLevel;
          const isActive = activeTab === `level-${q.level}`;
          const isCompleted = q.level < highestUnlockedLevel;

          let statusClass = '';
          if (isLocked) statusClass = 'locked';
          else if (isActive) statusClass = 'active';
          else if (isCompleted) statusClass = 'completed';

          return (
            <li 
              key={q.level} 
              className={`quest-node ${statusClass}`}
              onClick={() => handleSelect(q)}
            >
              <div className="quest-icon">
                {isLocked ? '🔒' : isCompleted ? '✓' : q.emoji}
              </div>
              <div className="quest-details">
                <span className="quest-title">{q.title}</span>
                <span className="quest-level">Level {q.level} - {q.tag}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '4px' }}>
        <ul className="quest-list">
          <li 
            className={`quest-node ${activeTab === 'reflection' ? 'active' : ''}`}
            onClick={() => onSelectTab('reflection')}
          >
            <div className="quest-icon">💡</div>
            <div className="quest-details">
              <span className="quest-title">Reflection Vault</span>
              <span className="quest-level">Daily logs & failures</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
