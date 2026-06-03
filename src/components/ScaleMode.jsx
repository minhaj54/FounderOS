import React, { useState } from 'react';

export default function ScaleMode({ scaleMetrics, onUpdateMetrics, streakCount }) {
  const [revenue, setRevenue] = useState(scaleMetrics?.revenue || 1200);
  const [users, setUsers] = useState(scaleMetrics?.users || 45);
  const [retention, setRetention] = useState(scaleMetrics?.retention || 92);
  const [growth, setGrowth] = useState(scaleMetrics?.growth || 15);
  
  const [content, setContent] = useState(scaleMetrics?.content || 2);
  const [hiring, setHiring] = useState(scaleMetrics?.hiring || 0);
  const [sops, setSops] = useState(scaleMetrics?.sops || 1);

  // Missions
  const [m1, setM1] = useState(false);
  const [m2, setM2] = useState(false);
  const [m3, setM3] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateMetrics({
      revenue: parseFloat(revenue),
      users: parseInt(users),
      retention: parseFloat(retention),
      growth: parseFloat(growth),
      content: parseInt(content),
      hiring: parseInt(hiring),
      sops: parseInt(sops)
    });
    alert("Growth metrics saved! Keep scaling! 🚀 (+50 XP)");
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 9: Scale Mode</h1>
          <p className="workspace-subtitle">Monitor operational growth, hiring pipelines, and daily scaling streaks.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🔥 Active Multiplier:</span>
          <span className="text-amber">Streak: {streakCount} Days</span>
          <span className="text-cyan">Rank: Visionary Founder 🪐</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Growth Stats Dashboard */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-cyan font-display" style={{ marginBottom: '16px' }}>Growth KPI Monitor</h3>
          
          <div className="runway-metrics" style={{ gap: '16px', marginBottom: '20px' }}>
            <div className="glass-card text-center" style={{ padding: '16px' }}>
              <span className="hud-stat-label">Monthly Revenue</span>
              <div className="text-emerald" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '6px' }}>
                ${revenue.toLocaleString()}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{growth}% growth</span>
            </div>

            <div className="glass-card text-center" style={{ padding: '16px' }}>
              <span className="hud-stat-label">Total Users</span>
              <div className="text-cyan" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '6px' }}>
                {users} Users
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{retention}% retention</span>
            </div>

            <div className="glass-card text-center" style={{ padding: '16px' }}>
              <span className="hud-stat-label">SOPs Documented</span>
              <div className="text-purple" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '6px' }}>
                {sops} SOPs
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{hiring} Open Roles</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label htmlFor="revenue">MRR ($)</label>
                <input id="revenue" type="number" value={revenue} onChange={e => setRevenue(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="usersScale">Paying Users</label>
                <input id="usersScale" type="number" value={users} onChange={e => setUsers(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="growth">Growth Rate (%)</label>
                <input id="growth" type="number" value={growth} onChange={e => setGrowth(Math.max(0, e.target.value))} />
              </div>
            </div>

            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div className="form-group">
                <label htmlFor="retention">Retention (%)</label>
                <input id="retention" type="number" value={retention} onChange={e => setRetention(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content items</label>
                <input id="content" type="number" value={content} onChange={e => setContent(Math.max(0, e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="sops">SOPs written</label>
                <input id="sops" type="number" value={sops} onChange={e => setSops(Math.max(0, e.target.value))} />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button type="submit" className="btn btn-primary">
                Update Scaling KPIs 📊
              </button>
            </div>
          </form>
        </div>

        {/* Scaling Quests & Multipliers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Monthly Missions */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-amber font-display" style={{ fontSize: '15px', textTransform: 'uppercase', marginBottom: '14px' }}>Scaling Quests</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label 
                className="glass-card flex-between" 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer',
                  borderLeft: m1 ? '3px solid var(--color-emerald)' : '1px solid rgba(255,255,255,0.05)',
                  background: m1 ? 'rgba(16,185,129,0.04)' : 'transparent',
                  textTransform: 'none'
                }}
              >
                <span style={{ fontSize: '13px', color: m1 ? '#a7f3d0' : 'var(--text-primary)' }}>Acquire 50 Active Users 👥</span>
                <input type="checkbox" checked={m1} onChange={e => setM1(e.target.checked)} style={{ cursor: 'pointer' }} />
              </label>

              <label 
                className="glass-card flex-between" 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer',
                  borderLeft: m2 ? '3px solid var(--color-emerald)' : '1px solid rgba(255,255,255,0.05)',
                  background: m2 ? 'rgba(16,185,129,0.04)' : 'transparent',
                  textTransform: 'none'
                }}
              >
                <span style={{ fontSize: '13px', color: m2 ? '#a7f3d0' : 'var(--text-primary)' }}>Publish 10 Content Pieces 📰</span>
                <input type="checkbox" checked={m2} onChange={e => setM2(e.target.checked)} style={{ cursor: 'pointer' }} />
              </label>

              <label 
                className="glass-card flex-between" 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer',
                  borderLeft: m3 ? '3px solid var(--color-emerald)' : '1px solid rgba(255,255,255,0.05)',
                  background: m3 ? 'rgba(16,185,129,0.04)' : 'transparent',
                  textTransform: 'none'
                }}
              >
                <span style={{ fontSize: '13px', color: m3 ? '#a7f3d0' : 'var(--text-primary)' }}>Write 3 Operations SOPs 📖</span>
                <input type="checkbox" checked={m3} onChange={e => setM3(e.target.checked)} style={{ cursor: 'pointer' }} />
              </label>
            </div>
          </div>

          {/* Achievement summary */}
          <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(6,182,212,0.05), rgba(99,102,241,0.05))', border: '1px solid rgba(6,182,212,0.2)' }}>
            <h4 className="text-cyan font-display" style={{ fontSize: '14px', marginBottom: '8px' }}>Visionary Level Unlocked</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              You have completed all baseline levels of the **FounderOS** startup simulator. 
              As a Level 9 Visionary, continue using your dashboard daily, log reflections, and transform failures into lessons.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
