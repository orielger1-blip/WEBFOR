// Neural Core Vertex Shader - ILM-grade displacement and animation
// Techniques: Fresnel prep, noise displacement, vertex animation

uniform float uTime;
uniform float uPulsePhase;
uniform float uBreathScale;
uniform vec3 uMouseWorld;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec2 vUv;

// Simplex 3D noise
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// FBM (Fractal Brownian Motion) for multi-octave noise
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  // Calculate world position for effects
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;

  // Multi-layer displacement
  float slowTime = uTime * 0.15;
  float fastTime = uTime * 0.4;

  // Primary displacement - large organic movement
  float noise1 = fbm(position * 1.5 + vec3(slowTime));

  // Secondary displacement - finer detail
  float noise2 = snoise(position * 4.0 + vec3(fastTime * 0.5)) * 0.3;

  // Tertiary displacement - micro detail (expensive but worth it)
  float noise3 = snoise(position * 8.0 - vec3(fastTime)) * 0.1;

  // Combine displacements with breathing animation
  float totalDisplacement = (noise1 + noise2 + noise3) * 0.15 * uBreathScale;

  // Pulse wave emanating from center
  float distFromCenter = length(position);
  float pulseWave = sin(distFromCenter * 3.0 - uPulsePhase * 6.0) * 0.5 + 0.5;
  pulseWave = pow(pulseWave, 3.0); // Sharpen the pulse
  totalDisplacement += pulseWave * 0.05;

  // Mouse interaction - subtle attraction
  vec3 toMouse = uMouseWorld - worldPos.xyz;
  float mouseDist = length(toMouse);
  float mouseInfluence = smoothstep(3.0, 0.5, mouseDist) * 0.1;

  // Apply displacement along normal
  vec3 displacedPosition = position + normal * totalDisplacement;
  displacedPosition += normalize(toMouse) * mouseInfluence;

  vDisplacement = totalDisplacement + pulseWave * 0.5;

  // View position for Fresnel calculation in fragment shader
  vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
  vViewPosition = -mvPosition.xyz;

  // Fresnel factor (for rim lighting)
  vec3 viewDir = normalize(vViewPosition);
  vFresnel = 1.0 - abs(dot(viewDir, vNormal));
  vFresnel = pow(vFresnel, 2.5);

  gl_Position = projectionMatrix * mvPosition;
}
