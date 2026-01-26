import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Mobile Team Section for Servebot
 * Hebrew RTL layout with horizontal scroll snap
 * Showcases the team behind the AI agent company
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

interface AvatarProps {
  member: TeamMember;
}

const Avatar = ({ member }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const showInitials = !member.image || imageError;

  return (
    <div
      style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        marginBottom: 'var(--mobile-spacing-md)',
      }}
    >
      {/* Gold ring/border */}
      <div
        style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--mobile-gold-light) 0%, var(--mobile-gold-primary) 50%, var(--mobile-gold-dark) 100%)',
          padding: '3px',
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
          width: '80px',
          height: '80px',
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
              fontSize: '28px',
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

  return (
    <section
      ref={sectionRef}
      id="team"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-secondary)',
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          paddingLeft: 'var(--mobile-spacing-md)',
          paddingRight: 'var(--mobile-spacing-md)',
        }}
      >
        <span className="mobile-section-badge">הצוות שלנו</span>
        <h2 className="mobile-section-title">
          המומחים מאחורי{' '}
          <span className="mobile-gradient-text">הקסם</span>
        </h2>
        <p className="mobile-section-subtitle">
          הכירו את האנשים שעובדים קשה כדי להביא לכם את הפתרונות הטובים ביותר
        </p>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mobile-snap-container"
        style={{
          display: 'flex',
          gap: 'var(--mobile-spacing-md)',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingLeft: 'var(--mobile-spacing-md)',
          paddingRight: 'var(--mobile-spacing-md)',
          paddingBottom: 'var(--mobile-spacing-md)',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="mobile-snap-item"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 * (index + 1),
              ease: 'easeOut',
            }}
            style={{
              flexShrink: 0,
              width: '85vw',
              maxWidth: '320px',
              background: 'var(--mobile-bg-card)',
              border: '1px solid var(--mobile-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--mobile-spacing-lg)',
              textAlign: 'center',
              scrollSnapAlign: 'center',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Avatar member={member} />
            </div>

            {/* Name */}
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--mobile-text-primary)',
                margin: '0 0 var(--mobile-spacing-xs)',
                lineHeight: 1.3,
              }}
            >
              {member.name}
            </h3>

            {/* Role */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--mobile-spacing-xs)',
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
                {member.role}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--mobile-text-muted)',
                }}
              >
                ({member.roleEn})
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '14px',
                color: 'var(--mobile-text-secondary)',
                margin: '0 0 var(--mobile-spacing-md)',
                lineHeight: 1.7,
                minHeight: '72px',
              }}
            >
              {member.description}
            </p>

            {/* Expertise Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--mobile-spacing-xs)',
                justifyContent: 'center',
              }}
            >
              {member.expertise.map((skill, skillIndex) => (
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
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--mobile-spacing-xs)',
          marginTop: 'var(--mobile-spacing-md)',
        }}
      >
        {teamMembers.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === 0 ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: index === 0
                ? 'var(--mobile-gold-primary)'
                : 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default MobileTeam;
