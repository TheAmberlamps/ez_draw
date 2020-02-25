function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth, window.innerHeight);

  // Add a white background to the canvas
  background(255);
}

const paths = [];
let currentPath = [];

const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("clear");

function draw() {
  // disable filling
  noFill();

  let rnd = document.getElementById("round");

  let sqr = document.getElementById("square");

  if (mouseIsPressed) {
    // store mouse location
    const point = {
      x: mouseX,
      y: mouseY,
      color: colorInput.value,
      weight: weight.value,
      brush: rnd.checked
    };
    currentPath.push(point);
    console.log("Round: " + rnd.checked);
    console.log("Square: " + sqr.checked);
    console.log(point.brush);
  }

  paths.forEach(path => {
    //create a vertex at the specified location
    beginShape();
    path.forEach(point => {
      stroke(point.color);
      strokeWeight(point.weight);
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
