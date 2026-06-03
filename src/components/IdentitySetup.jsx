import React, { useState } from 'react';

const SKILL_OPTIONS = [
  'Coding', 'Marketing', 'Design', 'Sales', 'Product Management', 'Copywriting', 'Finance', 'Growth Hacking'
];

export default function IdentitySetup({ character, onComplete, onReset }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [interests, setInterests] = useState('');
  const [capital, setCapital] = useState('');
  const [weeklyTime, setWeeklyTime] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [previousAttempts, setPreviousAttempts] = useState('0');
  const [riskAppetite, setRiskAppetite] = useState('Medium');

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !capital || !weeklyTime) {
      alert('Please fill out all core character attributes!');
      return;
    }

    // Determine Founder Class
    let founderClass = 'Builder Founder';
    const hasCoding = selectedSkills.includes('Coding');
    const hasMarketing = selectedSkills.includes('Marketing') || selectedSkills.includes('Copywriting');
    const hasSales = selectedSkills.includes('Sales');
    const capNum = parseFloat(capital);

    if (hasCoding && capNum < 10000) {
      founderClass = 'Technical Founder';
    } else if (hasMarketing) {
      founderClass = 'Creator Founder';
    } else if (capNum >= 25000 && (hasSales || selectedSkills.includes('Finance'))) {
      founderClass = 'Operator Founder';
    } else if (riskAppetite === 'High' && (industry === 'AI' || hasCoding)) {
      founderClass = 'Visionary Founder';
    } else if (hasSales && hasMarketing) {
      founderClass = 'D2C Founder';
    }

    const emojiMap = {
      'Technical Founder': '💻',
      'Creator Founder': '🎨',
      'Operator Founder': '👔',
      'Visionary Founder': '🚀',
      'D2C Founder': '📦',
      'Builder Founder': '🔨'
    };

    const newChar = {
      name,
      age: parseInt(age),
      skills: selectedSkills,
      interests,
      capital: capNum,
      weeklyTime: parseInt(weeklyTime),
      industry,
      previousAttempts: parseInt(previousAttempts),
      riskAppetite,
      founderClass,
      emoji: emojiMap[founderClass] || '👤',
      createdDate: new Date().toLocaleDateString()
    };

    onComplete(newChar);
  };

  if (character) {
    return (
      <div className="char-view">
        <div className="workspace-title-row">
          <div className="workspace-title-group">
            <h1 className="workspace-title">Founder Passport</h1>
            <p className="workspace-subtitle">Your identity is locked in. Ready for the startup journey.</p>
          </div>
          <button className="btn btn-accent" onClick={onReset}>
            Reset Character 🔄
          </button>
        </div>

        <div className="char-card glass-panel">
          <div className="char-avatar-section">
            <div className="char-avatar-big">{character.emoji}</div>
            <div className="hud-class-tag">{character.founderClass}</div>
          </div>
          <div className="char-details-section">
            <div className="char-header">
              <div>
                <h2>{character.name}</h2>
                <p className="quest-level">Level 1 Founder Passport Unlocked</p>
              </div>
              <span className="text-emerald font-display" style={{ fontWeight: 'bold' }}>ACTIVE RUN</span>
            </div>

            <div className="char-stats-grid">
              <div className="char-stat-item">
                <span className="char-stat-lbl">Class:</span>
                <span className="char-stat-val text-cyan">{character.founderClass}</span>
              </div>
              <div className="char-stat-item">
                <span className="char-stat-lbl">Target Sector:</span>
                <span className="char-stat-val">{character.industry}</span>
              </div>
              <div className="char-stat-item">
                <span className="char-stat-lbl">Starting Budget:</span>
                <span className="char-stat-val text-emerald">${character.capital?.toLocaleString()}</span>
              </div>
              <div className="char-stat-item">
                <span className="char-stat-lbl">Time Dedication:</span>
                <span className="char-stat-val">{character.weeklyTime} hrs/week</span>
              </div>
              <div className="char-stat-item">
                <span className="char-stat-lbl">Risk appetite:</span>
                <span className="char-stat-val text-amber">{character.riskAppetite}</span>
              </div>
              <div className="char-stat-item">
                <span className="char-stat-lbl">Past failures:</span>
                <span className="char-stat-val">{character.previousAttempts} attempts</span>
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label>Acquired Skills</label>
              <div className="tags-container" style={{ pointerEvents: 'none' }}>
                {character.skills?.map(skill => (
                  <span key={skill} className="tag-btn selected">{skill}</span>
                ))}
                {character.skills?.length === 0 && <span className="text-muted">None selected</span>}
              </div>
            </div>

            {character.interests && (
              <div>
                <label>Focus Interests</label>
                <p style={{ fontSize: '13.5px', marginTop: '4px', color: 'var(--text-secondary)' }}>
                  {character.interests}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card mt-20" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--color-emerald)' }}>
          <div style={{ fontSize: '28px' }}>🎉</div>
          <div>
            <h4 className="text-emerald">Level 1 Unlocked: The Dreamer</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              You have unlocked your **Idea Journal**. Proceed to **Level 1** on the Quest Navigator to record your startup ideas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 0: Identity Setup</h1>
          <p className="workspace-subtitle">Forge your founder character card to begin your startup RPG.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Reward:</span>
          <span className="text-amber">+100 XP</span>
          <span className="text-emerald">Founder Passport Badge 🪪</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px' }}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Founder Name</label>
            <input 
              id="name"
              type="text" 
              placeholder="Enter your hero name..." 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              id="age"
              type="number" 
              placeholder="e.g. 25" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="capital">Capital Available ($)</label>
            <input 
              id="capital"
              type="number" 
              placeholder="e.g. 5000" 
              value={capital} 
              onChange={e => setCapital(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weeklyTime">Hours/Week Available</label>
            <input 
              id="weeklyTime"
              type="number" 
              placeholder="e.g. 20" 
              value={weeklyTime} 
              onChange={e => setWeeklyTime(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Preferred Industry</label>
            <select id="industry" value={industry} onChange={e => setIndustry(e.target.value)}>
              <option value="SaaS">SaaS & B2B Software</option>
              <option value="D2C">Direct-to-Consumer (D2C)</option>
              <option value="AI">Artificial Intelligence (AI)</option>
              <option value="Web3">Web3 & Crypto</option>
              <option value="Indie Hack">Indie Hacking / Niche Sites</option>
              <option value="Small Biz">Local / Small Business</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="riskAppetite">Risk Appetite</label>
            <select id="riskAppetite" value={riskAppetite} onChange={e => setRiskAppetite(e.target.value)}>
              <option value="Low">Low (Pragmatic, Bootstrapped)</option>
              <option value="Medium">Medium (Calculated growth)</option>
              <option value="High">High (Venture scale or bust)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="previousAttempts">Previous Startup Attempts</label>
            <input 
              id="previousAttempts"
              type="number" 
              placeholder="0" 
              value={previousAttempts} 
              onChange={e => setPreviousAttempts(e.target.value)} 
            />
          </div>

          <div className="form-group full-width">
            <label>Skills Acquired (Select all that apply)</label>
            <div className="tags-container">
              {SKILL_OPTIONS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  className={`tag-btn ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="interests">Interests & Startup Passion</label>
            <textarea 
              id="interests"
              rows="3" 
              placeholder="Tell the system what problems you care about, e.g. productivity, climate tech, gaming..."
              value={interests}
              onChange={e => setInterests(e.target.value)}
            />
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">
            Generate Profile Card 🔮
          </button>
        </div>
      </form>
    </div>
  );
}
