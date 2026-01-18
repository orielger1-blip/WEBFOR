/**
 * Advanced SVG Character Animation System
 * Production-ready TypeScript for premium character interactions
 *
 * Features:
 * - Mouse-following eyes with natural constraints
 * - Scroll-triggered reveal animations
 * - Click and hover interactions
 * - State machine for emotion transitions
 * - Performance-optimized with RAF and Intersection Observer
 */

// ============================================
// Types and Interfaces
// ============================================

export interface Point {
  x: number;
  y: number;
}

export interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  iterations?: number;
  fill?: FillMode;
}

export interface EyeConfig {
  maxOffset: number;
  smoothing: number;
  elasticity: number;
  returnSpeed: number;
}

export interface ScrollRevealConfig {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  staggerDelay?: number;
}

export interface CharacterState {
  emotion: EmotionType;
  isHovered: boolean;
  isClicked: boolean;
  isVisible: boolean;
  isPaused: boolean;
}

export type EmotionType =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'excited'
  | 'surprised'
  | 'sleepy'
  | 'angry';

export type AnimationType =
  | 'wave'
  | 'jump'
  | 'bounce'
  | 'spin'
  | 'squish'
  | 'shake';

// ============================================
// Premium Easing Functions (Stripe/Linear style)
// ============================================

export const EASING = {
  // Expo curves - dramatic, premium feel
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
  inOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',

  // Quart curves - smooth, refined
  outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  inQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
  inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',

  // Back curves - playful overshoot
  outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  inBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  inOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  // Spring - bouncy, energetic
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  springBouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Smooth - standard Material/Apple feel
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smoothDecel: 'cubic-bezier(0, 0, 0.2, 1)',
  smoothAccel: 'cubic-bezier(0.4, 0, 1, 1)',

  // Linear for mouse tracking
  linear: 'linear',
} as const;

export const DURATION = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
  slowest: 1200,
} as const;

// ============================================
// Mouse-Following Eye System
// ============================================

export class MouseFollowingEyes {
  private container: HTMLElement;
  private pupils: NodeListOf<Element>;
  private config: EyeConfig;
  private currentPosition: Point = { x: 0, y: 0 };
  private targetPosition: Point = { x: 0, y: 0 };
  private animationId: number | null = null;
  private isActive: boolean = false;
  private boundMouseMove: (e: MouseEvent) => void;
  private boundMouseLeave: () => void;

