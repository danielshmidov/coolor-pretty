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
    console.log(hexText);

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    //check for luminence
    checkTextContrast(randomColor, hexText);
  });
}

function checkTextContrast (color, text) {
  const lumin = chroma(color).luminance();

  if (lumin > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

randomColors();
