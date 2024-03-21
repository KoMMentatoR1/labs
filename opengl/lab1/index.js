const canvas = document.getElementById('gl')
const gl = canvas.getContext('webgl')

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 color;

    void main() {
    gl_FragColor = color;
    }
`;

// Компиляция вершинного и фрагментного шейдеров
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Создание программы шейдеров
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const squareVerticesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
let vertices = [
    -0.85, -0.8,
    0.85, -0.8,
    -0.85, 0.75,
    0.85, 0.75
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const colorLocation = gl.getUniformLocation(program, "color");
gl.uniform4fv(colorLocation, new Float32Array([0.0, 0.0, 0.0, 1.0]));

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.clearColor(0.7, 0.7, 0.7, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

gl.uniform4fv(colorLocation, new Float32Array([1.0, 0.0, 1.0, 1.0]));

vertices = [
    -0.75, -0.7, 
    0.75, -0.7,
    -0.75, 0.7,
    0.75, 0.7
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

gl.uniform4fv(colorLocation, new Float32Array([0.0, 1.0, 1.0, 1.0]));

vertices = [
    -0.45, -0.45, 
    0.45, -0.45,
    -0.45, 0.35,
    0.45, 0.35
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

gl.uniform4fv(colorLocation, new Float32Array([1.0, 1.0, 1.0, 1.0]));

vertices = [
    -0.15, -0.15,
    0.15, -0.15,
    -0.15, 0.15,
    0.15, 0.15
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


