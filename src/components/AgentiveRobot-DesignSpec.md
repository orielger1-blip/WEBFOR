# Agentive Robot Mascot - Complete Design Specification

## 1. BRAND OVERVIEW

### Company: Agentive
- **Industry**: AI Agents / Automation
- **Brand Values**: Reliable, Available 24/7, Intelligent, Friendly, Professional
- **Visual Theme**: Premium dark (#050508) with golden accents (#FFD700, #f59e0b)

### Character Name Suggestion: "Aggie" or "Avi"

---

## 2. CHARACTER PERSONALITY PROFILE

### Core Traits
| Trait | Expression | When |
|-------|------------|------|
| **Friendly** | Soft rounded features, warm eye glow | Default state |
| **Helpful** | Alert antenna, attentive posture | When user hovers/interacts |
| **Playful** | Bouncy animations, head tilts | Idle moments, celebrations |
| **Professional** | Clean lines, minimal accessories | Always maintained |
| **Tireless** | Subtle energy pulse, steady glow | 24/7 availability messaging |

### Emotional Range
- **Neutral/Idle**: Calm, attentive, breathing gently
- **Happy**: Eyes curved upward (^_^), antenna wiggle
- **Curious**: Head tilt, one eye slightly larger
- **Sleepy**: Half-closed eyes, slow breathing
- **Excited**: Rapid antenna bounce, sparkle effects
- **Thinking**: Looking up-right, antenna pulse

---

## 3. VISUAL DESIGN SYSTEM

### 3.1 Color Palette

```css
/* Primary Robot Colors */
--robot-primary: #FFD700;        /* Pure gold - main strokes */
--robot-secondary: #f59e0b;      /* Amber gold - accents */
--robot-glow: rgba(255, 215, 0, 0.6);  /* Glow effects */
--robot-fill: transparent;       /* Body fill - wireframe style */

/* Eye Colors by Mood */
--eye-default: #FFD700;
--eye-happy: #FBBF24;
--eye-sleepy: rgba(255, 215, 0, 0.5);
--eye-excited: #FFF8DC;
```

### 3.2 Stroke Properties

```css
/* Dashed Line Style (matches brain visualization) */
--stroke-body: stroke-width: 1; stroke-dasharray: 3 2;
--stroke-head: stroke-width: 1; stroke-dasharray: 2 1;
--stroke-limbs: stroke-width: 1; stroke-dasharray: 2 1;
--stroke-antenna: stroke-width: 0.8; stroke-dasharray: 1 1;
--stroke-details: stroke-width: 0.5; stroke-dasharray: 1 2;
```

---

## 4. SVG ANATOMY & STRUCTURE

### 4.1 ViewBox & Grid
```
viewBox="0 0 24 24"
Grid: 24x24 units
Center point: (12, 12)
```

### 4.2 Part Dimensions

| Part | Position | Size | Notes |
|------|----------|------|-------|
| **Head** | (9,4) to (15,10) | 6x6 | Rounded rect, rx=1.5 |
| **Body** | (7,10) to (17,18) | 10x8 | Rounded rect, rx=1 |
| **Left Eye** | cx=10.5, cy=7 | r=0.7 | Filled circle |
| **Right Eye** | cx=13.5, cy=7 | r=0.7 | Filled circle |
| **Antenna Base** | (12, 4) | - | Starting point |
| **Antenna Tip** | (12, 1.5) | - | End point with glow |
| **Left Arm** | Origin (7,12) | Length 3 | Can rotate |
| **Right Arm** | Origin (17,12) | Length 3 | Can rotate |
| **Left Leg** | (9,18) to (9,22) | Length 4 | Optional |
| **Right Leg** | (15,18) to (15,22) | Length 4 | Optional |

---

## 5. BASE SVG STRUCTURE

### 5.1 Complete Modular SVG

```svg
<svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="agentive-robot"
  role="img"
  aria-label="Agentive AI Robot Mascot"
>
  <defs>
    <!-- Glow filter for antenna and eyes -->
    <filter id="robotGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Pulse glow for active states -->
    <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="1" result="blur"/>
      <feFlood flood-color="#FFD700" flood-opacity="0.6"/>
      <feComposite in2="blur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Radial gradient for eye glow -->
    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="50%" stop-color="#FFD700" stop-opacity="1"/>
      <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ANTENNA GROUP -->
  <g class="robot-antenna" filter="url(#robotGlow)">
    <!-- Antenna stem -->
    <path
      d="M12 4 L12 2"
      stroke="#FFD700"
      stroke-width="0.8"
      stroke-dasharray="1 1"
      stroke-linecap="round"
    />
    <!-- Antenna tip/ball -->
    <circle
      cx="12"
      cy="1.5"
      r="0.6"
      fill="#FFD700"
      class="antenna-tip"
    />
  </g>

  <!-- HEAD GROUP -->
  <g class="robot-head">
    <!-- Head outline -->
    <rect
      x="9" y="4"
      width="6" height="5.5"
      rx="1.5"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="2 1"
      fill="none"
    />

    <!-- EYES GROUP -->
    <g class="robot-eyes">
      <!-- Left eye -->
      <circle
        cx="10.5"
        cy="6.5"
        r="0.7"
        fill="#FFD700"
        class="robot-eye robot-eye-left"
      />
      <!-- Right eye -->
      <circle
        cx="13.5"
        cy="6.5"
        r="0.7"
        fill="#FFD700"
        class="robot-eye robot-eye-right"
      />
    </g>

    <!-- Mouth (optional, for expressions) -->
    <path
      d="M11 8.2 Q12 8.7 13 8.2"
      stroke="#FFD700"
      stroke-width="0.5"
      stroke-dasharray="0.5 0.5"
      fill="none"
      class="robot-mouth"
      opacity="0"
    />
  </g>

  <!-- BODY GROUP -->
  <g class="robot-body">
    <!-- Main body -->
    <rect
      x="7" y="10"
      width="10" height="8"
      rx="1"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="3 2"
      fill="none"
    />

    <!-- Chest details (optional - circuit lines) -->
    <g class="robot-chest-details" opacity="0.4">
      <line x1="9" y1="12" x2="11" y2="12" stroke="#FFD700" stroke-width="0.4" stroke-dasharray="1 1"/>
      <line x1="13" y1="12" x2="15" y2="12" stroke="#FFD700" stroke-width="0.4" stroke-dasharray="1 1"/>
      <circle cx="12" cy="14" r="1" stroke="#FFD700" stroke-width="0.4" stroke-dasharray="1 1" fill="none"/>
    </g>
  </g>

  <!-- LEFT ARM GROUP -->
  <g class="robot-arm robot-arm-left">
    <path
      d="M7 12 L4 10"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="2 1"
      stroke-linecap="round"
    />
    <!-- Hand/gripper -->
    <circle
      cx="3.5"
      cy="9.5"
      r="0.4"
      fill="#FFD700"
    />
  </g>

  <!-- RIGHT ARM GROUP -->
  <g class="robot-arm robot-arm-right">
    <path
      d="M17 12 L20 10"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="2 1"
      stroke-linecap="round"
    />
    <!-- Hand/gripper -->
    <circle
      cx="20.5"
      cy="9.5"
      r="0.4"
      fill="#FFD700"
    />
  </g>

  <!-- LEGS GROUP (optional) -->
  <g class="robot-legs">
    <!-- Left leg -->
    <path
      d="M10 18 L10 21"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="3 1"
      stroke-linecap="round"
    />
    <!-- Left foot -->
    <path
      d="M9 21 L11 21"
      stroke="#FFD700"
      stroke-width="0.8"
      stroke-dasharray="1 1"
    />

    <!-- Right leg -->
    <path
      d="M14 18 L14 21"
      stroke="#FFD700"
      stroke-width="1"
      stroke-dasharray="3 1"
      stroke-linecap="round"
    />
    <!-- Right foot -->
    <path
      d="M13 21 L15 21"
      stroke="#FFD700"
      stroke-width="0.8"
      stroke-dasharray="1 1"
    />
  </g>
</svg>
```

---

## 6. POSE VARIATIONS

### 6.1 IDLE/BREATHING POSE

**Description**: Default state, subtle breathing animation, calm presence

```svg
<!-- Changes from base: None structurally -->
<!-- Animation makes body scale slightly -->
```

**Key Modifications**:
- Body: Subtle Y-scale breathing (0.98 - 1.02)
- Eyes: Occasional slow blink
- Antenna tip: Gentle pulse glow

---

### 6.2 WAVING HELLO POSE

**Description**: Friendly greeting, right arm raised and waving

```svg
<g class="robot-arm robot-arm-right waving">
  <path
    d="M17 12 L19 8 L21 6"
    stroke="#FFD700"
    stroke-width="1"
    stroke-dasharray="2 1"
    stroke-linecap="round"
  />
  <circle
    cx="21.5"
    cy="5.5"
    r="0.4"
    fill="#FFD700"
  />
</g>
```

**Key Modifications**:
- Right arm: Path changed to upward wave position
- Arm animates with rotation oscillation
- Head tilts slightly toward raised arm
- Eyes happy expression (slightly curved)

---

### 6.3 SLEEPING/RESTING POSE (Lying Down)

**Description**: Robot lying on its side, peaceful sleep

```svg
<svg viewBox="0 0 32 24">
  <!-- Entire robot rotated 90 degrees, positioned horizontally -->
  <g transform="rotate(-90, 16, 12) translate(4, 0)">
    <!-- Include all robot parts -->

    <!-- Eyes replaced with sleeping eyes -->
    <g class="robot-eyes sleeping">
      <!-- Left eye - closed line -->
      <path
        d="M10 6.5 L11 6.5"
        stroke="#FFD700"
        stroke-width="0.8"
        stroke-linecap="round"
      />
      <!-- Right eye - closed line -->
      <path
        d="M13 6.5 L14 6.5"
        stroke="#FFD700"
        stroke-width="0.8"
        stroke-linecap="round"
      />
    </g>
  </g>

  <!-- ZZZ floating text -->
  <g class="sleep-zzz" fill="#FFD700" font-size="2.5" opacity="0.6">
    <text x="22" y="6">Z</text>
    <text x="24" y="4" font-size="2">z</text>
    <text x="25.5" y="2.5" font-size="1.5">z</text>
  </g>
</svg>
```

**Key Modifications**:
- Entire robot group rotated -90 degrees
- ViewBox extended to 32x24 for horizontal layout
- Eyes replaced with horizontal lines (---)
- Arms relaxed downward
- ZZZ text animated floating upward
- Slower breathing animation

---

### 6.4 THINKING POSE

**Description**: Looking up-right, contemplative, antenna active

```svg
<!-- Head tilt modification -->
<g class="robot-head" transform="rotate(-8, 12, 7)">
  <!-- Head structure same as base -->

  <!-- Eyes looking up-right -->
  <g class="robot-eyes thinking">
    <circle cx="10.8" cy="6.2" r="0.7" fill="#FFD700"/>
    <circle cx="13.8" cy="6.2" r="0.7" fill="#FFD700"/>
  </g>
</g>

<!-- Thought bubbles -->
<g class="thought-bubbles" fill="#FFD700" opacity="0.5">
  <circle cx="16" cy="3" r="0.4"/>
  <circle cx="18" cy="2" r="0.6"/>
  <circle cx="20.5" cy="1" r="0.9"/>
</g>
```

**Key Modifications**:
- Head tilted 8 degrees counter-clockwise
- Eyes pupil positions shifted up and right
- One arm touching chin area
- Thought bubbles appearing and fading
- Antenna with increased pulse rate

---

### 6.5 CELEBRATING/EXCITED POSE

**Description**: Both arms up, bouncing, sparkles around

```svg
<!-- Both arms raised high -->
<g class="robot-arm robot-arm-left celebrating">
  <path
    d="M7 12 L4 7 L3 4"
    stroke="#FFD700"
    stroke-width="1"
    stroke-dasharray="2 1"
    stroke-linecap="round"
  />
  <circle cx="2.5" cy="3.5" r="0.4" fill="#FFD700"/>
</g>

<g class="robot-arm robot-arm-right celebrating">
  <path
    d="M17 12 L20 7 L21 4"
    stroke="#FFD700"
    stroke-width="1"
    stroke-dasharray="2 1"
    stroke-linecap="round"
  />
  <circle cx="21.5" cy="3.5" r="0.4" fill="#FFD700"/>
</g>

<!-- Sparkle effects around robot -->
<g class="celebration-sparkles">
  <path d="M2 8 L3 7 L2 6 L1 7 Z" fill="#FFD700" class="sparkle s1"/>
  <path d="M22 8 L23 7 L22 6 L21 7 Z" fill="#FFD700" class="sparkle s2"/>
  <path d="M5 2 L6 1 L5 0 L4 1 Z" fill="#FFD700" class="sparkle s3"/>
  <path d="M19 2 L20 1 L19 0 L18 1 Z" fill="#FFD700" class="sparkle s4"/>
</g>

<!-- Happy eyes - curved arcs -->
<g class="robot-eyes happy">
  <path
    d="M10 6 Q10.5 7 11 6"
    stroke="#FFD700"
    stroke-width="0.8"
    fill="none"
  />
  <path
    d="M13 6 Q13.5 7 14 6"
    stroke="#FFD700"
    stroke-width="0.8"
    fill="none"
  />
</g>
```

**Key Modifications**:
- Both arms raised in V-shape
- Happy arc eyes (^_^)
- Body bouncing up/down animation
- 4+ sparkle stars animating around robot
- Antenna rapid wiggle
- Optional confetti particles

---

### 6.6 PEEKING POSE (Partially Visible)

**Description**: Only head and one arm visible, peeking from edge/corner

```svg
<svg viewBox="0 0 24 24">
  <!-- Clipping mask for partial visibility -->
  <defs>
    <clipPath id="peekClip">
      <rect x="0" y="0" width="24" height="24"/>
    </clipPath>
  </defs>

  <!-- Robot positioned to peek from bottom-right -->
  <g transform="translate(8, 12)" clip-path="url(#peekClip)">
    <!-- Only head visible -->
    <g class="robot-head">
      <rect
        x="9" y="4"
        width="6" height="5.5"
        rx="1.5"
        stroke="#FFD700"
        stroke-width="1"
        stroke-dasharray="2 1"
        fill="none"
      />

      <!-- Curious eyes - one bigger -->
      <g class="robot-eyes curious">
        <circle cx="10.5" cy="6.5" r="0.6" fill="#FFD700"/>
        <circle cx="13.5" cy="6.5" r="0.8" fill="#FFD700"/>
      </g>
    </g>

    <!-- Antenna -->
    <g class="robot-antenna">
      <path d="M12 4 L12 2" stroke="#FFD700" stroke-width="0.8" stroke-dasharray="1 1"/>
      <circle cx="12" cy="1.5" r="0.6" fill="#FFD700"/>
    </g>

    <!-- One hand waving from edge -->
    <g class="robot-arm robot-arm-right">
      <path d="M15 7 L18 5" stroke="#FFD700" stroke-width="1" stroke-dasharray="2 1"/>
      <circle cx="18.5" cy="4.5" r="0.4" fill="#FFD700"/>
    </g>
  </g>
</svg>
```

**Key Modifications**:
- Robot positioned off-canvas, only partial visibility
- Head and one arm/hand visible
- Curious expression (one eye slightly larger)
- Slight head tilt toward viewer
- Can peek from any edge (top, bottom, left, right, corners)

---

## 7. EXPRESSION SYSTEM

### 7.1 Eye Shape Definitions

```svg
<!-- NEUTRAL EYES -->
<g class="eyes-neutral">
  <circle cx="10.5" cy="6.5" r="0.7" fill="#FFD700"/>
  <circle cx="13.5" cy="6.5" r="0.7" fill="#FFD700"/>
</g>

<!-- HAPPY EYES (curved arcs) -->
<g class="eyes-happy">
  <path d="M10 6.3 Q10.5 7.2 11 6.3" stroke="#FFD700" stroke-width="0.8" fill="none"/>
  <path d="M13 6.3 Q13.5 7.2 14 6.3" stroke="#FFD700" stroke-width="0.8" fill="none"/>
</g>

<!-- SLEEPY EYES (half closed) -->
<g class="eyes-sleepy">
  <ellipse cx="10.5" cy="6.5" rx="0.7" ry="0.3" fill="#FFD700" opacity="0.7"/>
  <ellipse cx="13.5" cy="6.5" rx="0.7" ry="0.3" fill="#FFD700" opacity="0.7"/>
</g>

<!-- CLOSED EYES (sleeping) -->
<g class="eyes-closed">
  <path d="M10 6.5 L11 6.5" stroke="#FFD700" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M13 6.5 L14 6.5" stroke="#FFD700" stroke-width="0.8" stroke-linecap="round"/>
</g>

<!-- CURIOUS EYES (one larger) -->
<g class="eyes-curious">
  <circle cx="10.5" cy="6.5" r="0.6" fill="#FFD700"/>
  <circle cx="13.5" cy="6.5" r="0.9" fill="#FFD700"/>
</g>

<!-- EXCITED EYES (larger, brighter) -->
<g class="eyes-excited" filter="url(#pulseGlow)">
  <circle cx="10.5" cy="6.5" r="0.9" fill="#FFFFFF"/>
  <circle cx="10.5" cy="6.5" r="0.5" fill="#FFD700"/>
  <circle cx="13.5" cy="6.5" r="0.9" fill="#FFFFFF"/>
  <circle cx="13.5" cy="6.5" r="0.5" fill="#FFD700"/>
</g>

<!-- SURPRISED EYES (wide) -->
<g class="eyes-surprised">
  <circle cx="10.5" cy="6.5" r="1" fill="none" stroke="#FFD700" stroke-width="0.5"/>
  <circle cx="10.5" cy="6.5" r="0.4" fill="#FFD700"/>
  <circle cx="13.5" cy="6.5" r="1" fill="none" stroke="#FFD700" stroke-width="0.5"/>
  <circle cx="13.5" cy="6.5" r="0.4" fill="#FFD700"/>
</g>

<!-- LOOKING LEFT -->
<g class="eyes-look-left">
  <circle cx="10.2" cy="6.5" r="0.7" fill="#FFD700"/>
  <circle cx="13.2" cy="6.5" r="0.7" fill="#FFD700"/>
</g>

<!-- LOOKING RIGHT -->
<g class="eyes-look-right">
  <circle cx="10.8" cy="6.5" r="0.7" fill="#FFD700"/>
  <circle cx="13.8" cy="6.5" r="0.7" fill="#FFD700"/>
</g>

<!-- LOOKING UP -->
<g class="eyes-look-up">
  <circle cx="10.5" cy="6.2" r="0.7" fill="#FFD700"/>
  <circle cx="13.5" cy="6.2" r="0.7" fill="#FFD700"/>
</g>
```

---

## 8. ANIMATION KEYFRAMES

### 8.1 CSS Keyframe Definitions

```css
/* ==================== BREATHING ANIMATION ==================== */
@keyframes robotBreathing {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.02);
  }
}

.robot-body {
  transform-origin: center bottom;
  animation: robotBreathing 3s ease-in-out infinite;
}

/* ==================== EYE BLINK ==================== */
@keyframes robotBlink {
  0%, 45%, 55%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.1);
  }
}

.robot-eye {
  transform-origin: center;
  animation: robotBlink 4s ease-in-out infinite;
  animation-delay: calc(var(--blink-delay, 0) * 1s);
}

/* ==================== ANTENNA GLOW PULSE ==================== */
@keyframes antennaPulse {
  0%, 100% {
    opacity: 0.8;
    filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.9));
  }
}

.antenna-tip {
  animation: antennaPulse 2s ease-in-out infinite;
}

/* ==================== ANTENNA WIGGLE ==================== */
@keyframes antennaWiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
}

.robot-antenna {
  transform-origin: 12px 4px;
  animation: antennaWiggle 2s ease-in-out infinite;
}

/* ==================== ARM WAVE ==================== */
@keyframes armWave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  75% {
    transform: rotate(20deg);
  }
}

.robot-arm-right.waving {
  transform-origin: 17px 12px;
  animation: armWave 0.6s ease-in-out infinite;
}

/* ==================== BODY BOUNCE (Excited) ==================== */
@keyframes robotBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.celebrating .robot-body,
.excited .robot-body {
  animation: robotBounce 0.3s ease-in-out infinite;
}

/* ==================== HEAD TILT ==================== */
@keyframes headTilt {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-5deg);
  }
}

.curious .robot-head {
  transform-origin: center bottom;
  animation: headTilt 3s ease-in-out infinite;
}

/* ==================== SPARKLE ==================== */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  animation: sparkle 0.8s ease-in-out infinite;
}
.sparkle.s1 { animation-delay: 0s; }
.sparkle.s2 { animation-delay: 0.2s; }
.sparkle.s3 { animation-delay: 0.4s; }
.sparkle.s4 { animation-delay: 0.6s; }

/* ==================== FLOATING ZZZ ==================== */
@keyframes floatZzz {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.8);
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(1);
  }
}

.sleep-zzz text {
  animation: floatZzz 2s ease-in-out infinite;
}
.sleep-zzz text:nth-child(1) { animation-delay: 0s; }
.sleep-zzz text:nth-child(2) { animation-delay: 0.5s; }
.sleep-zzz text:nth-child(3) { animation-delay: 1s; }

/* ==================== THOUGHT BUBBLES ==================== */
@keyframes thoughtBubble {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  20%, 80% {
    opacity: 0.5;
    transform: scale(1);
  }
}

.thought-bubbles circle {
  animation: thoughtBubble 2.5s ease-in-out infinite;
}
.thought-bubbles circle:nth-child(1) { animation-delay: 0s; }
.thought-bubbles circle:nth-child(2) { animation-delay: 0.3s; }
.thought-bubbles circle:nth-child(3) { animation-delay: 0.6s; }

/* ==================== SLOW BREATHING (Sleeping) ==================== */
@keyframes slowBreathing {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.03);
  }
}

.sleeping .robot-body {
  animation: slowBreathing 5s ease-in-out infinite;
}
```

### 8.2 JavaScript Animation Timing

```javascript
const ANIMATION_TIMINGS = {
  // Idle state
  idle: {
    breathing: { duration: 3000, easing: 'ease-in-out' },
    blink: { duration: 4000, delay: [0, 2000, 4000], easing: 'ease-in-out' },
    antennaPulse: { duration: 2000, easing: 'ease-in-out' }
  },

  // Waving state
  waving: {
    armWave: { duration: 600, easing: 'ease-in-out', iterations: 3 },
    headTilt: { duration: 600, easing: 'ease-out' }
  },

  // Sleeping state
  sleeping: {
    breathing: { duration: 5000, easing: 'ease-in-out' },
    zzz: { duration: 2000, stagger: 500 }
  },

  // Thinking state
  thinking: {
    headTilt: { duration: 500, easing: 'ease-out' },
    antennaPulse: { duration: 1000, easing: 'ease-in-out' },
    thoughtBubbles: { duration: 2500, stagger: 300 }
  },

  // Celebrating state
  celebrating: {
    bounce: { duration: 300, easing: 'ease-in-out' },
    sparkles: { duration: 800, stagger: 200 },
    armsRaise: { duration: 400, easing: 'ease-out' }
  },

  // Peeking state
  peeking: {
    slideIn: { duration: 500, easing: 'ease-out' },
    curious: { duration: 300, easing: 'ease-in-out' }
  }
};
```

---

## 9. USAGE EXAMPLES

### 9.1 React Component Structure

```tsx
interface AgentiveRobotProps {
  pose?: 'idle' | 'waving' | 'sleeping' | 'thinking' | 'celebrating' | 'peeking';
  expression?: 'neutral' | 'happy' | 'sleepy' | 'curious' | 'excited' | 'surprised';
  size?: number;
  peekFrom?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-left';
  animated?: boolean;
  className?: string;
  ariaLabel?: string;
}

const AgentiveRobot: React.FC<AgentiveRobotProps> = ({
  pose = 'idle',
  expression = 'neutral',
  size = 80,
  peekFrom = 'bottom-right',
  animated = true,
  className = '',
  ariaLabel = 'Agentive AI Robot Assistant'
}) => {
  // Component implementation
};
```

### 9.2 Placement Guidelines

| Location | Pose | Purpose |
|----------|------|---------|
| Hero section corner | Waving | Welcome users |
| Loading states | Thinking | Processing feedback |
| Empty states | Curious/Peeking | Guide users |
| Success messages | Celebrating | Positive feedback |
| Footer | Sleeping | "Working 24/7" message |
| Card corners | Peeking | Decorative accent |
| Error states | Thinking | Problem solving |
| Chat interfaces | Idle/Waving | Companion presence |

---

## 10. ACCESSIBILITY CONSIDERATIONS

### 10.1 ARIA Labels

```html
<svg role="img" aria-label="Agentive AI Robot waving hello">
  <title>Agentive Robot Mascot</title>
  <desc>A friendly golden robot mascot with dashed-line wireframe style, currently waving</desc>
</svg>
```

### 10.2 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .agentive-robot * {
    animation: none !important;
    transition: none !important;
  }
}

