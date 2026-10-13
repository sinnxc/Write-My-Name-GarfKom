function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        -0.92, -0.60, 0.0,  -0.68, -0.60, 0.0,  -0.55,  0.60, 0.0,
        -0.92, -0.60, 0.0,  -0.55,  0.60, 0.0,  -0.72,  0.60, 0.0,

        -0.42, -0.60, 0.0,  -0.18, -0.60, 0.0,  -0.38,  0.60, 0.0,
        -0.42, -0.60, 0.0,  -0.38,  0.60, 0.0,  -0.55,  0.60, 0.0,

        -0.72,  0.60, 0.0,  -0.38,  0.60, 0.0,  -0.38,  0.44, 0.0,
        -0.72,  0.60, 0.0,  -0.38,  0.44, 0.0,  -0.72,  0.44, 0.0,

        -0.76, -0.08, 0.0,  -0.34, -0.08, 0.0,  -0.34, -0.28, 0.0,
        -0.76, -0.08, 0.0,  -0.34, -0.28, 0.0,  -0.76, -0.28, 0.0,

        0.08, -0.60, 0.0,   0.30, -0.60, 0.0,   0.30,  0.62, 0.0,
        0.08, -0.60, 0.0,   0.30,  0.62, 0.0,   0.08,  0.62, 0.0,

        0.26, -0.04, 0.0,   0.88,  0.62, 0.0,   0.68,  0.62, 0.0,
        0.26, -0.04, 0.0,   0.68,  0.62, 0.0,   0.26,  0.18, 0.0,

        0.26, -0.18, 0.0,   0.68, -0.60, 0.0,   0.88, -0.60, 0.0,
        0.26, -0.18, 0.0,   0.88, -0.60, 0.0,   0.26,  0.04, 0.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderCode = `
        attribute vec3 aPosition;
        varying vec2 vPosition;
        void main(){
            vPosition = aPosition.xy;
            gl_Position = vec4(aPosition, 1.0);
        }`;

    var fragmentShaderCode = `
        precision mediump float;
        varying vec2 vPosition;
        void main(){
            float tY = clamp((vPosition.y + 0.6) / 1.35, 0.0, 1.0);
            float tX = clamp((vPosition.x + 0.85) / 1.75, 0.0, 1.0);

            vec3 colorBottom = vec3(1.00, 0.00, 0.00); // Merah
            vec3 colorTop    = vec3(0.00, 0.00, 1.00); // Biru

            float t = clamp(tY * 0.8 + tX * 0.2, 0.0, 1.0);
            vec3 finalColor = mix(colorBottom, colorTop, t);

            gl_FragColor = vec4(finalColor, 1.0);
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

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
}