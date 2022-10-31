import chroma from "chroma-js";
import { SettingsService } from './settings.service';

import { red } from '../assets/color.js';
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

export function initColors() {
    const settings = SettingsService.getInstance();
    const colorName = settings.colorPallette;

    window.addEventListener('load', () => checkColor(colorName));
    
    document.addEventListener ('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() == 'space') {
        checkColor(colorName);
    }
});
}

const cols = document.querySelectorAll ('.col');
const colorButtons = document.querySelectorAll('.hex');

colorButtons.forEach((el) => el.addEventListener('click', () => changeColors(el)))



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

function checkColor(colorName) {
    let colorsArr = [];
    if (colorName === 'red') {
        colorsArr = red;
    }
    else if (colorName === 'pink') {
        colorsArr = pink;
    }
    else if (colorName === 'purple') {
        colorsArr = purple;
    }
    else if (colorName === 'teal') {
        colorsArr = teal;
    }
    else if (colorName === 'blue') {
        colorsArr = blue;
    }
    else if (colorName === 'green') {
        colorsArr = green;
    }
    else if (colorName === 'yellow') {
        colorsArr = yellow;
    }
    else if (colorName === 'orange') {
        colorsArr = orange;
    }
    else if (colorName === 'brown') {
        colorsArr = brown;
    }
    else if (colorName === 'white') {
        colorsArr = white;
    }
    else if (colorName === 'black') {
        colorsArr = black;
    }
    else if (colorName === 'grey') {
        colorsArr = grey;
    }
    setRandomColors(colorsArr);
}

function setRandomColors(colorsArr) {
    let color;
    
     cols.forEach(col => {
        if (colorsArr.length > 0) {
        color = arrayRandElement(colorsArr);
        }
        else{
        color = chroma.random();
        }

        col.style.background = color;
        let hex =  col.querySelector('.hex');
        let rgb = col.querySelector('.rgb');

        hex.textContent = color;
        rgb.textContent = chroma(color).rgb();
        setTextColor(hex, color);
        setTextColor(rgb, color);

        let name = col.querySelector('.name');
        let colorWithoutHash=color.toString().substring(1);
        getColorName(colorWithoutHash, name);
      });
    
    
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    console.log(arr[rand])
    return arr[rand];
}

function getColorName(color, name) {

    fetch(`https://www.thecolorapi.com/id?hex=${color}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    name.textContent = data.name.value;
    setTextColor(name, color);
  })
  .catch(e => console.log(e.message))
    
}

function setTextColor(text, color) {
    const lumin = chroma(color).luminance();
    text.style.color = lumin > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
   }

function changeColors(color) {
    colorButtons.forEach((el) => el.classList.remove('active'));
    color.classList.toggle('active');
  
    let colorName = color.dataset.type;
    console.log (colorName);
    setRandomColors(colorName);
  }