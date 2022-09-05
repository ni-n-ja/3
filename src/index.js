"use strict";
import defaultVertexShader from "./shaders/default.vert";
import defaultFragmentShader from "./shaders/default.frag";
import { createShader } from "./createShader";

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, defaultVertexShader);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, defaultFragmentShader);
  const program = gl.createProgram();

  if (!program) {
    throw new Error("プログラムの作成に失敗しました。");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`シェーダーのリンクに失敗しました: ${gl.getProgramInfoLog(program)}`);
  }

  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [0, 1, 0.866, -0.5, -0.866, -0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const index = gl.getAttribLocation(program, "a_position");
  const size = 2;
  const type = gl.FLOAT;
  const normalized = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
  gl.enableVertexAttribArray(index);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
});