  constructor(
    container: HTMLElement | string,
    pupilSelector: string = '.character-eye-pupil',
    config: Partial<EyeConfig> = {}
  ) {
    this.container = typeof container === 'string'
      ? document.querySelector(container) as HTMLElement
      : container;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    this.pupils = this.container.querySelectorAll(pupilSelector);

    this.config = {
      maxOffset: 4,
      smoothing: 0.15,
      elasticity: 0.08,
      returnSpeed: 0.05,
      ...config,
    };

    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundMouseLeave = this.handleMouseLeave.bind(this);
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized position (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normalizedY = (e.clientY - centerY) / (window.innerHeight / 2);

    // Clamp values
    this.targetPosition = {
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
    };
  }

  private handleMouseLeave(): void {
    this.targetPosition = { x: 0, y: 0 };
  }

  private animate(): void {
    if (!this.isActive) return;

    // Smooth interpolation with elasticity
    const dx = this.targetPosition.x - this.currentPosition.x;
    const dy = this.targetPosition.y - this.currentPosition.y;

    this.currentPosition.x += dx * this.config.smoothing;
    this.currentPosition.y += dy * this.config.smoothing;

    // Apply transform to all pupils
    const translateX = this.currentPosition.x * this.config.maxOffset;
    const translateY = this.currentPosition.y * this.config.maxOffset;

    this.pupils.forEach((pupil) => {
      (pupil as HTMLElement).style.transform =
        `translate(${translateX}px, ${translateY}px)`;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    if (this.isActive) return;

    this.isActive = true;
    document.addEventListener('mousemove', this.boundMouseMove, { passive: true });
    this.container.addEventListener('mouseleave', this.boundMouseLeave);
    this.animate();
  }

  public stop(): void {
    this.isActive = false;
    document.removeEventListener('mousemove', this.boundMouseMove);
    this.container.removeEventListener('mouseleave', this.boundMouseLeave);

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public setConfig(config: Partial<EyeConfig>): void {
    this.config = { ...this.config, ...config };
  }

  public destroy(): void {
    this.stop();
    this.pupils.forEach((pupil) => {
      (pupil as HTMLElement).style.transform = '';
    });
  }
}

// ============================================
// Advanced Eye Following with Constraints
// ============================================

export class AdvancedEyeSystem {
  private leftEye: HTMLElement;
  private rightEye: HTMLElement;
  private leftPupil: HTMLElement;
  private rightPupil: HTMLElement;
  private container: HTMLElement;

  private currentLeft: Point = { x: 0, y: 0 };
  private currentRight: Point = { x: 0, y: 0 };
  private target: Point = { x: 0, y: 0 };

  private animationId: number | null = null;
  private isActive: boolean = false;

  private config = {
    maxOffset: 5,
    smoothing: 0.12,
    eyeDistance: 20, // Distance between eyes for parallax effect
    blinkInterval: 4000,
    blinkDuration: 150,
  };

  constructor(container: HTMLElement, selectors: {
    leftEye: string;
    rightEye: string;
    leftPupil: string;
    rightPupil: string;
  }) {
    this.container = container;
    this.leftEye = container.querySelector(selectors.leftEye) as HTMLElement;
    this.rightEye = container.querySelector(selectors.rightEye) as HTMLElement;
    this.leftPupil = container.querySelector(selectors.leftPupil) as HTMLElement;
    this.rightPupil = container.querySelector(selectors.rightPupil) as HTMLElement;
  }

  private calculatePupilPosition(
    eyeElement: HTMLElement,
    mouseX: number,
    mouseY: number
  ): Point {
    const rect = eyeElement.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    const distance = Math.min(
      Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 100,
      1
    );

    return {
      x: Math.cos(angle) * distance * this.config.maxOffset,
      y: Math.sin(angle) * distance * this.config.maxOffset,
    };
  }

  private lerp(current: number, target: number, factor: number): number {
    return current + (target - current) * factor;
  }

  private update(mouseX: number, mouseY: number): void {
    const leftTarget = this.calculatePupilPosition(this.leftEye, mouseX, mouseY);
    const rightTarget = this.calculatePupilPosition(this.rightEye, mouseX, mouseY);

    this.currentLeft.x = this.lerp(this.currentLeft.x, leftTarget.x, this.config.smoothing);
    this.currentLeft.y = this.lerp(this.currentLeft.y, leftTarget.y, this.config.smoothing);
    this.currentRight.x = this.lerp(this.currentRight.x, rightTarget.x, this.config.smoothing);
    this.currentRight.y = this.lerp(this.currentRight.y, rightTarget.y, this.config.smoothing);

    this.leftPupil.style.transform =
      `translate(${this.currentLeft.x}px, ${this.currentLeft.y}px)`;
    this.rightPupil.style.transform =
      `translate(${this.currentRight.x}px, ${this.currentRight.y}px)`;
  }

  public start(): void {
    if (this.isActive) return;
    this.isActive = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isActive) return;
      this.target = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!this.isActive) return;
      this.update(this.target.x, this.target.y);
      this.animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    animate();
  }

  public stop(): void {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ============================================
// Scroll Reveal Animation System
// ============================================

export class ScrollRevealSystem {
  private observer: IntersectionObserver;
  private elements: Map<Element, ScrollRevealConfig> = new Map();
  private staggerGroups: Map<string, Element[]> = new Map();

  constructor(defaultConfig: ScrollRevealConfig = {}) {
    const config: ScrollRevealConfig = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
      once: true,
      staggerDelay: 100,
      ...defaultConfig,
    };

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const config = this.elements.get(entry.target);

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('character-offscreen');
        entry.target.classList.add('character-onscreen');

        if (config?.once) {
          this.observer.unobserve(entry.target);
          this.elements.delete(entry.target);
        }
      } else {
        if (!config?.once) {
          entry.target.classList.remove('visible');
          entry.target.classList.add('character-offscreen');
          entry.target.classList.remove('character-onscreen');
        }
      }
    });
  }

  public observe(
    element: Element | string,
    config: ScrollRevealConfig = {}
  ): void {
    const el = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!el) return;

