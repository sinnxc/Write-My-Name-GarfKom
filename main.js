function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // 12 titik (6 pasang garis) untuk membentuk "A" dan "K"
    var vertices = [
        // Kaki kiri diagonal A
        -0.7, -0.6, 0.0,
        -0.45, 0.6, 0.0,

        // Kaki kanan diagonal A
        -0.45, 0.6, 0.0,
        -0.2, -0.6, 0.0,

        // Garis horizontal tengah A
        -0.575, 0.0, 0.0,
        -0.325, 0.0, 0.0,

        // Batang vertikal kiri K
        0.2, -0.6, 0.0,
        0.2,  0.6, 0.0,

        // Garis diagonal atas K
        0.2,  0.0, 0.0,
        0.7,  0.6, 0.0,

        // Garis diagonal bawah K
        0.2,  0.0, 0.0,
        0.7, -0.6, 0.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        void main(){
            gl_Position = vec4(aPosition, 1.0);
        }`;

    var fragmentShaderCode = `
        precision mediump float;
        uniform vec4 uColor;
        void main(){
            gl_FragColor = uColor;
        }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    var uColor = gl.getUniformLocation(program, "uColor");

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.lineWidth(5.0);

    // Menggambar Huruf "A" (warna biru)
    gl.uniform4f(uColor, 0.0, 0.0, 1.0, 1.0);
    gl.drawArrays(gl.LINES, 0, 6);

    // Menggambar Huruf "K" (warna merah)
    gl.uniform4f(uColor, 1.0, 0.0, 0.0, 1.0);
    gl.drawArrays(gl.LINES, 6, 6);
}