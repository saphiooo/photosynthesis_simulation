// Photosynthesis Simulation
// Use this simulation to analyze the impact of color, light, and carbon dioxide on photosynthesis
// Implemented in p5.js by Sophia Wang
// January, 2025
// Originally implemented in Java OpenProcessing by Harish Palani and Jason Galbraith
// October, 2016
// Original image obtained with permission from:
// http://www.pro-shrimp.co.uk/2990-thickbox_default/egeria-densa-tropical-water-weed-dennerle.jpg

// Constants for Simulation: Don't change these!

const COLORLESS = "colorless"; 
const RED = "red"; 
const BLUE = "blue"; 
const GREEN = "green";
const BASECOLOR = "#003262";

const NATURALBLUE = "#40a4df30";
const FILTERRED = "#ff000030";
const FILTERBLUE = "#0000ff30";
const FILTERGREEN = "#00ff0030";

const HEADERSIZE = 20;
const SUBTEXTSIZE = 18;

const TIME = 30000;

/*
**************************************************************
**************************************************************
Change the numbers below to see how it changes the simulation!
**************************************************************
**************************************************************
*/

// This simulation allows you to change the color and intensity of light, and the amount of 
// carbon dioxide in the environment. Based on the values below, the plant will produce 
// different amounts of oxygen bubbles due to photosynthesis.

// Color of light: you can assign COLORLESS, RED, BLUE, or GREEN
let filterColor = RED;

// Strength of light: assign a value between 0 and 10
let light = -5;

// Amount of carbon dioxide: assign a value between 0 and 10
let co2 = -4; 

/*
****************************************************************
****************************************************************
Below here is the actual simulation. You probably shouldn't mess
with this section. Or at least, you should expect weird results.
****************************************************************
****************************************************************
*/

// VARIABLES
// setup
let runCount = 1;
let yValue = 120, yAdj = 20;
let containerSize = 420;
let cornerMargin = 10;
let isRunning = false;

// bubbles
let bubbles = [];
let numDots;
let currentDot = -1;
let countVisible = 0;

// time
let previousMillis = 0;
let prev = 0;
let interval = 7500;

// count
let count = 1;
let countdown = 30;

// plant
let waterweed;

// water colors
let filter;

// Bubbles class, which holds the data and drawing methods for bubbles
class Bubble {
  // create the initial values for the bubbles
  constructor () {
    this.x = floor(random(6, containerSize - 6));
    this.y = floor(random(0, 150)) + containerSize; 
    this.visible = false;
  }
  
  // draw a bubble
  drawBubble () {
    this.y += random(-2, -0.2);
    fill(255);
    ellipse(this.x, this.y, 4, 4);
  }
  
  // getters and setters
  // get y coordinate
  getY () { return this.y; }
  // get visibility
  isVisible () { return this.visible; }
  // set bubble to be visible
  setVisible() { this.visible = true; }
}


// SETUP
function setup() {
  createCanvas(800, 415);
  
  // filter
  if (filterColor == COLORLESS) { filter = NATURALBLUE; }
  else if (filterColor == RED) { filter = FILTERRED; }
  else if (filterColor == BLUE) { filter = FILTERBLUE; }
  else if (filterColor == GREEN) { filter = FILTERGREEN; }
   
  // bubbles
  numDots = calculateNumBubbles();
  isRunning = true;
  interval = (TIME / numDots);    
  runCount++;
  yValue += yAdj;  
  
  prev = millis();
  waterweed = loadImage("https://lh3.googleusercontent.com/aWky8AF9eeoQcP-noIJlX14DQ-63EWygWPV4j3HVsLTmOaLKrZTmqYzoiF1JGm9jCCAiSmyJD8Pc1i4f60QTh437jmuI1QBAyo4fuDAb69AMcXUj2ciwe20Z7uYb22bF0dU5FY_GME8ClAedfEQjB-WzkdexUAqu-l07S7xLF1M6i0U-0-fz7TXBaTMQaI7qvOog4z2HxPn2tgAu1-t5TMZvJB6VXuUtYFPnrn6P0yCqwuT8TzSyS0XGyu2Q9nobSKXQYZNq33ejghFHYJPPVCA6ZAlyGd5IzjAbnwoCO9687QnnTWOdeuDzo9heRnV4MPcI7gouBUJFUV6iwO7S9xgaB1mkLLBTF7JdXt3rbjfABkRxaVx4Eo7HGUItymcOtNees2tp7An3U1obuhOHq_RQmysrtZiFpZe4Qb7gVls7ahnLQb5veCXloB83jGglmty7V_pkI4vdDrXd6XpEEPyAPiogkgL7EXOCKI8vpp-9nXrdMJHmEJONy4ZtYlMHecy3t92o_ykYd0mIdt71gdmDznux291RUu3_Nm7RGPxZCGqRhJf4lL8wNRvW2sSqBSS8ifVV=w1366-h589-k");
}

