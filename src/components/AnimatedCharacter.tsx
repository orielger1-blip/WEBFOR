/**
 * AnimatedCharacter Component
 * Production-ready React component for SVG character animations
 *
 * Usage:
 * <AnimatedCharacter
 *   emotion="happy"
 *   enableEyeTracking
 *   enableIdleAnimations
 *   onClick={() => console.log('clicked!')}
 * />
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  MouseFollowingEyes,
  ScrollRevealSystem,
  ClickAnimationController,
  CharacterStateMachine,
  VisibilityOptimizer,
  AnimationPerformanceMonitor,
  prefersReducedMotion,
  rafThrottle,
  EASING,
  DURATION,
  type EmotionType,
  type AnimationType,
} from '../lib/CharacterAnimations';
import '../styles/character-animations.css';

// ============================================
// Types
// ============================================

export interface AnimatedCharacterProps {
  /** Character's emotional state */
  emotion?: EmotionType;

  /** Enable mouse-following eyes */
  enableEyeTracking?: boolean;

  /** Enable idle animations (breathing, blinking, etc.) */
  enableIdleAnimations?: boolean;

  /** Enable scroll-triggered reveal */
  enableScrollReveal?: boolean;

  /** Enable hover effects */
  enableHoverEffects?: boolean;

  /** Click handler - triggers animation before calling */
  onClick?: () => void;

  /** Animation to play on click */
  clickAnimation?: AnimationType;

  /** Custom SVG content (children) */
  children?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;

  /** Character size */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Performance mode - reduces animation complexity */
  performanceMode?: boolean;

  /** Callback when character becomes visible */
  onVisible?: () => void;

  /** Callback when character becomes hidden */
  onHidden?: () => void;
}

// ============================================
// Size Configurations
// ============================================

const SIZE_MAP = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
  xl: { width: 240, height: 240 },
};

// ============================================
// Default Character SVG
// ============================================

const DefaultCharacterSVG: React.FC<{
  size: { width: number; height: number };
}> = ({ size }) => (
  <svg
    viewBox="0 0 100 100"
    width={size.width}
    height={size.height}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Body */}
    <g className="character-body">
      <ellipse
        cx="50"
        cy="65"
        rx="30"
        ry="25"
        fill="#7C3AED"
        className="character-morphable"
      />
    </g>

    {/* Head */}
    <g className="character-head">
      <circle
        cx="50"
        cy="35"
        r="25"
        fill="#8B5CF6"
        className="character-morphable"
      />

      {/* Ears */}
      <ellipse
        cx="30"
        cy="20"
        rx="8"
        ry="12"
        fill="#7C3AED"
        className="character-ear character-ear--left"
      />
      <ellipse
        cx="70"
        cy="20"
        rx="8"
        ry="12"
        fill="#7C3AED"
        className="character-ear character-ear--right"
      />
    </g>

    {/* Face */}
    <g className="character-face">
      {/* Left Eye */}
      <g className="character-eye-container">
        <ellipse
          cx="40"
          cy="32"
          rx="6"
          ry="7"
          fill="white"
          className="character-eye character-eye--left"
        />
        <circle
          cx="41"
          cy="33"
          r="3"
          fill="#1F2937"
          className="character-eye-pupil character-eye-pupil--left"
        />
        <circle cx="42" cy="31" r="1" fill="white" opacity="0.8" />
      </g>

      {/* Right Eye */}
      <g className="character-eye-container">
        <ellipse
          cx="60"
          cy="32"
          rx="6"
          ry="7"
          fill="white"
          className="character-eye character-eye--right"
        />
        <circle
          cx="61"
          cy="33"
          r="3"
          fill="#1F2937"
          className="character-eye-pupil character-eye-pupil--right"
        />
        <circle cx="62" cy="31" r="1" fill="white" opacity="0.8" />
      </g>

      {/* Eyebrows */}
      <path
        d="M34 25 Q40 23 46 25"
        stroke="#5B21B6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="character-eyebrow character-eyebrow--left"
      />
      <path
        d="M54 25 Q60 23 66 25"
        stroke="#5B21B6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="character-eyebrow character-eyebrow--right"
      />

      {/* Nose */}
      <ellipse cx="50" cy="40" rx="2" ry="1.5" fill="#6D28D9" />

      {/* Mouth */}
      <path
        d="M42 47 Q50 52 58 47"
        stroke="#5B21B6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="character-mouth character-morphable"
      />

      {/* Blush */}
      <circle cx="32" cy="42" r="4" fill="#F472B6" opacity="0.4" />
      <circle cx="68" cy="42" r="4" fill="#F472B6" opacity="0.4" />
    </g>

    {/* Arms */}
    <g className="character-arms">
      <ellipse
        cx="22"
        cy="60"
        rx="8"
        ry="12"
        fill="#7C3AED"
        className="character-arm character-arm--left"
      />
      <ellipse
        cx="78"
        cy="60"
        rx="8"
        ry="12"
        fill="#7C3AED"
        className="character-arm character-arm--right"
      />
    </g>

    {/* Feet */}
    <g className="character-feet">
      <ellipse cx="38" cy="88" rx="10" ry="5" fill="#6D28D9" />
      <ellipse cx="62" cy="88" rx="10" ry="5" fill="#6D28D9" />
    </g>
  </svg>
);

// ============================================
// Main Component
// ============================================

