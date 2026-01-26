import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * MobileNavbar - Premium mobile navigation for Hebrew RTL
 *
 * Features:
 * - 60px height with safe area inset support
 * - Logo on RIGHT (RTL), hamburger on LEFT
 * - Minimum 44px touch targets
 * - Smooth slide-out menu from LEFT
 * - iOS scroll lock when menu is open
 * - Android back button support
 * - Full keyboard accessibility
 * - CSS animations for performance
 */

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'הפתרונות', href: '#solutions', id: 'solutions' },
  { label: 'התהליך', href: '#process', id: 'process' },
  { label: 'יתרונות', href: '#results', id: 'results' },
  { label: 'שאלות נפוצות', href: '#faq', id: 'faq' },
  { label: 'צור קשר', href: '#contact', id: 'contact' },
];

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Handle scroll state for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // iOS Safari scroll lock - prevents background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      // Prevent layout shift from scrollbar disappearing
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Store scroll position for restoration
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = document.body.dataset.scrollY;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        delete document.body.dataset.scrollY;
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  // Android hardware back button support
  useEffect(() => {
    if (isMenuOpen) {
      // Push a state to history when menu opens
      window.history.pushState({ mobileMenuOpen: true }, '');

      const handlePopState = (event: PopStateEvent) => {
        // Check if this is our menu state
        if (event.state?.mobileMenuOpen !== true) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isMenuOpen]);

  // Keyboard navigation: Escape to close, Tab trap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        hamburgerRef.current?.focus();
        return;
      }

      // Tab trap within menu
      if (e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus first menu item when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // Go back in history if we pushed a state
    if (window.history.state?.mobileMenuOpen) {
      window.history.back();
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();

    // Delay scroll to allow menu close animation
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }, [closeMenu]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  }, [closeMenu]);

  return (
    <>
      {/* Fixed Navbar */}
      <header
        className={`mobile-navbar ${isScrolled ? 'mobile-navbar-scrolled' : ''}`}
        role="banner"
      >
        <nav
          className="mobile-navbar-container"
          role="navigation"
          aria-label="תפריט ראשי"
        >
          {/* Hamburger Menu Button - LEFT side (RTL) */}
          <button
            ref={hamburgerRef}
            type="button"
            className="mobile-hamburger"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="mobile-hamburger-inner">
              <span className={`mobile-hamburger-line ${isMenuOpen ? 'open' : ''}`} />
              <span className={`mobile-hamburger-line ${isMenuOpen ? 'open' : ''}`} />
              <span className={`mobile-hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            </span>
          </button>

          {/* Logo - RIGHT side (RTL) */}
          <a
            href="#"
            className="mobile-navbar-logo"
            aria-label="Servebot - חזרה לדף הבית"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="mobile-logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="48" height="48" rx="12" fill="url(#mobile-logo-grad)" />
                <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="24" cy="20" r="3" fill="white" />
                <path d="M16 32C16 28 19.5 25 24 25C28.5 25 32 28 32 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="14" cy="28" r="2" fill="white" opacity="0.6" />
                <circle cx="34" cy="28" r="2" fill="white" opacity="0.6" />
                <path d="M14 28L18 24" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <path d="M34 28L30 24" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <defs>
                  <linearGradient id="mobile-logo-grad" x1="0" y1="0" x2="48" y2="48">
                    <stop stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="mobile-logo-text">Servebot</span>
          </a>
        </nav>
      </header>

      {/* Slide-out Menu Overlay */}
      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={handleBackdropClick}
        aria-hidden={!isMenuOpen}
      />

      {/* Slide-out Menu Panel - slides from LEFT */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
        aria-hidden={!isMenuOpen}
      >
        {/* Close Button */}
        <button
          ref={firstFocusableRef}
          type="button"
          className="mobile-menu-close"
          onClick={closeMenu}
          aria-label="סגור תפריט"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Menu Header with Logo */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <div className="mobile-logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="48" height="48" rx="12" fill="url(#mobile-menu-logo-grad)" />
                <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="24" cy="20" r="3" fill="white" />
                <path d="M16 32C16 28 19.5 25 24 25C28.5 25 32 28 32 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="14" cy="28" r="2" fill="white" opacity="0.6" />
                <circle cx="34" cy="28" r="2" fill="white" opacity="0.6" />
                <defs>
                  <linearGradient id="mobile-menu-logo-grad" x1="0" y1="0" x2="48" y2="48">
                    <stop stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="mobile-logo-text">Servebot</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-menu-nav" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className="mobile-menu-link"
              onClick={(e) => handleNavClick(e, item.href)}
              style={{ animationDelay: `${index * 50 + 100}ms` }}
              ref={index === NAV_ITEMS.length - 1 ? undefined : undefined}
            >
              {item.label}
              <svg
                className="mobile-menu-link-arrow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="mobile-menu-cta-wrapper">
          <a
            ref={lastFocusableRef}
            href="#contact"
            className="mobile-menu-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            בואו נדבר
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        /* ==================== NAVBAR ==================== */
        .mobile-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: calc(60px + var(--safe-top, 0px));
          padding-top: var(--safe-top, 0px);
          background: var(--mobile-bg-primary, #0a0a0f);
          z-index: 1000;
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .mobile-navbar-scrolled {
          background: rgba(10, 10, 15, 0.95);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .mobile-navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 var(--mobile-spacing-md, 16px);
        }

        /* ==================== HAMBURGER BUTTON ==================== */
        .mobile-hamburger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          margin: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          order: -1; /* Move to LEFT in RTL */
        }

        .mobile-hamburger:focus {
          outline: none;
        }

        .mobile-hamburger:focus-visible {
          outline: 2px solid var(--mobile-gold-primary, #f59e0b);
          outline-offset: 2px;
          border-radius: 8px;
        }

        .mobile-hamburger-inner {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          gap: 5px;
        }

        .mobile-hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--mobile-text-primary, #ffffff);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }

        /* Hamburger to X animation */
        .mobile-hamburger-line:nth-child(1).open {
          transform: translateY(7px) rotate(45deg);
        }

        .mobile-hamburger-line:nth-child(2).open {
          opacity: 0;
          transform: scaleX(0);
        }

        .mobile-hamburger-line:nth-child(3).open {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ==================== LOGO ==================== */
        .mobile-navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          min-height: 44px;
          padding: 8px 0;
        }

        .mobile-navbar-logo:focus {
          outline: none;
        }

        .mobile-navbar-logo:focus-visible {
          outline: 2px solid var(--mobile-gold-primary, #f59e0b);
          outline-offset: 4px;
          border-radius: 8px;
        }

        .mobile-logo-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }

        .mobile-logo-icon svg {
          width: 100%;
          height: 100%;
        }

        .mobile-logo-text {
          font-size: 20px;
          font-weight: 700;
          color: var(--mobile-text-primary, #ffffff);
          letter-spacing: -0.02em;
        }

        /* ==================== MENU BACKDROP ==================== */
        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 1001;
          pointer-events: none;
          transition: background-color 0.3s ease;
        }

        .mobile-menu-backdrop.open {
          background: rgba(0, 0, 0, 0.6);
          pointer-events: auto;
        }

        /* ==================== MENU PANEL ==================== */
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: min(320px, 85vw);
          background: var(--mobile-bg-secondary, #111118);
          z-index: 1002;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding-top: var(--safe-top, 0px);
          padding-bottom: var(--safe-bottom, 0px);
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-menu-panel.open {
          transform: translateX(0);
        }

        /* ==================== MENU CLOSE BUTTON ==================== */
        .mobile-menu-close {
          position: absolute;
          top: calc(var(--safe-top, 0px) + 8px);
          right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          background: transparent;
          border: none;
          color: var(--mobile-text-secondary, rgba(255, 255, 255, 0.7));
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: color 0.2s ease;
        }

        .mobile-menu-close:hover,
        .mobile-menu-close:focus {
          color: var(--mobile-text-primary, #ffffff);
        }

        .mobile-menu-close:focus {
          outline: none;
        }

        .mobile-menu-close:focus-visible {
          outline: 2px solid var(--mobile-gold-primary, #f59e0b);
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* ==================== MENU HEADER ==================== */
        .mobile-menu-header {
          padding: 24px 24px 20px;
          border-bottom: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
        }

        .mobile-menu-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-menu-logo .mobile-logo-icon {
          width: 40px;
          height: 40px;
        }

        /* ==================== MENU NAVIGATION ==================== */
        .mobile-menu-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px 0;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          font-size: 18px;
          font-weight: 500;
          color: var(--mobile-text-primary, #ffffff);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: background-color 0.2s ease, color 0.2s ease;
          min-height: 56px;
          opacity: 0;
          animation: mobileMenuLinkSlide 0.3s ease forwards;
        }

        .mobile-menu-panel.open .mobile-menu-link {
          opacity: 1;
        }

        @keyframes mobileMenuLinkSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-menu-link:hover,
        .mobile-menu-link:focus {
          background: rgba(255, 255, 255, 0.05);
          color: var(--mobile-gold-primary, #f59e0b);
        }

        .mobile-menu-link:focus {
          outline: none;
        }

        .mobile-menu-link:focus-visible {
          outline: 2px solid var(--mobile-gold-primary, #f59e0b);
          outline-offset: -2px;
        }

        .mobile-menu-link:active {
          background: rgba(255, 255, 255, 0.08);
        }

        .mobile-menu-link-arrow {
          color: var(--mobile-text-muted, rgba(255, 255, 255, 0.5));
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .mobile-menu-link:hover .mobile-menu-link-arrow,
        .mobile-menu-link:focus .mobile-menu-link-arrow {
          color: var(--mobile-gold-primary, #f59e0b);
          transform: translateX(-4px);
        }

        /* ==================== MENU CTA ==================== */
        .mobile-menu-cta-wrapper {
          padding: 16px 24px 24px;
          margin-top: auto;
        }

        .mobile-menu-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 52px;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--mobile-gold-light, #fbbf24) 0%, var(--mobile-gold-primary, #f59e0b) 100%);
          border: none;
          border-radius: var(--radius-md, 12px);
          color: #000000;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
        }

        .mobile-menu-cta:hover,
        .mobile-menu-cta:focus {
          transform: scale(1.02);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.4);
        }

        .mobile-menu-cta:focus {
          outline: none;
        }

        .mobile-menu-cta:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        .mobile-menu-cta:active {
          transform: scale(0.98);
        }

        /* ==================== REDUCED MOTION ==================== */
        @media (prefers-reduced-motion: reduce) {
          .mobile-navbar,
          .mobile-navbar-scrolled,
          .mobile-hamburger-line,
          .mobile-menu-backdrop,
          .mobile-menu-panel,
          .mobile-menu-link,
          .mobile-menu-link-arrow,
          .mobile-menu-cta,
          .mobile-menu-close {
            transition: none;
          }

          .mobile-menu-link {
            animation: none;
            opacity: 1;
          }
        }

        /* ==================== HIGH CONTRAST ==================== */
        @media (prefers-contrast: high) {
          .mobile-navbar {
            border-bottom: 2px solid var(--mobile-gold-primary, #f59e0b);
          }

          .mobile-hamburger-line {
            height: 3px;
          }

          .mobile-menu-link:focus-visible,
          .mobile-hamburger:focus-visible,
          .mobile-navbar-logo:focus-visible,
          .mobile-menu-close:focus-visible,
          .mobile-menu-cta:focus-visible {
            outline-width: 3px;
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavbar;
