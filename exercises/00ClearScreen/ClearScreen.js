//@ts-check
function ClearScreen() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  async function setup() {
    requestAnimationFrame(draw);
  }


  function draw() {   
    // YOUR FIRST TASK!
      gl.clearColor(1.0, 1.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    requestAnimationFrame(draw);
  }

  setup();
}

async function main() {
  let t = new ClearScreen();
}

main();