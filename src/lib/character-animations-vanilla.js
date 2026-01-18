/**
 * Vanilla JavaScript Character Animation System
 * Production-ready, no dependencies required
 *
 * Usage:
 * <script src="character-animations-vanilla.js"></script>
 * <script>
 *   const character = new CharacterAnimator('#my-character');
 *   character.init();
 * </script>
 */

(function (global) {
  'use strict';

  // ============================================
  // Premium Easing Functions
  // ============================================

  const EASING = {
    outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
  };

  const DURATION = {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  };

  // ============================================
  // Utility Functions
  // ============================================

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function rafThrottle(func) {
    let rafId = null;
    return function (...args) {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    };
  }

  // ============================================
  // Mouse Following Eyes
  // ============================================

  class MouseFollowingEyes {
    constructor(container, pupilSelector, config) {
      this.container =
        typeof container === 'string'
          ? document.querySelector(container)
          : container;

      if (!this.container) {
        console.warn('MouseFollowingEyes: Container not found');
        return;
      }

      this.pupils = this.container.querySelectorAll(
        pupilSelector || '.character-eye-pupil'
      );

      this.config = Object.assign(
        {
          maxOffset: 4,
          smoothing: 0.15,
          elasticity: 0.08,
          returnSpeed: 0.05,
        },
        config
      );

      this.currentPosition = { x: 0, y: 0 };
      this.targetPosition = { x: 0, y: 0 };
      this.animationId = null;
      this.isActive = false;

      this._handleMouseMove = this._handleMouseMove.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
      this._animate = this._animate.bind(this);
    }

    _handleMouseMove(e) {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normalizedY = (e.clientY - centerY) / (window.innerHeight / 2);

      this.targetPosition = {
        x: clamp(normalizedX, -1, 1),
        y: clamp(normalizedY, -1, 1),
      };
    }

    _handleMouseLeave() {
      this.targetPosition = { x: 0, y: 0 };
    }

    _animate() {
      if (!this.isActive) return;

      const dx = this.targetPosition.x - this.currentPosition.x;
      const dy = this.targetPosition.y - this.currentPosition.y;

      this.currentPosition.x += dx * this.config.smoothing;
      this.currentPosition.y += dy * this.config.smoothing;

      const translateX = this.currentPosition.x * this.config.maxOffset;
      const translateY = this.currentPosition.y * this.config.maxOffset;

      this.pupils.forEach((pupil) => {
        pupil.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });

      this.animationId = requestAnimationFrame(this._animate);
    }

    start() {
      if (this.isActive) return;

      this.isActive = true;
      document.addEventListener('mousemove', this._handleMouseMove, {
        passive: true,
      });
      this.container.addEventListener('mouseleave', this._handleMouseLeave);
      this._animate();
    }

    stop() {
      this.isActive = false;
      document.removeEventListener('mousemove', this._handleMouseMove);
      this.container.removeEventListener('mouseleave', this._handleMouseLeave);

      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    destroy() {
      this.stop();
      this.pupils.forEach((pupil) => {
        pupil.style.transform = '';
      });
    }
  }

  // ============================================
  // Scroll Reveal System
  // ============================================

  class ScrollRevealSystem {
    constructor(config) {
      this.config = Object.assign(
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px',
          once: true,
          staggerDelay: 100,
        },
        config
      );

      this.elements = new Map();

      this.observer = new IntersectionObserver(
        this._handleIntersection.bind(this),
        {
          threshold: this.config.threshold,
          rootMargin: this.config.rootMargin,
        }
      );
    }

    _handleIntersection(entries) {
      entries.forEach((entry) => {
        const config = this.elements.get(entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('character-offscreen');
          entry.target.classList.add('character-onscreen');

          if (config && config.once) {
            this.observer.unobserve(entry.target);
            this.elements.delete(entry.target);
          }
        } else {
          if (!config || !config.once) {
            entry.target.classList.remove('visible');
            entry.target.classList.add('character-offscreen');
            entry.target.classList.remove('character-onscreen');
          }
        }
      });
    }

    observe(element, config) {
      const el =
        typeof element === 'string' ? document.querySelector(element) : element;

      if (!el) return;

      this.elements.set(el, config || {});
      this.observer.observe(el);
    }

    observeGroup(selector, config) {
      const elements = document.querySelectorAll(selector);
      const staggerDelay =
        (config && config.staggerDelay) || this.config.staggerDelay;

      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * staggerDelay}ms`;
        this.observe(el, config);
      });
    }

    unobserve(element) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }

    destroy() {
      this.observer.disconnect();
      this.elements.clear();
    }
  }

  // ============================================
  // Click Animation Controller
  // ============================================

  class ClickAnimationController {
    constructor(element) {
      this.element =
        typeof element === 'string'
          ? document.querySelector(element)
          : element;

      this.currentAnimation = null;

      this.keyframeMap = {
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
    }

    playAnimation(type, config) {
      const self = this;

      if (this.currentAnimation) {
        this.currentAnimation.cancel();
      }

      const keyframes = this.keyframeMap[type];
      if (!keyframes) {
        console.warn('Unknown animation type:', type);
        return Promise.resolve();
      }

      const options = {
        duration: (config && config.duration) || DURATION.slow,
        easing: (config && config.easing) || EASING.outBack,
        fill: (config && config.fill) || 'forwards',
        iterations: (config && config.iterations) || 1,
      };

      this.currentAnimation = this.element.animate(keyframes, options);

      return new Promise(function (resolve) {
        self.currentAnimation.onfinish = function () {
          self.currentAnimation = null;
          resolve();
        };
      });
    }

    cancelAnimation() {
      if (this.currentAnimation) {
        this.currentAnimation.cancel();
        this.currentAnimation = null;
      }
    }
  }

  // ============================================
  // State Machine
  // ============================================

  class CharacterStateMachine {
    constructor(element, initialState) {
      this.element =
        typeof element === 'string'
          ? document.querySelector(element)
          : element;

      this.state = Object.assign(
        {
          emotion: 'neutral',
          isHovered: false,
          isClicked: false,
          isVisible: true,
          isPaused: false,
        },
        initialState
      );

      this.emotionClasses = [];
      this.transitionDuration = DURATION.normal;

      this._applyState();
    }

    setEmotion(emotion, animated) {
      if (this.state.emotion === emotion) return;

      const self = this;
      this.emotionClasses.forEach(function (cls) {
        self.element.classList.remove(cls);
      });

      this.state.emotion = emotion;
      const newClass = 'character--' + emotion;
      this.emotionClasses = [newClass];

      if (animated !== false) {
        this.element.style.transition =
          'transform ' + this.transitionDuration + 'ms ' + EASING.outBack;
      }

      this.element.classList.add(newClass);
    }

    setHovered(isHovered) {
      this.state.isHovered = isHovered;
      this.element.classList.toggle('character--hovered', isHovered);
    }

    setVisible(isVisible) {
      this.state.isVisible = isVisible;
      this.element.classList.toggle('character-offscreen', !isVisible);
      this.element.classList.toggle('character-onscreen', isVisible);
    }

    setPaused(isPaused) {
      this.state.isPaused = isPaused;
      this.element.classList.toggle('animation-paused', isPaused);
    }

    getState() {
      return Object.assign({}, this.state);
    }

    _applyState() {
      this.setEmotion(this.state.emotion, false);
      this.setVisible(this.state.isVisible);
      this.setPaused(this.state.isPaused);
    }
  }

  // ============================================
  // Visibility Optimizer
  // ============================================

  class VisibilityOptimizer {
    constructor(options) {
      this.elements = new Set();

      this.observer = new IntersectionObserver(
        this._handleVisibilityChange.bind(this),
        Object.assign(
          {
            threshold: 0,
            rootMargin: '50px',
          },
          options
        )
      );
    }

    _handleVisibilityChange(entries) {
      entries.forEach(function (entry) {
        const element = entry.target;

        if (entry.isIntersecting) {
          element.classList.remove('character-offscreen');
          element.classList.add('character-onscreen');
          element.style.willChange = 'transform, opacity';
        } else {
          element.classList.add('character-offscreen');
          element.classList.remove('character-onscreen');
          element.style.willChange = 'auto';
        }
      });
    }

    observe(element) {
      const el =
        typeof element === 'string' ? document.querySelector(element) : element;

      if (!el) return;

      this.elements.add(el);
      this.observer.observe(el);
    }

    observeAll(selector) {
      const self = this;
      document.querySelectorAll(selector).forEach(function (el) {
        self.observe(el);
      });
    }

    unobserve(element) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }

    destroy() {
      this.observer.disconnect();
      this.elements.clear();
    }
  }

  // ============================================
  // Main Character Animator Class
  // ============================================

  class CharacterAnimator {
    constructor(container, options) {
      this.container =
        typeof container === 'string'
          ? document.querySelector(container)
          : container;

      if (!this.container) {
        console.error('CharacterAnimator: Container not found');
        return;
      }

      this.options = Object.assign(
        {
          enableEyeTracking: true,
          enableIdleAnimations: true,
          enableScrollReveal: false,
          enableHoverEffects: true,
          enableVisibilityOptimization: true,
          clickAnimation: 'bounce',
          emotion: 'neutral',
          pupilSelector: '.character-eye-pupil',
        },
        options
      );

      this.eyeSystem = null;
      this.clickController = null;
      this.stateMachine = null;
      this.visibilityOptimizer = null;
      this.scrollReveal = null;

      this._isInitialized = false;
    }

    init() {
      if (this._isInitialized) return this;
      if (prefersReducedMotion()) {
        console.info('CharacterAnimator: Reduced motion preference detected');
        return this;
      }

      // Add base classes
      this.container.classList.add('svg-character');

      if (this.options.enableIdleAnimations) {
        this.container.classList.add('character-idle-full');
      }

      if (this.options.enableHoverEffects) {
        this.container.classList.add('character-interactive');
      }

      // Initialize eye tracking
      if (this.options.enableEyeTracking) {
        this.eyeSystem = new MouseFollowingEyes(
          this.container,
          this.options.pupilSelector,
          { maxOffset: 4, smoothing: 0.12 }
        );
        this.eyeSystem.start();
      }

      // Initialize click controller
      this.clickController = new ClickAnimationController(this.container);

      // Initialize state machine
      this.stateMachine = new CharacterStateMachine(this.container, {
        emotion: this.options.emotion,
      });

      // Initialize visibility optimizer
      if (this.options.enableVisibilityOptimization) {
        this.visibilityOptimizer = new VisibilityOptimizer();
        this.visibilityOptimizer.observe(this.container);
      }

      // Initialize scroll reveal
      if (this.options.enableScrollReveal) {
        this.container.classList.add('character-scroll-reveal');
        this.scrollReveal = new ScrollRevealSystem({ once: true });
        this.scrollReveal.observe(this.container);
      }

      // Setup event listeners
      this._setupEventListeners();

      this._isInitialized = true;
      return this;
    }

    _setupEventListeners() {
      const self = this;

      // Click handler
      this.container.addEventListener('click', function () {
        if (self.options.onClick) {
          self
            .playAnimation(self.options.clickAnimation)
            .then(self.options.onClick);
        } else {
          self.playAnimation(self.options.clickAnimation);
        }
      });

      // Hover handlers
      if (this.options.enableHoverEffects) {
        this.container.addEventListener('mouseenter', function () {
          self.stateMachine && self.stateMachine.setHovered(true);
        });

        this.container.addEventListener('mouseleave', function () {
          self.stateMachine && self.stateMachine.setHovered(false);
        });
      }

      // Keyboard accessibility
      this.container.setAttribute('tabindex', '0');
      this.container.setAttribute('role', 'button');
      this.container.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          self.container.click();
        }
      });
    }

    playAnimation(type, config) {
      if (!this.clickController) return Promise.resolve();
      return this.clickController.playAnimation(type, config);
    }

    setEmotion(emotion) {
      if (this.stateMachine) {
        this.stateMachine.setEmotion(emotion);
      }
      return this;
    }

    pause() {
      if (this.stateMachine) {
        this.stateMachine.setPaused(true);
      }
      if (this.eyeSystem) {
        this.eyeSystem.stop();
      }
      return this;
    }

    resume() {
      if (this.stateMachine) {
        this.stateMachine.setPaused(false);
      }
      if (this.eyeSystem) {
        this.eyeSystem.start();
      }
      return this;
    }

    destroy() {
      if (this.eyeSystem) this.eyeSystem.destroy();
      if (this.visibilityOptimizer) this.visibilityOptimizer.destroy();
      if (this.scrollReveal) this.scrollReveal.destroy();

      this.container.classList.remove(
        'svg-character',
        'character-idle-full',
        'character-interactive',
        'character-scroll-reveal'
      );

      this._isInitialized = false;
    }
  }

  // ============================================
  // Auto-initialize characters with data attribute
  // ============================================

  function autoInit() {
    document
      .querySelectorAll('[data-character-animator]')
      .forEach(function (el) {
        const options = {};

        // Parse data attributes
        if (el.dataset.eyeTracking === 'false') options.enableEyeTracking = false;
        if (el.dataset.idleAnimations === 'false')
          options.enableIdleAnimations = false;
        if (el.dataset.scrollReveal === 'true')
          options.enableScrollReveal = true;
        if (el.dataset.hoverEffects === 'false')
          options.enableHoverEffects = false;
        if (el.dataset.emotion) options.emotion = el.dataset.emotion;
        if (el.dataset.clickAnimation)
          options.clickAnimation = el.dataset.clickAnimation;

        new CharacterAnimator(el, options).init();
      });
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // ============================================
  // Export to global scope
  // ============================================

  global.CharacterAnimator = CharacterAnimator;
  global.MouseFollowingEyes = MouseFollowingEyes;
  global.ScrollRevealSystem = ScrollRevealSystem;
  global.ClickAnimationController = ClickAnimationController;
  global.CharacterStateMachine = CharacterStateMachine;
  global.VisibilityOptimizer = VisibilityOptimizer;

  global.CharacterAnimations = {
    CharacterAnimator: CharacterAnimator,
    MouseFollowingEyes: MouseFollowingEyes,
    ScrollRevealSystem: ScrollRevealSystem,
    ClickAnimationController: ClickAnimationController,
    CharacterStateMachine: CharacterStateMachine,
    VisibilityOptimizer: VisibilityOptimizer,
    EASING: EASING,
    DURATION: DURATION,
    utils: {
      lerp: lerp,
      clamp: clamp,
      prefersReducedMotion: prefersReducedMotion,
      rafThrottle: rafThrottle,
    },
  };
})(typeof window !== 'undefined' ? window : this);
