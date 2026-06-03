import React, { useState } from 'react';

export default function MarketResearch({ marketData, onSaveMarketAnalysis }) {
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('Global');
  const [audience, setAudience] = useState('');

  // Missions Checkbox State
  const [comp1, setComp1] = useState(false);
  const [comp2, setComp2] = useState(false);
  const [comp3, setComp3] = useState(false);
  const [painPointsCount, setPainPointsCount] = useState(0);
  const [marketGap, setMarketGap] = useState(false);

  const isQuestPassed = comp1 && comp2 && comp3 && painPointsCount >= 5 && marketGap;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!industry || !audience) {
      alert('Please fill out the industry and target audience fields!');
      return;
    }

    // Heuristically calculate TAM/SAM/SOM numbers based on inputs
    const baseTAM = audience.length * 15000000;
    const tamVal = Math.max(10000000, Math.min(baseTAM, 50000000000));
    const samVal = Math.round(tamVal * 0.15);
    const somVal = Math.round(samVal * 0.05);

    // Heuristic Persona Name
    const personaNames = {
      SaaS: 'SaaS Samantha (Product Manager)',
      D2C: 'D2C Daniel (E-commerce Brand Owner)',
      AI: 'AI Alex (Developer Lead)',
      Web3: 'Crypto Chris (Active Trader)',
      Mobile: 'Mobile Melissa (On-the-go Professional)',
      Other: 'Founder Frank (Solopreneur)'
    };

    let pKey = 'Other';
    if (industry.toLowerCase().includes('saas') || industry.toLowerCase().includes('software')) pKey = 'SaaS';
    else if (industry.toLowerCase().includes('d2c') || industry.toLowerCase().includes('commerce') || industry.toLowerCase().includes('brand')) pKey = 'D2C';
    else if (industry.toLowerCase().includes('ai') || industry.toLowerCase().includes('intelligence') || industry.toLowerCase().includes('gpt')) pKey = 'AI';
    else if (industry.toLowerCase().includes('web3') || industry.toLowerCase().includes('crypto')) pKey = 'Web3';
    else if (industry.toLowerCase().includes('mobile') || industry.toLowerCase().includes('app')) pKey = 'Mobile';

    const mockPersona = {
      name: personaNames[pKey],
      quote: `"I just want things to work seamlessly. I lose hours daily stitching tools together."`,
      pains: [
        "Wasting time on manual data entry across disconnected interfaces",
        "Unable to afford enterprise-tier custom solutions",
        "Steep learning curve of current alternative tools"
      ],
      goals: [
        "Automate repetitive tasks with one click",
        "Have a unified control board to view daily metrics",
        "Save 10+ hours per week of manual operations"
      ]
    };

    const mockCompetitors = [
      { name: 'Incumbent Titan Corp', strength: 'Massive brand equity, deep features', weakness: 'Extremely expensive, clunky enterprise UI, poor custom support', gap: 'High-cost barrier makes it inaccessible to first-timers' },
      { name: 'Legacy Spreadsheet Hacks', strength: 'Free, highly customizable by user', weakness: 'Zero collaboration, manual syncing, breaks easily, zero AI capability', gap: 'Unusable for automated scale, requires constant manual updating' },
      { name: 'Point-Solution App', strength: 'Very cheap, simple single feature', weakness: 'Does not integrate, creates data silos, lacks overall flow', gap: 'Forcing founders to buy 10 different subscriptions' }
    ];

    const data = {
      industry,
      country,
      audience,
      tam: tamVal,
      sam: samVal,
      som: somVal,
      persona: mockPersona,
      competitors: mockCompetitors,
      generatedDate: new Date().toLocaleDateString()
    };

    onSaveMarketAnalysis(data);
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 3: Market Research Arena</h1>
          <p className="workspace-subtitle">Analyze market sizing, benchmark competitors, and isolate market gaps.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Arena Rewards:</span>
          <span className="text-amber">+100 Explorer XP</span>
          <span className="text-emerald">Market Explorer Badge 🧭</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left column: Mission Tracker */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 className="text-amber" style={{ fontSize: '15px', textTransform: 'uppercase', marginBottom: '12px' }}>Arena Missions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Identify 3 Competitors</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                <label style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={comp1} onChange={e => setComp1(e.target.checked)} />
                  <span>Competitor 1 (Direct)</span>
                </label>
                <label style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={comp2} onChange={e => setComp2(e.target.checked)} />
                  <span>Competitor 2 (Indirect)</span>
                </label>
                <label style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={comp3} onChange={e => setComp3(e.target.checked)} />
                  <span>Competitor 3 (Legacy)</span>
                </label>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
              <div className="flex-between">
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Log 5 Customer Pains</label>
                <span className="text-cyan" style={{ fontWeight: 'bold', fontSize: '12px' }}>{painPointsCount}/5</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5" 
                value={painPointsCount} 
                onChange={e => setPainPointsCount(parseInt(e.target.value))}
                style={{ width: '100%', marginTop: '6px' }}
              />
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Find 1 Market Gap</label>
              <label style={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '6px' }}>
                <input type="checkbox" checked={marketGap} onChange={e => setMarketGap(e.target.checked)} />
                <span className="text-emerald" style={{ fontWeight: '600' }}>Gap Isolated 🔍</span>
              </label>
            </div>

            {isQuestPassed && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span className="text-emerald" style={{ fontSize: '12px', fontWeight: 'bold' }}>✓ Arena Quests Ready</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Form / Output */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          {!marketData ? (
            <form onSubmit={handleSubmit}>
              <h3 className="text-indigo" style={{ marginBottom: '16px' }}>Generate Market Map</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="industry">Industry Sector / Market</label>
                  <input 
                    id="industry"
                    type="text" 
                    placeholder="e.g. AI-powered copywriter for e-commerce, D2C supplements" 
                    value={industry} 
                    onChange={e => setIndustry(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Target Country / Region</label>
                  <input 
                    id="country"
                    type="text" 
                    placeholder="e.g. United States, Global, Western Europe" 
                    value={country} 
                    onChange={e => setCountry(e.target.value)} 
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="audience">Target Audience Segment Size (e.g. number of designers in US)</label>
                  <input 
                    id="audience"
                    type="text" 
                    placeholder="e.g. 500,000 freelancers, 50,000 marketing managers" 
                    value={audience} 
                    onChange={e => setAudience(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button type="submit" className="btn btn-primary" disabled={!isQuestPassed}>
                  Analyze Market Arena ⚔️
                </button>
                {!isQuestPassed && (
                  <p style={{ fontSize: '11px', color: 'var(--text-rose)', marginTop: '6px' }}>
                    * Complete all Arena Missions on the left to unlock Analysis.
                  </p>
                )}
              </div>
            </form>
          ) : (
            <div>
              <div className="flex-between" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '10px', marginBottom: '20px' }}>
                <h3 className="text-emerald">Market Analysis Report</h3>
                <button className="btn btn-accent" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => onSaveMarketAnalysis(null)}>
                  New Analysis 🔄
                </button>
              </div>

              {/* TAM SAM SOM Funnel */}
              <h4 className="text-cyan font-display" style={{ marginBottom: '14px' }}>Market Sizing Model</h4>
              <div className="tam-funnel">
                <div className="tam-bar tam">
                  <span>TAM (Total Addressable Market):</span>
                  <span>${marketData.tam.toLocaleString()} / year</span>
                </div>
                <div className="tam-bar sam">
                  <span>SAM (Serviceable Addressable Market):</span>
                  <span>${marketData.sam.toLocaleString()} / year</span>
                </div>
                <div className="tam-bar som">
                  <span>SOM (Serviceable Obtainable Market):</span>
                  <span>${marketData.som.toLocaleString()} / year</span>
                </div>
              </div>

              {/* Persona Section */}
              <div className="glass-card mb-20" style={{ borderLeft: '4px solid var(--color-indigo)' }}>
                <h4 className="text-indigo" style={{ marginBottom: '10px' }}>Target Customer Persona: {marketData.persona.name}</h4>
                <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {marketData.persona.quote}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                  <div>
                    <strong className="text-rose">Pains & Frictions:</strong>
                    <ul style={{ paddingLeft: '16px', marginTop: '6px' }}>
                      {marketData.persona.pains.map((p, idx) => <li key={idx}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-emerald">Goals & Gains:</strong>
                    <ul style={{ paddingLeft: '16px', marginTop: '6px' }}>
                      {marketData.persona.goals.map((g, idx) => <li key={idx}>{g}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Competitor Grid */}
              <h4 className="text-cyan font-display" style={{ marginBottom: '10px', marginTop: '20px' }}>Competitor Analysis Grid</h4>
              <div className="competitor-table-container">
                <table className="competitor-table">
                  <thead>
                    <tr>
                      <th>Competitor</th>
                      <th>Key Strength</th>
                      <th>Core Weakness</th>
                      <th>Isolated Opportunity Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.competitors.map((c, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: '600' }}>{c.name}</td>
                        <td className="text-emerald">{c.strength}</td>
                        <td className="text-rose">{c.weakness}</td>
                        <td className="text-cyan" style={{ fontWeight: '500' }}>{c.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Opportunity Heatmap */}
              <h4 className="text-purple font-display" style={{ marginBottom: '10px', marginTop: '20px' }}>Opportunity Heatmap</h4>
              <div className="heatmap-grid">
                <div className="heatmap-cell high">
                  <div style={{ fontWeight: 'bold' }}>UI / UX Simplicity</div>
                  <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>High Opportunity (High Pain)</div>
                </div>
                <div className="heatmap-cell med">
                  <div style={{ fontWeight: 'bold' }}>Pricing Gap</div>
                  <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>Medium Opportunity</div>
                </div>
                <div className="heatmap-cell low">
                  <div style={{ fontWeight: 'bold' }}>Distribution Power</div>
                  <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>Low Opportunity (High Moat)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
