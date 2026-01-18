import { memo, useMemo, useState, useCallback, useEffect, useRef } from 'react';

// ============================================================================
// AGENTIVE ROBOT MASCOT - Premium Golden Dashed-Line Design
// A modular, animatable robot mascot for Agentive AI company
// Matches the existing neural brain visualization aesthetic
// ============================================================================

export type RobotPose = 'idle' | 'waving' | 'sleeping' | 'thinking' | 'celebrating' | 'peeking';
export type RobotExpression = 'neutral' | 'happy' | 'sleepy' | 'curious' | 'excited' | 'surprised';
export type PeekDirection = 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface AgentiveRobotProps {
  pose?: RobotPose;
  expression?: RobotExpression;
  size?: number;
  peekFrom?: PeekDirection;
  animated?: boolean;
  className?: string;
  showLegs?: boolean;
  showChestDetails?: boolean;
  ariaLabel?: string;
  interactive?: boolean;
  onClick?: () => void;
  enableEyeTracking?: boolean;
}

// ============================================================================
// EYE COMPONENTS
// ============================================================================

const EyesNeutral = () => (
  <g className="robot-eyes eyes-neutral">
    <circle cx="10.5" cy="6.5" r="0.7" fill="#FFD700" className="robot-eye robot-eye-left" />
    <circle cx="13.5" cy="6.5" r="0.7" fill="#FFD700" className="robot-eye robot-eye-right" />
  </g>
);

const EyesHappy = () => (
  <g className="robot-eyes eyes-happy">
    <path d="M10 6.3 Q10.5 7.2 11 6.3" stroke="#FFD700" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M13 6.3 Q13.5 7.2 14 6.3" stroke="#FFD700" strokeWidth="0.8" fill="none" strokeLinecap="round" />
  </g>
);

const EyesSleepy = () => (
  <g className="robot-eyes eyes-sleepy">
    <ellipse cx="10.5" cy="6.5" rx="0.7" ry="0.3" fill="#FFD700" opacity="0.7" />
    <ellipse cx="13.5" cy="6.5" rx="0.7" ry="0.3" fill="#FFD700" opacity="0.7" />
  </g>
);

const EyesClosed = () => (
  <g className="robot-eyes eyes-closed">
    <path d="M10 6.5 L11 6.5" stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M13 6.5 L14 6.5" stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" />
  </g>
);

const EyesCurious = () => (
  <g className="robot-eyes eyes-curious">
    <circle cx="10.5" cy="6.5" r="0.6" fill="#FFD700" className="robot-eye" />
    <circle cx="13.5" cy="6.5" r="0.9" fill="#FFD700" className="robot-eye" />
  </g>
);

const EyesExcited = () => (
  <g className="robot-eyes eyes-excited">
    <circle cx="10.5" cy="6.5" r="0.9" fill="#FFFFFF" opacity="0.5" />
    <circle cx="10.5" cy="6.5" r="0.6" fill="#FFD700" className="robot-eye" />
    <circle cx="13.5" cy="6.5" r="0.9" fill="#FFFFFF" opacity="0.5" />
    <circle cx="13.5" cy="6.5" r="0.6" fill="#FFD700" className="robot-eye" />
  </g>
);

const EyesSurprised = () => (
  <g className="robot-eyes eyes-surprised">
    <circle cx="10.5" cy="6.5" r="1" fill="none" stroke="#FFD700" strokeWidth="0.5" />
    <circle cx="10.5" cy="6.5" r="0.4" fill="#FFD700" />
    <circle cx="13.5" cy="6.5" r="1" fill="none" stroke="#FFD700" strokeWidth="0.5" />
    <circle cx="13.5" cy="6.5" r="0.4" fill="#FFD700" />
  </g>
);

const EyesLookingUp = () => (
  <g className="robot-eyes eyes-look-up">
    <circle cx="10.5" cy="6.2" r="0.7" fill="#FFD700" className="robot-eye" />
    <circle cx="13.5" cy="6.2" r="0.7" fill="#FFD700" className="robot-eye" />
  </g>
);

// ============================================================================
// POSE-SPECIFIC ARM COMPONENTS
// ============================================================================

