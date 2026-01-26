import { useState, useRef, useEffect } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'כמה זמן לוקח לבנות סוכן?',
    answer: 'תלוי במורכבות, אבל בדרך כלל בין 2-4 שבועות מרגע האפיון ועד להשקה. סוכנים פשוטים יותר יכולים להיות מוכנים תוך שבוע.',
  },
  {
    id: 'faq-2',
    question: 'האם הסוכן יכול להתחבר למערכות שלנו?',
    answer: 'בהחלט. אנחנו מתממשקים עם מערכות CRM, יומנים (Google Calendar, Outlook), מערכות הזמנות, ועוד. אם יש API - אנחנו יכולים להתחבר.',
  },
  {
    id: 'faq-3',
    question: 'מה קורה אם הסוכן לא יודע לענות?',
    answer: 'הסוכן מזהה מתי הוא לא בטוח ומעביר את השיחה לנציג אנושי. אתם מגדירים את הכללים - מתי להעביר, למי, ואיך.',
  },
  {
    id: 'faq-4',
    question: 'האם אפשר לעדכן את הסוכן אחרי ההשקה?',
    answer: 'כמובן. אנחנו מספקים ליווי שוטף ומבצעים עדכונים ושיפורים על בסיס הנתונים שנאספים. הסוכן רק משתפר עם הזמן.',
  },
  {
    id: 'faq-5',
    question: 'באילו פלטפורמות הסוכן יכול לפעול?',
    answer: "WhatsApp Business, צ'אט באתר, Telegram, Facebook Messenger, ועוד. אפשר להפעיל סוכן אחד במספר פלטפורמות במקביל.",
  },
  {
    id: 'faq-6',
    question: 'מה לגבי פרטיות ואבטחת מידע?',
    answer: 'אנחנו עובדים לפי תקני אבטחה מחמירים. המידע מוצפן, נשמר בשרתים מאובטחים, ואנחנו עומדים בדרישות GDPR.',
  },
];

/**
 * MobileFAQ Component
 * Mobile-optimized FAQ accordion for Servebot
 * Features:
 * - Single item open at a time (accordion behavior)
 * - Animated height transitions
 * - Rotating chevron indicator
 * - Touch-friendly 44px+ touch targets
 * - Full RTL support
 * - Accessible with ARIA attributes
 */
function MobileFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  // Measure content heights for smooth animations
  useEffect(() => {
    const newHeights: Record<string, number> = {};
    faqData.forEach((item) => {
      const el = answerRefs.current[item.id];
      if (el) {
        newHeights[item.id] = el.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section id="faq" className="mobile-faq-section" dir="rtl">
      <style>{`
        .mobile-faq-section {
          padding: var(--mobile-spacing-2xl) var(--mobile-spacing-md);
          background: var(--mobile-bg-primary);
          width: 100%;
          box-sizing: border-box;
        }

        .mobile-faq-header {
          text-align: center;
          margin-bottom: var(--mobile-spacing-xl);
        }

        .mobile-faq-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--mobile-spacing-xs);
          padding: 6px 14px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: var(--mobile-gold-primary);
          margin-bottom: var(--mobile-spacing-md);
        }

        .mobile-faq-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
          color: var(--mobile-text-primary);
        }

        .mobile-faq-title .gradient {
          background: linear-gradient(135deg, var(--mobile-gold-light) 0%, var(--mobile-gold-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mobile-faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--mobile-spacing-sm);
        }

        .mobile-faq-item {
          background: var(--mobile-bg-card);
          border: 1px solid var(--mobile-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .mobile-faq-item.open {
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.1);
        }

        .mobile-faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--mobile-spacing-md);
          width: 100%;
          min-height: 56px;
          padding: var(--mobile-spacing-md) var(--mobile-spacing-lg);
          background: transparent;
          border: none;
          color: var(--mobile-text-primary);
          font-size: 15px;
          font-weight: 600;
          text-align: right;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .mobile-faq-question:active {
          background: rgba(255, 255, 255, 0.02);
        }

        .mobile-faq-question-text {
          flex: 1;
          line-height: 1.4;
        }

        .mobile-faq-chevron {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: var(--mobile-gold-primary);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-faq-item.open .mobile-faq-chevron {
          transform: rotate(180deg);
        }

        .mobile-faq-answer-wrapper {
          overflow: hidden;
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-faq-answer {
          padding: 0 var(--mobile-spacing-lg) var(--mobile-spacing-lg);
        }

        .mobile-faq-answer p {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: var(--mobile-text-secondary);
        }

        /* Touch feedback */
        @media (hover: none) {
          .mobile-faq-question:active {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="mobile-faq-header">
        <span className="mobile-faq-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          שאלות נפוצות
        </span>
        <h2 className="mobile-faq-title">
          יש לכם <span className="gradient">שאלות?</span>
        </h2>
      </div>

      <div className="mobile-faq-list" role="list">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          const answerId = `${item.id}-answer`;
          const contentHeight = isOpen ? (heights[item.id] || 0) : 0;

          return (
            <div
              key={item.id}
              className={`mobile-faq-item ${isOpen ? 'open' : ''}`}
              role="listitem"
            >
              <button
                className="mobile-faq-question"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="mobile-faq-question-text">{item.question}</span>
                <svg
                  className="mobile-faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                id={answerId}
                className="mobile-faq-answer-wrapper"
                style={{ height: contentHeight }}
                aria-hidden={!isOpen}
              >
                <div
                  className="mobile-faq-answer"
                  ref={(el) => {
                    answerRefs.current[item.id] = el;
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MobileFAQ;
