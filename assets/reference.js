// various value handlers

var lastPoint = null;
var graphic = null;

var squareOrigin = null;
var circleOrigin = null;

// mouse event

function draw() {
  background(255);
  image(graphic, 0, 0);

  if (tool == 0 || tool == 3) tool0Preview();

  if (mouseIsPressed) {
    if (
      !document.querySelector("#color-picker").classList.contains("open") &&
      !document.querySelector("#size-picker").classList.contains("open")
    )
      drawOnGraphic();
  } else {
    lastPoint = null;
    onMouseQuit();
  }
}

// draw functions

function drawOnGraphic() {
  if (lastPoint == null) lastPoint = [mouseX, mouseY];

  if (tool == 0) {
    graphic.noFill();
    graphic.stroke(drawColor);
    graphic.strokeWeight(radius);
    graphic.line(mouseX, mouseY, lastPoint[0], lastPoint[1]);
  }

  if (tool == 1) {
    if (squareOrigin == null) {
      squareOrigin = [mouseX, mouseY];
    } else {
      fill([drawColor[0], drawColor[1], drawColor[2], 122]);
      noStroke();
      rect(
        squareOrigin[0],
        squareOrigin[1],
        mouseX - squareOrigin[0],
        mouseY - squareOrigin[1]
      );
    }
  }
}
// ....

// as the name implies, mousequit function

function onMouseQuit() {
  if (squareOrigin != null) {
    graphic.fill(drawColor);
    graphic.noStroke();
    graphic.rect(
      squareOrigin[0],
      squareOrigin[1],
      mouseX - squareOrigin[0],
      mouseY - squareOrigin[1]
    );
    squareOrigin = null;
  }
  if (circleOrigin != null) {
    graphic.fill(drawColor);
    graphic.noStroke();
    let d = createVector(
      mouseX - circleOrigin[0],
      mouseY - circleOrigin[1]
    ).mag();
    graphic.ellipseMode(CENTER);
    graphic.ellipse(circleOrigin[0], circleOrigin[1], d * 2, d * 2);
    circleOrigin = null;
  }
}
