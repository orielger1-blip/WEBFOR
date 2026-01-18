// Volumetric Glow Fragment Shader
// Techniques: Fake volumetrics, multi-layer glow, energy field

precision highp float;

uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform float uIntensity;
uniform float uPulsePhase;

varying vec2 vUv;
varying float vDepth;

// Noise for organic variation
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

// FBM for complex noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 center = vUv - 0.5;
  float dist = length(center);
  float angle = atan(center.y, center.x);

  // Multiple glow layers for depth
  float glow1 = 1.0 - smoothstep(0.0, 0.5, dist); // Inner core
  float glow2 = 1.0 - smoothstep(0.1, 0.4, dist); // Mid glow
  float glow3 = 1.0 - smoothstep(0.2, 0.5, dist); // Outer glow

  // Exponential falloff for realistic light scatter
  glow1 = pow(glow1, 3.0);
  glow2 = pow(glow2, 2.0);
  glow3 = pow(glow3, 1.5);

  // Animated noise for organic feel
  float noiseVal = fbm(center * 4.0 + uTime * 0.3);
  float energyNoise = fbm(vec2(angle * 2.0, dist * 5.0 - uTime));

  // Pulsing effect
  float pulse = sin(uTime * 2.0 + uPulsePhase) * 0.3 + 0.7;
  float fastPulse = sin(uTime * 8.0) * 0.1 + 0.9;

  // Combine glows with noise modulation
  float combinedGlow = glow1 * 2.0 + glow2 * 1.0 + glow3 * 0.5;
  combinedGlow *= (1.0 + noiseVal * 0.3);
  combinedGlow *= pulse * fastPulse;

  // Energy tendrils
  float tendrils = sin(angle * 8.0 + uTime * 2.0) * 0.5 + 0.5;
  tendrils *= energyNoise;
  tendrils *= smoothstep(0.5, 0.2, dist);

  // Color gradient from center
  vec3 color = mix(uColorSecondary, uColorPrimary, dist * 2.0);
  color = mix(color, vec3(1.0), glow1 * 0.5); // White hot center

  // Add tendril color
  color += uColorPrimary * tendrils * 0.5;

  // Final intensity
  float intensity = combinedGlow * uIntensity;
  intensity += tendrils * 0.3;

  // Alpha falloff
  float alpha = smoothstep(0.5, 0.0, dist) * intensity;

  // HDR output for bloom
  gl_FragColor = vec4(color * intensity, alpha);
}
