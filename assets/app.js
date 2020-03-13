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
let tools = document.querySelectorAll(".tool");

const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const opacity = document.getElementById("opacity");

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
    if (id == i) tools[i].classList.add("tool-selected");
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

  var rgbaCol =
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
    // busted square function. activeElement doesn't work here, going to have to use another method to identify active tool.
    // also review the scope, may well want to nest mouseIsPressed inside of conditionals.
    if (document.activeElement.id === "sqar") {
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
    // store mouse location
    const point = {
      x: mouseX,
      y: mouseY,
      color: rgbaCol,
      weight: weight.value
    };
    console.log(point.color);
    currentPath.push(point);
  }

  paths.forEach(path => {
    //create a vertex at the specified location
    beginShape();
    path.forEach(point => {
      stroke(point.color);
      strokeWeight(point.weight);
      if (point.brush === true) {
        strokeCap(ROUND);
        strokeJoin(ROUND);
        vertex(point.x, point.y);
      } else {
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
  currentPath = [];
  paths.push(currentPath);
}
