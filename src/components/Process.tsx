import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'שיחת היכרות',
    description: 'נפגש (פיזית או וירטואלית) להבין את העסק שלכם לעומק — האתגרים, התהליכים, והיעדים. בסוף השיחה תקבלו המלצה ראשונית.',
  },
  {
    number: '02',
    title: 'אפיון ותכנון',
    description: 'נכתוב מסמך אפיון מפורט שמגדיר בדיוק מה הסוכן יעשה, איך הוא יגיב, ואיך הוא ישתלב במערכות הקיימות שלכם.',
  },
  {
    number: '03',
    title: 'פיתוח ואימון',
    description: 'נבנה את הסוכן, נאמן אותו על המידע והשפה שלכם, ונבצע סימולציות כדי לוודא שהוא מתנהג בדיוק כמו שרציתם.',
  },
  {
    number: '04',
    title: 'השקה וליווי',
    description: 'נעלה את הסוכן לאוויר, נעקוב אחרי הביצועים, ונבצע אופטימיזציות שוטפות. אתם מקבלים גישה ללוח בקרה עם כל הנתונים.',
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="process-section" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">התהליך</span>
          <h2 className="section-title">
            איך אנחנו
            <br />
            <span className="gradient-text">בונים את הסוכן</span>
          </h2>
          <p className="section-subtitle">
            תהליך מובנה שמבטיח שהסוכן יתאים בדיוק לצרכים שלכם.
            כל שלב כולל אישור שלכם לפני שממשיכים הלאה.
          </p>
        </motion.div>

        <div className="process-timeline">
          <div className="process-line"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="process-number">{step.number}</div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
