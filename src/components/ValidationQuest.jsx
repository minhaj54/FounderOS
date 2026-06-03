import React, { useState } from 'react';

export default function ValidationQuest({ interviews, onAddInterview }) {
  const [customerName, setCustomerName] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [feedback, setFeedback] = useState('');
  const [payIntent, setPayIntent] = useState('Yes');
  const [notes, setNotes] = useState('');

  const targetInterviews = 3;
  const count = interviews.length;
  const percent = Math.min((count / targetInterviews) * 100, 100);

  // SVG Radial Ring Calculation
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !painPoint || !feedback) {
      alert('Please fill out the Customer Name, Pain Point, and Feedback fields!');
      return;
    }

    const newInterview = {
      id: Date.now().toString(),
      customerName,
      painPoint,
      feedback,
      payIntent,
      notes,
      date: new Date().toLocaleDateString()
    };

    onAddInterview(newInterview);

    // Reset Form
    setCustomerName('');
    setPainPoint('');
    setFeedback('');
    setPayIntent('Yes');
    setNotes('');
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 2: Validation Quest</h1>
          <p className="workspace-subtitle">Prove demand exists. Interview users to discover their deepest problems.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Quest Reward:</span>
          <span className="text-amber">+50 XP per Interview</span>
          <span className="text-emerald">Customer Whisperer Badge (At 3 interviews) 🗣️</span>
        </div>
      </div>

      <div className="interviews-stats-row">
        {/* SVG Progress Ring */}
        <div className="interview-ring-container glass-panel flex-center">
          <svg className="interview-ring-svg" width="140" height="140">
            <defs>
              <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-indigo)" />
                <stop offset="100%" stopColor="var(--color-cyan)" />
              </linearGradient>
            </defs>
            <circle className="interview-ring-bg" cx="70" cy="70" r={radius} />
            <circle 
              className="interview-ring-fill" 
              cx="70" 
              cy="70" 
              r={radius} 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="interview-ring-text">
            <span className="interview-ring-num text-cyan">{count}</span>
            <span className="interview-ring-lbl">Goal: {targetInterviews}</span>
          </div>
        </div>

        {/* Quest Info */}
        <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
          <h3 className="text-indigo">Validation Dashboard</h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
            {count === 0 && "Your validation journey has not started. You need at least 3 customer interviews to unlock the Market Research Zone."}
            {count > 0 && count < targetInterviews && `You are making progress! Log ${targetInterviews - count} more interview(s) to pass Level 2.`}
            {count >= targetInterviews && "Quest complete! You've unlocked Level 3: Market Research Arena. Feel free to log more interviews to sharpen your data."}
          </p>
          <div style={{ marginTop: '14px', fontSize: '12px' }} className="flex-between">
            <span>Pay Intent Conversion:</span>
            <span className="text-emerald" style={{ fontWeight: 'bold' }}>
              {count > 0 ? Math.round((interviews.filter(i => i.payIntent === 'Yes').length / count) * 100) : 0}% Positive
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Log Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--color-cyan)' }}>Log Customer Interview</h3>

          <div className="form-grid" style={{ gridTemplateColumns: '1.2fr 1fr', marginBottom: '12px' }}>
            <div className="form-group">
              <label htmlFor="customerName">Interviewee Name / Avatar</label>
              <input 
                id="customerName"
                type="text" 
                placeholder="e.g. Alex (Freelancer)" 
                value={customerName} 
                onChange={e => setCustomerName(e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="payIntent">Would they pay for a solution?</label>
              <select id="payIntent" value={payIntent} onChange={e => setPayIntent(e.target.value)}>
                <option value="Yes">Yes (Will pay immediately)</option>
                <option value="Maybe">Maybe (Needs validation/trial)</option>
                <option value="No">No (Unlikely to purchase)</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="painPoint">What is their main pain point?</label>
            <input 
              id="painPoint"
              type="text" 
              placeholder="e.g. Spends 2 hours searching for files across email/chat" 
              value={painPoint} 
              onChange={e => setPainPoint(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="feedback">Feedback on your startup idea</label>
            <textarea 
              id="feedback"
              rows="2" 
              placeholder="What did they like or dislike about your proposed solution?..." 
              value={feedback} 
              onChange={e => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="notes">Additional Observation Notes</label>
            <textarea 
              id="notes"
              rows="2" 
              placeholder="Context, environment, custom quotes, or emotional intensity..." 
              value={notes} 
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" className="btn btn-primary">
              Log Interview 🗣️
            </button>
          </div>
        </form>

        {/* Interviews Log */}
        <div>
          <h3 className="font-display text-indigo" style={{ marginBottom: '16px' }}>Interview Logs ({count})</h3>
          <div className="interviews-log-list">
            {interviews.map(interview => (
              <div key={interview.id} className="glass-card interview-log-card">
                <div className="interview-log-header">
                  <span style={{ fontWeight: '600' }} className="text-cyan">{interview.customerName}</span>
                  <span className={`score-dot ${interview.payIntent === 'Yes' ? 'green' : interview.payIntent === 'Maybe' ? 'yellow' : 'red'}`} style={{ fontSize: '11px' }}>
                    Pay Intent: {interview.payIntent}
                  </span>
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-secondary)' }}>
                  <p><strong>Pain Point:</strong> {interview.painPoint}</p>
                  <p style={{ marginTop: '4px' }}><strong>Feedback:</strong> {interview.feedback}</p>
                  {interview.notes && <p style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--text-muted)' }}>📝 {interview.notes}</p>}
                </div>
              </div>
            ))}

            {interviews.length === 0 && (
              <div className="glass-card text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
                🗣️ No interviews logged yet. Start talking to target customers!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
