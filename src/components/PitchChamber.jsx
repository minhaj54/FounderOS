import React, { useState } from 'react';

const INITIAL_SLIDES = {
  problem: { title: 'The Problem ❌', text: 'Users spend 10+ hours per week running manual calculations and operating disjointed workflows.' },
  solution: { title: 'The Solution 🦄', text: 'A unified gamified OS that guides founders through their startup journey step by step.' },
  market: { title: 'Market Sizing 📈', text: 'TAM of $15B with a highly active, expanding segment of 500,000 solopreneurs globally.' },
  model: { title: 'Business Model 💸', text: 'SaaS monthly subscriptions priced at $29/mo with low CAC and strong LTV:CAC ratios.' },
  ask: { title: 'The Capital Ask 💰', text: 'Seeking $250k pre-seed to accelerate MVP features and marketing acquisition channels.' }
};

export default function PitchChamber({ pitchSlides, onSaveSlide, onCompletePitch }) {
  const [activeSlideKey, setActiveSlideKey] = useState('problem');
  const [slideText, setSlideText] = useState(pitchSlides?.problem?.text || INITIAL_SLIDES.problem.text);

  const [isPresentMode, setIsPresentMode] = useState(false);
  const [presentIndex, setPresentIndex] = useState(0);

  const slideKeys = ['problem', 'solution', 'market', 'model', 'ask'];

  const handleTabChange = (key) => {
    // Save current slide edits first
    onSaveSlide(activeSlideKey, slideText);
    
    // Switch tab
    setActiveSlideKey(key);
    setSlideText(pitchSlides?.[key]?.text || INITIAL_SLIDES[key].text);
  };

  const handleTextChange = (e) => {
    setSlideText(e.target.value);
  };

  const triggerSaveCurrent = () => {
    onSaveSlide(activeSlideKey, slideText);
    alert('Slide saved successfully! 💾');
  };

  const startPresentation = () => {
    // Save current slide text first
    onSaveSlide(activeSlideKey, slideText);
    setIsPresentMode(true);
    setPresentIndex(0);
  };

  const endPresentation = () => {
    setIsPresentMode(false);
    onCompletePitch();
  };

  const currentPreviewText = activeSlideKey === 'problem' ? slideText : (pitchSlides?.[activeSlideKey]?.text || INITIAL_SLIDES[activeSlideKey].text);

  // PDF Export simulation
  const exportPDF = () => {
    alert("Compiling presentation slides... Exporting PDF artifact! 📄 (Simulated)");
  };

  return (
    <div>
      {/* Presentation Mode Overlay */}
      {isPresentMode && (
        <div className="present-mode-overlay">
          <button className="present-close-btn" onClick={endPresentation}>
            Exit Presentation Mode (Complete Quest ✓)
          </button>
          
          <div className="present-slide-container">
            <span className="slide-badge-stamp">Investor Deck</span>
            
            <h2 style={{ fontSize: '42px', color: 'white', marginBottom: '24px' }}>
              {INITIAL_SLIDES[slideKeys[presentIndex]].title}
            </h2>
            <p style={{ fontSize: '22px', color: 'var(--text-secondary)', maxWidth: '85%', lineHeight: '1.6' }}>
              {pitchSlides?.[slideKeys[presentIndex]]?.text || INITIAL_SLIDES[slideKeys[presentIndex]].text}
            </p>

            <div className="present-nav-row">
              <button 
                className="present-nav-btn" 
                onClick={() => setPresentIndex(prev => Math.max(0, prev - 1))}
                disabled={presentIndex === 0}
                style={{ opacity: presentIndex === 0 ? 0.3 : 1 }}
              >
                ←
              </button>
              <span className="present-slide-counter">
                Slide {presentIndex + 1} of {slideKeys.length}
              </span>
              <button 
                className="present-nav-btn" 
                onClick={() => setPresentIndex(prev => Math.min(slideKeys.length - 1, prev + 1))}
                disabled={presentIndex === slideKeys.length - 1}
                style={{ opacity: presentIndex === slideKeys.length - 1 ? 0.3 : 1 }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 8: Pitch Chamber</h1>
          <p className="workspace-subtitle">Construct your investor slide deck, run presentation mode, and pitch partners.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Quest Reward:</span>
          <span className="text-amber">+200 Present XP</span>
          <span className="text-emerald">Investor Ready Badge 💼</span>
        </div>
      </div>

      <div className="pitch-container">
        {/* Left Side: Slide Tabs */}
        <div className="pitch-sidebar">
          {slideKeys.map(key => (
            <button 
              key={key}
              className={`pitch-slide-tab ${activeSlideKey === key ? 'active' : ''}`}
              onClick={() => handleTabChange(key)}
            >
              {INITIAL_SLIDES[key].title}
            </button>
          ))}
          
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '20px' }} 
            onClick={startPresentation}
          >
            Present Slides 🎬
          </button>

          <button 
            className="btn btn-accent" 
            onClick={exportPDF}
          >
            Export PDF 📄
          </button>
        </div>

        {/* Right Side: Slide Editor & Preview */}
        <div className="pitch-workspace">
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div className="slide-editor">
              <h3 className="text-cyan font-display">Edit Slide: {INITIAL_SLIDES[activeSlideKey].title}</h3>
              <div className="form-group">
                <label htmlFor="slideText">Content Copy</label>
                <textarea 
                  id="slideText"
                  rows="4" 
                  value={slideText} 
                  onChange={handleTextChange}
                  placeholder="Enter slide content points..."
                />
              </div>
              <div style={{ textAlign: 'right' }}>
                <button type="button" className="btn btn-accent" onClick={triggerSaveCurrent}>
                  Save Current Slide 💾
                </button>
              </div>
            </div>
          </div>

          {/* Slide Preview representation */}
          <div className="slide-preview-box">
            <span className="slide-badge-stamp">Preview Screen</span>
            <h2>{INITIAL_SLIDES[activeSlideKey].title}</h2>
            <p>{currentPreviewText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
