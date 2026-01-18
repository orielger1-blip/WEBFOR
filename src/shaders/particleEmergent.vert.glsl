// Emergent Particle System Vertex Shader
// Techniques: GPU-based flocking, curl noise, attractor fields

uniform float uTime;
uniform float uDeltaTime;
uniform vec3 uAttractorPosition;
uniform float uAttractorStrength;
uniform sampler2D uPositionTexture;
uniform sampler2D uVelocityTexture;

attribute vec3 aVelocity;
attribute float aPhase;
attribute float aSize;

varying float vLife;
varying float vSpeed;
varying vec3 vColor;

// Curl noise for smooth turbulent motion
vec3 curlNoise(vec3 p) {
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  float n = sin(p.x * 2.0 + uTime) * cos(p.y * 2.0 + uTime * 0.7);
  float n_dx = sin((p.x + e) * 2.0 + uTime) * cos(p.y * 2.0 + uTime * 0.7);
  float n_dy = sin(p.x * 2.0 + uTime) * cos((p.y + e) * 2.0 + uTime * 0.7);
  float n_dz = sin(p.x * 2.0 + uTime) * cos(p.y * 2.0 + uTime * 0.7) + e * p.z;

  vec3 curl;
  curl.x = (n_dy - n) / e - (n_dz - n) / e;
  curl.y = (n_dz - n) / e - (n_dx - n) / e;
  curl.z = (n_dx - n) / e - (n_dy - n) / e;

  return curl * 0.5;
}

void main() {
  // Animated position with curl noise
  float t = uTime * 0.3 + aPhase;

  vec3 pos = position;

  // Orbital motion around attractor
  float angle = t + aPhase * 6.28;
  float radius = 1.5 + sin(aPhase * 10.0 + uTime) * 0.5;
  float height = sin(t * 2.0 + aPhase * 3.14) * 0.8;

  // Base orbital position
  vec3 orbital = vec3(
    cos(angle) * radius,
    height,
    sin(angle) * radius
  );

  // Add curl noise turbulence
  vec3 turbulence = curlNoise(pos * 0.5 + uTime * 0.1) * 0.3;

  // Attractor influence
  vec3 toAttractor = uAttractorPosition - pos;
  float attractDist = length(toAttractor);
  vec3 attractForce = normalize(toAttractor) * uAttractorStrength / (attractDist * attractDist + 0.1);

  // Combine motions
  vec3 finalPos = orbital + turbulence;

  // Breathing animation for the swarm
  float breathe = sin(uTime * 0.5) * 0.1 + 1.0;
  finalPos *= breathe;

  // Calculate speed for color/size variation
  vSpeed = length(aVelocity) + length(turbulence) * 2.0;

  // Life cycle based on phase
  vLife = sin(t) * 0.5 + 0.5;

  // Size based on speed and life
  float size = aSize * (0.5 + vSpeed * 0.2) * (0.5 + vLife * 0.5);

  // Pass color variation
  vColor = vec3(0.96, 0.62, 0.04); // Base gold
  vColor = mix(vColor, vec3(1.0, 0.9, 0.7), vSpeed * 0.3); // Whiter when fast

  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * (300.0 / -mvPosition.z);
}
