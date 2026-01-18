import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  {
    question: 'כמה זמן לוקח לבנות סוכן?',
    answer: 'תלוי במורכבות, אבל בדרך כלל בין 2-4 שבועות מרגע האפיון ועד להשקה. סוכנים פשוטים יותר יכולים להיות מוכנים תוך שבוע.',
  },
  {
    question: 'האם הסוכן יכול להתחבר למערכות שלנו?',
    answer: 'בהחלט. אנחנו מתממשקים עם מערכות CRM, יומנים (Google Calendar, Outlook), מערכות הזמנות, ועוד. אם יש API — אנחנו יכולים להתחבר.',
  },
  {
    question: 'מה קורה אם הסוכן לא יודע לענות?',
    answer: 'הסוכן מזהה מתי הוא לא בטוח ומעביר את השיחה לנציג אנושי. אתם מגדירים את הכללים — מתי להעביר, למי, ואיך.',
  },
  {
    question: 'האם אפשר לעדכן את הסוכן אחרי ההשקה?',
    answer: 'כמובן. אנחנו מספקים ליווי שוטף ומבצעים עדכונים ושיפורים על בסיס הנתונים שנאספים. הסוכן רק משתפר עם הזמן.',
  },
  {
    question: 'באילו פלטפורמות הסוכן יכול לפעול?',
    answer: 'WhatsApp Business, צ\'אט באתר, Telegram, Facebook Messenger, ועוד. אפשר להפעיל סוכן אחד במספר פלטפורמות במקביל.',
  },
  {
    question: 'מה לגבי פרטיות ואבטחת מידע?',
    answer: 'אנחנו עובדים לפי תקני אבטחה מחמירים. המידע מוצפן, נשמר בשרתים מאובטחים, ואנחנו עומדים בדרישות GDPR.',
  },
];

const FAQItem = ({ faq, index, isInView }: { faq: typeof faqs[0]; index: number; isInView: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`faq-item ${isOpen ? 'faq-open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </motion.svg>
      </button>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <p>{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="faq-section" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">שאלות נפוצות</span>
          <h2 className="section-title">
            יש לכם
            <br />
            <span className="gradient-text">שאלות?</span>
          </h2>
          <p className="section-subtitle">
            אספנו את השאלות שאנחנו מקבלים הכי הרבה. לא מצאתם תשובה? דברו איתנו.
          </p>
        </motion.div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
