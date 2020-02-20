function setup() {
  // create a canvas which is full width and height
  createCanvas(window.innerWidth, window.innerHeight);

  // Add a white background to the canvas
  background(255);
  console.log("well something's working");
}

const path = [];

function draw() {
  // disable filling
  noFill();

  if (mouseIsPressed) {
    // store mouse location
    const point = {
      x: mouseX,
      y: mouseY
    };
    path.push(point);
  }

  beginShape();
  path.forEach(point => {
    //create a vertex at the specified location
    vertex(point.x, point.y);
  });
  endShape();
}
