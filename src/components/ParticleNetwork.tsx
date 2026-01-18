import { useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * Premium Particle Network
 * Stunning autonomous neural network visualization
 * Multi-layer depth, organic movement, glowing nodes
 */

// Simple noise function for organic movement
class SimplexNoise {
  private perm: number[] = [];

  constructor() {
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = x * x * (3 - 2 * x);
    const v = y * y * (3 - 2 * y);
    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;
    return this.lerp(
      this.lerp(this.grad(this.perm[A], x, y), this.grad(this.perm[B], x - 1, y), u),
      this.lerp(this.grad(this.perm[A + 1], x, y - 1), this.grad(this.perm[B + 1], x - 1, y - 1), u),
      v
    );
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  layer: number;
  pulsePhase: number;
  pulseSpeed: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  hue: number;
}

interface ParticleSprite {
  canvas: HTMLCanvasElement;
  size: number;
}

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise());
  const spritesRef = useRef<Map<string, ParticleSprite>>(new Map());
  const timeRef = useRef(0);

  // Premium configuration - Rich Starfield
  const config = useMemo(() => ({
    // Particle counts per layer (back to front) - 300 total stars
    layers: [
      { count: 120, speed: 0.05, size: [0.5, 1.2], opacity: 0.2, blur: 1 },   // Distant tiny stars
      { count: 80, speed: 0.08, size: [1, 2], opacity: 0.35, blur: 0 },       // Mid-distance
      { count: 60, speed: 0.12, size: [1.5, 2.5], opacity: 0.5, blur: 0 },    // Closer
      { count: 30, speed: 0.15, size: [2, 3.5], opacity: 0.7, blur: 0 },      // Near
      { count: 10, speed: 0.2, size: [3, 5], opacity: 0.9, blur: 0 },         // Bright foreground
    ],
    // Colors - sophisticated gold palette
    colors: {
      primary: { r: 245, g: 158, b: 11 },    // Gold
      secondary: { r: 251, g: 191, b: 36 },   // Light gold
      accent: { r: 217, g: 119, b: 6 },       // Deep gold
      line: { r: 245, g: 158, b: 11 },
    },
    // Connection settings - subtle for starfield
    connectionDistance: 80,
    lineOpacity: 0.04,
    lineWidth: 0.2,
    // Movement - slow and gentle
    noiseScale: 0.0005,
    noiseSpeed: 0.0002,
    driftStrength: 0.12,
    returnStrength: 0.0005,
    // Effects
    glowSize: 2.2,
    pulseAmount: 0.25,
  }), []);

  // Create pre-rendered particle sprite with glow
  const createParticleSprite = useCallback((
    radius: number,
    color: { r: number; g: number; b: number },
    opacity: number,
    blur: number
  ): ParticleSprite => {
    const padding = blur * 4 + radius * config.glowSize;
    const size = (radius + padding) * 2;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const centerX = size / 2;
    const centerY = size / 2;

    // Outer glow
    const glowRadius = radius * config.glowSize;
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, glowRadius
    );
    gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
    gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.5})`);
    gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.15})`);
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

    if (blur > 0) {
      ctx.filter = `blur(${blur}px)`;
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Core (brighter center)
    ctx.filter = 'none';
    const coreGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
    coreGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
    coreGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.5})`);

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    return { canvas, size };
  }, [config.glowSize]);

  // Initialize particles with even distribution
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];

    config.layers.forEach((layer, layerIndex) => {
      // Calculate grid for even distribution
      const count = layer.count;
      const cols = Math.ceil(Math.sqrt(count * (width / height)));
      const rows = Math.ceil(count / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Position within cell with some randomness (jitter)
        const jitterX = (Math.random() - 0.5) * cellWidth * 0.8;
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.8;
        const x = (col + 0.5) * cellWidth + jitterX;
        const y = (row + 0.5) * cellHeight + jitterY;

        const baseRadius = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          opacity: layer.opacity * (0.7 + Math.random() * 0.3),
          layer: layerIndex,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.5 + Math.random() * 0.5,
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
          hue: Math.random(),
        });
      }
    });

    // Sort by layer (back to front)
    particles.sort((a, b) => a.layer - b.layer);
    particlesRef.current = particles;

    // Pre-render sprites for each layer
    spritesRef.current.clear();
    config.layers.forEach((layer, index) => {
      const avgRadius = (layer.size[0] + layer.size[1]) / 2;
      const key = `layer-${index}`;
      spritesRef.current.set(
        key,
        createParticleSprite(avgRadius, config.colors.primary, layer.opacity, layer.blur)
      );
    });
  }, [config.layers, config.colors.primary, createParticleSprite]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const particles = particlesRef.current;
    const noise = noiseRef.current;

    timeRef.current += 1;
    const time = timeRef.current;

    // Clear with dark background
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update particles
    particles.forEach(p => {
      // Organic noise-based movement
      const noiseX = noise.noise2D(
        (p.x + p.noiseOffsetX) * config.noiseScale,
        time * config.noiseSpeed
      );
      const noiseY = noise.noise2D(
        (p.y + p.noiseOffsetY) * config.noiseScale,
        time * config.noiseSpeed + 100
      );

      const layerSpeed = config.layers[p.layer].speed;
      p.vx += noiseX * config.driftStrength * layerSpeed;
      p.vy += noiseY * config.driftStrength * layerSpeed;

      // Gentle return to origin
      p.vx += (p.originX - p.x) * config.returnStrength;
      p.vy += (p.originY - p.y) * config.returnStrength;

      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Soft boundaries
      if (p.x < -50) p.x = width + 50;
      if (p.x > width + 50) p.x = -50;
      if (p.y < -50) p.y = height + 50;
      if (p.y > height + 50) p.y = -50;

      // Breathing effect
      const pulse = Math.sin(time * 0.02 * p.pulseSpeed + p.pulsePhase);
      p.radius = p.baseRadius * (1 + pulse * config.pulseAmount * 0.1);
    });

    // Draw connection lines (only between same or adjacent layers)
    ctx.lineCap = 'round';

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];

        // Only connect particles in same or adjacent layers
        if (Math.abs(p1.layer - p2.layer) > 1) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
          const layerOpacity = Math.min(p1.opacity, p2.opacity);

          // Gradient line
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          const { r, g, b } = config.colors.line;
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * layerOpacity * 0.7})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * layerOpacity})`);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = config.lineWidth * (1 - distance / config.connectionDistance);
          ctx.stroke();
        }
      }
    }

    // Draw particles using pre-rendered sprites
    particles.forEach(p => {
      const sprite = spritesRef.current.get(`layer-${p.layer}`);
      if (!sprite) return;

      // Pulse opacity
      const pulse = Math.sin(timeRef.current * 0.02 * p.pulseSpeed + p.pulsePhase);
      const pulseOpacity = 0.85 + pulse * 0.15;

      ctx.globalAlpha = pulseOpacity;

      const scale = p.radius / ((config.layers[p.layer].size[0] + config.layers[p.layer].size[1]) / 2);
      const drawSize = sprite.size * scale;

      ctx.drawImage(
        sprite.canvas,
        p.x - drawSize / 2,
        p.y - drawSize / 2,
        drawSize,
        drawSize
      );
    });

    ctx.globalAlpha = 1;

    animationRef.current = requestAnimationFrame(animate);
  }, [config]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    initParticles(rect.width, rect.height);
  }, [initParticles]);

  useEffect(() => {
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleResize]);

  return (
    <div className="particle-network">
      <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} />
      <div className="particle-overlay" />
    </div>
  );
};

export default ParticleNetwork;
