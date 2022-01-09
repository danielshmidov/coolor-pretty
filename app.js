//global selections are variables
const colorDivs = document.querySelectorAll(".color");
const generateButton = document.querySelectorAll(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

//functions

//color generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    //check for luminence
    checkTextContrast(randomColor, hexText);
    //initialize colors sliders
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSlider(color, hue, saturation, brightness);
  });
}

function checkTextContrast(color, text) {
  const lumin = chroma(color).luminance();

  if (lumin > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function colorizeSlider(color, hue, saturation, brightness) {
  //scale saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  //update input colors
  saturation.style.backgroundImage = `linear-Gradient(to right,${scaleSat(0)}, ${scaleSat(1)})`;
}

randomColors();
