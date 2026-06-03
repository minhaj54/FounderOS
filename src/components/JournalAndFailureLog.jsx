import React, { useState } from 'react';

export default function JournalAndFailureLog({ journals, failures, onAddJournal, onAddFailure }) {
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState('Energetic');

  const [failedAction, setFailedAction] = useState('');
  const [lessonLearned, setLessonLearned] = useState('');

  const handleJournalSubmit = (e) => {
    e.preventDefault();
    if (!reflection) return;

    onAddJournal({
      id: Date.now().toString(),
      text: reflection,
      mood,
      date: new Date().toLocaleDateString()
    });
    setReflection('');
  };

  const handleFailureSubmit = (e) => {
    e.preventDefault();
    if (!failedAction || !lessonLearned) return;

    onAddFailure({
      id: Date.now().toString(),
      failedAction,
      lessonLearned,
      date: new Date().toLocaleDateString()
    });
    setFailedAction('');
    setLessonLearned('');
    alert("Failure processed! +50 growth XP added. Every mistake is a stepping stone! 💎");
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Founder Journal & Failure Log</h1>
          <p className="workspace-subtitle">Log daily reflections and turn mistakes into experience points.</p>
        </div>
        <div className="reward-badge-panel" style={{ background: 'rgba(244, 63, 94, 0.08)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
          <span>💔 Failure Converter:</span>
          <span className="text-rose">1 Failure + 1 Lesson = </span>
          <span className="text-amber">+50 XP</span>
        </div>
      </div>

      <div className="journal-log-grid">
        
        {/* Left Column: Log inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Reflection Journal */}
          <form onSubmit={handleJournalSubmit} className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-indigo" style={{ marginBottom: '14px', fontSize: '16px' }}>Daily Review Reflection</h3>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label htmlFor="reflection">What went well today? What needs work?</label>
              <textarea 
                id="reflection"
                rows="3" 
                placeholder="Log your decisions, feelings, and learnings..." 
                value={reflection} 
                onChange={e => setReflection(e.target.value)}
                required
              />
            </div>
            <div className="form-grid" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'center' }}>
              <div className="form-group">
                <label htmlFor="mood">Founder Energy Level</label>
                <select id="mood" value={mood} onChange={e => setMood(e.target.value)}>
                  <option value="Energetic">⚡ Energetic & Hyped</option>
                  <option value="Focused">🎯 Focused & Productive</option>
                  <option value="Tired">😴 Exhausted / Burnout warning</option>
                  <option value="Anxious">😰 Anxious / Uncertain</option>
                </select>
              </div>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                  Save Reflection ✍️
                </button>
              </div>
            </div>
          </form>

          {/* Failure Log */}
          <form onSubmit={handleFailureSubmit} className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-rose" style={{ marginBottom: '14px', fontSize: '16px' }}>Failure Converter</h3>
            
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label htmlFor="failedAction">What failed? (Be honest)</label>
              <input 
                id="failedAction"
                type="text" 
                placeholder="e.g. cold emailing 20 prospects with zero replies, launch link broke" 
                value={failedAction} 
                onChange={e => setFailedAction(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label htmlFor="lessonLearned">What is the wisdom lesson?</label>
              <textarea 
                id="lessonLearned"
                rows="2" 
                placeholder="e.g. emails were too long; need shorter 3-sentence scripts instead..." 
                value={lessonLearned} 
                onChange={e => setLessonLearned(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <button type="submit" className="btn btn-accent" style={{ color: 'var(--color-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                Convert to XP ⚡
              </button>
            </div>
          </form>

        </div>

        {/* Right Column: Historical Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Lessons Vault */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-rose font-display" style={{ fontSize: '15px', marginBottom: '14px' }}>Lessons Vault ({failures.length})</h3>
            <div className="lessons-vault-list">
              {failures.map(f => (
                <div key={f.id} className="lesson-card">
                  <div className="lesson-failure">Failed: {f.failedAction}</div>
                  <div className="lesson-wisdom">💡 Lesson: {f.lessonLearned}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'right' }}>{f.date}</div>
                </div>
              ))}
              {failures.length === 0 && (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                  No failures logged yet. (A founder who never fails is a founder who never ships!)
                </p>
              )}
            </div>
          </div>

          {/* Reflections List */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-indigo font-display" style={{ fontSize: '15px', marginBottom: '14px' }}>Journal Entries ({journals.length})</h3>
            <div className="lessons-vault-list" style={{ maxHeight: '250px' }}>
              {journals.map(j => (
                <div key={j.id} className="glass-card" style={{ padding: '12px', marginBottom: '8px' }}>
                  <div className="flex-between" style={{ fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '4px', marginBottom: '6px' }}>
                    <span className="text-cyan">{j.date}</span>
                    <span className="text-muted">{j.mood}</span>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '1.4', color: 'var(--text-secondary)' }}>{j.text}</p>
                </div>
              ))}
              {journals.length === 0 && (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                  No reflections logged. Write down your thoughts!
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