    this.elements.set(el, config);
    this.observer.observe(el);
  }

  public observeGroup(
    selector: string,
    config: ScrollRevealConfig = {}
  ): void {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay =
        `${index * (config.staggerDelay || 100)}ms`;
      this.observe(el, config);
    });

    this.staggerGroups.set(selector, Array.from(elements));
  }

  public unobserve(element: Element): void {
    this.observer.unobserve(element);
    this.elements.delete(element);
  }

  public destroy(): void {
    this.observer.disconnect();
    this.elements.clear();
    this.staggerGroups.clear();
  }
}

// ============================================
// Click Animation Controller
// ============================================

export class ClickAnimationController {
  private element: HTMLElement;
  private currentAnimation: Animation | null = null;

  constructor(element: HTMLElement | string) {
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!this.element) {
      throw new Error('Element not found');
    }
  }

  public async playAnimation(
    type: AnimationType,
    config: AnimationConfig = {}
  ): Promise<void> {
    // Cancel any running animation
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
    }

    const keyframes = this.getKeyframes(type);
    const options: KeyframeAnimationOptions = {
      duration: config.duration || DURATION.slow,
      easing: config.easing || EASING.outBack,
      fill: config.fill || 'forwards',
      iterations: config.iterations || 1,
    };

    this.currentAnimation = this.element.animate(keyframes, options);

    return new Promise((resolve) => {
      this.currentAnimation!.onfinish = () => {
        this.currentAnimation = null;
        resolve();
      };
    });
  }

  private getKeyframes(type: AnimationType): Keyframe[] {
    const keyframeMap: Record<AnimationType, Keyframe[]> = {
      wave: [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(14deg)', offset: 0.1 },
        { transform: 'rotate(-8deg)', offset: 0.2 },
        { transform: 'rotate(14deg)', offset: 0.3 },
        { transform: 'rotate(-4deg)', offset: 0.4 },
        { transform: 'rotate(10deg)', offset: 0.5 },
        { transform: 'rotate(0deg)', offset: 0.6 },
        { transform: 'rotate(0deg)' },
      ],
      jump: [
        { transform: 'translateY(0) scaleY(1)' },
        { transform: 'translateY(0) scaleY(0.9)', offset: 0.1 },
        { transform: 'translateY(-30px) scaleY(1.1)', offset: 0.3 },
        { transform: 'translateY(0) scaleY(0.95)', offset: 0.5 },
        { transform: 'translateY(-10px) scaleY(1.05)', offset: 0.7 },
        { transform: 'translateY(0) scaleY(0.98)', offset: 0.85 },
        { transform: 'translateY(0) scaleY(1)' },
      ],
      bounce: [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-15px)', offset: 0.2 },
        { transform: 'translateY(0)', offset: 0.4 },
        { transform: 'translateY(-8px)', offset: 0.6 },
        { transform: 'translateY(0)', offset: 0.8 },
        { transform: 'translateY(0)' },
      ],
      spin: [
        { transform: 'rotate(0deg) scale(1)' },
        { transform: 'rotate(90deg) scale(1.1)', offset: 0.25 },
        { transform: 'rotate(180deg) scale(1)', offset: 0.5 },
        { transform: 'rotate(270deg) scale(1.1)', offset: 0.75 },
        { transform: 'rotate(360deg) scale(1)' },
      ],
      squish: [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.1, 0.9)', offset: 0.3 },
        { transform: 'scale(0.95, 1.05)', offset: 0.6 },
        { transform: 'scale(1, 1)' },
      ],
      shake: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)', offset: 0.1 },
        { transform: 'translateX(5px)', offset: 0.2 },
        { transform: 'translateX(-5px)', offset: 0.3 },
        { transform: 'translateX(5px)', offset: 0.4 },
        { transform: 'translateX(-3px)', offset: 0.5 },
        { transform: 'translateX(3px)', offset: 0.6 },
        { transform: 'translateX(0)' },
      ],
    };

    return keyframeMap[type];
  }

  public cancelAnimation(): void {
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
      this.currentAnimation = null;
    }
  }
}

// ============================================
// Character State Machine
// ============================================

export class CharacterStateMachine {
  private element: HTMLElement;
  private state: CharacterState;
  private emotionClasses: string[] = [];
  private transitionDuration: number;

  constructor(
    element: HTMLElement | string,
    initialState: Partial<CharacterState> = {}
  ) {
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

    this.state = {
      emotion: 'neutral',
      isHovered: false,
      isClicked: false,
      isVisible: true,
      isPaused: false,
      ...initialState,
    };

    this.transitionDuration = DURATION.normal;
    this.applyState();
  }

