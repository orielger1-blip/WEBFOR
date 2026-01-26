import { useState, useRef, useEffect } from 'react';

/**
 * MobileContact - Touch-optimized contact section for Hebrew RTL
 * Built specifically for mobile UX with form validation,
 * loading states, and quick contact methods
 */

interface FormData {
  name: string;
  business: string;
  phone: string;
  industry: string;
  message: string;
}

interface FormErrors {
  name?: string;
  business?: string;
  phone?: string;
  industry?: string;
}

const INDUSTRY_OPTIONS = [
  { value: '', label: 'בחרו תחום' },
  { value: 'retail', label: 'קמעונאות' },
  { value: 'medical', label: 'רפואה וקליניקות' },
  { value: 'realestate', label: 'נדל"ן' },
  { value: 'restaurants', label: 'מסעדות' },
  { value: 'services', label: 'שירותים' },
  { value: 'tech', label: 'טכנולוגיה' },
  { value: 'finance', label: 'פיננסים' },
  { value: 'other', label: 'אחר' },
];

const MobileContact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    business: '',
    phone: '',
    industry: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('mobile-contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'שדה חובה';
    if (name.trim().length < 2) return 'שם קצר מדי';
    return undefined;
  };

  const validateBusiness = (business: string): string | undefined => {
    if (!business.trim()) return 'שדה חובה';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return 'שדה חובה';
    // Israeli phone format validation
    const phoneRegex = /^0[5-9][0-9]{8}$|^0[5-9][0-9]-?[0-9]{3}-?[0-9]{4}$/;
    const cleanPhone = phone.replace(/[-\s]/g, '');
    if (!phoneRegex.test(cleanPhone)) return 'מספר טלפון לא תקין';
    return undefined;
  };

  const validateIndustry = (industry: string): string | undefined => {
    if (!industry) return 'בחרו תחום פעילות';
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      business: validateBusiness(formData.business),
      phone: validatePhone(formData.phone),
      industry: validateIndustry(formData.industry),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (touched[name] && errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate on blur
    let error: string | undefined;
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'business':
        error = validateBusiness(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'industry':
        error = validateIndustry(value);
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      business: true,
      phone: true,
      industry: true,
      message: true,
    });

    if (!validateForm()) {
      // Scroll to first error
      const firstError = formRef.current?.querySelector('.mobile-input-error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      business: '',
      phone: '',
      industry: '',
      message: '',
    });
    setErrors({});
    setTouched({});
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const baseClass = 'mobile-contact-input';
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} mobile-input-error`;
    }
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClass} mobile-input-valid`;
    }
    return baseClass;
  };

  return (
    <section
      id="mobile-contact"
      className="mobile-section mobile-contact-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Section Header */}
      <div className="mobile-section-header">
        <span className="mobile-section-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          צרו קשר
        </span>
        <h2 className="mobile-section-title">
          בואו נדבר על{' '}
          <span className="mobile-gradient-text">העסק שלכם</span>
        </h2>
        <p className="mobile-section-subtitle">
          השאירו פרטים ונחזור אליכם תוך 24 שעות
        </p>
      </div>

      {/* Quick Contact Methods - Enlarged with details */}
      <div className="mobile-contact-quick">
        <a
          href="https://wa.me/972525590062"
          className="mobile-contact-method mobile-contact-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="mobile-contact-method-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className="mobile-contact-method-text">
            <span className="mobile-contact-method-label">WhatsApp</span>
            <span className="mobile-contact-method-value" dir="ltr">052-559-0062</span>
          </div>
        </a>

        <a
          href="mailto:i@alter1.com"
          className="mobile-contact-method mobile-contact-email"
        >
          <div className="mobile-contact-method-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div className="mobile-contact-method-text">
            <span className="mobile-contact-method-label">אימייל</span>
            <span className="mobile-contact-method-value" dir="ltr">i@alter1.com</span>
          </div>
        </a>

        <a
          href="tel:+972525590062"
          className="mobile-contact-method mobile-contact-phone"
        >
          <div className="mobile-contact-method-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div className="mobile-contact-method-text">
            <span className="mobile-contact-method-label">טלפון</span>
            <span className="mobile-contact-method-value" dir="ltr">052-559-0062</span>
          </div>
        </a>
      </div>

      {/* Contact Form Card */}
      <div className="mobile-card mobile-contact-card">
        {isSubmitted ? (
          /* Success State */
          <div className="mobile-contact-success">
            <div className="mobile-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>תודה רבה!</h3>
            <p>קיבלנו את הפרטים שלכם ונחזור אליכם בהקדם.</p>
            <button
              type="button"
              className="mobile-btn mobile-btn-secondary"
              onClick={handleReset}
            >
              שליחת פנייה נוספת
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form
            ref={formRef}
            className="mobile-contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Name Field */}
            <div className="mobile-form-group">
              <label htmlFor="contact-name" className="mobile-form-label">
                שם מלא
                <span className="mobile-required">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="השם שלכם"
                className={getInputClassName('name')}
                required
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                disabled={isSubmitting}
              />
              {touched.name && errors.name && (
                <span className="mobile-error-message">{errors.name}</span>
              )}
            </div>

            {/* Business Name Field */}
            <div className="mobile-form-group">
              <label htmlFor="contact-business" className="mobile-form-label">
                שם העסק
                <span className="mobile-required">*</span>
              </label>
              <input
                type="text"
                id="contact-business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="שם החברה או העסק"
                className={getInputClassName('business')}
                required
                autoComplete="organization"
                enterKeyHint="next"
                disabled={isSubmitting}
              />
              {touched.business && errors.business && (
                <span className="mobile-error-message">{errors.business}</span>
              )}
            </div>

            {/* Phone Field */}
            <div className="mobile-form-group">
              <label htmlFor="contact-phone" className="mobile-form-label">
                טלפון
                <span className="mobile-required">*</span>
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="050-000-0000"
                className={getInputClassName('phone')}
                required
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="next"
                disabled={isSubmitting}
              />
              {touched.phone && errors.phone && (
                <span className="mobile-error-message">{errors.phone}</span>
              )}
            </div>

            {/* Industry Dropdown */}
            <div className="mobile-form-group">
              <label htmlFor="contact-industry" className="mobile-form-label">
                תחום פעילות
                <span className="mobile-required">*</span>
              </label>
              <div className="mobile-select-wrapper">
                <select
                  id="contact-industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('industry')}
                  required
                  disabled={isSubmitting}
                >
                  {INDUSTRY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="mobile-select-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {touched.industry && errors.industry && (
                <span className="mobile-error-message">{errors.industry}</span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="mobile-form-group">
              <label htmlFor="contact-message" className="mobile-form-label">
                ספרו לנו קצת
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="מה האתגר העיקרי שאתם רוצים לפתור?"
                className="mobile-contact-input mobile-contact-textarea"
                rows={4}
                enterKeyHint="send"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mobile-btn mobile-btn-primary mobile-contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mobile-spinner" />
                  שולח...
                </>
              ) : (
                <>
                  שלחו ונחזור אליכם
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="18"
                    height="18"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Inline Styles for Mobile Contact */}
      <style>{`
        /* Contact Section */
        .mobile-contact-section {
          padding-bottom: calc(var(--mobile-spacing-2xl) + var(--safe-bottom));
        }

        /* Quick Contact Methods - Enlarged */
        .mobile-contact-quick {
          display: flex;
          flex-direction: column;
          gap: var(--mobile-spacing-sm);
          margin: 0 var(--mobile-spacing-md) var(--mobile-spacing-xl);
        }

        .mobile-contact-method {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--mobile-spacing-md);
          padding: var(--mobile-spacing-md) var(--mobile-spacing-lg);
          background: var(--mobile-bg-card);
          border: 1px solid var(--mobile-border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: var(--mobile-text-primary);
          transition: transform 0.2s ease, border-color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-contact-method:active {
          transform: scale(0.98);
        }

        .mobile-contact-method-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .mobile-contact-method-icon svg {
          width: 24px;
          height: 24px;
        }

        .mobile-contact-whatsapp .mobile-contact-method-icon {
          background: rgba(37, 211, 102, 0.15);
          color: #25D366;
        }

        .mobile-contact-whatsapp:active {
          border-color: rgba(37, 211, 102, 0.4);
        }

        .mobile-contact-email .mobile-contact-method-icon {
          background: rgba(245, 158, 11, 0.15);
          color: var(--mobile-gold-primary);
        }

        .mobile-contact-email:active {
          border-color: rgba(245, 158, 11, 0.4);
        }

        .mobile-contact-phone .mobile-contact-method-icon {
          background: rgba(59, 130, 246, 0.15);
          color: #3B82F6;
        }

        .mobile-contact-phone:active {
          border-color: rgba(59, 130, 246, 0.4);
        }

        .mobile-contact-method-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .mobile-contact-method-label {
          font-size: 15px;
          font-weight: 600;
          color: var(--mobile-text-primary);
          line-height: 1.3;
        }

        .mobile-contact-method-value {
          font-size: 14px;
          font-weight: 400;
          color: var(--mobile-text-muted);
          margin-top: 2px;
          line-height: 1.3;
        }

        /* Contact Form Card */
        .mobile-contact-card {
          margin: 0 var(--mobile-spacing-md);
        }

        /* Form */
        .mobile-contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--mobile-spacing-md);
        }

        .mobile-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-form-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--mobile-text-secondary);
        }

        .mobile-required {
          color: #ef4444;
          margin-right: 4px;
        }

        /* Inputs */
        .mobile-contact-input {
          width: 100%;
          min-height: var(--touch-target);
          padding: 12px 16px;
          background: var(--mobile-bg-secondary);
          border: 1.5px solid var(--mobile-border);
          border-radius: var(--radius-md);
          color: var(--mobile-text-primary);
          font-size: 16px;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }

        .mobile-contact-input::placeholder {
          color: var(--mobile-text-muted);
        }

        .mobile-contact-input:focus {
          outline: none;
          border-color: var(--mobile-gold-primary);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .mobile-contact-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Validation States */
        .mobile-input-error {
          border-color: #ef4444 !important;
        }

        .mobile-input-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
        }

        .mobile-input-valid {
          border-color: #22c55e;
        }

        .mobile-input-valid:focus {
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
        }

        .mobile-error-message {
          font-size: 13px;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Select Dropdown */
        .mobile-select-wrapper {
          position: relative;
        }

        .mobile-select-wrapper select {
          padding-left: 40px;
          cursor: pointer;
        }

        .mobile-select-arrow {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: var(--mobile-text-muted);
          pointer-events: none;
        }

        /* Textarea */
        .mobile-contact-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.5;
        }

        /* Submit Button */
        .mobile-contact-submit {
          width: 100%;
          margin-top: var(--mobile-spacing-sm);
          position: relative;
        }

        .mobile-contact-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner */
        .mobile-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top-color: currentColor;
          border-radius: 50%;
          animation: mobileSpinnerRotate 0.8s linear infinite;
        }

        @keyframes mobileSpinnerRotate {
          to {
            transform: rotate(360deg);
          }
        }

        /* Success State */
        .mobile-contact-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--mobile-spacing-xl) var(--mobile-spacing-md);
          animation: mobileFadeIn 0.4s ease;
        }

        .mobile-success-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(34, 197, 94, 0.15);
          border-radius: 50%;
          color: #22c55e;
          margin-bottom: var(--mobile-spacing-md);
        }

        .mobile-success-icon svg {
          width: 32px;
          height: 32px;
        }

        .mobile-contact-success h3 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 var(--mobile-spacing-xs);
        }

        .mobile-contact-success p {
          font-size: 15px;
          color: var(--mobile-text-secondary);
          margin: 0 0 var(--mobile-spacing-lg);
        }

        /* Ensure proper RTL handling for inputs */
        .mobile-contact-form input,
        .mobile-contact-form select,
        .mobile-contact-form textarea {
          text-align: right;
        }

        /* Mobile keyboard adjustments */
        @media (max-height: 500px) {
          .mobile-contact-section {
            padding-top: var(--mobile-spacing-lg);
          }

          .mobile-section-header {
            margin-bottom: var(--mobile-spacing-md);
          }
        }
      `}</style>
    </section>
  );
};

export default MobileContact;
