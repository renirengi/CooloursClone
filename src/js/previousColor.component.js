import { SettingsService } from './settings.service';

export class PreviousColorComponent extends HTMLElement {
  constructor() {
    super();
  this.shadowDom = document.querySelector('app-previous-color');
  this.settings = SettingsService.getInstance();
  }
  connectedCallback() {
    const template = `
        <div class = "previous-color-container">
         <div class = "previous-color"></div>
         <div class = "previous-color"></div>
         <div class = "previous-color"></div>
         <div class = "previous-color"></div>
         <div class = "previous-color"></div>
        </div> 
        `;

    this.shadowDom.innerHTML = template;
    this.colorsElements = this.shadowDom.querySelectorAll('.previous-color');
    this.#loadColorsSettings(); 
}

  #loadColorsSettings(){
    this.settings.listOfLastColors.forEach((color, index)=> this.colorsElements[index].style.background= color);
  }
}