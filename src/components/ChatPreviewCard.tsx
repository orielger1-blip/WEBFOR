import { motion } from 'framer-motion';

/**
 * Mobile Chat Preview Card
 * Simplified WhatsApp-style chat preview for mobile devices
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
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 20c0-4 3-6 6-6s6 2 6 6"/>
          </svg>
        </div>
        <div className="chat-preview-info">
          <span className="chat-preview-name">Agentive</span>
          <span className="chat-preview-status">מקליד...</span>
        </div>
        <div className="chat-preview-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
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
