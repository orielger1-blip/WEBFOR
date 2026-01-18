/**
 * Character Animation Demo
 * Comprehensive examples of all animation features
 */

import React, { useRef, useState } from 'react';
import AnimatedCharacter, {
  useCharacterAnimation,
  useScrollReveal,
} from '../components/AnimatedCharacter';
import type { EmotionType, AnimationType } from '../lib/CharacterAnimations';

// ============================================
// Demo: Basic Usage
// ============================================

export const BasicDemo: React.FC = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Basic Character</h2>
      <AnimatedCharacter
        emotion="happy"
        enableEyeTracking
        enableIdleAnimations
        size="lg"
      />
    </div>
  );
};

// ============================================
// Demo: Emotion States
// ============================================

export const EmotionDemo: React.FC = () => {
  const [emotion, setEmotion] = useState<EmotionType>('neutral');

  const emotions: EmotionType[] = [
    'neutral',
    'happy',
    'sad',
    'excited',
    'surprised',
    'sleepy',
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h2>Emotion States</h2>

      <div style={{ marginBottom: '20px' }}>
        {emotions.map((e) => (
          <button
            key={e}
            onClick={() => setEmotion(e)}
            style={{
              margin: '4px',
              padding: '8px 16px',
              backgroundColor: emotion === e ? '#7C3AED' : '#E5E7EB',
              color: emotion === e ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {e}
          </button>
        ))}
      </div>

      <AnimatedCharacter
        emotion={emotion}
        enableEyeTracking
        enableIdleAnimations
        size="xl"
      />
    </div>
  );
};

// ============================================
// Demo: Click Animations
// ============================================

export const ClickDemo: React.FC = () => {
  const [lastAnimation, setLastAnimation] = useState<string>('');

  const animations: AnimationType[] = [
    'wave',
    'jump',
    'bounce',
    'spin',
    'squish',
    'shake',
  ];

  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationType>('bounce');

  return (
    <div style={{ padding: '40px' }}>
      <h2>Click Animations</h2>

      <div style={{ marginBottom: '20px' }}>
        {animations.map((a) => (
          <button
            key={a}
            onClick={() => setSelectedAnimation(a)}
            style={{
              margin: '4px',
              padding: '8px 16px',
              backgroundColor: selectedAnimation === a ? '#7C3AED' : '#E5E7EB',
              color: selectedAnimation === a ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {a}
          </button>
        ))}
      </div>

      <p>Click the character to see the "{selectedAnimation}" animation</p>

      <AnimatedCharacter
        emotion="happy"
        enableEyeTracking
        enableIdleAnimations
        clickAnimation={selectedAnimation}
        onClick={() => setLastAnimation(selectedAnimation)}
        size="xl"
      />

      {lastAnimation && (
        <p style={{ marginTop: '10px' }}>Last played: {lastAnimation}</p>
      )}
    </div>
  );
};

// ============================================
// Demo: Scroll Reveal (Multiple Characters)
// ============================================

export const ScrollRevealDemo: React.FC = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Scroll Reveal Demo</h2>
      <p>Scroll down to see characters appear</p>

      <div style={{ height: '100vh' }} />

      <div
        style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`character-scroll-reveal--pop character-scroll-reveal--delay-${i}`}
          >
            <AnimatedCharacter
              emotion={
                (['happy', 'excited', 'surprised', 'neutral'] as const)[i - 1]
              }
              enableScrollReveal
              enableIdleAnimations
              size="md"
            />
          </div>
        ))}
      </div>

      <div style={{ height: '50vh' }} />
    </div>
  );
};

// ============================================
// Demo: Custom SVG Character
// ============================================

