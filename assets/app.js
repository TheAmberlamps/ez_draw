function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth, window.innerHeight);

  // Add a white background to the canvas
  background(255);
}

const paths = [];
let currentPath = [];

let colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");
const opacity = document.getElementById("opacity");

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
        vertex(point.x, point.y);
      } else {
        // vertex(point.x, point.y);
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
