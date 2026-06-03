import React, { useState, useEffect } from 'react';

export default function FinancialDungeon({ financeDetails, onSaveFinance, startingCapital }) {
  const [capital, setCapital] = useState(financeDetails?.capital || startingCapital || 10000);
  const [rent, setRent] = useState(financeDetails?.rent || 0);
  const [marketing, setMarketing] = useState(financeDetails?.marketing || 100);
  const [hosting, setHosting] = useState(financeDetails?.hosting || 50);
  const [salaries, setSalaries] = useState(financeDetails?.salaries || 0);
  const [misc, setMisc] = useState(financeDetails?.misc || 50);

  const [price, setPrice] = useState(financeDetails?.price || 29);
  const [users, setUsers] = useState(financeDetails?.users || 10);
  const [cac, setCac] = useState(financeDetails?.cac || 50);
  const [churn, setChurn] = useState(financeDetails?.churn || 5);

  // Derived calculations
  const totalBurn = parseFloat(rent) + parseFloat(marketing) + parseFloat(hosting) + parseFloat(salaries) + parseFloat(misc);
  const totalRev = parseFloat(price) * parseFloat(users);
  const netMonthly = totalBurn - totalRev;
  
  let runway = 0;
  if (netMonthly <= 0) {
    runway = 999; // Infinite
  } else {
    runway = Math.round((parseFloat(capital) / netMonthly) * 10) / 10;
  }

  const ltv = churn > 0 ? Math.round(price / (churn / 100)) : 0;
  const ltvCacRatio = cac > 0 ? Math.round((ltv / cac) * 10) / 10 : 0;

  // Health Metrics
  const isHealthyRunway = runway === 999 || runway >= 6;
  const isLtvCacHealthy = ltvCacRatio >= 3;
  const isQuestMet = (runway === 999 || runway >= 6) && isLtvCacHealthy && financeDetails?.isSaved;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveFinance({
      capital: parseFloat(capital),
      rent: parseFloat(rent),
      marketing: parseFloat(marketing),
      hosting: parseFloat(hosting),
      salaries: parseFloat(salaries),
      misc: parseFloat(misc),
      price: parseFloat(price),
      users: parseFloat(users),
      cac: parseFloat(cac),
      churn: parseFloat(churn),
      isSaved: true
    });
  };

  const getRunwayClass = () => {
    if (runway === 999 || runway >= 12) return 'healthy';
    if (runway >= 6) return 'warning';
    return 'danger';
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 5: Financial Dungeon</h1>
          <p className="workspace-subtitle">Simulate capital runway, burn rates, pricing, and LTV:CAC health indexes.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Dungeon Goal:</span>
          <span className="text-cyan">Runway &gt; 6m + LTV:CAC Ratio &gt; 3</span>
          <span className="text-emerald">Finance Survivor Badge 🪙</span>
        </div>
      </div>

      {/* Runway Indicators */}
      <div className="runway-metrics">
        <div className="glass-panel runway-radial-container">
          <span className="hud-stat-label">Survival Runway</span>
          <div className="runway-radial-val">
            {runway === 999 ? 'Infinite ♾️' : `${runway} Months`}
          </div>
          <div className="runway-health-meter">
            <div 
              className={`runway-health-bar ${getRunwayClass()}`} 
              style={{ width: runway === 999 ? '100%' : `${Math.min((runway / 18) * 100, 100)}%` }}
            />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            {runway === 999 ? 'Profit/Cash flow positive!' : `Net Burn: -$${netMonthly.toLocaleString()}/mo`}
          </span>
        </div>

        <div className="glass-panel runway-radial-container">
          <span className="hud-stat-label">LTV : CAC Index</span>
          <div className="runway-radial-val" style={{ color: isLtvCacHealthy ? 'var(--color-emerald)' : 'var(--color-rose)' }}>
            {ltvCacRatio}x
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            LTV: ${ltv} | CAC: ${cac}
          </div>
          <span style={{ fontSize: '10px', color: isLtvCacHealthy ? 'var(--color-emerald)' : 'var(--color-rose)', marginTop: '4px', fontWeight: 'bold' }}>
            {isLtvCacHealthy ? '✓ Healthy (Ratio >= 3)' : '✗ Unhealthy (Ratio < 3)'}
          </span>
        </div>

        <div className="glass-panel runway-radial-container" style={{ justifyContent: 'center' }}>
          <span className="hud-stat-label">Capital Reserves</span>
          <div className="runway-radial-val text-emerald" style={{ fontSize: '32px' }}>
            ${parseFloat(capital).toLocaleString()}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Expenses: ${totalBurn.toLocaleString()}/mo | Rev: ${totalRev.toLocaleString()}/mo
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Left Column: Expenses */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 className="text-rose" style={{ marginBottom: '16px', fontSize: '16px' }}>Monthly Operating Costs (Burn)</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label htmlFor="capitalInput">Starting Capital Reserve ($)</label>
              <input 
                id="capitalInput"
                type="number" 
                value={capital} 
                onChange={e => setCapital(Math.max(0, e.target.value))} 
              />
            </div>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="rent">Office / Rent ($)</label>
                <input id="rent" type="number" value={rent} onChange={e => setRent(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="marketing">Marketing / Ads ($)</label>
                <input id="marketing" type="number" value={marketing} onChange={e => setMarketing(Math.max(0, e.target.value))} />
              </div>
            </div>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="hosting">Hosting / Tools ($)</label>
                <input id="hosting" type="number" value={hosting} onChange={e => setHosting(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="salaries">Salaries / Help ($)</label>
                <input id="salaries" type="number" value={salaries} onChange={e => setSalaries(Math.max(0, e.target.value))} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="misc">Miscellaneous Expenses ($)</label>
              <input id="misc" type="number" value={misc} onChange={e => setMisc(Math.max(0, e.target.value))} />
            </div>
          </div>
        </div>

        {/* Right Column: Revenues & CAC/LTV */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 className="text-emerald" style={{ marginBottom: '16px', fontSize: '16px' }}>Pricing & Revenue Model</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="price">Price Per Customer ($)</label>
                <input id="price" type="number" value={price} onChange={e => setPrice(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="users">Estimated Customers</label>
                <input id="users" type="number" value={users} onChange={e => setUsers(Math.max(0, e.target.value))} />
              </div>
            </div>
            
            <h3 className="text-cyan" style={{ marginTop: '10px', fontSize: '14px', textTransform: 'uppercase' }}>CAC & Churn Analytics</h3>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <div className="flex-between">
                  <label htmlFor="cac">CAC ($)</label>
                  <span className="text-rose font-display" style={{ fontWeight: 'bold', fontSize: '11px' }}>Cost to Acquire</span>
                </div>
                <input id="cac" type="number" value={cac} onChange={e => setCac(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <div className="flex-between">
                  <label htmlFor="churn">Churn Rate (%)</label>
                  <span className="text-amber font-display" style={{ fontWeight: 'bold', fontSize: '11px' }}>{churn}%</span>
                </div>
                <input 
                  id="churn"
                  type="range" 
                  min="1" 
                  max="50" 
                  value={churn} 
                  onChange={e => setChurn(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Lock & Save Finance Dungeon Plan 🔒
              </button>
              {financeDetails?.isSaved && !isQuestMet && (
                <p style={{ fontSize: '11px', color: 'var(--text-rose)', marginTop: '8px', textAlign: 'center' }}>
                  ⚠️ Your financial ratios are unhealthy. Adjust CAC down, pricing up, or reduce costs to meet limits.
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