export const CustomSVGDemo: React.FC = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Custom SVG Character</h2>

      <AnimatedCharacter
        emotion="happy"
        enableEyeTracking
        enableIdleAnimations
        size="lg"
      >
        {/* Custom Robot Character */}
        <svg viewBox="0 0 100 100" width={180} height={180}>
          {/* Antenna */}
          <line
            x1="50"
            y1="5"
            x2="50"
            y2="20"
            stroke="#6B7280"
            strokeWidth="3"
          />
          <circle cx="50" cy="5" r="4" fill="#EF4444" className="character-antenna" />

          {/* Head */}
          <rect
            x="25"
            y="20"
            width="50"
            height="40"
            rx="8"
            fill="#3B82F6"
            className="character-body"
          />

          {/* Eyes */}
          <g className="character-eye-container">
            <rect
              x="32"
              y="30"
              width="12"
              height="16"
              rx="2"
              fill="#1F2937"
              className="character-eye character-eye--left"
            />
            <rect
              x="35"
              y="36"
              width="6"
              height="8"
              rx="1"
              fill="#10B981"
              className="character-eye-pupil character-eye-pupil--left"
            />
          </g>

          <g className="character-eye-container">
            <rect
              x="56"
              y="30"
              width="12"
              height="16"
              rx="2"
              fill="#1F2937"
              className="character-eye character-eye--right"
            />
            <rect
              x="59"
              y="36"
              width="6"
              height="8"
              rx="1"
              fill="#10B981"
              className="character-eye-pupil character-eye-pupil--right"
            />
          </g>

          {/* Mouth */}
          <rect
            x="38"
            y="50"
            width="24"
            height="4"
            rx="2"
            fill="#1F2937"
            className="character-mouth"
          />

          {/* Body */}
          <rect x="30" y="62" width="40" height="30" rx="4" fill="#2563EB" />

          {/* Arms */}
          <rect
            x="15"
            y="65"
            width="12"
            height="20"
            rx="4"
            fill="#3B82F6"
            className="character-arm character-arm--left"
          />
          <rect
            x="73"
            y="65"
            width="12"
            height="20"
            rx="4"
            fill="#3B82F6"
            className="character-arm character-arm--right"
          />

          {/* Feet */}
          <rect x="32" y="92" width="14" height="6" rx="2" fill="#1F2937" />
          <rect x="54" y="92" width="14" height="6" rx="2" fill="#1F2937" />
        </svg>
      </AnimatedCharacter>
    </div>
  );
};

// ============================================
// Demo: Performance Mode
// ============================================

export const PerformanceModeDemo: React.FC = () => {
  const [performanceMode, setPerformanceMode] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <h2>Performance Mode</h2>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <input
          type="checkbox"
          checked={performanceMode}
          onChange={(e) => setPerformanceMode(e.target.checked)}
        />
        Enable Performance Mode (reduces animation complexity)
      </label>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <AnimatedCharacter
            key={i}
            emotion={(['happy', 'excited', 'neutral'] as const)[i % 3]}
            enableEyeTracking={!performanceMode}
            enableIdleAnimations
            performanceMode={performanceMode}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Demo: Using Hook
// ============================================

export const HookDemo: React.FC = () => {
  const characterRef = useRef<HTMLDivElement>(null);
  const { playAnimation } = useCharacterAnimation(characterRef, {
    enableEyeTracking: true,
    enableVisibilityOptimization: true,
  });

  return (
    <div style={{ padding: '40px' }}>
      <h2>Using Hook Directly</h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => playAnimation('jump')}
          style={{
            margin: '4px',
            padding: '8px 16px',
            backgroundColor: '#7C3AED',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Play Jump
        </button>
        <button
          onClick={() => playAnimation('spin')}
          style={{
            margin: '4px',
            padding: '8px 16px',
            backgroundColor: '#7C3AED',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Play Spin
        </button>
      </div>

      <div
        ref={characterRef}
        className="svg-character character-idle-full"
        style={{ display: 'inline-block' }}
      >
        <svg viewBox="0 0 100 100" width={180} height={180}>
          {/* Simplified character for demo */}
          <circle cx="50" cy="50" r="40" fill="#7C3AED" className="character-body" />
          <g className="character-eye-container">
            <circle cx="38" cy="45" r="8" fill="white" className="character-eye" />
            <circle
              cx="39"
              cy="46"
              r="4"
              fill="#1F2937"
              className="character-eye-pupil"
            />
          </g>
          <g className="character-eye-container">
            <circle cx="62" cy="45" r="8" fill="white" className="character-eye" />
            <circle
              cx="63"
              cy="46"
              r="4"
              fill="#1F2937"
              className="character-eye-pupil"
            />
          </g>
          <path
            d="M38 65 Q50 75 62 65"
            stroke="#5B21B6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ============================================
// Full Demo Page
// ============================================

export const CharacterAnimationDemoPage: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <header style={{ padding: '40px', textAlign: 'center' }}>
        <h1>SVG Character Animation System</h1>
        <p style={{ color: '#6B7280' }}>
          Production-ready animations for interactive characters
        </p>
      </header>

      <BasicDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <EmotionDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <ClickDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <CustomSVGDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <PerformanceModeDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <HookDemo />
      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #E5E7EB' }} />

      <ScrollRevealDemo />
    </div>
  );
};

export default CharacterAnimationDemoPage;