// DRAWS THE SIMULATION
function draw() {
  let adjR = 30, adjD = 90;
  background(BASECOLOR);
  fill(0);
  
  drawBulb(680 + adjR, 60 + adjD, filter);
  
  // plant image
  stroke(BASECOLOR);
  strokeWeight(10);
  noFill(); 
  image(waterweed, 0, 0, containerSize, containerSize);  
  rect(0, 0, containerSize+1, containerSize+1, 3, 6, 12, 18);
  
  // labels
  fill(255);
  let y1 = 30+20+adjD, padding = 30;
  let y2 = y1+padding;
  let y3 = y1+(2*padding);
  let y4 = y1+(3*padding);
  
  textSize(SUBTEXTSIZE);
  text("CO", 435 + adjR, y1);
  text("\u00B2", 462 + adjR, y1+10);  
  text(":", 472 + adjR, y1);
  text("LIGHT:", 435 + adjR, y2);
  text("FILTER:", 435 + adjR, y3);
  text("BUBBLE COUNT:", 435 + adjR, y4);
  
  textSize(HEADERSIZE);
  text(str(co2), 484+adjR, y1);
  text(str(light), 501+adjR, y2);
  text(filterColor, 509+adjR, y3);
  text(str(countVisible), 587+adjR, y4);
  
  // light filter
  noStroke();
  fill(filter);  
  rect(0, 0, containerSize, containerSize, 0, 0, 12, 18);
  fill(NATURALBLUE);  
  rect(0, 0, containerSize, containerSize, 0, 0, 12, 18);
  
  if (isRunning) {
    noStroke();
    fill(255);
    
    if(((millis() - previousMillis) > interval) && (count < numDots)) {
      previousMillis = millis();
      let r = random(0.1, 1.1);
      for (let i = 0; i < r; i++) {
        append(bubbles, new Bubble());
        count++;
        if (count >= numDots) { break; }
      }
    }
    if (countdown < 0) { isRunning = false; }
  }
  
  for (let a of bubbles) {
    a.drawBubble();
    if (!a.isVisible() && a.getY() <= 415) { 
      a.setVisible();
      countVisible ++;
    }
  }
  
  let temp = int((TIME - (millis() - prev)) / 1000);
  if(temp >= 0) {
    countdown = temp;
  }
  textSize(42);
  fill(255);
  if (countdown < 10) { text(" " + countdown, 550 + adjR, 300 + adjD); }
  else { text(countdown, 550 + adjR, 300 + adjD); }
  textSize(12);
  let t = "seconds";
  if (countdown == 1) { t = "second"; }
  text(t, 610 + adjR, 285 + adjD);
  text("remaining", 610 + adjR, 300 + adjD);
  
  stroke(255);
  strokeWeight(1);
  noFill();
  rect(425 + adjR, adjD, 320, 165);
  line(615 + adjR, adjD, 615 + adjR, 165 + adjD);
}


// draw the light bulb
function drawBulb(centerX, centerY, c) {
  fill(c);
  stroke(35);
  strokeWeight(7);
  ellipse(centerX, centerY, 100, 100); 
  
  fill(35);    
  strokeWeight(1);
  rect(centerX - 25, centerY + 40, 50, 50);
}

