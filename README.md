# Photosynthesis Simulation
## About
Photosynthesis Simulation is a p5.js simulation modeling how the magnitude of light, the color of light, and the amount of carbon dioxide affect the rate of photosynthesis of an aquatic plant. 
The simulation can be found [here](https://editor.p5js.org/saphiooo/sketches/kZljxoxkQ). 

## How to Use
The variables for the simulation are editable in the code editor on the left; users are encouraged to interact with the code to use the simulation. Variables that can be edited include 
- Color of light (RED, BLUE, or GREEN).
- Strength of the light, relatively, from 0 (no light) to 10 (bright light).
- Amount of carbon dioxide, relatively, from 0 (no CO_2) to 10 (high amount of CO_2).
An example setup is,
```js
// Color of light: you can assign COLORLESS, RED, BLUE, or GREEN
let filterColor = RED;

// Strength of light: assign a value between 0 and 10
let light = 5;

// Amount of carbon dioxide: assign a value between 0 and 10
let co2 = 4; 
```

This simulation works best on computers, desktops, or tablets (landscape orientation), due to the structure of the user interface.

## Credits
This project was originally written for Processing by Harish Palani and [Jason Galbraith](https://github.com/jasongalbraith). 

It was rewritten for p5.js by [Sophia Wang](https://github.com/saphiooo).
