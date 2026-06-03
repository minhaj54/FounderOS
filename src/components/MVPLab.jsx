import React, { useState } from 'react';

const MVP_TYPES = ['SaaS Web App', 'D2C Storefront', 'No-code MVP', 'Chrome Extension', 'Substack/Newsletter', 'Discord/Community', 'Mobile App'];

export default function MVPLab({ mvpTasks, mvpDetails, onAddTask, onMoveTask, onSaveDetails, onDeleteTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  
  const [mvpType, setMvpType] = useState(mvpDetails?.mvpType || 'SaaS Web App');
  const [budget, setBudget] = useState(mvpDetails?.budget || '500');
  const [timeline, setTimeline] = useState(mvpDetails?.timeline || '4 weeks');
  const [validationScore, setValidationScore] = useState(mvpDetails?.validationScore || '70');

  const doneCount = mvpTasks.filter(t => t.status === 'Done').length;
  const isQuestMet = doneCount >= 3 && mvpDetails?.isSaved;

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      priority,
      status: 'Planned'
    };

    onAddTask(newTask);
    setTaskTitle('');
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    onSaveDetails({
      mvpType,
      budget: parseFloat(budget),
      timeline,
      validationScore: parseFloat(validationScore),
      isSaved: true
    });
  };

  const getPriorityClass = (pri) => {
    if (pri === 'High') return 'priority-high';
    if (pri === 'Medium') return 'priority-medium';
    return 'priority-low';
  };

  const moveCard = (taskId, direction) => {
    const columns = ['Planned', 'Building', 'Testing', 'Done'];
    const task = mvpTasks.find(t => t.id === taskId);
    if (!task) return;

    const currIdx = columns.indexOf(task.status);
    let nextIdx = currIdx + direction;
    if (nextIdx >= 0 && nextIdx < columns.length) {
      onMoveTask(taskId, columns[nextIdx]);
    }
  };

  return (
    <div>
      <div className="workspace-title-row">
        <div className="workspace-title-group">
          <h1 className="workspace-title">Level 4: MVP Lab</h1>
          <p className="workspace-subtitle">Plan and build your first version. Organize core feature sets via Kanban.</p>
        </div>
        <div className="reward-badge-panel">
          <span>🎁 Lab Requirements:</span>
          <span className="text-cyan">{doneCount} / 3 Tasks Done</span>
          <span className="text-emerald">Builder Rank Promotion 🔧</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Side: Planning Form & Creator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* MVP Details Panel */}
          <form onSubmit={handleDetailsSubmit} className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-cyan" style={{ marginBottom: '14px', fontSize: '15px' }}>MVP Parameters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="mvpType">MVP Structure Type</label>
                <select id="mvpType" value={mvpType} onChange={e => setMvpType(e.target.value)}>
                  {MVP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="budget">MVP Budget Limit ($)</label>
                <input 
                  id="budget"
                  type="number" 
                  value={budget} 
                  onChange={e => setBudget(e.target.value)} 
                  placeholder="e.g. 500" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeline">Development Timeline</label>
                <input 
                  id="timeline"
                  type="text" 
                  value={timeline} 
                  onChange={e => setTimeline(e.target.value)} 
                  placeholder="e.g. 3 weeks" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="validationScore">Confidence Goal (%)</label>
                <input 
                  id="validationScore"
                  type="number" 
                  value={validationScore} 
                  onChange={e => setValidationScore(e.target.value)} 
                  placeholder="e.g. 80" 
                />
              </div>
              <button type="submit" className="btn btn-accent" style={{ marginTop: '10px', width: '100%' }}>
                {mvpDetails?.isSaved ? 'Update Scope Details ✓' : 'Save MVP Scope Details'}
              </button>
            </div>
          </form>

          {/* Add Task Form */}
          <form onSubmit={handleAddTaskSubmit} className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="text-indigo" style={{ marginBottom: '14px', fontSize: '15px' }}>Add Feature / Task</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="form-group">
                <label htmlFor="taskTitle">Feature Title</label>
                <input 
                  id="taskTitle"
                  type="text" 
                  placeholder="e.g. Stripe checkout integration" 
                  value={taskTitle} 
                  onChange={e => setTaskTitle(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Scope Priority</label>
                <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="High">🔥 High (Must Have)</option>
                  <option value="Medium">⚡ Medium (Should Have)</option>
                  <option value="Low">💤 Low (Nice to Have)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>
                Add to Board 📋
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Kanban Board */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div className="flex-between" style={{ marginBottom: '14px' }}>
            <h3 className="text-cyan font-display">MVP Kanban Flow</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Completed: <strong className="text-emerald">{doneCount} features</strong>
            </span>
          </div>

          <div className="kanban-board">
            {/* Planned */}
            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="kanban-col-title text-indigo">Planned</span>
                <span className="kanban-col-count">{mvpTasks.filter(t => t.status === 'Planned').length}</span>
              </div>
              <div className="kanban-cards-wrapper">
                {mvpTasks.filter(t => t.status === 'Planned').map(task => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-title">{task.title}</div>
                    <div className="kanban-card-meta">
                      <span className={`kanban-card-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
                      <span style={{ cursor: 'pointer', color: 'var(--text-rose)' }} onClick={() => onDeleteTask(task.id)}>🗑️</span>
                    </div>
                    <div className="kanban-card-actions">
                      <button className="kanban-card-act-btn" style={{ marginLeft: 'auto' }} onClick={() => moveCard(task.id, 1)}>Next →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Building */}
            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="kanban-col-title text-amber">Building</span>
                <span className="kanban-col-count">{mvpTasks.filter(t => t.status === 'Building').length}</span>
              </div>
              <div className="kanban-cards-wrapper">
                {mvpTasks.filter(t => t.status === 'Building').map(task => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-title">{task.title}</div>
                    <div className="kanban-card-meta">
                      <span className={`kanban-card-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
                    </div>
                    <div className="kanban-card-actions">
                      <button className="kanban-card-act-btn" onClick={() => moveCard(task.id, -1)}>← Back</button>
                      <button className="kanban-card-act-btn" style={{ marginLeft: 'auto' }} onClick={() => moveCard(task.id, 1)}>Next →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="kanban-col-title text-cyan">Testing</span>
                <span className="kanban-col-count">{mvpTasks.filter(t => t.status === 'Testing').length}</span>
              </div>
              <div className="kanban-cards-wrapper">
                {mvpTasks.filter(t => t.status === 'Testing').map(task => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-title">{task.title}</div>
                    <div className="kanban-card-meta">
                      <span className={`kanban-card-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
                    </div>
                    <div className="kanban-card-actions">
                      <button className="kanban-card-act-btn" onClick={() => moveCard(task.id, -1)}>← Back</button>
                      <button className="kanban-card-act-btn" style={{ marginLeft: 'auto' }} onClick={() => moveCard(task.id, 1)}>Done ✓</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done */}
            <div className="kanban-col" style={{ background: 'rgba(16, 185, 129, 0.03)' }}>
              <div className="kanban-col-header">
                <span className="kanban-col-title text-emerald">Done</span>
                <span className="kanban-col-count">{mvpTasks.filter(t => t.status === 'Done').length}</span>
              </div>
              <div className="kanban-cards-wrapper">
                {mvpTasks.filter(t => t.status === 'Done').map(task => (
                  <div key={task.id} className="kanban-card" style={{ borderLeft: '3px solid var(--color-emerald)' }}>
                    <div className="kanban-card-title" style={{ textDecoration: 'line-through', opacity: 0.6 }}>{task.title}</div>
                    <div className="kanban-card-meta">
                      <span className={`kanban-card-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
                    </div>
                    <div className="kanban-card-actions">
                      <button className="kanban-card-act-btn" onClick={() => moveCard(task.id, -1)}>← Reopen</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