html.reduced-motion .agentive-robot * {
  animation: none !important;
  transition: none !important;
}
```

### 10.3 High Contrast Mode

```css
html.high-contrast .agentive-robot {
  --robot-primary: #FFFF00;
  filter: drop-shadow(0 0 2px #FFFFFF);
}

html.high-contrast .agentive-robot path,
html.high-contrast .agentive-robot rect,
html.high-contrast .agentive-robot circle {
  stroke-width: 1.5;
}
```

---

## 11. IMPLEMENTATION CHECKLIST

- [ ] Base SVG structure with all parts grouped
- [ ] Idle/breathing animation
- [ ] Waving pose with arm animation
- [ ] Sleeping pose with ZZZ effect
- [ ] Thinking pose with thought bubbles
- [ ] Celebrating pose with sparkles
- [ ] Peeking pose for corners/edges
- [ ] All eye expressions implemented
- [ ] Antenna glow and wiggle animations
- [ ] Reduced motion support
- [ ] High contrast mode support
- [ ] ARIA labels and descriptions
- [ ] React component wrapper
- [ ] CSS animation keyframes
- [ ] Size/scale variants
- [ ] Placement positioning utilities

---

## 12. VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | Complete design specification |

---

**Document prepared for**: Agentive Development Team
**Visual style aligned with**: Existing NeuralBrainBackground.tsx golden dashed aesthetic
**Reference components**: GoldenDashedRobot.tsx (existing basic implementation)
