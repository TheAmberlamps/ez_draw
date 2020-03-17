function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth, window.innerHeight);

  // Add a white background to the canvas
  background(255);
}

const paths = [];
let currentPath = [];

let sqarOrigin = null;

let tool = 0;
const tools = document.querySelectorAll(".tool");

const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const opacity = document.getElementById("opacity");

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
    console.log(tool);
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

  // converts hex colour codes to RGBA
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
      console.log(point.color);
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
      }
    }
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
  // seriously consider moving sqarOrigin reset to the end of the square tool function.
  sqarOrigin = null;
  currentPath = [];
  paths.push(currentPath);
}
