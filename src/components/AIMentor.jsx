import React, { useState, useEffect, useRef } from 'react';

const SYSTEM_GREETINGS = {
  0: "Greetings, founder. Welcome to FounderOS. I am OS-1, your digital incubator mentor. Start by customizing your character identity to unlock your quest journal!",
  1: "Excellent choice on your identity setup! Welcome to the Idea Journal. Log your first few startup ideas here. Remember to focus on deep, burning problems, not just cool tech.",
  2: "Validation is where dreamers become founders. Go speak to potential customers. Ask open-ended questions about their pain points. Try not to pitch your solution too early!",
  3: "Welcome to the Market Arena. Sizing your market is critical to know if your business can sustain you. Make sure you pinpoint a distinct gap in the competitor matrix.",
  4: "Time to build! Keep your MVP scope laser-focused. In the Kanban board, only build what is absolutely required to test your core hypothesis. Cut the nice-to-haves.",
  5: "Welcome to the Financial Dungeon. Cash flow is the oxygen of your startup. Keep your LTV:CAC above 3x and make sure your runway survival is at least 6 months.",
  6: "Forge your brand. Define your core mission and voice archetype. A strong founder story builds a emotional connection that no competitor can copy easily.",
  7: "Operational Launch Room. Double-check all items on your checklist. Once everything is green, pull the switch and let's go public!",
  8: "The Pitch Chamber. Investors do not invest in products; they invest in business models and founder velocity. Keep your slides concise and practice your ask.",
  9: "You've crossed the gates of the operating system. You are now scaling. Keep your streaks active, check your monthly missions, and review failures weekly."
};

export default function AIMentor({ currentLevel, character, ideas, runway, netMonthly, activeTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'mentor', text: SYSTEM_GREETINGS[0], timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Trigger welcome message when level changes
  useEffect(() => {
    const greeting = SYSTEM_GREETINGS[currentLevel] || "Greetings! Let's build something epic today.";
    setMessages([
      { sender: 'mentor', text: greeting, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, [currentLevel]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput('');

    // Generate smart response based on context
    setTimeout(() => {
      let replyText = "";
      
      const charClass = character ? character.founderClass : "Dreamer";
      const ideaName = ideas && ideas.length > 0 ? ideas[ideas.length - 1].title : null;

      if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        replyText = `Hello! As a ${charClass}, you have unique traits. How can I guide you on your Level ${currentLevel} quests today?`;
      } 
      else if (query.includes('idea') || query.includes('problem')) {
        if (ideaName) {
          replyText = `Your last logged idea is '${ideaName}'. Make sure you validate this problem. Who is the specific customer that experiences this at least twice a week?`;
        } else {
          replyText = "I see no ideas in your vault. Head over to Level 1 and log your first startup idea to get started.";
        }
      } 
      else if (query.includes('runway') || query.includes('money') || query.includes('burn') || query.includes('finance')) {
        if (runway) {
          replyText = `Currently, your capital reserves give you ${runway === 999 ? 'infinite' : runway + ' months of'} runway. Your net monthly burn is -$${netMonthly}/mo. Focus on pricing and keeping CAC low.`;
        } else {
          replyText = "In the Financial Dungeon (Level 5), we calculate runway. Set your monthly marketing and hosting costs, and make sure your pricing model is positive.";
        }
      } 
      else if (query.includes('mvp') || query.includes('build')) {
        replyText = "When building your MVP, follow the rule of subtraction. What can you REMOVE from your features list and still solve the core customer problem? Cut 50% of your features immediately.";
      } 
      else if (query.includes('pitch') || query.includes('investor') || query.includes('funding')) {
        replyText = "To attract pre-seed investors, prove customer traction first. If you have logged interviews with pay intent (Level 2) and a launched waitlist (Level 7), your slides will look 10x stronger.";
      }
      else if (query.includes('marketing') || query.includes('growth') || query.includes('customer')) {
        replyText = "Acquisition is won through focus. Don't post on 5 channels. Pick ONE channel where your target audience hangs out (e.g., LinkedIn for B2B, TikTok/X for D2C) and double down.";
      }
      else {
        replyText = `Incubator OS-1 advice: At Level ${currentLevel}, focus on your immediate quest constraints. Let me know if you need specific tips on marketing, MVP structure, or runway math.`;
      }

      setMessages(prev => [...prev, {
        sender: 'mentor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="ai-mentor-widget">
      {isOpen && (
        <div className="ai-mentor-chatbox glass-panel">
          <div className="chatbox-header">
            <div className="chatbox-header-title">
              <span style={{ fontSize: '20px' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>OS-1 Mentor</div>
                <div style={{ fontSize: '9px', opacity: 0.8 }}>Incubator Advisor Bot</div>
              </div>
            </div>
            <div className="chatbox-header-status"></div>
          </div>

          <div className="chatbox-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-msg ${m.sender}`}>
                {m.text}
                <div style={{ fontSize: '8px', opacity: 0.5, marginTop: '4px', textAlign: 'right' }}>
                  {m.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chatbox-input-row">
            <input 
              type="text" 
              className="chatbox-input" 
              placeholder="Ask OS-1 about MVP, runway, pricing..." 
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="chatbox-send-btn">
              ⚡
            </button>
          </form>
        </div>
      )}

      <div className="ai-mentor-bubble" onClick={() => setIsOpen(!isOpen)}>
        <span className="ai-mentor-bubble-icon">{isOpen ? '❌' : '🤖'}</span>
      </div>
    </div>
  );
}
