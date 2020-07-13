let colorArray = ['white', 'yellow', 'blue', 'red'];
let sizeArray = [15, 20, 25, 30, 40, 50, 60];
let colorIndex = 0;
let sizeIndex = 4;


function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  background('white');
  inputBox();
}

function keyPressed() {
  if (key=='ArrowLeft') {
    colorIndex = (colorIndex+3)%4;
  }
  if (key=='ArrowRight') {
    colorIndex = (colorIndex+1)%4;
  }
  if (key=='ArrowUp') {
    sizeIndex = (sizeIndex+1)%7;
  }
  if (key=='ArrowDown') {
    sizeIndex = (sizeIndex+6)%7;
  }
  if (key=='Delete') {
    fill('black');
    rect(0, 200, displayWidth, displayHeight-200);
  } 
  if (key=='9') {
    save(canvas, 'mySky.jpg');
    clear();
    fill('orange');
    rect(0, 0, displayWidth, displayHeight);
    writeQuote(displayWidth/2, displayHeight/2);
  }
}

function mouseClicked() {
  if (mouseY>250 && mouseY<displayHeight && mouseX>0 && mouseX<displayWidth) {
    if (key!='0' && key!='1' && key!='2') {
      drawGradient(mouseX, mouseY);
    }
  }
}

function draw() {
  fill('black');
  rect(displayWidth-200, 75, 155, 120);
  drawGradient(displayWidth-120, 135);
  if (mouseY>230 && mouseY<displayHeight && mouseX>0 && mouseX<displayWidth && mouseIsPressed) {
    if (key=='0') {
      fill('black');
      ellipse(mouseX, mouseY, 30, 30);
    }
    if (key=='1') {
      atomColor = color(100, 50, 150);
      atomColor.setAlpha(10);
      fill(atomColor);
      noStroke();
      ellipse(mouseX, mouseY, 20, 20);
    }
    if (key=='2') {
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
  fill('black');
  text('Input Your Name', displayWidth-200, 40);
  fill('grey');
  text(this.value(), 50, 70);
  fill('black');
  rect(0, 200, displayWidth, displayHeight-200);
  rect(displayWidth-200, 75, 155, 120);
  writeTitle(20, 50);
  writeAuthor(20, 70);
  writeInstruction(20, 95);
}

function writeTitle(x, y) {
  fill('grey');
  textAlign(LEFT);
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(20);
  text('MY FAVORATE NIGHT SKY', x, y);
}

function writeAuthor(x, y) {
  fill('grey');
  textAlign(LEFT);
  textStyle(NORMAL);
  textFont('Helvetica');
  textSize(15);
  text('BY ', x, y);
}

function writeQuote(x, y){
  fill('grey');
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(40);
  text('Sometimes I feel sad as I am losing this beautiful night sky,', x, y);
  text('because of the light pollution', x, y+45);
}
function writeInstruction(x, y) {
  fill("gray");
  textAlign(LEFT);
  textStyle(ITALIC);
  textSize(15);
  text('Press LEFT and RIGHT keys to control color', x, y);
  text('Press UP and DOWN keys to control size', x, y + 15);
  text('Press DELETE to restart', x, y + 30);
  text('Press 0 to erase previous drawings', x, y + 45);
  text('Press 1 to draw atmosphere', x, y + 60);
  text('Press 2 to draw lines', x, y + 75);
  text('Press 9 to save image', x, y + 90);
}

function drawGradient(x, y, radius = sizeArray[sizeIndex]) {
  colorMode(RGB, 255);
  noStroke();
  ellipseMode(RADIUS);
  let ha = 0;
  
  for (let ra=radius; ra>0; ra--) {
    if (colorArray[colorIndex]=='yellow') {
      colorStars = color(255, 255, ha);
    } else if (colorArray[colorIndex]=='blue') {
      colorStars = color(ha, ha, 255);
    } else if (colorArray[colorIndex]=='red') {
      colorStars = color(255, ha, ha);
    } else {
      colorStars = color(255, 255, 255);
    }
    colorStars.setAlpha(radius-ra);
    fill(colorStars);
    ellipse(x, y, ra, ra);
    ha += floor(255/radius);
  }
}