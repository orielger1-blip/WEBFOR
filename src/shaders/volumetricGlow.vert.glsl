// Volumetric Glow Vertex Shader
// Techniques: Billboarding, depth-based sizing

uniform float uTime;
uniform float uScale;

varying vec2 vUv;
varying float vDepth;

void main() {
  vUv = uv;

  // Billboard towards camera
  vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  mvPosition.xy += position.xy * uScale;

  vDepth = -mvPosition.z;

  gl_Position = projectionMatrix * mvPosition;
}
