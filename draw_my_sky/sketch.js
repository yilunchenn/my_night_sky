let colorArray = ["white", "yellow", "blue", "red"];
let sizeArray = [5, 10, 15, 20, 25, 30];
let colorIndex = 0;
let sizeIndex = 4;


function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  background("white");
  inputBox();
}

function keyPressed() {
  if (key=="ArrowLeft") {
    colorIndex = (colorIndex+3)%4;
  }
  if (key=="ArrowRight") {
    colorIndex = (colorIndex+1)%4;
  }
  if (key=="ArrowUp") {
    sizeIndex = (sizeIndex+1)%6;
  }
  if (key=="ArrowDown") {
    sizeIndex = (sizeIndex+5)%6;
  }
  if (key=="Delete") {
    fill('black');
    rect(0, 200, displayWidth, displayHeight-200);
  } 
  if (key=='s') {
    save(canvas, 'mySky.jpg');
  }
}

function mouseClicked() {
  if (mouseY>215 && mouseY<displayHeight && mouseX>0 && mouseX<displayWidth) {
    if (key!='e' && key!='a' && key!='l') {
      drawGradient(mouseX, mouseY);
    }
  }
}

function draw() {
  fill('black');
  rect(displayWidth-200, 90, 155, 90);
  drawGradient(displayWidth-120, 135);
  if (mouseY>215 && mouseY<displayHeight && mouseX>0 && mouseX<displayWidth && mouseIsPressed) {
    if (key=='e') {
      fill('black');
      ellipse(mouseX, mouseY, 30, 30);
    }
    if (key=='a') {
      atomColor = color(100, 50, 150);
      atomColor.setAlpha(10);
      fill(atomColor);
      noStroke();
      ellipse(mouseX, mouseY, 20, 20);
    }
    if (key=='l') {
      stroke(255);
      strokeWeight(0.3);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
}

function inputBox() {
  fill('black');
  text("Input Your Name", displayWidth-200, 40);
  let inputElem = createInput('');
  inputElem.input(onInput);
  inputElem.position(displayWidth-200, 50);
}

function onInput() {
  clear();
  textAlign(LEFT);
  textStyle(NORMAL);
  fill("black");
  text("Input Your Name", displayWidth-200, 40);
  fill("grey");
  text(this.value(), 50, 70);
  fill("black");
  rect(0, 200, displayWidth, displayHeight-200);
  rect(displayWidth-200, 100, 155, 90);
  writeTitle(20, 50);
  writeAuthor(20, 70);
  writeInstruction(20, 95);
}

function writeTitle(x, y) {
  fill("grey");
  textAlign(LEFT);
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(20);
  text("MY FAVORATE NIGHT SKY", x, y);
}

function writeAuthor(x, y) {
  fill("grey");
  textAlign(LEFT);
  textStyle(NORMAL);
  textFont('Helvetica');
  textSize(15);
  text('BY ', x, y);
}

function writeInstruction(x, y) {
  fill("gray");
  textAlign(LEFT);
  textStyle(ITALIC);
  textSize(15);
  text('Press LEFT and RIGHT keys to control color', x, y);
  text('Press UP and DOWN keys to control size', x, y + 15);
  text('Press DELETE to restart', x, y + 30);
  text('Press E to erase previous drawings', x, y + 45);
  text('Press A to draw atmosphere', x, y + 60);
  text('Press L to draw lines', x, y + 75);
  text('Press S to save image', x, y + 90);
}

function drawGradient(x, y, radius = sizeArray[sizeIndex]) {
  colorMode(RGB, 255);
  noStroke();
  ellipseMode(RADIUS);
  let ha = 0;
  let hb = 0;

  if (colorArray[colorIndex] == 'yellow') {
    for (let ra = radius; ra > radius / 2; ra--) {
      fill(ha, ha, 0);
      ellipse(x, y, ra, ra);
      ha += 255 / radius * 2;
    }
    for (let rb = radius / 2; rb > 0; rb--) {
      fill(255, 255, hb);
      ellipse(x, y, rb, rb);
      hb += 255 / radius * 2;
    }
  }

  if (colorArray[colorIndex] == 'white') {
    for (let r = radius; r > 0; r--) {
      fill(ha, ha, ha);
      ellipse(x, y, r, r);
      ha += 255 / radius;
    }
  }

  if (colorArray[colorIndex] == 'blue') {
    for (let ra = radius; ra > radius / 2; ra--) {
      fill(0, 0, ha);
      ellipse(x, y, ra, ra);
      ha += 255 / radius * 2;
    }
    for (let rb = radius / 2; rb > 0; rb--) {
      fill(hb, hb, 255);
      ellipse(x, y, rb, rb);
      hb += 255 / radius * 2;
    }
  }

  if (colorArray[colorIndex] == 'red') {
    for (let ra = radius; ra > radius / 2; ra--) {
      fill(ha, 0, 0);
      ellipse(x, y, ra, ra);
      ha += 255 / radius * 2;
    }
    for (let rb = radius / 2; rb > 0; rb--) {
      fill(255, hb, hb);
      ellipse(x, y, rb, rb);
      hb += 255 / radius * 2;
    }
  }
}