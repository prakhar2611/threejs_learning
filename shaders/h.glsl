uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float mixFactor;

void main() {
  // Sample both textures based on mixFactor
  vec3 color1 = texture2D(texture1, gl_PointCoord).rgb;
  vec3 color2 = texture2D(texture2, gl_PointCoord).rgb;
  vec3 finalColor = mix(color1, color2, mixFactor);
  gl_FragColor = vec4(finalColor, 1.0);
}