import GLSLProgram from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL } from "./../../lib/helper/http.js";

function SimpleTriangle() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  let mGlslProgram = null;
  let vao = null;

  async function setup() {
    // 1. Create Mesh on the CPU
    // 1.1 Positions
    const positions = 
    [
      0.0, 1.0, 0.0, 1.0,     //Oben
      1.0, -1.0, 0.0, 1.0,    //Rechts unten
      -1.0, -1.0, 0.0, 1.0,   //Links unten
    ];
    // 1.2 Colors

    // 1.3 Index Buffer
    const indices = [0, 1, 2];
    // 2. Create & Bind Vertex Array on the GPU
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // 2.1 Create, bind and upload Vertex Positions to GPU
    const pb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // 2.2 Configure Vertex Position attribute
    const positionAttributeLocation = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    // 3. Create, bind and upload Index Buffer
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

    // 4. Create a Shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(
      mCanvas,
      await loadDataFromURL(vertexShaderUrl),
      await loadDataFromURL(fragmentShaderUrl)
    );

    requestAnimationFrame(draw);
  }

  function draw() {
    
    // 5. Clear screen (see 00ClearScreen)
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 6. Bind shader program
    mGlslProgram.use();
    // 7. Bind Vertex Array Object (see step 2)
    gl.bindVertexArray(vao);
    // 8. Draw triangle mesh.
    gl.drawElements(gl.TRIANGLES, 1, gl.UNSIGNED_INT, 1);

    requestAnimationFrame(draw);
  }

  setup();
}

async function main() {
  let t = new SimpleTriangle();
}

main();