//This is the data that is used in this simulation
function calculateNumBubbles() {
  // bad input
  if (co2 < 0) { co2 = 0; console.log("Sneaky of you.");}
  if (co2 > 10) { co2 = 10; console.log("Nice try."); }
  if (light < 0) { light = 0; console.log("Wow."); }
  if (light > 10) { light = 10; console.log("Too bright!"); }
  
  if (co2 == 0) { return 0; }
  if (light == 0) { return 0; }
  
  if (filterColor == COLORLESS) {  
    switch (light) {
      case 1:
        if (co2 == 1 || co2 == 2) { return 3 + int(random(-2, 2)); }
        return 4 + int(random(-2, 2));
      case 2:
        return 7 + int(random(-2, 3));
      case 3:
        if (co2 == 1) { return 6 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 5) { return 9 + int(random(-2, 2)); }
        return 11 + int(random(-2, 2));
      case 4:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        else if (2 <= co2&& co2 <= 5) { return 12 + int(random(-2, 2)); }
        return 14 + int(random(-2, 2));
      case 5:
        if (co2 == 1) { return 8 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 4) { return 15 + int(random(-2, 2)); }
        return 17 + int(random(-2, 2));
      case 6:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 4) { return 18 + int(random(-2, 2)); }
        return 20 + int(random(-2, 2));
      case 7:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 15 + int(random(-2, 2)); }
        else if (co2 == 3) { return 17 + int(random(-2, 2)); }
        else if (4 <= co2 && co2 <= 8) { return 21 + int(random(-2, 2)); }
        return 28 + int(random(-2, 2));
      case 8:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 15 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 4) { return 21 + int(random(-2, 2)); }
        else if (5 <= co2 && co2 <= 8) { return 24 + int(random(-2, 2)); }
        return 27 + int(random(-2, 2));
      case 9:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 16 + int(random(-2, 2)); }
        else if (co2 == 3) { return 21 + int(random(-2, 2)); }
        else if (4 <= co2 && c2 <= 6) { return 25 + int(random(-2, 2)); }
        return 30 + int(random(-2, 2));
      case 10:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 16 + int(random(-2, 2)); }
        else if (co2 == 3) { return 22 + int(random(-2, 2)); }
        else if (co2 == 4) { return 26 + int(random(-2, 2)); }
        return 32 + int(random(-2, 2));
    }
  } 
  else if (filterColor == RED) {  
    switch (light) {
      case 1:
        return 2 + int(random(-2, 2));
      case 2:
        if (1 <= co2 && co2 <= 3) { return 4 + int(random(-2, 2)); }
        return 5 + int(random(-2, 2));
      case 3:
        if (1 <= co2 && co2 <= 3) { return 5 + int(random(-2, 2)); }
        return 7 + int(random(-2, 2));
      case 4:
        if (1 <= co2 && co2 <= 3) { return 6 + int(random(-2, 2)); }
        return 8 + int(random(-2, 2));
      case 5:
        if (1 <= co2 && co2 <= 3) { return 8 + int(random(-2, 2)); }
        else if (4 <= co2 && co2 <= 6) { return 9 + int(random(-2, 2)); }
        return 10 + int(random(-2, 2));
      case 6:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 4) { return 11 + int(random(-2, 2)); }
        return 13 + int(random(-2, 2));
      case 7:
        if (co2 == 1) { return 8 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 5) { return 12 + int(random(-2, 2)); }
        return 15 + int(random(-2, 2));
      case 8:
        if (co2 == 0) { return 0; }
        else if (1 <= co2 && co2 <= 4) { return 14 + int(random(-2, 2)); }
        return 18 + int(random(-2, 2));
      case 9:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 12 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 4) { return 15 + int(random(-2, 2)); }
        return 18 + int(random(-2, 2));
      case 10:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        else if (co2 == 2) { return 14 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 5) { return 18 + int(random(-2, 2)); }
        return 22 + int(random(-2, 2));
    }
  }
  else if (filterColor == BLUE) {  
    switch (light) {
      case 1:
        return 3 + int(random(-2, 2));
      case 2:
        if (1 <= co2 && co2 <= 3) { return 5 + int(random(-2, 2)); }
        return 6 + int(random(-2, 2));
      case 3:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        return 9 + int(random(-2, 2));
      case 4:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        return 12 + int(random(-2, 2));
      case 5:
        if (co2 == 1) { return 7 + int(random(-2, 2)); }
        else if (co2 == 2) { return 11 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 6) { return 13 + int(random(-2, 2)); }
        return 14 + int(random(-2, 2));
      case 6:
        if (co2 == 1) { return 8 + int(random(-2, 2)); }
        else if (2 <= co2 && co2 <= 4) { return 13 + int(random(-2, 2)); }
        else if (5 <= co2 && co2 <= 7) { return 15 + int(random(-2, 2)); }
        return 18 + int(random(-2, 2));
      case 7:
        if (co2 == 1) { return 8 + int(random(-2, 2)); }
        else if (co2 == 2) { return 12 + int(random(-2, 2)); }
        else if (co2 == 3) { return 15 + int(random(-2, 2)); }
        else if (co2 == 4) { return 18 + int(random(-2, 2)); }
        return 20 + int(random(-2, 2));
      case 8:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 14 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 5) { return 16 + int(random(-2, 2)); }
        else if (6 <= co2 && co2 <= 7) { return 20 + int(random(-2, 2)); }
        return 22 + int(random(-2, 2));
      case 9:
        if (co2 == 1) { return 9 + int(random(-2, 2)); }
        else if (co2 == 2) { return 14 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 6) { return 19 + int(random(-2, 2)); }
        return 24 + int(random(-2, 2));
      case 10:
        if (co2 == 1) { return 8 + int(random(-2, 2)); }
        else if (co2 == 2) { return 16 + int(random(-2, 2)); }
        else if (co2 == 3) { return 19 + int(random(-2, 2)); }
        else if (4 <= co2 && co2 <= 6) { return 22 + int(random(-2, 2)); }
       return 27 + int(random(-2, 2));
    }
  }
  else if (filterColor == GREEN) {  
    switch (light) {
      case 1:
        return 1 + int(random(-2, 2));
      case 2:
        if (co2 < 5) { return 1 + int(random(-2, 2)); }
        return 2 + int(random(-2, 2));
      case 3:
        return 2 + int(random(-2, 2));
      case 4:
        return 3 + int(random(-2, 2));
      case 5:
        if (co2 < 5) { return 3 + int(random(-2, 2)); }
        return 4 + int(random(-2, 2));
      case 6:
        if (co2 < 5) { return 4 + int(random(-2, 2)); }
        return 5 + int(random(-2, 2));
      case 7:
        if (co2 < 3) { return 4 + int(random(-2, 2)); }
        else if (3 <= co2 && co2 <= 7) { return 5 + int(random(-2, 2)); }
        return 6 + int(random(-2, 2));
      case 8:
        return 6 + int(random(-2, 2));
      case 9:
        return 7 + int(random(-2, 2));
      case 10:
        return 8 + int(random(-2, 2));
    }
  }
  
  return -1;
}

