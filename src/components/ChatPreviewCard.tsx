import { motion } from 'framer-motion';
import './AIChatWidget.css';

/**
 * Premium AI Assistant Chat Widget
 * A completely unique, luxurious AI chat interface
 * Dark premium theme (#0a0a0f) with gold/amber accents (#14b8a6, #5eead4)
 * NO WhatsApp styling - distinctive AI assistant branding
 */
const ChatPreviewCard = () => {
  return (
    <motion.div
      className="ai-assistant-widget"
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated Gradient Border */}
      <div className="ai-widget-glow" />

      {/* Premium Header */}
      <div className="ai-widget-header">
        {/* AI Robot Avatar with Pulse - CSS animation for performance */}
        <div className="ai-robot-avatar ai-robot-avatar-animated">
          {/* AI Robot Icon */}
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Antenna with glow */}
            <circle cx="20" cy="5" r="3" fill="url(#robotGold)" />
            <rect x="18" y="7" width="4" height="5" rx="2" fill="url(#robotGold)" />
            {/* Head */}
            <rect x="6" y="12" width="28" height="22" rx="6" fill="url(#robotGold)" />
            {/* Face screen */}
            <rect x="9" y="15" width="22" height="13" rx="3" fill="#0a0a0f" />
            {/* Eyes - glowing */}
            <circle cx="14" cy="21" r="3" fill="#5eead4">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="26" cy="21" r="3" fill="#5eead4">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Mouth - sound bars */}
            <rect x="17" y="25" width="2" height="2" rx="0.5" fill="#14b8a6" opacity="0.9" />
            <rect x="21" y="25" width="2" height="2" rx="0.5" fill="#14b8a6" opacity="0.9" />
            {/* Ear pieces */}
            <rect x="2" y="18" width="4" height="8" rx="2" fill="url(#robotGold)" />
            <rect x="34" y="18" width="4" height="8" rx="2" fill="url(#robotGold)" />
            <defs>
              <linearGradient id="robotGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#99f6e4" />
                <stop offset="50%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ai-avatar-pulse" />
        </div>

        {/* Branding & Status */}
        <div className="ai-brand-info">
          <div className="ai-brand-name">
            <span className="ai-brand-text">Servebot</span>
            <span className="ai-brand-badge">AI</span>
          </div>
          <div className="ai-status-line">
            <span className="ai-status-indicator" />
            <span className="ai-status-hebrew">מוכן לעזור</span>
            {/* CSS keyframe animation for typing dots - better mobile performance */}
            <div className="ai-typing-dots">
              <span className="ai-typing-dot ai-typing-dot-1" />
              <span className="ai-typing-dot ai-typing-dot-2" />
              <span className="ai-typing-dot ai-typing-dot-3" />
            </div>
          </div>
        </div>

        {/* Premium Verified Badge */}
        <motion.div
          className="ai-premium-seal"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"
                  fill="url(#starGold)" />
            <defs>
              <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Conversation Area */}
      <div className="ai-conversation">
        {/* User Message */}
        <motion.div
          className="ai-msg ai-msg-user"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        >
          <div className="ai-msg-bubble">
            <p>היי, אני מחפש פתרון אוטומציה לעסק</p>
          </div>
          <span className="ai-msg-time">12:34</span>
        </motion.div>

        {/* AI Response */}
        <motion.div
          className="ai-msg ai-msg-assistant"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
        >
          <div className="ai-msg-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a1.5 1.5 0 011.5 1.5V5h.5a5 5 0 015 5v1h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H17v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H3v-1a5 5 0 015-5h.5V3.5A1.5 1.5 0 0110 2zM6 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
            </svg>
          </div>
          <div className="ai-msg-content">
            <div className="ai-msg-bubble">
              <p>שלום! אני הסוכן הדיגיטלי של Servebot.</p>
              <p>אנחנו מתמחים בבניית סוכני AI שעובדים 24/7 עבור העסק שלך.</p>
            </div>
            <span className="ai-msg-time">12:34</span>
          </div>
        </motion.div>

        {/* User Follow-up */}
        <motion.div
          className="ai-msg ai-msg-user"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.5, ease: "easeOut" }}
        >
          <div className="ai-msg-bubble">
            <p>מעניין! יש לי חנות תכשיטים אונליין</p>
          </div>
          <span className="ai-msg-time">12:35</span>
        </motion.div>

        {/* AI Final Response */}
        <motion.div
          className="ai-msg ai-msg-assistant"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.7, duration: 0.5, ease: "easeOut" }}
        >
          <div className="ai-msg-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a1.5 1.5 0 011.5 1.5V5h.5a5 5 0 015 5v1h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H17v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H3v-1a5 5 0 015-5h.5V3.5A1.5 1.5 0 0110 2zM6 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
            </svg>
          </div>
          <div className="ai-msg-content">
            <div className="ai-msg-bubble">
              <p>מעולה! נשמח לבנות לך סוכן שיטפל בפניות לקוחות וימליץ על מוצרים בהתאמה אישית.</p>
            </div>
            <span className="ai-msg-time">12:35</span>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="ai-input-area">
        <div className="ai-input-container">
          <span className="ai-input-placeholder">שלח הודעה לסוכן...</span>
        </div>
        <motion.button
          className="ai-send-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatPreviewCard;
