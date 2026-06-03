import React, { useState, useEffect } from 'react';
import './App.css';

// Components imports
import DashboardHUD from './components/DashboardHUD';
import QuestNavigation from './components/QuestNavigation';
import IdentitySetup from './components/IdentitySetup';
import IdeaJournal from './components/IdeaJournal';
import ValidationQuest from './components/ValidationQuest';
import MarketResearch from './components/MarketResearch';
import MVPLab from './components/MVPLab';
import FinancialDungeon from './components/FinancialDungeon';
import BrandForge from './components/BrandForge';
import LaunchRoom from './components/LaunchRoom';
import PitchChamber from './components/PitchChamber';
import ScaleMode from './components/ScaleMode';
import JournalAndFailureLog from './components/JournalAndFailureLog';
import AIMentor from './components/AIMentor';
import LevelUpOverlay from './components/LevelUpOverlay';
import MilestoneGallery from './components/MilestoneGallery';

const LEVEL_RANKS = [
  'Dreamer',      // Level 0 - Setup Phase
  'Dreamer',      // Level 1
  'Explorer',     // Level 2
  'Researcher',   // Level 3
  'Builder',      // Level 4
  'Operator',     // Level 5
  'Financer',     // Level 6
  'Launcher',     // Level 7
  'Strategist',   // Level 8
  'Visionary'     // Level 9
];

