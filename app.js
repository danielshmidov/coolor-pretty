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
  });
}

randomColors();