const ArmsIdle = () => (
  <>
    <g className="robot-arm robot-arm-left">
      <path d="M7 12 L4 14" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="3.5" cy="14.5" r="0.4" fill="#FFD700" />
    </g>
    <g className="robot-arm robot-arm-right">
      <path d="M17 12 L20 14" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="20.5" cy="14.5" r="0.4" fill="#FFD700" />
    </g>
  </>
);

const ArmsWaving = () => (
  <>
    <g className="robot-arm robot-arm-left">
      <path d="M7 12 L4 14" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="3.5" cy="14.5" r="0.4" fill="#FFD700" />
    </g>
    <g className="robot-arm robot-arm-right waving">
      <path d="M17 11 L19 8 L21 6" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="21.5" cy="5.5" r="0.4" fill="#FFD700" />
    </g>
  </>
);

const ArmsCelebrating = () => (
  <>
    <g className="robot-arm robot-arm-left celebrating">
      <path d="M7 11 L4 7 L2 4" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="1.5" cy="3.5" r="0.4" fill="#FFD700" />
    </g>
    <g className="robot-arm robot-arm-right celebrating">
      <path d="M17 11 L20 7 L22 4" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="22.5" cy="3.5" r="0.4" fill="#FFD700" />
    </g>
  </>
);

const ArmsRelaxed = () => (
  <>
    <g className="robot-arm robot-arm-left relaxed">
      <path d="M7 12 L5 15" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="4.5" cy="15.5" r="0.4" fill="#FFD700" />
    </g>
    <g className="robot-arm robot-arm-right relaxed">
      <path d="M17 12 L19 15" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="19.5" cy="15.5" r="0.4" fill="#FFD700" />
    </g>
  </>
);

const ArmsThinking = () => (
  <>
    <g className="robot-arm robot-arm-left">
      <path d="M7 12 L4 14" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="3.5" cy="14.5" r="0.4" fill="#FFD700" />
    </g>
    <g className="robot-arm robot-arm-right thinking">
      <path d="M17 11 L16 9 L14.5 8.5" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" strokeLinecap="round" />
      <circle cx="14" cy="8.5" r="0.4" fill="#FFD700" />
    </g>
  </>
);

// ============================================================================
// DECORATIVE ELEMENTS
// ============================================================================

const CelebrationSparkles = () => (
  <g className="celebration-sparkles">
    <path d="M2 8 L3 7 L2 6 L1 7 Z" fill="#FFD700" className="sparkle s1" />
    <path d="M22 8 L23 7 L22 6 L21 7 Z" fill="#FFD700" className="sparkle s2" />
    <path d="M5 2 L6 1 L5 0 L4 1 Z" fill="#FFD700" className="sparkle s3" />
    <path d="M19 2 L20 1 L19 0 L18 1 Z" fill="#FFD700" className="sparkle s4" />
    <circle cx="3" cy="4" r="0.3" fill="#FFD700" className="sparkle s5" />
    <circle cx="21" cy="4" r="0.3" fill="#FFD700" className="sparkle s6" />
  </g>
);

const ThoughtBubbles = () => (
  <g className="thought-bubbles">
    <circle cx="17" cy="4" r="0.4" fill="#FFD700" opacity="0.5" />
    <circle cx="19" cy="2.5" r="0.6" fill="#FFD700" opacity="0.5" />
    <circle cx="21.5" cy="1" r="0.9" fill="#FFD700" opacity="0.5" />
  </g>
);

const SleepZzz = () => (
  <g className="sleep-zzz" fill="#FFD700" opacity="0.6">
    <text x="18" y="5" fontSize="2.5" fontFamily="Arial, sans-serif" fontWeight="bold">Z</text>
    <text x="20" y="3" fontSize="2" fontFamily="Arial, sans-serif" fontWeight="bold">z</text>
    <text x="21.5" y="1.5" fontSize="1.5" fontFamily="Arial, sans-serif" fontWeight="bold">z</text>
  </g>
);

// ============================================================================
// MAIN ROBOT COMPONENT
// ============================================================================

