import { SettingsService } from './settings.service';

export class PreviousColorComponent extends HTMLElement {
  constructor() {
    super();
  ///this.shadowDom = this.attachShadow({ mode: 'open' });
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
}
}