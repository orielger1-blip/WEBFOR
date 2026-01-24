import { motion } from 'framer-motion';

/**
 * Mobile Chat Preview Card
 * Simplified AI chat preview for mobile devices
 * Shows the AI conversation demo without phone frame overhead
 */
const ChatPreviewCard = () => {
  return (
    <motion.div
      className="chat-preview-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="chat-preview-header">
        <div className="chat-preview-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="chat-preview-info">
          <span className="chat-preview-name">Agentive AI</span>
          <span className="chat-preview-status">פעיל</span>
        </div>
        <div className="chat-preview-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>

      <div className="chat-preview-messages">
        <motion.div
          className="chat-bubble chat-bubble-incoming"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          היי, אני מעוניין לשמוע על השירותים שלכם
        </motion.div>

        <motion.div
          className="chat-bubble chat-bubble-outgoing"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          שלום! שמחים שפנית אלינו
          <br />
          אנחנו מתמחים בבניית סוכנים דיגיטליים חכמים לעסקים.
        </motion.div>

        <motion.div
          className="chat-bubble chat-bubble-incoming"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0 }}
        >
          יש לי רשת חנויות תכשיטים
        </motion.div>

        <motion.div
          className="chat-bubble chat-bubble-outgoing"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5 }}
        >
          מעולה! רוצה לקבוע שיחה קצרה?
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatPreviewCard;
