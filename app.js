const cols = document.querySelectorAll ('.col');

setRandomColors();

function generateRandomColor() {
    const hexCodes = '0123456789ABCDF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}

function setRandomColors() {
    cols.forEach (col => { 
        col.style.background = generateRandomColor();
    }
  )
}