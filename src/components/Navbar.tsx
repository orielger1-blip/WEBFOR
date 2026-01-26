import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (iOS Safari safe)
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Handle Android hardware back button for menu
  useEffect(() => {
    if (menuOpen) {
      // Push a fake history state when menu opens
      window.history.pushState({ menuOpen: true }, '');

      const handlePopState = () => {
        // When back is pressed, close the menu
        setMenuOpen(false);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [menuOpen]);

  // Navigation items with actual section IDs
  const navItems = [
    { label: 'הפתרונות', href: '#solutions' },
    { label: 'התהליך', href: '#process' },
    { label: 'יתרונות', href: '#results' },
    { label: 'שאלות נפוצות', href: '#faq' },
    { label: 'צור קשר', href: '#contact' },
  ];

  // Close menu and navigate to section
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    // Small delay to allow menu close animation before scrolling
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  // Close menu
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        dir="rtl"
      >
        <div className="navbar-container">
          {/* Logo */}
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
            <span className="logo-text">Servebot</span>
          </motion.div>

          {/* Desktop Navigation */}
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

          {/* Desktop CTA */}
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

          {/* Mobile Hamburger Button - Simple 3 Lines */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="hamburger-icon">
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop - click to close */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Sliding Menu Panel */}
            <motion.div
              className="mobile-menu-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              dir="rtl"
            >
              {/* Close Button (X) */}
              <button
                type="button"
                className="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Navigation Links */}
              <nav className="mobile-menu-nav">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="mobile-menu-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                className="mobile-menu-cta btn-primary"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                בואו נדבר
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