  public setEmotion(emotion: EmotionType, animated: boolean = true): void {
    if (this.state.emotion === emotion) return;

    // Remove previous emotion class
    this.emotionClasses.forEach(cls => {
      this.element.classList.remove(cls);
    });

    this.state.emotion = emotion;
    const newClass = `character--${emotion}`;
    this.emotionClasses = [newClass];

    if (animated) {
      // Add transition class
      this.element.style.transition = `transform ${this.transitionDuration}ms ${EASING.outBack}`;
    }

    this.element.classList.add(newClass);
  }

  public setHovered(isHovered: boolean): void {
    this.state.isHovered = isHovered;
    this.element.classList.toggle('character--hovered', isHovered);
  }

  public setVisible(isVisible: boolean): void {
    this.state.isVisible = isVisible;
    this.element.classList.toggle('character-offscreen', !isVisible);
    this.element.classList.toggle('character-onscreen', isVisible);
  }

  public setPaused(isPaused: boolean): void {
    this.state.isPaused = isPaused;
    this.element.classList.toggle('animation-paused', isPaused);
  }

  public getState(): Readonly<CharacterState> {
    return { ...this.state };
  }

  private applyState(): void {
    this.setEmotion(this.state.emotion, false);
    this.setVisible(this.state.isVisible);
    this.setPaused(this.state.isPaused);
  }

  public async transitionTo(
    newState: Partial<CharacterState>,
    duration: number = DURATION.normal
  ): Promise<void> {
    return new Promise((resolve) => {
      this.transitionDuration = duration;

      if (newState.emotion) this.setEmotion(newState.emotion);
      if (newState.isHovered !== undefined) this.setHovered(newState.isHovered);
      if (newState.isVisible !== undefined) this.setVisible(newState.isVisible);
      if (newState.isPaused !== undefined) this.setPaused(newState.isPaused);

      setTimeout(resolve, duration);
    });
  }
}

// ============================================
// Visibility Observer (Performance Optimization)
// ============================================

export class VisibilityOptimizer {
  private observer: IntersectionObserver;
  private elements: Set<Element> = new Set();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      (entries) => this.handleVisibilityChange(entries),
      {
        threshold: 0,
        rootMargin: '50px',
        ...options,
      }
    );
  }

  private handleVisibilityChange(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;

      if (entry.isIntersecting) {
        // Element is visible - enable animations
        element.classList.remove('character-offscreen');
        element.classList.add('character-onscreen');
        element.style.willChange = 'transform, opacity';
      } else {
        // Element is not visible - pause animations for performance
        element.classList.add('character-offscreen');
        element.classList.remove('character-onscreen');
        element.style.willChange = 'auto';
      }
    });
  }

  public observe(element: Element | string): void {
    const el = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!el) return;

    this.elements.add(el);
    this.observer.observe(el);
  }

  public unobserve(element: Element): void {
    this.observer.unobserve(element);
    this.elements.delete(element);
  }

  public observeAll(selector: string): void {
    document.querySelectorAll(selector).forEach((el) => {
      this.observe(el);
    });
  }

  public destroy(): void {
    this.observer.disconnect();
    this.elements.clear();
  }
}

// ============================================
// Performance Monitor
// ============================================

export class AnimationPerformanceMonitor {
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private fps: number = 60;
  private isMonitoring: boolean = false;
  private animationId: number | null = null;
  private onLowFPS?: (fps: number) => void;
  private lowFPSThreshold: number = 30;

  constructor(options: {
    lowFPSThreshold?: number;
    onLowFPS?: (fps: number) => void;
  } = {}) {
    this.lowFPSThreshold = options.lowFPSThreshold || 30;
    this.onLowFPS = options.onLowFPS;
  }

  private measure(): void {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;

      if (this.fps < this.lowFPSThreshold && this.onLowFPS) {
        this.onLowFPS(this.fps);
      }
    }

    this.animationId = requestAnimationFrame(() => this.measure());
  }

  public start(): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.measure();
  }

  public stop(): void {
    this.isMonitoring = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public getFPS(): number {
    return this.fps;
  }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function for performance-critical handlers
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for continuous events like mousemove
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * RAF-based throttle for smooth animations
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Apply will-change optimization temporarily
 */
export function optimizeForAnimation(
  element: HTMLElement,
  properties: string[] = ['transform', 'opacity']
): () => void {
  element.style.willChange = properties.join(', ');

  return () => {
    element.style.willChange = 'auto';
  };
}
