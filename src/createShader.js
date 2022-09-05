export const createShader = (gl, SHADER_CONSTANT, source) => {
  const shader = gl.createShader(SHADER_CONSTANT);
  if (!shader) {
    throw new Error("シェーダーの作成に失敗しました。");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`シェーダーのコンパイルでエラーが発生しました: ${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
};
