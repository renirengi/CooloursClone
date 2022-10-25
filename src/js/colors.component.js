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
    
}

const cols = document.querySelectorAll ('.col');

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
        col.querySelector('.hex').textContent = color;
        col.querySelector('.rgb').textContent = chroma(color).rgb();
        let name = col.querySelector('.name');
        let colorWithoutHash=color.toString().substring(1);
        console.log(colorWithoutHash)
        getColorName(colorWithoutHash, name);
      });
    
    
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function getColorName(color, name) {
    console.log (color)

    fetch(`https://www.thecolorapi.com/id?hex=${color}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    name.textContent = data.name.value
  })
  .catch(e => console.log(e.message))
    
}