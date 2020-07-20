//set color, shape, size array;
let colorArray = ['blue', 'white', 'yellow', 'red'];
let atomArray = ['blue', 'purple', 'yellow', 'red']
let sizeArray = [15, 20, 25, 30, 40, 50, 60];
let colorIndex = 0;
let atomIndex = 0;
let sizeIndex = 0;

//set line start position;
let xPrev = 0;
let yPrev = 0;

//initialize author and quote variable;
let authorName;
let authorQuote;

//set object control;
let start = false;
let open = true;
let star = false;
let atmosphere = false;
let string = false;
let erase = false;
let quote = false;
let save = false;
let enterName = false;
let enterQuote = false;

//set up step;
function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  startSentence();
}

//draw step;
function draw() {
  //start button;
  if (mouseX > displayWidth/2-120 && mouseX < displayWidth/2+120 && 
      mouseY>displayHeight/2 && mouseY < displayHeight/2+100 && open==true) {
    cursor('pointer');
    if (mouseIsPressed) {
      startControl();
    }
  } else {
    cursor('default');
  }
  //background and botton set up;
  if (start == true) {
    open = false;
    fill('white');
    rect(0, 0, displayWidth, displayHeight)
    textAlign(LEFT);
    textStyle(NORMAL);
    fill('black');
    rect(0, 200, displayWidth, displayHeight - 200);
    rect(500, 60, 140, 130);
    writeTitle(20, 30);
    writeInstruction(20, 75);
    startSetup();
    icon();
    start=false;
  }
  //draw stars, atmosphere, and lines;
  if (star == true) {
    fill('black');
    rect(500, 60, 140, 130);
    drawGradient(570, 120);
  } else if (atmosphere == true) {
    fill('black');
    rect(500, 60, 140, 130);
    for (count=0; count<10; count++) {
      drawAtom(570, 120);
    }
  } else if (string == true) {
    fill('black');
    rect(500, 60, 140, 130);
    stroke(255);
    line(550, 125, 600, 125);
  }
  if (mouseY > 230 && mouseY < displayHeight && mouseX > 0 && mouseX < displayWidth) {
    if (mouseIsPressed) {
      if (atmosphere == true) {
        drawAtom(mouseX, mouseY);
      }
      if (string == true) {
        drawLine();
      }
      if (erase == true) {
        fill('black');
        noStroke();
        rect(500, 60, 140, 130);
        fill('black');
        ellipse(mouseX, mouseY, 30, 30);
      }
    }
  }
}

//helper function - write starting sentence and botton;
function startSentence() {
  fill('orange');
  rect(0, 0, displayWidth, displayHeight);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(40);
  fill('black');
  text('STARS ONLY SHINE IN THE DARKNESS', displayWidth/2, displayHeight/2-50);
  rect(displayWidth/2-120, displayHeight/2, 240, 100, 20, 20, 20, 20);
  fill('orange');
  textSize(20);
  fill('red');
  text("LET'S", displayWidth/2, displayHeight/2+20);
  text('TURN OFF THE LIGHT', displayWidth/2, displayHeight/2+50);
  text('JUST FOR A WHILE', displayWidth/2, displayHeight/2+80);
}

//helper function - create bottons to control element switch during drawing;
function startSetup() {
  fill('black');
  textAlign(RIGHT);
  textStyle(BOLD);
  textSize(20);
  text('Enter Your Name', displayWidth - 20, 30);
  let inputName = createInput('');
  inputName.input(onName);
  inputName.size(80, 20);
  inputName.position(displayWidth - 170, 50);
  let buttonEnterName = createButton('Enter');
  buttonEnterName.position(displayWidth - 70, 52);
  buttonEnterName.mousePressed(writeQuote)

  text('Enter Your Light Pollution Quote', displayWidth - 20, 120);
  let inputQuote = createInput('');
  inputQuote.input(onQuote);
  inputQuote.size(230, 20);
  inputQuote.position(displayWidth - 320, 140);
  let buttonEnterQuote = createButton('Enter');
  buttonEnterQuote.position(displayWidth - 70, 142);
  buttonEnterQuote.mousePressed(writeQuote);
}

//helper functions - control process;
function starControl() {
  atmosphere = false;
  string = false;
  erase = false;
  star = true;
}

function atomControl() {
  string = false;
  star = false;
  erase = false;
  atmosphere = true;
}

function lineControl() {
  atmosphere = false;
  star = false;
  erase = false;
  string = true;
}

function restartControl() {
  fill('black');
  rect(500, 60, 140, 130);
  star = false;
  atmosphere = false;
  string = false;
  quote = false;
  fill('black');
  rect(0, 200, displayWidth, displayHeight - 200);
}

function eraseControl() {
  star = false;
  atmosphere = false;
  string = false;
  erase = true;
}

function saveControl() {
  saveCanvas(canvas, 'mySky.jpg');
}

function startControl() {
  start = true;
}

