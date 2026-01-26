import { useState } from 'react';

/**
 * MobileFooter - Mobile-optimized footer for Servebot (Hebrew RTL)
 * Features:
 * - Stacked vertical layout
 * - Collapsible quick links sections
 * - Touch-friendly 44px social icons
 * - Safe area bottom padding
 * - Dark background matching site theme
 */

interface LinkSection {
  id: string;
  title: string;
  links: { label: string; href: string; isPlaceholder?: boolean }[];
}

const LINK_SECTIONS: LinkSection[] = [
  {
    id: 'nav',
    title: 'ניווט',
    links: [
      { label: 'הפתרונות', href: '#solutions' },
      { label: 'התהליך', href: '#process' },
      { label: 'שאלות נפוצות', href: '#faq' },
      { label: 'צור קשר', href: '#contact' },
    ],
  },
  {
    id: 'industries',
    title: 'תעשיות',
    links: [
      { label: 'קמעונאות', href: '#', isPlaceholder: true },
      { label: 'רפואה', href: '#', isPlaceholder: true },
      { label: 'נדל"ן', href: '#', isPlaceholder: true },
      { label: 'מסעדות', href: '#', isPlaceholder: true },
    ],
  },
  {
    id: 'legal',
    title: 'משפטי',
    links: [
      { label: 'תנאי שימוש', href: '#', isPlaceholder: true },
      { label: 'מדיניות פרטיות', href: '#', isPlaceholder: true },
      { label: 'הצהרת נגישות', href: '#accessibility-statement' },
    ],
  },
];

