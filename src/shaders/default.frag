// precision mediump float;

// uniform sampler2D texture;
// varying vec4 frag_color;
// varying vec2 coord2;

// void main() {
//     if (coord2.x * coord2.x - coord2.y > 0.0) {
//         discard;
//     }
//     gl_FragColor = frag_color;
// }

precision mediump float;
 
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1); // 赤紫
}