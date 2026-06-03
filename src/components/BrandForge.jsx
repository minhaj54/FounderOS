import React, { useState } from 'react';

const ARCHETYPES = {
  Bold: { name: 'The Hero / Outlaw ⚔️', desc: 'Rebellious, brave, and change-driven. You exist to challenge status quo.' },
  Professional: { name: 'The Ruler / Sage 👑', desc: 'Authoritative, structured, and wise. You bring order and excellence.' },
  Friendly: { name: 'The Everyman / Caregiver 🤝', desc: 'Empathetic, welcoming, and community-centric. You help everyone feel at home.' },
  Witty: { name: 'The Jester / Magician 🔮', desc: 'Playful, innovative, and magical. You transform the boring into pure delight.' }
};

export default function BrandForge({ brandDetails, onSaveBrand }) {
  const [name, setName] = useState(brandDetails?.name || '');
  const [story, setStory] = useState(brandDetails?.story || '');
  const [mission, setMission] = useState(brandDetails?.mission || '');
  const [values, setValues] = useState(brandDetails?.values || '');
  const [voice, setVoice] = useState(brandDetails?.voice || 'Friendly');
  const [visuals, setVisuals] = useState(brandDetails?.visuals || 'Modern & Sleek');
  const [emotion, setEmotion] = useState(brandDetails?.emotion || 'Empowered');

  // Interactive positioning map state (coordinate ratios 0-100)
  const [posX, setPosX] = useState(brandDetails?.posX || 70); // Modern (right) vs Traditional (left)
  const [posY, setPosY] = useState(brandDetails?.posY || 30); // Premium (top) vs Value (bottom)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !story || !mission) {
      alert('Please fill out the Brand Name, Story, and Mission statement!');
      return;
    }

    const archetype = ARCHETYPES[voice] || ARCHETYPES.Friendly;

    onSaveBrand({
      name,
      story,
      mission,
      values,
      voice,
      visuals,
      emotion,
      archetype,
      posX,
      posY,
      isSaved: true
    });
  };

  const archetype = ARCHETYPES[voice] || ARCHETYPES.Friendly;

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 6: Brand Forge</h1>
          <p className="workspace-subtitle">Shape your brand story, isolate your archetype, and plot your market position.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Forge Reward:</span>
          <span className="text-amber">+100 Brand XP</span>
          <span className="text-emerald">Brand Architect Badge 🎨</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '20px' }}>
          <h3 className="text-indigo" style={{ marginBottom: '16px' }}>Forge Brand Identity</h3>
          
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="brandName">Brand Name</label>
            <input 
              id="brandName"
              type="text" 
              placeholder="e.g. FounderOS, StellarCRM..." 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </div>

          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '12px' }}>
            <div className="form-group">
              <label htmlFor="voice">Brand Voice / Tone</label>
              <select id="voice" value={voice} onChange={e => setVoice(e.target.value)}>
                <option value="Friendly">Friendly & Empathetic</option>
                <option value="Professional">Professional & Authoritative</option>
                <option value="Bold">Bold & Rebellious</option>
                <option value="Witty">Witty & Playful</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="visuals">Visual Style Palette</label>
              <select id="visuals" value={visuals} onChange={e => setVisuals(e.target.value)}>
                <option value="Modern & Sleek">Modern & Sleek (Dark, Neon)</option>
                <option value="Minimalist & Clean">Minimalist & Clean (White space, Sans)</option>
                <option value="Retro & Fun">Retro & Bold (Colors, Serif)</option>
                <option value="Pastel & Calm">Pastel & Soft (Organic, Friendly)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="mission">Brand Mission Statement</label>
            <textarea 
              id="mission"
              rows="2" 
              placeholder="Why does this company exist beyond making money?..." 
              value={mission} 
              onChange={e => setMission(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="story">The Founder Story (Why you started this)</label>
            <textarea 
              id="story"
              rows="2" 
              placeholder="What personal friction led you to create this?..." 
              value={story} 
              onChange={e => setStory(e.target.value)}
              required
            />
          </div>

          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
            <div className="form-group">
              <label htmlFor="values">Core Company Value</label>
              <input 
                id="values"
                type="text" 
                placeholder="e.g. Radical transparency, Speed" 
                value={values} 
                onChange={e => setValues(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="emotion">Target Customer Emotion</label>
              <input 
                id="emotion"
                type="text" 
                placeholder="e.g. Relief, Empowered, Inspired" 
                value={emotion} 
                onChange={e => setEmotion(e.target.value)} 
              />
            </div>
          </div>

          {/* Interactive slider offsets */}
          <h4 className="text-cyan font-display" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>Adjust Positioning Coordinates</h4>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <div className="flex-between">
                <label htmlFor="posX">Traditional vs Modern</label>
                <span className="text-cyan font-display" style={{ fontSize: '11px' }}>{posX}% Modern</span>
              </div>
              <input id="posX" type="range" min="10" max="90" value={posX} onChange={e => setPosX(parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <div className="flex-between">
                <label htmlFor="posY">Value vs Premium</label>
                <span className="text-purple font-display" style={{ fontSize: '11px' }}>{posY}% Premium</span>
              </div>
              <input id="posY" type="range" min="10" max="90" value={posY} onChange={e => setPosY(parseInt(e.target.value))} />
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" className="btn btn-primary">
              Forge Brand Blueprint 🧬
            </button>
          </div>
        </form>

        {/* Right Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Blueprint Output card */}
          {brandDetails?.isSaved ? (
            <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--color-indigo)' }}>
              <h3 className="text-emerald font-display" style={{ marginBottom: '10px' }}>{brandDetails.name} Blueprint</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', lineHeight: '1.45' }}>
                <div>
                  <strong className="text-cyan">Brand Archetype:</strong>
                  <div style={{ marginTop: '2px' }} className="text-cyan">{brandDetails.archetype.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{brandDetails.archetype.desc}</div>
                </div>

                <div>
                  <strong className="text-indigo">Mission:</strong>
                  <p style={{ color: 'var(--text-secondary)' }}>{brandDetails.mission}</p>
                </div>

                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <strong className="text-purple">Visual Direction:</strong>
                    <p style={{ color: 'var(--text-secondary)' }}>{brandDetails.visuals}</p>
                  </div>
                  <div>
                    <strong className="text-amber">Key Value:</strong>
                    <p style={{ color: 'var(--text-secondary)' }}>{brandDetails.values || 'Transparency'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
              🧬 Save your brand parameters on the left to review your identity blueprint card.
            </div>
          )}

          {/* Interactive Positioning Map View */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-cyan font-display" style={{ marginBottom: '6px', fontSize: '15px' }}>Positioning Map</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Where your brand sits relative to generic options. Drag sliders to re-plot.
            </p>

            <div className="brand-positioning-map">
              <div className="brand-axis x"></div>
              <div className="brand-axis y"></div>
              
              <div className="brand-axis-label top">Premium</div>
              <div className="brand-axis-label bottom">Value</div>
              <div className="brand-axis-label left">Traditional</div>
              <div className="brand-axis-label right">Modern</div>

              {/* Competitor Dots (Static mock anchors) */}
              <div className="brand-node-point" style={{ left: '20%', top: '75%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }}>
                <span className="brand-node-label" style={{ borderColor: '#ef4444' }}>Traditional Corp</span>
              </div>
              <div className="brand-node-point" style={{ left: '50%', top: '80%', background: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }}>
                <span className="brand-node-label" style={{ borderColor: '#f59e0b' }}>Cheap Clone</span>
              </div>

              {/* Your Brand Dot */}
              <div 
                className="brand-node-point" 
                style={{ 
                  left: `${posX}%`, 
                  top: `${100 - posY}%`, 
                  background: 'var(--color-cyan)', 
                  boxShadow: 'var(--shadow-neon-cyan)',
                  zIndex: 2
                }}
              >
                <span className="brand-node-label" style={{ borderColor: 'var(--color-indigo)' }}>
                  {name || 'Your Brand'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
