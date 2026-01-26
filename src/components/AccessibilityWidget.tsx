import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
};

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibilitySettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Lock body scroll when accessibility panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('accessibility-open');
    } else {
      document.body.classList.remove('accessibility-open');
    }
    return () => document.body.classList.remove('accessibility-open');
  }, [isOpen]);

  // Hide button when scrolling down, show when scrolling up
  useEffect(() => {
    // Don't hide if panel is open
    if (isOpen) {
      setIsVisible(true);
      return;
    }

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Also show after stopping scroll for 1 second
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, isOpen]);

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${s.fontSize}%`;

    // High contrast
    if (s.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (s.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Highlight links
    if (s.highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }

    // Readable font
    if (s.readableFont) {
      root.classList.add('readable-font');
    } else {
      root.classList.remove('readable-font');
    }

    // Big cursor
    if (s.bigCursor) {
      root.classList.add('big-cursor');
    } else {
      root.classList.remove('big-cursor');
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        className="accessibility-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="תפריט נגישות"
        aria-expanded={isOpen}
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: isVisible ? 1 : 0.8,
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        {/* Accessibility Icon - Person with arms out */}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M21 9h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
        </svg>
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="accessibility-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="accessibility-panel"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              role="dialog"
              aria-label="הגדרות נגישות"
              dir="rtl"
            >
              <div className="accessibility-header">
                <h2>הגדרות נגישות</h2>
                <button
                  className="accessibility-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="סגור תפריט נגישות"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="accessibility-content">
                {/* Font Size */}
                <div className="accessibility-option">
                  <label>גודל טקסט</label>
                  <div className="font-size-controls">
                    <button
                      onClick={() => updateSetting('fontSize', Math.max(80, settings.fontSize - 10))}
                      aria-label="הקטן טקסט"
                      disabled={settings.fontSize <= 80}
                    >
                      א-
                    </button>
                    <span className="font-size-value">{settings.fontSize}%</span>
                    <button
                      onClick={() => updateSetting('fontSize', Math.min(150, settings.fontSize + 10))}
                      aria-label="הגדל טקסט"
                      disabled={settings.fontSize >= 150}
                    >
                      א+
                    </button>
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="accessibility-option">
                  <label htmlFor="high-contrast">ניגודיות גבוהה</label>
                  <button
                    id="high-contrast"
                    role="switch"
                    aria-checked={settings.highContrast}
                    className={`toggle-btn ${settings.highContrast ? 'active' : ''}`}
                    onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                <div className="accessibility-option">
                  <label htmlFor="reduced-motion">הפחתת אנימציות</label>
                  <button
                    id="reduced-motion"
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    className={`toggle-btn ${settings.reducedMotion ? 'active' : ''}`}
                    onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                <div className="accessibility-option">
                  <label htmlFor="highlight-links">הדגשת קישורים</label>
                  <button
                    id="highlight-links"
                    role="switch"
                    aria-checked={settings.highlightLinks}
                    className={`toggle-btn ${settings.highlightLinks ? 'active' : ''}`}
                    onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                <div className="accessibility-option">
                  <label htmlFor="readable-font">פונט קריא</label>
                  <button
                    id="readable-font"
                    role="switch"
                    aria-checked={settings.readableFont}
                    className={`toggle-btn ${settings.readableFont ? 'active' : ''}`}
                    onClick={() => updateSetting('readableFont', !settings.readableFont)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                <div className="accessibility-option">
                  <label htmlFor="big-cursor">סמן גדול</label>
                  <button
                    id="big-cursor"
                    role="switch"
                    aria-checked={settings.bigCursor}
                    className={`toggle-btn ${settings.bigCursor ? 'active' : ''}`}
                    onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>

                {/* Reset Button */}
                <button className="accessibility-reset" onClick={resetSettings}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                  איפוס הגדרות
                </button>

                {/* Accessibility Statement Link */}
                <a href="#accessibility-statement" className="accessibility-statement-link" onClick={() => setIsOpen(false)}>
                  הצהרת נגישות
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityWidget;
