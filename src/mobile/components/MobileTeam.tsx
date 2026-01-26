import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * Mobile Team Section for Servebot
 * Hebrew RTL layout with 2x2 mini cards grid
 * Tap to expand for details
 */

interface TeamMember {
  name: string;
  role: string;
  roleEn: string;
  description: string;
  initials: string;
  image?: string;
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'איציק אלתר',
    role: 'מנכ"ל',
    roleEn: 'CEO',
    description: 'מוביל את החזון של Servebot להפוך כל עסק לחכם יותר עם AI. ניסיון של למעלה מ-15 שנה בהובלת חברות טכנולוגיה.',
    initials: 'אא',
    expertise: ['אסטרטגיה עסקית', 'חדשנות', 'מנהיגות'],
  },
  {
    name: 'אוריאל גרסטנזנג',
    role: 'מנהל טכנולוגיות',
    roleEn: 'CTO',
    description: 'אחראי על הארכיטקטורה והפיתוח של סוכני ה-AI המתקדמים שלנו. מומחה ב-NLP ולמידת מכונה.',
    initials: 'אג',
    expertise: ['בינה מלאכותית', 'NLP', 'ארכיטקטורת מערכות'],
  },
  {
    name: 'בנג\'י האוסדורף',
    role: 'אחראי קשרי לקוחות',
    roleEn: 'Customer Relations',
    description: 'מוודא שכל לקוח מקבל את החוויה הטובה ביותר. מתמחה בהבנת צרכי לקוחות והתאמת פתרונות.',
    initials: 'בה',
    expertise: ['שירות לקוחות', 'ניהול פרויקטים', 'הטמעה'],
  },
];

interface MiniAvatarProps {
  member: TeamMember;
  size?: number;
}

const MiniAvatar = ({ member, size = 48 }: MiniAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const showInitials = !member.image || imageError;

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Gold ring/border */}
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--mobile-gold-light) 0%, var(--mobile-gold-primary) 50%, var(--mobile-gold-dark) 100%)',
          padding: '2px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'var(--mobile-bg-card)',
          }}
        />
      </div>

      {/* Avatar content */}
      <div
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: showInitials
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)'
            : 'transparent',
        }}
      >
        {showInitials ? (
          <span
            style={{
              fontSize: `${size * 0.4}px`,
              fontWeight: 700,
              color: 'var(--mobile-gold-primary)',
              letterSpacing: '-1px',
            }}
          >
            {member.initials}
          </span>
        ) : (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>
    </div>
  );
};

const MobileTeam = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-primary)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="mobile-section-badge">הצוות שלנו</span>
        <h2 className="mobile-section-title">
          המומחים מאחורי{' '}
          <span className="mobile-gradient-text">הקסם</span>
        </h2>
      </motion.div>

      {/* 2x2 Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--mobile-spacing-md)',
        }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.1 * (index + 1),
              ease: 'easeOut',
            }}
            onClick={() => setSelectedMember(member)}
            style={{
              background: 'var(--mobile-bg-card)',
              border: '1px solid var(--mobile-border)',
              borderRadius: '16px',
              padding: 'var(--mobile-spacing-md)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'var(--mobile-spacing-sm)',
              }}
            >
              <MiniAvatar member={member} size={56} />
            </div>

            {/* Name */}
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--mobile-text-primary)',
                margin: '0 0 4px',
                lineHeight: 1.3,
              }}
            >
              {member.name}
            </h3>

            {/* Role */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--mobile-gold-primary)',
              }}
            >
              {member.role}
            </span>
          </motion.div>
        ))}

        {/* Empty 4th cell with subtle pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)',
            border: '1px dashed rgba(245, 158, 11, 0.2)',
            borderRadius: '16px',
            padding: 'var(--mobile-spacing-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '140px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              marginBottom: '8px',
            }}
          >
            🚀
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--mobile-text-muted)',
              textAlign: 'center',
            }}
          >
            הצוות גדל!
          </span>
        </motion.div>
      </motion.div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedMember(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--mobile-spacing-lg)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--mobile-bg-card)',
                border: '1px solid var(--mobile-border)',
                borderRadius: '20px',
                padding: 'var(--mobile-spacing-xl)',
                width: '100%',
                maxWidth: '320px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--mobile-text-secondary)',
                  fontSize: '18px',
                }}
              >
                ×
              </button>

              {/* Avatar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 'var(--mobile-spacing-md)',
                }}
              >
                <MiniAvatar member={selectedMember} size={72} />
              </div>

              {/* Name */}
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--mobile-text-primary)',
                  margin: '0 0 4px',
                }}
              >
                {selectedMember.name}
              </h3>

              {/* Role */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: 'var(--mobile-spacing-md)',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--mobile-gold-primary)',
                  }}
                >
                  {selectedMember.role}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--mobile-text-muted)',
                  }}
                >
                  ({selectedMember.roleEn})
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--mobile-text-secondary)',
                  margin: '0 0 var(--mobile-spacing-md)',
                  lineHeight: 1.7,
                }}
              >
                {selectedMember.description}
              </p>

              {/* Expertise Tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                {selectedMember.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--mobile-gold-primary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MobileTeam;
