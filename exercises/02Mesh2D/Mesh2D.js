import GLSLProgram  from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL, loadBinaryDataStreamFromURL } from "./../../lib/helper/http.js";
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"
import { TriangleMeshGL } from "./TriangleMeshGL.js"
import { Matrix3 } from "./Matrix3.js"

function Mesh2DApp() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  let mGlslProgram = null;
  let triangleMeshGL = null;

  async function setup() {
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(mCanvas, await loadDataFromURL(vertexShaderUrl), await loadDataFromURL(fragmentShaderUrl));

    // Load file.
    const streamReader = await loadBinaryDataStreamFromURL("../../data/lion.smm")
    const mesh = await SimpleMeshModelIO.load(streamReader);    

    triangleMeshGL = new TriangleMeshGL(gl, mesh);

    requestAnimationFrame(draw);
  }

  function draw() {
    resize();

    let backgroundColor = document.getElementById("backgroundColor").value;

    let translateX = document.getElementById("TranslateX").value;
    let translateY = document.getElementById("TranslateY").value;
    let scaleX = document.getElementById("ScaleX").value;
    let scaleY = document.getElementById("ScaleY").value;
    let rotation = document.getElementById("Rotation").value;
    // eigene Ratio
    let aspectX =  mCanvas.clientWidth;
    let aspectY =  mCanvas.clientHeight;
    
    let rB = parseInt(backgroundColor.substr(1,2),16)/256.0;
    let gB = parseInt(backgroundColor.substr(3,2),16)/256.0;
    let bB = parseInt(backgroundColor.substr(5,2),16)/256.0;

    // Lab 02, Aufgabe 3(b)
    let m1 = Matrix3.translation(translateX,translateY);
    let m2 = Matrix3.scaling(scaleX, scaleY);
    let m3 = Matrix3.rotation(rotation);
    let m4 = Matrix3.aspect(aspectX, aspectY);
    let m5 = Matrix3.multiply(m4, 
                               Matrix3.multiply(Matrix3.multiply(m2, m1),m3));

    const m_matrix = mGlslProgram.getUniformLocation("matrix_3");

    // Lab 02, Aufgabe 3(c)

    // Lab 02, Aufgabe 1(c)
    gl.clearColor(rB, gB, bB, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    mGlslProgram.use();
    // Lab 02, Aufgabe 1(b)
    triangleMeshGL.draw();
    // Lab 02, Aufgabe 3(b)
    gl.uniformMatrix3fv(m_matrix, true, m5)


    //Lab 03, Aufgabe 1(a)

    //triangleMeshGL.drawWireFrame();
  
   
    requestAnimationFrame(draw);
  }

  function resize() {
    let w = mCanvas.clientWidth;
    let h = mCanvas.clientHeight;

    if (mCanvas.width != w || mCanvas.height != h) 
    {
      mCanvas.width = w;
      mCanvas.height = h;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }
  setup();
}

async function main() {
  let t = new Mesh2DApp();
}

main();


