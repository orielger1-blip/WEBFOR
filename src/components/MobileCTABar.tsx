import { useState, useEffect } from 'react';

/**
 * Mobile CTA Bar
 * Fixed bottom bar with primary CTA + WhatsApp quick action
 * Shows after scrolling past hero, hides near contact/footer
 */
const MobileCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 400;

      // Must scroll past hero first
      if (scrollY < heroThreshold) {
        setIsVisible(false);
        return;
      }

      // Check proximity to contact section and footer
      const contactSection = document.getElementById('contact');
      const footer = document.querySelector('.footer');
      const windowHeight = window.innerHeight;

      let shouldHide = false;

      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        // Hide when contact section is 70% visible
        if (contactRect.top < windowHeight * 0.7) {
          shouldHide = true;
        }
      }

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Hide when footer enters viewport
        if (footerRect.top < windowHeight) {
          shouldHide = true;
        }
      }

      setIsVisible(!shouldHide);
    };

    // Initial check after mount
    const initialDelay = setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(initialDelay);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Android keyboard visibility detection using visualViewport API
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        // Keyboard is open if viewport is significantly smaller
        setKeyboardVisible(windowHeight - viewportHeight > 150);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={`mobile-cta-bar ${isVisible && !keyboardVisible ? 'visible' : ''}`} dir="rtl">
      <a href="#contact" className="mobile-cta-primary">
        <span>קבעו שיחה</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <a
        href="https://wa.me/972501234567"
        className="mobile-cta-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>
    </div>
  );
};

export default MobileCTABar;
