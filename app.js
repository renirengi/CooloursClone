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
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = chroma.random();

        col.style.background = color;
        text.textContent = color;

        setTextColor(text, color);
        setTextColor(button, color);
    }
  )
}

function setTextColor(text, color) {
    const lumin = chroma(color).luminance();
    text.style.color = lumin > 0.5 ? 'black' : 'white';
}