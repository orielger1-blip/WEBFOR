// Emergent Particle Fragment Shader
// Techniques: Soft particles, energy glow, additive blending prep

precision highp float;

uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;

varying float vLife;
varying float vSpeed;
varying vec3 vColor;

void main() {
  // Soft circular particle with glow falloff
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Soft edge
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

  // Core glow
  float core = 1.0 - smoothstep(0.0, 0.2, dist);
  core = pow(core, 2.0);

  // Outer glow
  float glow = 1.0 - smoothstep(0.2, 0.5, dist);
  glow = pow(glow, 1.5);

  // Color based on speed and life
  vec3 color = mix(uColorPrimary, uColorSecondary, vSpeed * 0.5);
  color = mix(color, vec3(1.0), core * 0.5); // White hot core

  // Pulse effect
  float pulse = sin(uTime * 3.0 + vLife * 6.28) * 0.2 + 0.8;

  // Final color with HDR values for bloom
  vec3 finalColor = color * (core * 2.0 + glow) * pulse;

  // Alpha modulated by life
  alpha *= vLife * 0.8 + 0.2;
  alpha *= pulse;

  // Discard fully transparent pixels
  if (alpha < 0.01) discard;

  gl_FragColor = vec4(finalColor, alpha);
}