export const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  emotion = 'neutral',
  enableEyeTracking = true,
  enableIdleAnimations = true,
  enableScrollReveal = false,
  enableHoverEffects = true,
  onClick,
  clickAnimation = 'bounce',
  children,
  className = '',
  style,
  size = 'md',
  performanceMode = false,
  onVisible,
  onHidden,
}) => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeSystemRef = useRef<MouseFollowingEyes | null>(null);
  const clickControllerRef = useRef<ClickAnimationController | null>(null);
  const stateMachineRef = useRef<CharacterStateMachine | null>(null);
  const visibilityRef = useRef<VisibilityOptimizer | null>(null);
  const scrollRevealRef = useRef<ScrollRevealSystem | null>(null);

  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Computed size
  const dimensions = useMemo(() => SIZE_MAP[size], [size]);

  // Check for reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize animation systems
  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    // Initialize eye tracking
    if (enableEyeTracking && !performanceMode) {
      eyeSystemRef.current = new MouseFollowingEyes(
        containerRef.current,
        '.character-eye-pupil',
        { maxOffset: 4, smoothing: 0.12 }
      );
      eyeSystemRef.current.start();
    }

    // Initialize click controller
    clickControllerRef.current = new ClickAnimationController(
      containerRef.current
    );

    // Initialize state machine
    stateMachineRef.current = new CharacterStateMachine(
      containerRef.current,
      { emotion }
    );

    // Initialize visibility optimizer
    visibilityRef.current = new VisibilityOptimizer();
    visibilityRef.current.observe(containerRef.current);

    // Initialize scroll reveal
    if (enableScrollReveal) {
      scrollRevealRef.current = new ScrollRevealSystem({
        threshold: 0.2,
        once: true,
      });
      scrollRevealRef.current.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      eyeSystemRef.current?.destroy();
      visibilityRef.current?.destroy();
      scrollRevealRef.current?.destroy();
    };
  }, [
    enableEyeTracking,
    enableScrollReveal,
    performanceMode,
    reducedMotion,
    emotion,
  ]);

  // Update emotion
  useEffect(() => {
    if (stateMachineRef.current && !reducedMotion) {
      stateMachineRef.current.setEmotion(emotion);
    }
  }, [emotion, reducedMotion]);

  // Handle click
  const handleClick = useCallback(async () => {
    if (isAnimating || reducedMotion) {
      onClick?.();
      return;
    }

    setIsAnimating(true);

    try {
      await clickControllerRef.current?.playAnimation(clickAnimation, {
        duration: DURATION.slow,
        easing: EASING.outBack,
      });
    } finally {
      setIsAnimating(false);
    }

    onClick?.();
  }, [onClick, clickAnimation, isAnimating, reducedMotion]);

  // Handle hover
  const handleMouseEnter = useCallback(() => {
    if (!enableHoverEffects || reducedMotion) return;
    setIsHovered(true);
    stateMachineRef.current?.setHovered(true);
  }, [enableHoverEffects, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stateMachineRef.current?.setHovered(false);
  }, []);

  // Build class names
  const containerClasses = useMemo(() => {
    const classes = ['svg-character', 'character-interactive'];

    if (enableIdleAnimations && !reducedMotion && !performanceMode) {
      classes.push('character-idle-full');
    }

    if (enableScrollReveal) {
      classes.push('character-scroll-reveal');
    }

    if (performanceMode) {
      classes.push('performance-mode');
    }

    if (isHovered && enableHoverEffects) {
      classes.push('character--hovered');
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [
    enableIdleAnimations,
    enableScrollReveal,
    enableHoverEffects,
    performanceMode,
    reducedMotion,
    isHovered,
    className,
  ]);

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={{
        display: 'inline-block',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children || <DefaultCharacterSVG size={dimensions} />}
    </div>
  );
};

// ============================================
// Hook: useCharacterAnimation
// ============================================

export function useCharacterAnimation(
  elementRef: React.RefObject<HTMLElement | null>,
  options: {
    enableEyeTracking?: boolean;
    enableVisibilityOptimization?: boolean;
  } = {}
) {
  const [isVisible, setIsVisible] = useState(true);
  const eyeSystemRef = useRef<MouseFollowingEyes | null>(null);
  const visibilityRef = useRef<VisibilityOptimizer | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Eye tracking
    if (options.enableEyeTracking) {
      eyeSystemRef.current = new MouseFollowingEyes(
        elementRef.current,
        '.character-eye-pupil'
      );
      eyeSystemRef.current.start();
    }

    // Visibility optimization
    if (options.enableVisibilityOptimization) {
      visibilityRef.current = new VisibilityOptimizer();
      visibilityRef.current.observe(elementRef.current);
    }

    return () => {
      eyeSystemRef.current?.destroy();
      visibilityRef.current?.destroy();
    };
  }, [elementRef, options.enableEyeTracking, options.enableVisibilityOptimization]);

  const playAnimation = useCallback(
    async (type: AnimationType, config = {}) => {
      if (!elementRef.current) return;

      const controller = new ClickAnimationController(elementRef.current);
      await controller.playAnimation(type, config);
    },
    [elementRef]
  );

  return {
    isVisible,
    playAnimation,
  };
}

// ============================================
// Hook: useScrollReveal
// ============================================

export function useScrollReveal(
  refs: React.RefObject<HTMLElement>[],
  options: {
    threshold?: number;
    staggerDelay?: number;
    once?: boolean;
  } = {}
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const systemRef = useRef<ScrollRevealSystem | null>(null);

  useEffect(() => {
    systemRef.current = new ScrollRevealSystem({
      threshold: options.threshold || 0.2,
      staggerDelay: options.staggerDelay || 100,
      once: options.once ?? true,
    });

    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.animationDelay = `${index * (options.staggerDelay || 100)}ms`;
        systemRef.current!.observe(ref.current, {
          once: options.once,
        });
      }
    });

    return () => {
      systemRef.current?.destroy();
    };
  }, [refs, options.threshold, options.staggerDelay, options.once]);

  return { visibleItems };
}

export default AnimatedCharacter;
