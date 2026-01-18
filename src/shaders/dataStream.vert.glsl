// Data Stream Vertex Shader
// Techniques: Line animation, flow visualization

uniform float uTime;
uniform float uFlowSpeed;

attribute float aLineIndex;
attribute float aVertexProgress;

varying float vProgress;
varying float vLineIndex;
varying float vIntensity;

void main() {
  vProgress = aVertexProgress;
  vLineIndex = aLineIndex;

  // Animated flow along the line
  float flow = fract(aVertexProgress - uTime * uFlowSpeed + aLineIndex * 0.1);

  // Pulse intensity
  vIntensity = sin(flow * 3.14159) * 0.8 + 0.2;

  // Slight wave displacement
  vec3 pos = position;
  float wave = sin(aVertexProgress * 10.0 + uTime * 3.0 + aLineIndex) * 0.02;
  pos.y += wave;
  pos.x += wave * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
