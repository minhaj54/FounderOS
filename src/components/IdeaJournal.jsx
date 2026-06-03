import React, { useState } from 'react';

const SECTORS = ['SaaS', 'D2C', 'AI', 'Web3', 'Mobile App', 'EdTech', 'FinTech', 'Other'];

export default function IdeaJournal({ ideas, onAddIdea, onGetAIFeedback, aiFeedbackState, currentXp }) {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [customer, setCustomer] = useState('');
  const [whyMatters, setWhyMatters] = useState('');
  const [currentSolution, setCurrentSolution] = useState('');
  const [yourSolution, setYourSolution] = useState('');
  const [sector, setSector] = useState('SaaS');
  const [urgency, setUrgency] = useState(5);
  const [confidence, setConfidence] = useState(5);
  
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [filterSector, setFilterSector] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !problem || !customer || !yourSolution) {
      alert('Please fill out the idea name, target problem, customer segment, and your solution!');
      return;
    }

    const calculatedScore = Math.round((parseInt(urgency) + parseInt(confidence)) * 5); // Max 100

    const newIdea = {
      id: Date.now().toString(),
      title,
      problem,
      customer,
      whyMatters,
      currentSolution,
      yourSolution,
      sector,
      urgency: parseInt(urgency),
      confidence: parseInt(confidence),
      score: calculatedScore,
      createdDate: new Date().toLocaleDateString(),
      aiFeedback: null
    };

    onAddIdea(newIdea);
    
    // Clear inputs
    setTitle('');
    setProblem('');
    setCustomer('');
    setWhyMatters('');
    setCurrentSolution('');
    setYourSolution('');
    setSector('SaaS');
    setUrgency(5);
    setConfidence(5);
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
  };

  const triggerAIFeedback = (ideaId) => {
    onGetAIFeedback(ideaId);
    
    // Update local modal state if active
    if (selectedIdea && selectedIdea.id === ideaId) {
      setTimeout(() => {
        const updated = ideas.find(i => i.id === ideaId);
        setSelectedIdea(prev => ({
          ...prev,
          aiFeedback: generateMockAIEvaluation(prev.title, prev.problem, prev.yourSolution, prev.customer)
        }));
      }, 1500);
    }
  };

  const generateMockAIEvaluation = (title, problem, solution, customer) => {
    return {
      strengths: [
        `High relevance in the target segment: "${customer}".`,
        `Addressing a direct issue: "${problem.slice(0, 60)}..."`,
        `Your unique mechanism ("${solution.slice(0, 60)}...") provides a clear improvement over default hacks.`
      ],
      weaknesses: [
        "High initial acquisition friction. Direct outreach or content marketing is essential to keep CAC low.",
        "Retention risk: Founders must focus on onboarding speed to avoid immediate dropoff."
      ],
      opportunities: [
        "Integrate local automation or API links to reduce implementation time.",
        "White-label options or partner networks to capture market share fast."
      ],
      recommendation: "Focus on interviews with at least 5 potential users immediately. Do not write code yet. Prove they would pay to resolve this."
    };
  };

  const filteredIdeas = filterSector === 'All' 
    ? ideas 
    : ideas.filter(i => i.sector === filterSector);

  const getScoreColor = (score) => {
    if (score >= 75) return 'green';
    if (score >= 45) return 'yellow';
    return 'red';
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 1: Idea Journal</h1>
          <p className="workspace-subtitle">Log startup ideas, score urgency, and receive instant AI feedback.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Progress:</span>
          <span className="text-cyan">{ideas.length} / 5 Ideas Logged</span>
          <span className="text-emerald">Unlock: Idea Hunter Badge 🏹</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left Panel: Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--color-indigo)' }}>Log New Startup Idea</h3>
          
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="title">Startup Name / Working Title</label>
            <input 
              id="title"
              type="text" 
              placeholder="e.g. Uber for Pets, FounderOS..." 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: '12px', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-group">
              <label htmlFor="sector">Sector</label>
              <select id="sector" value={sector} onChange={e => setSector(e.target.value)}>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="customer">Target Customer Type</label>
              <input 
                id="customer"
                type="text" 
                placeholder="e.g. college students, small design agencies" 
                value={customer} 
                onChange={e => setCustomer(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="problem">What is the core problem observed?</label>
            <textarea 
              id="problem"
              rows="2" 
              placeholder="Describe the friction, pain, or inefficiency you saw..." 
              value={problem} 
              onChange={e => setProblem(e.target.value)}
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: '12px', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-group">
              <label htmlFor="whyMatters">Why does this matter? (Pain point intensity)</label>
              <textarea 
                id="whyMatters"
                rows="2" 
                placeholder="Why do they care? e.g. losing 5 hours a week, leaks cash..." 
                value={whyMatters} 
                onChange={e => setWhyMatters(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentSolution">Current Hack / Solution</label>
              <textarea 
                id="currentSolution"
                rows="2" 
                placeholder="How are they fixing it today? e.g. manual spreadsheets, doing nothing..." 
                value={currentSolution} 
                onChange={e => setCurrentSolution(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label htmlFor="yourSolution">Your Proposed Solution</label>
            <textarea 
              id="yourSolution"
              rows="2" 
              placeholder="What makes your product the magic cure?..." 
              value={yourSolution} 
              onChange={e => setYourSolution(e.target.value)}
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-group">
              <div className="flex-between">
                <label htmlFor="urgency">Urgency Score (1-10)</label>
                <span className="text-cyan font-display" style={{ fontWeight: 'bold' }}>{urgency}</span>
              </div>
              <input 
                id="urgency"
                type="range" 
                min="1" 
                max="10" 
                value={urgency} 
                onChange={e => setUrgency(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="flex-between">
                <label htmlFor="confidence">Confidence Score (1-10)</label>
                <span className="text-purple font-display" style={{ fontWeight: 'bold' }}>{confidence}</span>
              </div>
              <input 
                id="confidence"
                type="range" 
                min="1" 
                max="10" 
                value={confidence} 
                onChange={e => setConfidence(e.target.value)}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" className="btn btn-primary">
              Log Idea in Vault 💾
            </button>
          </div>
        </form>

        {/* Right Panel: Vault List */}
        <div>
          <div className="vault-header">
            <h3 className="font-display text-cyan">Your Idea Vault ({ideas.length})</h3>
            <select 
              value={filterSector} 
              onChange={e => setFilterSector(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}
            >
              <option value="All">All Sectors</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="idea-grid" style={{ gridTemplateColumns: '1fr' }}>
            {filteredIdeas.map(idea => (
              <div 
                key={idea.id} 
                className="glass-card idea-card"
                onClick={() => handleIdeaClick(idea)}
              >
                <div>
                  <div className="idea-card-header">
                    <span className="idea-tag">{idea.sector}</span>
                    <span className={`score-dot ${getScoreColor(idea.score)}`}>
                      ⚡ {idea.score}% Score
                    </span>
                  </div>
                  <h4 className="idea-card-title">{idea.title}</h4>
                  <p className="idea-card-desc">{idea.problem}</p>
                </div>
                <div className="idea-card-footer">
                  <span className="text-muted">Logged: {idea.createdDate}</span>
                  <span className="text-indigo" style={{ fontWeight: '600' }}>
                    {idea.aiFeedback ? '🟢 AI Reviewed' : '🟡 Unreviewed'}
                  </span>
                </div>
              </div>
            ))}
            {filteredIdeas.length === 0 && (
              <div className="glass-card text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
                🚀 Vault empty. Log your first idea using the form!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Idea details & AI Feedback modal */}
      {selectedIdea && (
        <div className="modal-overlay" onClick={() => setSelectedIdea(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedIdea(null)}>×</button>
            
            <span className="idea-tag" style={{ alignSelf: 'flex-start' }}>{selectedIdea.sector}</span>
            <h2 style={{ marginTop: '10px', marginBottom: '8px' }}>{selectedIdea.title}</h2>
            <p className="quest-level" style={{ marginBottom: '20px' }}>Idea Feasibility Score: {selectedIdea.score}%</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', lineHeight: '1.5' }}>
              <div>
                <strong className="text-indigo">Target Customer:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedIdea.customer}</p>
              </div>

              <div>
                <strong className="text-indigo">Core Problem:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedIdea.problem}</p>
              </div>

              <div>
                <strong className="text-indigo">Why it Matters:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedIdea.whyMatters || 'Not specified.'}</p>
              </div>

              <div>
                <strong className="text-indigo">Current Alternate Hacks:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedIdea.currentSolution || 'Not specified.'}</p>
              </div>

              <div>
                <strong className="text-indigo">Our Solution:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedIdea.yourSolution}</p>
              </div>
            </div>

            {/* AI Review Button or box */}
            {!selectedIdea.aiFeedback && !aiFeedbackState[selectedIdea.id] ? (
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button 
                  className="btn btn-accent" 
                  onClick={() => triggerAIFeedback(selectedIdea.id)}
                >
                  Ask AI Startup Mentor for Feedback 🤖 (+10 XP)
                </button>
              </div>
            ) : aiFeedbackState[selectedIdea.id] === 'loading' ? (
              <div className="ai-feedback-box text-center">
                <span className="text-cyan font-display">OS-1 Mentor is analyzing market gaps... ⏳</span>
              </div>
            ) : (
              <div className="ai-feedback-box">
                <div className="ai-feedback-header">
                  <span>🤖 OS-1 Incubator Feedback</span>
                  <span className="text-emerald" style={{ fontSize: '11px' }}>COMPLETED</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <h5 className="text-cyan" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>Strengths</h5>
                    <ul className="ai-feedback-bullets">
                      {(selectedIdea.aiFeedback || generateMockAIEvaluation(selectedIdea.title, selectedIdea.problem, selectedIdea.yourSolution, selectedIdea.customer)).strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-rose" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>Risks & Threats</h5>
                    <ul className="ai-feedback-bullets">
                      {(selectedIdea.aiFeedback || generateMockAIEvaluation(selectedIdea.title, selectedIdea.problem, selectedIdea.yourSolution, selectedIdea.customer)).weaknesses.map((w, idx) => (
                        <li key={idx} style={{ color: '#fda4af' }}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(6, 182, 212, 0.2)', paddingTop: '10px', marginTop: '6px' }}>
                    <h5 className="text-amber" style={{ fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>Action Plan</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {(selectedIdea.aiFeedback || generateMockAIEvaluation(selectedIdea.title, selectedIdea.problem, selectedIdea.yourSolution, selectedIdea.customer)).recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
