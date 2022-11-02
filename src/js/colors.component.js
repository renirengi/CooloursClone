import chroma from "chroma-js";
import { SettingsService } from './settings.service';
import { PreviousColorComponent } from './previousColor.component';

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

let colors;
export function initColors() {
    const settings = SettingsService.getInstance();
    const colorName = settings.colorPallette;
    const next = document.querySelector('.next');
    let colorsArr = [];

    window.addEventListener('load', () => {
        colorsArr = checkColor(colorName);
        setRandomColors(false, colorsArr, settings);
        settings.listOfLastColors=colors;
    });
    
    next.addEventListener ('click', (event) => {
        colorsArr = checkColor(colorName);
        setRandomColors(false, colorsArr, settings);
        settings.listOfLastColors=colors;
    });

    document.addEventListener ('keyup', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() == 'space') {
        colorsArr = checkColor(colorName);
        setRandomColors(false, colorsArr, settings);
        settings.listOfLastColors=colors;
    };
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
    return colorsArr
}

function setRandomColors(isInitial, colorsArr, settings) {
   /// console.log(colors);
    settings.lastColors = colors;
    colors = isInitial ? getColorsFromHash() : [];
    let color;
    
     cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const hex =  col.querySelector('.hex');
        const rgb = col.querySelector('.rgb');
        const button = col.querySelector('button');

        if (isLocked) {
            colors.push(hex.textContent);
            return
        }
        
        if (colorsArr.length > 0) {
            color = isInitial
            ? colors[index]
              ? colors[index]
              : arrayRandElement(colorsArr)
            : arrayRandElement(colorsArr)
        }
        else
        {
            color = isInitial
            ? colors[index]
              ? colors[index]
              : chroma.random()
            : chroma.random()
        }
        
        if (!isInitial) {
            colors.push(chroma(color).hex())
          }

        col.style.background = color;
      
        hex.textContent = color;
        rgb.textContent = chroma(color).rgb();
        setTextColor(hex, color);
        setTextColor(rgb, color);
        setTextColor(button, color);

        let name = col.querySelector('.name');
        let colorWithoutHash=color.toString().substring(1);
        getColorName(colorWithoutHash, name);
      });
      ///console.log (colors);
      return colors;
}

function arrayRandElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function getColorName(color, name) {

    fetch(`https://www.thecolorapi.com/id?hex=${color}`)
  .then(res => res.json())
  .then(data => {    
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