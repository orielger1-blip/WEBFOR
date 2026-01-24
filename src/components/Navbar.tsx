import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (preserve scroll position)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('mobile-menu-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'הפתרונות', href: '#solutions' },
    { label: 'התהליך', href: '#process' },
    { label: 'יתרונות', href: '#results' },
    { label: 'שאלות נפוצות', href: '#faq' },
    { label: 'צור קשר', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      dir="rtl"
    >
      <div className="navbar-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="logo-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="url(#logo-grad)"/>
              <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="24" cy="20" r="3" fill="white"/>
              <path d="M16 32C16 28 19.5 25 24 25C28.5 25 32 28 32 32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="14" cy="28" r="2" fill="white" opacity="0.6"/>
              <circle cx="34" cy="28" r="2" fill="white" opacity="0.6"/>
              <path d="M14 28L18 24" stroke="white" strokeWidth="1.5" opacity="0.4"/>
              <path d="M34 28L30 24" stroke="white" strokeWidth="1.5" opacity="0.4"/>
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#f59e0b"/>
                  <stop offset="1" stopColor="#d97706"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Agentive</span>
        </motion.div>

        <div className="nav-links-desktop">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="nav-link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="nav-cta">
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            בואו נדבר
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
                href="#contact"
                className="btn-primary mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                בואו נדבר
              </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
