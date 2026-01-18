// Neural Core Fragment Shader - ILM-grade materials and lighting
// Techniques: Fresnel rim glow, energy field, fake subsurface scattering

precision highp float;

uniform float uTime;
uniform float uPulsePhase;
uniform vec3 uColorPrimary;    // Gold accent
uniform vec3 uColorSecondary;  // Core blue/white
uniform vec3 uColorBackground; // Dark base
uniform float uEnergyLevel;
uniform sampler2D uNoiseTexture;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec2 vUv;

// Hash function for pseudo-random
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Value noise
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Energy field pattern
float energyField(vec3 pos, float time) {
  float pattern = 0.0;

  // Hexagonal grid pattern
  vec2 uv = pos.xy + pos.z * 0.5;
  uv *= 8.0;
  vec2 gv = fract(uv) - 0.5;
  float hex = length(gv);

  // Animated energy flow
  float flow = sin(pos.x * 5.0 + pos.y * 3.0 + pos.z * 4.0 - time * 2.0);
  flow += sin(pos.x * 3.0 - pos.y * 5.0 + time * 1.5) * 0.5;

  pattern = smoothstep(0.5, 0.3, hex) * (flow * 0.5 + 0.5);
  return pattern;
}

// Circuit pattern for tech look
float circuitPattern(vec2 uv, float time) {
  vec2 grid = fract(uv * 10.0);
  float line = 0.0;

  // Horizontal lines
  line += smoothstep(0.48, 0.5, grid.y) * smoothstep(0.52, 0.5, grid.y);
  // Vertical lines
  line += smoothstep(0.48, 0.5, grid.x) * smoothstep(0.52, 0.5, grid.x);

  // Animated pulse along lines
  float pulse = sin(uv.x * 20.0 + uv.y * 20.0 - time * 3.0) * 0.5 + 0.5;
  line *= pulse;

  return line * 0.3;
}

void main() {
  // Normalized view direction
  vec3 viewDir = normalize(vViewPosition);

  // Base color - dark with subtle gradient
  vec3 baseColor = uColorBackground;

  // Energy field contribution
  float energy = energyField(vWorldPosition, uTime);
  energy *= uEnergyLevel;

  // Fresnel rim glow - the "expensive" look
  float fresnel = vFresnel;
  fresnel = pow(fresnel, 1.5);

  // Pulsing rim intensity
  float rimPulse = sin(uTime * 2.0) * 0.3 + 0.7;
  float rim = fresnel * rimPulse;

  // Core glow based on displacement
  float coreGlow = smoothstep(0.0, 0.3, vDisplacement);
  coreGlow = pow(coreGlow, 2.0);

  // Color mixing
  vec3 rimColor = mix(uColorPrimary, uColorSecondary, sin(uTime * 0.5) * 0.3 + 0.5);
  vec3 coreColor = uColorSecondary * 1.5; // HDR for bloom

  // Fake subsurface scattering
  float sss = pow(1.0 - abs(dot(vNormal, viewDir)), 4.0);
  vec3 sssColor = uColorPrimary * sss * 0.5;

  // Circuit overlay for tech feel
  float circuit = circuitPattern(vUv, uTime);
  vec3 circuitColor = uColorPrimary * circuit;

  // Combine all layers
  vec3 finalColor = baseColor;
  finalColor += rimColor * rim * 1.5;           // Rim light
  finalColor += coreColor * coreGlow * 0.8;     // Core glow
  finalColor += sssColor;                        // Subsurface
  finalColor += circuitColor;                    // Circuit pattern
  finalColor += uColorPrimary * energy * 0.4;   // Energy field

  // Subtle noise for organic feel (film grain effect in material)
  float grain = vnoise(vUv * 500.0 + uTime * 10.0) * 0.02;
  finalColor += grain;

  // Alpha based on fresnel for edge softness
  float alpha = 0.7 + fresnel * 0.3;

  // HDR output for bloom
  gl_FragColor = vec4(finalColor, alpha);
}
