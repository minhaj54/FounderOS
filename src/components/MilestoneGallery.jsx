import React from 'react';

const BADGES_LIST = [
  { id: 'passport', name: 'Founder Passport 🪪', desc: 'Completed Level 0 setup and generated your founder profile card.', emoji: '🪪' },
  { id: 'hunter', name: 'Idea Hunter 🏹', desc: 'Logged 5 or more ideas in your startup Idea Vault.', emoji: '🏹' },
  { id: 'whisperer', name: 'Customer Whisperer 🗣️', desc: 'Logged at least 3 customer validation interviews.', emoji: '🗣️' },
  { id: 'explorer', name: 'Market Explorer 🧭', desc: 'Estimated TAM/SAM/SOM and isolated competitor gaps.', emoji: '🧭' },
  { id: 'architect', name: 'MVP Architect 🔧', desc: 'Moved 3 or more MVP tasks to the completed Kanban column.', emoji: '🔧' },
  { id: 'survivor', name: 'Finance Survivor 💰', desc: 'Maintained a healthy runway reserve of 6+ months.', emoji: '💰' },
  { id: 'brand', name: 'Brand Architect 🎨', desc: 'Forged your company archetype and mapped pricing positioning.', emoji: '🎨' },
  { id: 'commander', name: 'Launch Commander 🚀', desc: 'Completed the launch preparation list and launched waitlist.', emoji: '🚀' },
  { id: 'ready', name: 'Investor Ready 💼', desc: 'Built your investor slides and ran presentation viewport.', emoji: '💼' },
  { id: 'scale', name: 'Scale Master 🪐', desc: 'Acquired MRR traction and documented scale operations SOPs.', emoji: '🪐' },
  { id: 'wisdom', name: 'Wisdom Alchemist 💡', desc: 'Logged a business failure and converted the mistake to lesson XP.', emoji: '💡' }
];

export default function MilestoneGallery({ unlockedBadges, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="text-cyan font-display" style={{ marginBottom: '6px' }}>Milestone Trophy Room</h2>
        <p className="quest-level" style={{ marginBottom: '24px' }}>
          Trophies unlocked: {unlockedBadges.length} / {BADGES_LIST.length}
        </p>

        <div className="badges-showcase-grid">
          {BADGES_LIST.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`badge-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                title={badge.desc}
              >
                <span className="badge-item-icon">{badge.emoji}</span>
                <div className="badge-item-name">{badge.name.split(' ')[0] + ' ' + badge.name.split(' ')[1]}</div>
                <p className="badge-item-desc">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
