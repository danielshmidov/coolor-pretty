//global selections are variables 
const colorDivs = document.querySelectorAll('.color');
const generateButton = document.querySelectorAll('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');




//functions



//color generator
function generateHex() {
    const letters = ["#123456789ABCDEF"]
    let hash = '#'
    for (let i = 0; i <6; i++) {
        hash = hash + letters[math.floor(Math.random() * 16)];
    }
    return hash;
}

function randomColors() {
    
}