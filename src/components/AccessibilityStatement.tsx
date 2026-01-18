import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AccessibilityStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Get current date for the statement
  const currentDate = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="accessibility-statement" className="accessibility-statement-section" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="accessibility-statement-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            הצהרת
            <span className="gradient-text"> נגישות</span>
          </h2>

          <div className="statement-text">
            <p>
              <strong>Agentive</strong> מחויבת להנגשת האתר לאנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998, ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013.
            </p>

            <h3>התאמות הנגישות באתר</h3>
            <p>אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ברמת AA לפי הנחיות WCAG 2.0.</p>

            <p>האתר כולל את ההתאמות הבאות:</p>
            <ul>
              <li>התאמה לקוראי מסך (Screen Readers)</li>
              <li>ניווט באמצעות מקלדת</li>
              <li>אפשרות להגדלת טקסט</li>
              <li>ניגודיות צבעים גבוהה</li>
              <li>הפחתת אנימציות</li>
              <li>הדגשת קישורים</li>
              <li>פונט קריא</li>
              <li>סמן מוגדל</li>
            </ul>

            <h3>כפתור הנגישות</h3>
            <p>
              בפינה השמאלית התחתונה של המסך נמצא כפתור נגישות (סמל אדם). לחיצה עליו תפתח תפריט עם אפשרויות להתאמת האתר לצרכיכם.
            </p>

            <h3>דפדפנים נתמכים</h3>
            <p>האתר תוכנן לתמיכה מיטבית בדפדפנים הנפוצים:</p>
            <ul>
              <li>Google Chrome (גרסה אחרונה)</li>
              <li>Mozilla Firefox (גרסה אחרונה)</li>
              <li>Microsoft Edge (גרסה אחרונה)</li>
              <li>Safari (גרסה אחרונה)</li>
            </ul>

            <h3>יצירת קשר בנושא נגישות</h3>
            <p>
              אם נתקלתם בבעיית נגישות באתר, או שיש לכם הצעות לשיפור הנגישות, נשמח לשמוע מכם:
            </p>
            <ul>
              <li><strong>טלפון:</strong> 050-123-4567</li>
              <li><strong>אימייל:</strong> accessibility@agentive.co.il</li>
              <li><strong>WhatsApp:</strong> 050-123-4567</li>
            </ul>

            <h3>פרטים נוספים</h3>
            <p>
              <strong>תאריך עדכון ההצהרה:</strong> {currentDate}
            </p>
            <p>
              אנו ממשיכים לפעול לשיפור נגישות האתר ככל האפשר, מתוך אמונה ומחויבות למתן שירות שוויוני לכלל האוכלוסייה.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccessibilityStatement;
