function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth, window.innerHeight);

  // Add a white background to the canvas
  background(255);
}

const paths = [];
let currentPath = [];

const shapes = [];
let currentShape = [];

let colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const opacity = document.getElementById("opacity");
const circ = document.getElementById("circ");

// highlight function to let you know what brush / shape you're currently using ~~~ ACTUALLY, this should be used primarily as a tool selector and THEN as a way to highlight that selection.
function hiLite() {
  console.log("Clicked me!");
  // let old = document.querySelectorAll(".selected");
  // console.log(old);
  let target = event.target;
  console.log("target: " + target);
  console.log("target.class: " + target.class);
  console.log("target.classlist: " + target.classList);
  target.classList.add("bingo");
  console.log("target.classList: " + target.classList);
  target.classList.remove("bingo");
  console.log("target.classList: " + target.classList);
  if (target.class === undefined) {
    target.class = "selected";
  } else if (target.class === "selected") {
    target.class = "unselected";
  } else if (target.class === "unselected") {
    target.class = "selected";
  }
  console.log(target.class);
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

  let rnd = document.getElementById("round");

  // not currently necessary because there are only two brushes being differentiated by radio checkboxes. Both this and the preceeding getElement
  let sqr = document.getElementById("square");

  if (mouseIsPressed) {
    // store mouse location
    const point = {
      x: mouseX,
      y: mouseY,
      color: rgbaCol,
      weight: weight.value,
      brush: rnd.checked
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
      // setAlpha(point.opacity);
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