export default function App() {
  // Global Game States
  const [character, setCharacter] = useState(null);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState(0);
  const [streakCount, setStreakCount] = useState(1);
  const [activeTab, setActiveTab] = useState('level-0');
  
  // Level specific lists/records
  const [ideas, setIdeas] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [marketData, setMarketData] = useState(null);
  
  // Level 4 MVP tasks & parameters
  const [mvpTasks, setMvpTasks] = useState([
    { id: '1', title: 'Design landing page mockup', priority: 'Medium', status: 'Planned' },
    { id: '2', title: 'Draft value proposition pitch', priority: 'High', status: 'Planned' },
    { id: '3', title: 'Identify 5 target customer emails', priority: 'Low', status: 'Planned' }
  ]);
  const [mvpDetails, setMvpDetails] = useState({ mvpType: 'SaaS Web App', budget: 500, timeline: '4 weeks', validationScore: 70, isSaved: false });

  // Level 5 Finance
  const [financeDetails, setFinanceDetails] = useState(null);

  // Level 6 Brand
  const [brandDetails, setBrandDetails] = useState(null);

  // Level 7 Launch
  const [launchState, setLaunchState] = useState({ landing: false, waitlist: false, content: false, beta: false, assets: false, email: false, channels: false, launched: false });

  // Level 8 Pitch
  const [pitchSlides, setPitchSlides] = useState({ problem: null, solution: null, market: null, model: null, ask: null });

  // Level 9 Scale metrics
  const [scaleMetrics, setScaleMetrics] = useState(null);

  // Extra Journal lists
  const [journals, setJournals] = useState([]);
  const [failures, setFailures] = useState([]);

  // UI Celebration / Modals toggles
  const [showTrophies, setShowTrophies] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [recentLeveledUp, setRecentLeveledUp] = useState(0);
  const [aiFeedbackState, setAiFeedbackState] = useState({});

  // 1. Load state from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('founder_os_save_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.character) setCharacter(parsed.character);
        if (parsed.unlockedBadges) setUnlockedBadges(parsed.unlockedBadges);
        if (parsed.xp) setXp(parsed.xp);
        if (parsed.level) setLevel(parsed.level);
        if (parsed.highestUnlockedLevel) setHighestUnlockedLevel(parsed.highestUnlockedLevel);
        if (parsed.streakCount) setStreakCount(parsed.streakCount);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.ideas) setIdeas(parsed.ideas);
        if (parsed.interviews) setInterviews(parsed.interviews);
        if (parsed.marketData) setMarketData(parsed.marketData);
        if (parsed.mvpTasks) setMvpTasks(parsed.mvpTasks);
        if (parsed.mvpDetails) setMvpDetails(parsed.mvpDetails);
        if (parsed.financeDetails) setFinanceDetails(parsed.financeDetails);
        if (parsed.brandDetails) setBrandDetails(parsed.brandDetails);
        if (parsed.launchState) setLaunchState(parsed.launchState);
        if (parsed.pitchSlides) setPitchSlides(parsed.pitchSlides);
        if (parsed.scaleMetrics) setScaleMetrics(parsed.scaleMetrics);
        if (parsed.journals) setJournals(parsed.journals);
        if (parsed.failures) setFailures(parsed.failures);
      } catch (e) {
        console.error("Error loading FounderOS saved state", e);
      }
    }
  }, []);

  // 2. Persist state to LocalStorage
  const saveGameState = (updatedState = {}) => {
    const currentState = {
      character,
      unlockedBadges,
      xp,
      level,
      highestUnlockedLevel,
      streakCount,
      activeTab,
      ideas,
      interviews,
      marketData,
      mvpTasks,
      mvpDetails,
      financeDetails,
      brandDetails,
      launchState,
      pitchSlides,
      scaleMetrics,
      journals,
      failures,
      ...updatedState
    };
    localStorage.setItem('founder_os_save_v1', JSON.stringify(currentState));
  };

  // Helper: Increment XP and check for Level Up milestones
  const addXp = (amount, customState = {}) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      
      // Calculate level based on XP thresholds if relevant, or rely on linear quest unlocks
      // Let's check linear level promotion based on quest completes (highestUnlockedLevel)
      // This helper updates the state and saves
      const nextState = { xp: newXp, ...customState };
      saveGameState(nextState);
      return newXp;
    });
  };

  const unlockBadge = (badgeId) => {
    if (!unlockedBadges.includes(badgeId)) {
      const nextBadges = [...unlockedBadges, badgeId];
      setUnlockedBadges(nextBadges);
      saveGameState({ unlockedBadges: nextBadges });
    }
  };

  const handleLevelUp = (nextLevel) => {
    setLevel(nextLevel);
    setHighestUnlockedLevel(prev => Math.max(prev, nextLevel));
    setRecentLeveledUp(nextLevel);
    setShowLevelUp(true);
    setActiveTab(`level-${nextLevel}`);
    
    saveGameState({
      level: nextLevel,
      highestUnlockedLevel: Math.max(highestUnlockedLevel, nextLevel),
      activeTab: `level-${nextLevel}`
    });
  };

  // LEVEL 0: Complete Identity Setup
  const handleCompleteIdentity = (newChar) => {
    setCharacter(newChar);
    unlockBadge('passport');
    
    // Auto transition to Level 1, add XP, show level up overlay
    setLevel(1);
    setHighestUnlockedLevel(1);
    setRecentLeveledUp(1);
    setShowLevelUp(true);
    setActiveTab('level-1');

    saveGameState({
      character: newChar,
      unlockedBadges: [...unlockedBadges, 'passport'],
      level: 1,
      highestUnlockedLevel: 1,
      activeTab: 'level-1',
      xp: xp + 100
    });
    setXp(prev => prev + 100);
  };

  // LEVEL 1: Add Startup Idea
  const handleAddIdea = (newIdea) => {
    const nextIdeas = [...ideas, newIdea];
    setIdeas(nextIdeas);
    
    // Reward XP
    let addedXp = 20;
    const nextBadges = [...unlockedBadges];
    
    // Check if badge unlocked
    if (nextIdeas.length >= 5 && !unlockedBadges.includes('hunter')) {
      nextBadges.push('hunter');
      setUnlockedBadges(nextBadges);
      addedXp += 100; // Bonus badge XP
      
      // Auto promote to level 2!
      setTimeout(() => {
        handleLevelUp(2);
      }, 800);
    }

    addXp(addedXp, { ideas: nextIdeas, unlockedBadges: nextBadges });
  };

  // LEVEL 1: AI Mentor evaluation trigger
  const handleGetAIFeedback = (ideaId) => {
    setAiFeedbackState(prev => ({ ...prev, [ideaId]: 'loading' }));

    setTimeout(() => {
      setAiFeedbackState(prev => ({ ...prev, [ideaId]: 'loaded' }));
      
      // Update ideas list to append reviewed tag
      const updatedIdeas = ideas.map(idea => {
        if (idea.id === ideaId) {
          return { ...idea, aiFeedback: true }; // Trigger local template render
        }
        return idea;
      });
      setIdeas(updatedIdeas);

      addXp(10, { ideas: updatedIdeas });
    }, 1500);
  };

  // LEVEL 2: Log Interview
  const handleAddInterview = (newInterview) => {
    const nextInterviews = [...interviews, newInterview];
    setInterviews(nextInterviews);

    let addedXp = 50;
    const nextBadges = [...unlockedBadges];

    if (nextInterviews.length >= 3 && !unlockedBadges.includes('whisperer')) {
      nextBadges.push('whisperer');
      setUnlockedBadges(nextBadges);
      addedXp += 150; // Bonus badge XP

      // Auto promote to level 3!
      setTimeout(() => {
        handleLevelUp(3);
      }, 800);
    }

    addXp(addedXp, { interviews: nextInterviews, unlockedBadges: nextBadges });
  };

  // LEVEL 3: Save Market Research
  const handleSaveMarketAnalysis = (data) => {
    setMarketData(data);
    
    if (data) {
      const nextBadges = [...unlockedBadges];
      let addedXp = 100;

      if (!unlockedBadges.includes('explorer')) {
        nextBadges.push('explorer');
        setUnlockedBadges(nextBadges);
        
        // Auto promote to Level 4
        setTimeout(() => {
          handleLevelUp(4);
        }, 800);
      }

      addXp(addedXp, { marketData: data, unlockedBadges: nextBadges });
    } else {
      saveGameState({ marketData: null });
    }
  };

  // LEVEL 4: Kanban operations
  const handleAddMvpTask = (newTask) => {
    const nextTasks = [...mvpTasks, newTask];
    setMvpTasks(nextTasks);
    saveGameState({ mvpTasks: nextTasks });
  };

  const handleMoveMvpTask = (taskId, newStatus) => {
    const updatedTasks = mvpTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setMvpTasks(updatedTasks);

    let addedXp = 0;
    const nextBadges = [...unlockedBadges];
    const doneCount = updatedTasks.filter(t => t.status === 'Done').length;

    // XP on task completion
    if (newStatus === 'Done') {
      addedXp += 30;
    }

    // Check level up condition (3 done + details saved)
    if (doneCount >= 3 && mvpDetails.isSaved && !unlockedBadges.includes('architect')) {
      nextBadges.push('architect');
      setUnlockedBadges(nextBadges);
      addedXp += 150;

      setTimeout(() => {
        handleLevelUp(5);
      }, 800);
    }

    if (addedXp > 0) {
      addXp(addedXp, { mvpTasks: updatedTasks, unlockedBadges: nextBadges });
    } else {
      saveGameState({ mvpTasks: updatedTasks });
    }
  };

  const handleSaveMvpDetails = (details) => {
    setMvpDetails(details);
    
    const nextBadges = [...unlockedBadges];
    let addedXp = 0;
    const doneCount = mvpTasks.filter(t => t.status === 'Done').length;

    if (doneCount >= 3 && details.isSaved && !unlockedBadges.includes('architect')) {
      nextBadges.push('architect');
      setUnlockedBadges(nextBadges);
      addedXp += 150;

      setTimeout(() => {
        handleLevelUp(5);
      }, 800);
    }

    if (addedXp > 0) {
      addXp(addedXp, { mvpDetails: details, unlockedBadges: nextBadges });
    } else {
      saveGameState({ mvpDetails: details });
    }
  };

  const handleDeleteMvpTask = (taskId) => {
    const nextTasks = mvpTasks.filter(t => t.id !== taskId);
    setMvpTasks(nextTasks);
    saveGameState({ mvpTasks: nextTasks });
  };

  // LEVEL 5: Financial Dungeon Save
  const handleSaveFinance = (finance) => {
    setFinanceDetails(finance);
    
    // Check if runway and cac criteria are healthy
    const totalBurn = finance.rent + finance.marketing + finance.hosting + finance.salaries + finance.misc;
    const totalRev = finance.price * finance.users;
    const netMonthly = totalBurn - totalRev;
    const runway = netMonthly <= 0 ? 999 : (finance.capital / netMonthly);
    const ltv = finance.churn > 0 ? (finance.price / (finance.churn / 100)) : 0;
    const ltvCacRatio = finance.cac > 0 ? (ltv / finance.cac) : 0;

    const isHealthy = (runway === 999 || runway >= 6) && ltvCacRatio >= 3;
    let addedXp = 50;
    const nextBadges = [...unlockedBadges];

    if (isHealthy && !unlockedBadges.includes('survivor')) {
      nextBadges.push('survivor');
      setUnlockedBadges(nextBadges);
      addedXp += 150;

      // Auto promote to level 6
      setTimeout(() => {
        handleLevelUp(6);
      }, 800);
    }

    addXp(addedXp, { financeDetails: finance, unlockedBadges: nextBadges });
  };

  // LEVEL 6: Brand blueprint save
  const handleSaveBrand = (brand) => {
    setBrandDetails(brand);

    let addedXp = 100;
    const nextBadges = [...unlockedBadges];

    if (!unlockedBadges.includes('brand')) {
      nextBadges.push('brand');
      setUnlockedBadges(nextBadges);
      
      // Auto promote to Level 7
      setTimeout(() => {
        handleLevelUp(7);
      }, 800);
    }

    addXp(addedXp, { brandDetails: brand, unlockedBadges: nextBadges });
  };

  // LEVEL 7: Toggle launch checklist item
  const handleToggleLaunchItem = (itemId) => {
    const updatedState = { ...launchState, [itemId]: !launchState[itemId] };
    setLaunchState(updatedState);
    saveGameState({ launchState: updatedState });
  };

  // LEVEL 7: Big Launch Toggle Switch Trigger
  const handleTriggerLaunch = () => {
    const updatedState = { ...launchState, launched: true };
    setLaunchState(updatedState);

    let addedXp = 1000;
    const nextBadges = [...unlockedBadges];

    if (!unlockedBadges.includes('commander')) {
      nextBadges.push('commander');
      setUnlockedBadges(nextBadges);

      // Auto promote to level 8
      setTimeout(() => {
        handleLevelUp(8);
      }, 1000);
    }

    addXp(addedXp, { launchState: updatedState, unlockedBadges: nextBadges });
  };

  // LEVEL 8: Pitch slides save
  const handleSaveSlide = (slideKey, text) => {
    const updatedSlides = { ...pitchSlides, [slideKey]: { text } };
    setPitchSlides(updatedSlides);
    saveGameState({ pitchSlides: updatedSlides });
  };

  const handleCompletePitch = () => {
    let addedXp = 200;
    const nextBadges = [...unlockedBadges];

    if (!unlockedBadges.includes('ready')) {
      nextBadges.push('ready');
      setUnlockedBadges(nextBadges);

      // Auto promote to level 9 (Ultimate Scale!)
      setTimeout(() => {
        handleLevelUp(9);
      }, 800);
    }

    addXp(addedXp, { unlockedBadges: nextBadges });
  };

  // LEVEL 9: Scale KPI update
  const handleUpdateScaleMetrics = (metrics) => {
    setScaleMetrics(metrics);
    
    let addedXp = 50;
    const nextBadges = [...unlockedBadges];

    if (!unlockedBadges.includes('scale')) {
      nextBadges.push('scale');
      setUnlockedBadges(nextBadges);
    }

    addXp(addedXp, { scaleMetrics: metrics, unlockedBadges: nextBadges });
  };

  // EXTRA FEATURES: Journal & failures
  const handleAddJournal = (journal) => {
    const nextJournals = [journal, ...journals];
    setJournals(nextJournals);
    
    // Reward XP + increment streak count
    addXp(15, { journals: nextJournals, streakCount: streakCount + 1 });
    setStreakCount(prev => prev + 1);
  };

  const handleAddFailure = (failure) => {
    const nextFailures = [failure, ...failures];
    setFailures(nextFailures);

    let addedXp = 50; // Every converted failure yields +50 XP
    const nextBadges = [...unlockedBadges];

    if (!unlockedBadges.includes('wisdom')) {
      nextBadges.push('wisdom');
      setUnlockedBadges(nextBadges);
    }

    addXp(addedXp, { failures: nextFailures, unlockedBadges: nextBadges });
  };

  const handleResetGame = () => {
    if (window.confirm("⚠️ WARNING: This will permanently wipe your RPG character passport, level, XP, ideas vault, and financial runway metrics. Are you sure?")) {
      localStorage.removeItem('founder_os_save_v1');
      setCharacter(null);
      setUnlockedBadges([]);
      setXp(0);
      setLevel(0);
      setHighestUnlockedLevel(0);
      setStreakCount(1);
      setIdeas([]);
      setInterviews([]);
      setMarketData(null);
      setMvpTasks([
        { id: '1', title: 'Design landing page mockup', priority: 'Medium', status: 'Planned' },
        { id: '2', title: 'Draft value proposition pitch', priority: 'High', status: 'Planned' },
        { id: '3', title: 'Identify 5 target customer emails', priority: 'Low', status: 'Planned' }
      ]);
      setMvpDetails({ mvpType: 'SaaS Web App', budget: 500, timeline: '4 weeks', validationScore: 70, isSaved: false });
      setFinanceDetails(null);
      setBrandDetails(null);
      setLaunchState({ landing: false, waitlist: false, content: false, beta: false, assets: false, email: false, channels: false, launched: false });
      setPitchSlides({ problem: null, solution: null, market: null, model: null, ask: null });
      setScaleMetrics(null);
      setJournals([]);
      setFailures([]);
      setActiveTab('level-0');
    }
  };

  // Helper to compute runtime stats
  const calculateRunway = () => {
    if (!financeDetails) return null;
    const totalBurn = financeDetails.rent + financeDetails.marketing + financeDetails.hosting + financeDetails.salaries + financeDetails.misc;
    const totalRev = financeDetails.price * financeDetails.users;
    const netMonthly = totalBurn - totalRev;
    if (netMonthly <= 0) return 999; // Infinite
    return Math.round((financeDetails.capital / netMonthly) * 10) / 10;
  };

  const calculateNetBurn = () => {
    if (!financeDetails) return 0;
    const totalBurn = financeDetails.rent + financeDetails.marketing + financeDetails.hosting + financeDetails.salaries + financeDetails.misc;
    const totalRev = financeDetails.price * financeDetails.users;
    return totalBurn - totalRev;
  };

  const currentRankTitle = LEVEL_RANKS[level] || 'Visionary';

  return (
    <div className="app-container">
      {/* HUD Header Bar */}
      <DashboardHUD 
        xp={xp}
        level={level}
        rankTitle={currentRankTitle}
        character={character}
        streakCount={streakCount}
        ideasCount={ideas.length}
        badgesCount={unlockedBadges.length}
        onOpenTrophies={() => setShowTrophies(true)}
      />

      {/* Main Quest Navigator + Workspace */}
      <main className="main-content">
        <QuestNavigation 
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          highestUnlockedLevel={highestUnlockedLevel}
        />

        <section className="workspace-canvas glass-panel">
          {activeTab === 'level-0' && (
            <IdentitySetup 
              character={character}
              onComplete={handleCompleteIdentity}
              onReset={handleResetGame}
            />
          )}

          {activeTab === 'level-1' && (
            <IdeaJournal 
              ideas={ideas}
              onAddIdea={handleAddIdea}
              onGetAIFeedback={handleGetAIFeedback}
              aiFeedbackState={aiFeedbackState}
              currentXp={xp}
            />
          )}

          {activeTab === 'level-2' && (
            <ValidationQuest 
              interviews={interviews}
              onAddInterview={handleAddInterview}
            />
          )}

          {activeTab === 'level-3' && (
            <MarketResearch 
              marketData={marketData}
              onSaveMarketAnalysis={handleSaveMarketAnalysis}
            />
          )}

          {activeTab === 'level-4' && (
            <MVPLab 
              mvpTasks={mvpTasks}
              mvpDetails={mvpDetails}
              onAddTask={handleAddMvpTask}
              onMoveTask={handleMoveMvpTask}
              onSaveDetails={handleSaveMvpDetails}
              onDeleteTask={handleDeleteMvpTask}
            />
          )}

          {activeTab === 'level-5' && (
            <FinancialDungeon 
              financeDetails={financeDetails}
              onSaveFinance={handleSaveFinance}
              startingCapital={character?.capital}
            />
          )}

          {activeTab === 'level-6' && (
            <BrandForge 
              brandDetails={brandDetails}
              onSaveBrand={handleSaveBrand}
            />
          )}

          {activeTab === 'level-7' && (
            <LaunchRoom 
              launchState={launchState}
              onToggleLaunchItem={handleToggleLaunchItem}
              onTriggerLaunch={handleTriggerLaunch}
            />
          )}

          {activeTab === 'level-8' && (
            <PitchChamber 
              pitchSlides={pitchSlides}
              onSaveSlide={handleSaveSlide}
              onCompletePitch={handleCompletePitch}
            />
          )}

          {activeTab === 'level-9' && (
            <ScaleMode 
              scaleMetrics={scaleMetrics}
              onUpdateMetrics={handleUpdateScaleMetrics}
              streakCount={streakCount}
            />
          )}

          {activeTab === 'reflection' && (
            <JournalAndFailureLog 
              journals={journals}
              failures={failures}
              onAddJournal={handleAddJournal}
              onAddFailure={handleAddFailure}
            />
          )}
        </section>
      </main>

      {/* Floating AI Mentor Widget */}
      <AIMentor 
        currentLevel={level}
        character={character}
        ideas={ideas}
        runway={calculateRunway()}
        netMonthly={calculateNetBurn()}
        activeTab={activeTab}
      />

      {/* Modals & Overlay Celebration viewports */}
      {showLevelUp && (
        <LevelUpOverlay 
          level={recentLeveledUp}
          rankTitle={LEVEL_RANKS[recentLeveledUp] || 'Visionary'}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {showTrophies && (
        <MilestoneGallery 
          unlockedBadges={unlockedBadges}
          onClose={() => setShowTrophies(false)}
        />
      )}
    </div>
  );
}
