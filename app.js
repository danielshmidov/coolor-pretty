//global selections are variables
const colorDivs = document.querySelectorAll(".color");
const generateButton = document.querySelectorAll(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

//event listeners
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControl);
});
colorDivs.forEach((div, index) => {
  div.addEventListener("change", () => {
    updateTextUI(index);
  });
});

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
  //scale brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  //update input colors
  saturation.style.backgroundImage = `linear-Gradient(to right,${scaleSat(
    0
  )}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-Gradient(to right,${scaleBright(
    0
  )},${scaleBright(0.5)}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,75,204),rgb(204,75,204))`;
}

function hslControl(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-sat") ||
    e.target.getAttribute("data-hue");

  let slider = e.target.parentElement.querySelectorAll('input[type="range"]');
  const hue = slider[0];
  const brightness = slider[1];
  const saturation = slider[2];

  const bgColor = colorDivs[index].querySelector("h2").innerText;

  let color = chroma(bgColor)
    .set("hsl.s", saturation.value)
    .set("hsl.h", hue.value)
    .set("hsl.l", brightness.value);

  colorDivs[index].style.backgroundColor = color;
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll('.controls button');
  textHex.innerText = color.hex();
  checkTextContrast(color, textHex);
  for(icon of icons) {
    checkTextContrast(color, icon);
  }
  
}

randomColors();
