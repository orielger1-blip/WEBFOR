import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  roleEn: string;
  initials: string;
  description: string;
  expertise: string[];
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'איציק אלתר',
    role: 'מנכ"ל',
    roleEn: 'CEO',
    initials: 'א.א',
    image: '/images/itzik-alter.jpg',
    description: 'איציק מביא ניסיון עשיר בניהול עסקים ושירות לקוחות. כיזם בתחום ההוצאה לאור, פיתח הבנה מעמיקה של צרכי לקוחות ובניית מערכות יחסים עסקיות ארוכות טווח.',
    expertise: ['אסטרטגיה עסקית', 'חווית לקוח', 'פיתוח עסקי']
  },
  {
    name: 'אוריאל גרסטנזנג',
    role: 'מנהל טכנולוגיות',
    roleEn: 'CTO',
    initials: 'א.ג',
    image: '/images/uriel-gerstenzang.jpg',
    description: 'אוריאל הוא בוגר יחידה טכנולוגית מובחרת בצה"ל, עם רקע מעמיק בפיתוח מערכות מורכבות. מוביל את החזון הטכנולוגי של Servebot ואחראי על ארכיטקטורת המוצר והצוות הטכני.',
    expertise: ['ארכיטקטורת מערכות', 'בינה מלאכותית', 'פיתוח תוכנה']
  },
  {
    name: "בנג'י האוסדורף",
    role: 'אחראי קשרי לקוחות',
    roleEn: 'Customer Relations',
    initials: 'ב.ה',
    description: 'בנג\'י אחראי על הקשר עם הלקוחות ומוודא שכל לקוח מקבל מענה מהיר ומקצועי. מחויב למצוינות בשירות ולבניית קשרים ארוכי טווח.',
    expertise: ['שירות לקוחות', 'תקשורת', 'ניהול קשרים']
  }
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" className="team-section" ref={ref} dir="rtl">
      {/* Decorative background elements */}
      <div className="team-bg-decoration">
        <div className="team-bg-gradient"></div>
        <div className="team-bg-pattern"></div>
      </div>

      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">הצוות שלנו</span>
          <h2 className="section-title">
            המומחים
            <br />
            <span className="gradient-text">מאחורי הקסם</span>
          </h2>
          <p className="section-subtitle">
            צוות מנוסה של אנשי מקצוע המחויבים להצלחה שלכם
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="team-member-card"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Glow Effect */}
              <div className="team-member-glow"></div>

              {/* Gold Accent Line */}
              <div className="team-member-accent"></div>

              {/* Avatar Container */}
              <div className="team-member-avatar-container">
                {/* Animated Ring */}
                <svg className="team-avatar-ring" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id={`gold-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <circle
                    className="ring-bg"
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="rgba(245, 158, 11, 0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    className="ring-progress"
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke={`url(#gold-gradient-${index})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="352"
                    strokeDashoffset={hoveredIndex === index ? "0" : "264"}
                  />
                </svg>

                {/* Avatar with Photo or Fallback */}
                <div className="team-member-avatar">
                  {member.image ? (
                    <>
                      {/* Photo */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="avatar-photo"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Hidden fallback that shows if image fails */}
                      <div className="avatar-fallback" style={{ display: 'none' }}>
                        <span className="avatar-initials">{member.initials}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Geometric Pattern Background */}
                      <div className="avatar-pattern">
                        <svg viewBox="0 0 100 100" className="avatar-pattern-svg">
                          <defs>
                            <linearGradient id={`avatar-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.3)" />
                              <stop offset="100%" stopColor="rgba(251, 191, 36, 0.1)" />
                            </linearGradient>
                          </defs>
                          <polygon
                            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                            fill="none"
                            stroke={`url(#avatar-grad-${index})`}
                            strokeWidth="1"
                          />
                          <polygon
                            points="50,20 80,35 80,65 50,80 20,65 20,35"
                            fill="none"
                            stroke="rgba(245, 158, 11, 0.2)"
                            strokeWidth="1"
                          />
                          <circle cx="50" cy="50" r="15" fill="rgba(245, 158, 11, 0.1)" />
                        </svg>
                      </div>
                      <span className="avatar-initials">{member.initials}</span>
                    </>
                  )}

                  {/* Subtle glow */}
                  <div className="avatar-glow"></div>
                </div>
              </div>

              {/* Member Info */}
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <div className="team-member-role">
                  <span className="role-hebrew">{member.role}</span>
                  <span className="role-divider"></span>
                  <span className="role-english">{member.roleEn}</span>
                </div>
                <p className="team-member-description">{member.description}</p>
              </div>

              {/* Expertise Tags */}
              <div className="team-member-expertise">
                {member.expertise.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="expertise-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 + skillIndex * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Decorative Corner Elements */}
              <div className="card-corner card-corner-tl"></div>
              <div className="card-corner card-corner-tr"></div>
              <div className="card-corner card-corner-bl"></div>
              <div className="card-corner card-corner-br"></div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          className="team-values-section"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="team-values-grid">
            <div className="team-value-item">
              <div className="team-value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="team-value-content">
                <h4>אמינות מוחלטת</h4>
                <span>מה שאנחנו מבטיחים - אנחנו מספקים</span>
              </div>
            </div>

            <div className="team-value-item">
              <div className="team-value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="team-value-content">
                <h4>ליווי אישי</h4>
                <span>זמינים עבורכם 24/7</span>
              </div>
            </div>

            <div className="team-value-item">
              <div className="team-value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div className="team-value-content">
                <h4>מצוינות</h4>
                <span>לא מתפשרים על איכות</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