function MobileFooter() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <footer className="mobile-footer" dir="rtl">
      <style>{`
        /* Footer Container */
        .mobile-footer {
          background: var(--mobile-bg-secondary, #111118);
          border-top: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
          padding: var(--mobile-spacing-xl, 32px) var(--mobile-spacing-md, 16px);
          padding-bottom: calc(var(--mobile-spacing-xl, 32px) + var(--safe-bottom, 0px));
        }

        /* Brand Section */
        .mobile-footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: var(--mobile-spacing-xl, 32px);
        }

        .mobile-footer-logo {
          display: flex;
          align-items: center;
          gap: var(--mobile-spacing-sm, 12px);
          margin-bottom: var(--mobile-spacing-md, 16px);
        }

        .mobile-footer-logo-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
        }

        .mobile-footer-logo-icon svg {
          width: 100%;
          height: 100%;
        }

        .mobile-footer-logo-text {
          font-size: 24px;
          font-weight: 700;
          color: var(--mobile-text-primary, #ffffff);
          letter-spacing: -0.5px;
        }

        .mobile-footer-tagline {
          font-size: 14px;
          line-height: 1.6;
          color: var(--mobile-text-secondary, rgba(255, 255, 255, 0.7));
          max-width: 280px;
          margin: 0;
        }

        /* Social Links */
        .mobile-footer-social {
          display: flex;
          justify-content: center;
          gap: var(--mobile-spacing-md, 16px);
          margin-top: var(--mobile-spacing-lg, 24px);
        }

        .mobile-footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
          border-radius: 50%;
          color: var(--mobile-text-secondary, rgba(255, 255, 255, 0.7));
          text-decoration: none;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-footer-social-link:active {
          transform: scale(0.95);
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-footer-social-link svg {
          width: 20px;
          height: 20px;
        }

        .mobile-footer-social-link.linkedin:active {
          border-color: #0A66C2;
          color: #0A66C2;
        }

        .mobile-footer-social-link.whatsapp:active {
          border-color: #25D366;
          color: #25D366;
        }

        /* Collapsible Link Sections */
        .mobile-footer-sections {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: var(--mobile-spacing-xl, 32px);
          border-top: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
        }

        .mobile-footer-section {
          border-bottom: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
        }

        .mobile-footer-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 52px;
          padding: var(--mobile-spacing-md, 16px) 0;
          background: transparent;
          border: none;
          color: var(--mobile-text-primary, #ffffff);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .mobile-footer-section-header:active {
          opacity: 0.7;
        }

        .mobile-footer-section-chevron {
          width: 20px;
          height: 20px;
          color: var(--mobile-gold-primary, #f59e0b);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-footer-section.open .mobile-footer-section-chevron {
          transform: rotate(180deg);
        }

        .mobile-footer-section-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-footer-section.open .mobile-footer-section-content {
          max-height: 300px;
        }

        .mobile-footer-links-list {
          list-style: none;
          margin: 0;
          padding: 0 0 var(--mobile-spacing-md, 16px) 0;
        }

        .mobile-footer-links-list li {
          margin-bottom: var(--mobile-spacing-xs, 8px);
        }

        .mobile-footer-links-list li:last-child {
          margin-bottom: 0;
        }

        .mobile-footer-link {
          display: inline-block;
          padding: var(--mobile-spacing-xs, 8px) 0;
          font-size: 14px;
          color: var(--mobile-text-secondary, rgba(255, 255, 255, 0.7));
          text-decoration: none;
          transition: color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-footer-link:active {
          color: var(--mobile-gold-primary, #f59e0b);
        }

        .mobile-footer-link-placeholder {
          display: inline-block;
          padding: var(--mobile-spacing-xs, 8px) 0;
          font-size: 14px;
          color: var(--mobile-text-muted, rgba(255, 255, 255, 0.5));
          cursor: default;
        }

        /* Copyright */
        .mobile-footer-copyright {
          text-align: center;
          padding-top: var(--mobile-spacing-lg, 24px);
          border-top: 1px solid var(--mobile-border, rgba(255, 255, 255, 0.08));
        }

        .mobile-footer-copyright p {
          margin: 0;
          font-size: 13px;
          color: var(--mobile-text-muted, rgba(255, 255, 255, 0.5));
          line-height: 1.5;
        }

        /* Touch feedback on hover-capable devices */
        @media (hover: hover) {
          .mobile-footer-social-link:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
          }

          .mobile-footer-social-link.linkedin:hover {
            border-color: #0A66C2;
            color: #0A66C2;
          }

          .mobile-footer-social-link.whatsapp:hover {
            border-color: #25D366;
            color: #25D366;
          }

          .mobile-footer-link:hover {
            color: var(--mobile-gold-primary, #f59e0b);
          }
        }
      `}</style>

      {/* Brand Section */}
      <div className="mobile-footer-brand">
        <div className="mobile-footer-logo">
          <div className="mobile-footer-logo-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="url(#mobile-footer-logo-grad)" />
              <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="24" cy="20" r="3" fill="white" />
              <path
                d="M16 32C16 28 19.5 25 24 25C28.5 25 32 28 32 32"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="14" cy="28" r="2" fill="white" opacity="0.6" />
              <circle cx="34" cy="28" r="2" fill="white" opacity="0.6" />
              <defs>
                <linearGradient id="mobile-footer-logo-grad" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#f59e0b" />
                  <stop offset="1" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="mobile-footer-logo-text">Servebot</span>
        </div>
        <p className="mobile-footer-tagline">
          סוכנים דיגיטליים חכמים שעובדים בשבילכם 24/7
        </p>

        {/* Social Links */}
        <div className="mobile-footer-social">
          <a
            href="https://linkedin.com/company/servebot"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-footer-social-link linkedin"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://wa.me/972501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-footer-social-link whatsapp"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Collapsible Link Sections */}
      <div className="mobile-footer-sections">
        {LINK_SECTIONS.map((section) => {
          const isOpen = openSections[section.id] || false;

          return (
            <div
              key={section.id}
              className={`mobile-footer-section ${isOpen ? 'open' : ''}`}
            >
              <button
                className="mobile-footer-section-header"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                aria-controls={`footer-section-${section.id}`}
              >
                <span>{section.title}</span>
                <svg
                  className="mobile-footer-section-chevron"
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
                id={`footer-section-${section.id}`}
                className="mobile-footer-section-content"
                aria-hidden={!isOpen}
              >
                <ul className="mobile-footer-links-list">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      {link.isPlaceholder ? (
                        <span className="mobile-footer-link-placeholder">
                          {link.label}
                        </span>
                      ) : (
                        <a href={link.href} className="mobile-footer-link">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copyright */}
      <div className="mobile-footer-copyright">
        <p>&copy; 2024 Servebot. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}

export default MobileFooter;
