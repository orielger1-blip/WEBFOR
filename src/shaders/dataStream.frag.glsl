// Data Stream Fragment Shader
// Techniques: Animated gradient, energy pulses

precision highp float;

uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;

varying float vProgress;
varying float vLineIndex;
varying float vIntensity;

void main() {
  // Color based on position along line
  vec3 color = mix(uColorSecondary, uColorPrimary, vProgress);

  // Brighten based on intensity
  color *= vIntensity * 1.5;

  // Add white highlights for "data packet" look
  float packet = sin((vProgress - uTime * 0.5) * 20.0 + vLineIndex * 2.0);
  packet = smoothstep(0.8, 1.0, packet);
  color += vec3(1.0) * packet * 0.5;

  // Alpha based on intensity
  float alpha = vIntensity * 0.8;

  gl_FragColor = vec4(color, alpha);
}