//helper function - control keyboards;
function keyPressed() {
  if (key == 'ArrowUp') {
    sizeIndex = (sizeIndex + 1) % 7;
  }
  if (key == 'ArrowDown') {
    sizeIndex = (sizeIndex + 6) % 7;
  }
  if (star == true) {
    if (key == 'ArrowLeft') {
      colorIndex = (colorIndex + 3) % 4;
    }
    if (key == 'ArrowRight') {
      colorIndex = (colorIndex + 1) % 4;
    }
  } else if (atmosphere == true) {
    if (key == 'ArrowLeft') {
      atomIndex = (atomIndex + 3) % 4;
    }
    if (key == 'ArrowRight') {
      atomIndex = (atomIndex + 1) % 4;
    }
  }
}

//helper function - control mouse;
function mouseClicked() {
  if (star == true) {
    if (mouseY > 250 && mouseY < displayHeight && mouseX > 0 && mouseX < displayWidth) {
      drawGradient(mouseX, mouseY);
    }
  }
}

//helper function - store user inpout quote;
function onQuote() {
  fill('black');
  rect(0, 200, displayWidth, 50);
  authorQuote = this.value();
}

//helper function - control user input name;
function onName() {
  fill('black');
  rect(0, 200, displayWidth, 50);
  authorName = this.value();
}

//helper function - write title;
function writeTitle(x, y) {
  fill('grey');
  textAlign(LEFT);
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(20);
  text('DRAW YOUR NIGHT SKY', x, y);
}

//helper function - write auther;
function writeAuthor(x, y) {
  fill('white');
  noStroke();
  rect(20, 40, 200, 20);
  fill('grey');
  textAlign(LEFT);
  textStyle(NORMAL);
  textFont('Helvetica');
  textSize(15);
  text('BY ' + authorName, x, y);
}

//helper function - write quote;
function writeQuote() {
  fill('orange');
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(30);
  let currentYear = year();
  text('"' + authorQuote + '" (' + authorName + ', ' + currentYear + ')', 20, 230);
  writeAuthor(20, 50);
}

//helper function - write instruction;
function writeInstruction(x, y) {
  fill("gray");
  textAlign(LEFT);
  textStyle(ITALIC);
  textSize(15);
  text('Star & Atmosphere: press LEFT and RIGHT keys to control color', x, y);
  text('Star & Atmosphere: press UP and DOWN keys to control size', x, y + 15);
  text('Line: left click at start point and center click at right point', x, y + 30);
}

//helper function - create icons;
function icon() {
  buttonStar = createButton('Star');
  buttonStar.position(20, 130);
  buttonStar.mousePressed(starControl);

  bottonAtom = createButton('Atmostphere');
  bottonAtom.position(70, 130);
  bottonAtom.mousePressed(atomControl);

  bottonLine = createButton('Line');
  bottonLine.position(172, 130);
  bottonLine.mousePressed(lineControl);

  bottonRestart = createButton('Restart');
  bottonRestart.position(20, 160);
  bottonRestart.mousePressed(restartControl);

  bottonErase = createButton('Erase');
  bottonErase.position(90, 160);
  bottonErase.mousePressed(eraseControl);

  bottonSave = createButton('Save');
  bottonSave.position(152, 160);
  bottonSave.mousePressed(saveControl);
}

//helper function - generate objects;
function drawGradient(x, y, radius = sizeArray[sizeIndex]) {
  colorMode(RGB, 255);
  noStroke();
  ellipseMode(RADIUS);
  let ha = 0;

  for (let ra = radius; ra > 0; ra--) {
    if (colorArray[colorIndex] == 'yellow') {
      colorStars = color(255, 255, ha);
    } else if (colorArray[colorIndex] == 'blue') {
      colorStars = color(ha, ha, 255);
    } else if (colorArray[colorIndex] == 'red') {
      colorStars = color(255, ha, ha);
    } else {
      colorStars = color(255, 255, 255);
    }
    colorStars.setAlpha(radius - ra);
    fill(colorStars);
    ellipse(x, y, ra, ra);
    ha += floor(255 / radius);
  }
}

function drawAtom(x, y) {
  if (atomArray[atomIndex] == 'yellow') {
    atomColor = color(255, 255, 0);
  } else if (atomArray[atomIndex] == 'blue') {
    atomColor = color(0, 0, 255);
  } else if (atomArray[atomIndex] == 'red') {
    atomColor = color(255, 0, 0);
  } else {
    atomColor = color(100, 50, 150);
  }
  atomColor.setAlpha(10);
  fill(atomColor);
  noStroke();
  ellipse(x, y, sizeArray[sizeIndex], sizeArray[sizeIndex]);
}

function drawLine() {
  stroke(255);
  strokeWeight(0.3);
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      xPrev = mouseX;
      yPrev = mouseY;
    }
    if (mouseButton === CENTER) {
      line(xPrev, yPrev, mouseX, mouseY);
    }
  }
}