function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth - 82, window.innerHeight);

  // Add a white background to the canvas
  background(255);

  // seems to be creating a secondary canvas with display: none. weird stuff
  graphic = createGraphics(window.innerWidth, window.innerHeight);
  graphic.background(255);
}

const paths = [];
let currentPath = [];

// let shapes = null;

let sqarOrigin = null;

let tool = 0;
const tools = document.querySelectorAll(".tool");

const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const opacity = document.getElementById("opacity");

let rgbaCol =
  "rgba(" +
  parseInt(colorInput.value.slice(-6, -4), 16) +
  "," +
  parseInt(colorInput.value.slice(-4, -2), 16) +
  "," +
  parseInt(colorInput.value.slice(-2), 16) +
  "," +
  opacity.value +
  ")";

// set current tool
for (var i = 0; i < tools.length; i++) {
  tools[i].onclick = (function(id) {
    return function() {
      setTool(id);
    };
  })(i);
}

function setTool(id) {
  tool = id;
  for (var i = 0; i < tools.length; i++) {
    tools[i].classList.remove("tool-selected");
    if (id === i) tools[i].classList.add("tool-selected");
  }
}

// highlight function to let you know what brush / shape you're currently using ~~~ ACTUALLY, this should be used primarily as a tool selector and THEN as a way to highlight that selection.
// defunct now because of setTool function.
function hiLite() {
  // toggle target active / inactive
  let target = event.target;
  console.log(target.id);
}

function draw() {
  // disable filling
  noFill();

  let rgbaCol =
    "rgba(" +
    parseInt(colorInput.value.slice(-6, -4), 16) +
    "," +
    parseInt(colorInput.value.slice(-4, -2), 16) +
    "," +
    parseInt(colorInput.value.slice(-2), 16) +
    "," +
    opacity.value +
    ")";

  if (mouseIsPressed) {
    // store mouse location and other information for brushes.
    if (tool === 0 || 1) {
      const point = {
        x: mouseX,
        y: mouseY,
        color: rgbaCol,
        weight: weight.value,
        toolId: tool
      };
      currentPath.push(point);
    }
    // square tool. Still screwy (for example, filling shapes drawn with brushes) but making progress. May have to rewrite.
    if (tool === 2) {
      if (sqarOrigin === null) {
        sqarOrigin = [mouseX, mouseY];
      } else {
        fill(rgbaCol);
        rect(
          sqarOrigin[0],
          sqarOrigin[1],
          mouseX - sqarOrigin[0],
          mouseY - sqarOrigin[1]
        );
        // very cool effect, but not what i'm looking for.
        // sqarOrigin = null;
      }
    }
  } else {
    onMouseQuit();
  }

  paths.forEach(path => {
    //create a vertex at the specified location
    beginShape();
    path.forEach(point => {
      stroke(point.color);
      strokeWeight(point.weight);
      //  different join methods for different brushes
      if (point.toolId === 0) {
        strokeCap(ROUND);
        strokeJoin(ROUND);
        vertex(point.x, point.y);
      }
      if (point.toolId === 1) {
        strokeCap(SQUARE);
        strokeJoin(MITER);
        square(point.x, point.y, point.weight);
      }
    });
    endShape();
  });
}

clear.addEventListener("click", () => {
  paths.splice(0);
  background(255);
});

function mousePressed() {
  sqarOrigin = null;
  currentPath = [];
  paths.push(currentPath);
}

function onMouseQuit() {
  if (sqarOrigin != null) {
    graphic.fill(rgbaCol);
    graphic.rect(
      sqarOrigin[0],
      sqarOrigin[1],
      mouseX - sqarOrigin[0],
      mouseY - sqarOrigin[1]
    );
    sqarOrigin = null;
  }
}