const AgentiveRobot = memo(({
  pose = 'idle',
  expression = 'neutral',
  size = 80,
  peekFrom = 'bottom-right',
  animated = true,
  className = '',
  showLegs = true,
  showChestDetails = true,
  ariaLabel = 'Agentive AI Robot Assistant'
}: AgentiveRobotProps) => {

  // Determine which eyes to render based on pose and expression
  const EyesComponent = useMemo(() => {
    // Pose-specific eye overrides
    if (pose === 'sleeping') return EyesClosed;
    if (pose === 'celebrating') return EyesHappy;
    if (pose === 'peeking') return EyesCurious;
    if (pose === 'thinking') return EyesLookingUp;

    // Expression-based eyes
    switch (expression) {
      case 'happy': return EyesHappy;
      case 'sleepy': return EyesSleepy;
      case 'curious': return EyesCurious;
      case 'excited': return EyesExcited;
      case 'surprised': return EyesSurprised;
      default: return EyesNeutral;
    }
  }, [pose, expression]);

  // Determine which arms to render based on pose
  const ArmsComponent = useMemo(() => {
    switch (pose) {
      case 'waving': return ArmsWaving;
      case 'celebrating': return ArmsCelebrating;
      case 'sleeping': return ArmsRelaxed;
      case 'thinking': return ArmsThinking;
      default: return ArmsIdle;
    }
  }, [pose]);

  // Calculate viewBox and transform for peeking pose
  const viewBoxConfig = useMemo(() => {
    if (pose === 'peeking') {
      const configs: Record<PeekDirection, { viewBox: string; transform: string }> = {
        'top': { viewBox: '0 0 24 16', transform: 'translate(0, -8)' },
        'bottom': { viewBox: '0 8 24 16', transform: 'translate(0, 8)' },
        'left': { viewBox: '0 0 16 24', transform: 'translate(-8, 0)' },
        'right': { viewBox: '8 0 16 24', transform: 'translate(8, 0)' },
        'top-right': { viewBox: '8 0 16 16', transform: 'translate(4, -4)' },
        'top-left': { viewBox: '0 0 16 16', transform: 'translate(-4, -4)' },
        'bottom-right': { viewBox: '8 8 16 16', transform: 'translate(4, 4)' },
        'bottom-left': { viewBox: '0 8 16 16', transform: 'translate(-4, 4)' }
      };
      return configs[peekFrom];
    }
    if (pose === 'sleeping') {
      return { viewBox: '0 0 32 24', transform: '' };
    }
    return { viewBox: '0 0 24 24', transform: '' };
  }, [pose, peekFrom]);

  // Calculate head transform for different poses
  const headTransform = useMemo(() => {
    if (pose === 'thinking') return 'rotate(-8, 12, 7)';
    if (pose === 'waving') return 'rotate(3, 12, 7)';
    if (pose === 'peeking') return 'rotate(-5, 12, 7)';
    return '';
  }, [pose]);

  // Build CSS classes
  const robotClasses = useMemo(() => {
    const classes = ['agentive-robot', `pose-${pose}`];
    if (animated) classes.push('animated');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [pose, animated, className]);

  // Sleeping pose renders differently (rotated)
  if (pose === 'sleeping') {
    return (
      <div className="agentive-robot-wrapper sleeping" style={{ width: size * 1.33, height: size }}>
        <svg
          viewBox={viewBoxConfig.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={robotClasses}
          role="img"
          aria-label={`${ariaLabel} - sleeping`}
          width={size * 1.33}
          height={size}
        >
          <defs>
            <filter id="robotGlowSleep" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rotated robot group */}
          <g transform="rotate(-90, 16, 12) translate(4, -2)">
            {/* Antenna */}
            <g className="robot-antenna" filter="url(#robotGlowSleep)">
              <path d="M12 4 L12 2" stroke="#FFD700" strokeWidth="0.8" strokeDasharray="1 1" strokeLinecap="round" />
              <circle cx="12" cy="1.5" r="0.6" fill="#FFD700" className="antenna-tip" />
            </g>

            {/* Head */}
            <g className="robot-head">
              <rect x="9" y="4" width="6" height="5.5" rx="1.5" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" fill="none" />
              <EyesClosed />
            </g>

            {/* Body */}
            <g className="robot-body sleeping-body">
              <rect x="7" y="10" width="10" height="8" rx="1" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 2" fill="none" />
            </g>

            {/* Relaxed arms */}
            <ArmsRelaxed />
          </g>

          {/* ZZZ effect */}
          <SleepZzz />
        </svg>
      </div>
    );
  }

  return (
    <div className="agentive-robot-wrapper" style={{ width: size, height: size }}>
      <svg
        viewBox={viewBoxConfig.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={robotClasses}
        role="img"
        aria-label={ariaLabel}
        width={size}
        height={size}
      >
        <defs>
          {/* Glow filter for antenna and eyes */}
          <filter id="robotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse glow for active states */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for eye glow */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main robot container */}
        <g className="robot-container" transform={viewBoxConfig.transform}>

          {/* ANTENNA GROUP */}
          <g className="robot-antenna" filter="url(#robotGlow)">
            <path
              d="M12 4 L12 2"
              stroke="#FFD700"
              strokeWidth="0.8"
              strokeDasharray="1 1"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="1.5"
              r="0.6"
              fill="#FFD700"
              className="antenna-tip"
            />
          </g>

          {/* HEAD GROUP */}
          <g className="robot-head" transform={headTransform}>
            {/* Head outline */}
            <rect
              x="9" y="4"
              width="6" height="5.5"
              rx="1.5"
              stroke="#FFD700"
              strokeWidth="1"
              strokeDasharray="2 1"
              fill="none"
            />

            {/* Eyes */}
            <EyesComponent />

            {/* Optional mouth for certain expressions */}
            {(expression === 'happy' || pose === 'celebrating') && (
              <path
                d="M11 8.2 Q12 8.8 13 8.2"
                stroke="#FFD700"
                strokeWidth="0.5"
                strokeDasharray="0.5 0.5"
                fill="none"
                className="robot-mouth"
              />
            )}
          </g>

          {/* BODY GROUP */}
          <g className="robot-body">
            {/* Main body */}
            <rect
              x="7" y="10"
              width="10" height="8"
              rx="1"
              stroke="#FFD700"
              strokeWidth="1"
              strokeDasharray="3 2"
              fill="none"
            />

            {/* Chest details (optional) */}
            {showChestDetails && (
              <g className="robot-chest-details" opacity="0.4">
                <line x1="9" y1="12" x2="11" y2="12" stroke="#FFD700" strokeWidth="0.4" strokeDasharray="1 1" />
                <line x1="13" y1="12" x2="15" y2="12" stroke="#FFD700" strokeWidth="0.4" strokeDasharray="1 1" />
                <circle cx="12" cy="14" r="1" stroke="#FFD700" strokeWidth="0.4" strokeDasharray="1 1" fill="none" />
              </g>
            )}
          </g>

          {/* ARMS */}
          <ArmsComponent />

          {/* LEGS GROUP (optional) */}
          {showLegs && pose !== 'peeking' && (
            <g className="robot-legs">
              {/* Left leg */}
              <path
                d="M10 18 L10 21"
                stroke="#FFD700"
                strokeWidth="1"
                strokeDasharray="3 1"
                strokeLinecap="round"
              />
              <path
                d="M9 21 L11 21"
                stroke="#FFD700"
                strokeWidth="0.8"
                strokeDasharray="1 1"
              />

              {/* Right leg */}
              <path
                d="M14 18 L14 21"
                stroke="#FFD700"
                strokeWidth="1"
                strokeDasharray="3 1"
                strokeLinecap="round"
              />
              <path
                d="M13 21 L15 21"
                stroke="#FFD700"
                strokeWidth="0.8"
                strokeDasharray="1 1"
              />
            </g>
          )}

          {/* DECORATIVE ELEMENTS */}
          {pose === 'celebrating' && <CelebrationSparkles />}
          {pose === 'thinking' && <ThoughtBubbles />}
        </g>
      </svg>
    </div>
  );
});

AgentiveRobot.displayName = 'AgentiveRobot';

export default AgentiveRobot;
