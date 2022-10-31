import chroma from "chroma-js";
import './styles.scss';

import { SettingsService } from './js/settings.service';

import { SettingsComponent } from './js/settings.component.js';
import { initColors } from './js/colors.component.js';


const settings = SettingsService.getInstance();

window.customElements.define('app-settings', SettingsComponent);

initColors();




/*import { red } from '../assets/color.js';
import { pink } from '../assets/color.js';
import { purple } from '../assets/color.js';
import { blue } from '../assets/color.js';
import { teal } from '../assets/color.js';
import { green} from '../assets/color.js';
import { yellow } from '../assets/color.js';
import { orange } from '../assets/color.js';
import { brown } from '../assets/color.js';
import { white } from '../assets/color.js';
import { black} from '../assets/color.js';
import { grey } from '../assets/color.js';


const cols = document.querySelectorAll ('.col');
const colorButtons = document.querySelectorAll('.color');

let colorName = 'all';

colorButtons.forEach((el) => el.addEventListener('click', () => changeColors(el)))

document.addEventListener ('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() == 'space') {
        setRandomColors();
    }
});

document.addEventListener ('click', (event) => {
  const type = event.target.dataset.type;
  if (type == 'lock') {
   const node = event.target.tagName.toLowerCase() == 'i'
   ? event.target
   : event.target.children[0];

   node.classList.toggle('fa-lock-open');
   node.classList.toggle('fa-lock');
  }
  else if (type == "copy") {
    copyToClickboard(event.target.textContent);
  }

});

function changeColors(color) {
  colorButtons.forEach((el) => el.classList.remove('active'));
  color.classList.toggle('active');

  colorName = color.dataset.type;
  console.log (colorName);
  setRandomColors(false, colorName);
}


function setRandomColors(isInitial, colorName) {
  let colors;
  let color;
    //const colors = isInitial ? getColorsFromHash() : []
    if (colorName === 'all') {
      colors = [];
    }
    else if (colorName === 'red') {
      colors = red;
    }
    else if (colorName === 'pink') {
      colors = pink;
    }
    else if (colorName === 'purple') {
      colors = purple;
    }
    else if (colorName === 'blue') {
      colors = blue;
    }
    else if (teal) {
      colors = teal;
    }
    else if (green) {
      colors = green;
    }
    else if (yellow) {
      colors = yellow;
    }
    else if (orange) {
      colors = orange;
    }
    else if (brown) {
      colors = brown;
    }
    else if (white) {
      colors = white;
    }
    else if (black) {
      colors = black;
    }
    else if (grey) {
      colors = grey;
    }

    cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const text = col.querySelector('h2')
      const button = col.querySelector('button')

      if (isLocked) {
        colors.push(text.textContent)
        return
      }

      /*const color = isInitial
        ? colors[index]
          ? colors[index]
          : chroma.random()
        : chroma.random();




      if (!isInitial) {
        colors.push(color)
      }

      text.textContent = color
      col.style.background = color

      setTextColor(text, color)
      setTextColor(button, color)
    })

    ///updateColorsHash(colors)
  }


function setTextColor(text, color) {
    const lumin = chroma(color).luminance();
    text.style.color = lumin > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
 return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
 document.location.hash = colors.map ((col) => {
    return col.toString().substring(1)
 }).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
       return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }
    return [];
}

setRandomColors(false, colorName);*/