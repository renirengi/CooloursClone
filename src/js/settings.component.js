import { SettingsService } from "./settings.service";

export class SettingsComponent extends HTMLElement {
    constructor() {
      super();
      this.shadowDom = this.attachShadow({ mode: 'open' });
      this.settings = SettingsService.getInstance();
    }

    connectedCallback() {
        const template = `
          <link href="../css/settings.component.css" rel="stylesheet" type="text/css">
          <button class="show-modal"></button>
          <div class="modal settings-modal">
            <div class="modal-body">
              <button class="close-btn close-settings"></button>
              <form name="settingsForm">
                <p>Language / Язык<p>
    
                <label><input type="radio" name="language" value="eng"/>English / Английский</label>
                <label><input type="radio" name="language" value="rus"/>Russian / Русский</label>
    
                <p>Color's pallette / Цветовая палитра<p>
    
                <label><input type="radio" name="color" value="all"/>All colors</label>
                <label><input type="radio" name="color" value="red"/>Red colors</label>
                <label><input type="radio" name="color" value="pink"/>Pink colors</label>
                <label><input type="radio" name="color" value="purple"/>Purple colors</label>
                <label><input type="radio" name="color" value="blue"/>Blue colors</label>
                <label><input type="radio" name="color" value="teal"/>Teal colors</label>
                <label><input type="radio" name="color" value="green"/>Green colors</label>
                <label><input type="radio" name="color" value="yellow"/>Yellow colors</label>
                <label><input type="radio" name="color" value="orange"/>Orange colors</label>
                <label><input type="radio" name="color" value="brown"/>Brown colors</label>
                <label><input type="radio" name="color" value="white"/>White colors</label>
                <label><input type="radio" name="color" value="black"/>Black colors</label>
                <label><input type="radio" name="color" value="grey"/>Grey colors</label>
    
                <p>Hidden features / Скрытые параметры<p>

                <label><input type="checkbox" name="hidden" value="Hex"/>Hex</label>
                <label><input type="checkbox" name="hidden" value="RGB"/>RGB</label>
                <label><input type="checkbox" name="hidden" value="color_name"/>Color name</label>
              </form>
            </div>
          </div>
        `;
    
        this.shadowDom.innerHTML = template;
        this.modalElement = this.shadowDom.querySelector('.settings-modal');
        this.languageElements = this.shadowDom.querySelectorAll('input[name="language"]');
        this.palletteElements = this.shadowDom.querySelectorAll('input[name="color"]');
        this.hiddenElements = this.shadowDom.querySelectorAll('input[name="hidden"]');

        this.shadowDom.querySelector('.show-modal').addEventListener('click', () => this.#toggleModal());
        this.shadowDom.querySelector('.close-settings').addEventListener('click', () => this.#toggleModal());

        this.languageElements.forEach((el) => el.addEventListener('click', () => this.#saveLanguage()));
        this.palletteElements.forEach((el) => el.addEventListener('click', () => this.#saveColorPallette()));
        this.hiddenElements.forEach((el) => el.addEventListener('click', () => this.#saveListOfHiddenElements()));

        this.#loadSettings();
       

}

        #loadSettings() {
          this.languageElements.forEach((el) => (el.checked = el.value === this.settings.language));
          this.palletteElements.forEach((el) => (el.checked = el.value === this.settings.colorPallette));
          this.hiddenElements.forEach((el) => (el.checked = this.settings.listOfHiddenElements.includes(el.value)));
        };

        #toggleModal() {
          this.modalElement.classList.toggle('displayed');
      
          if (!this.modalElement.classList.contains('displayed')) {
            location.replace(location.href.split('#')[0]);
          }
        }

        #saveLanguage() {
          this.settings.language = this.shadowDom.querySelector('input[name="language"]:checked').value;
        }
      
        #saveColorPallette() {
          this.settings.colorPallette = this.shadowDom.querySelector('input[name="color"]:checked').value;
        }
      
        #saveListOfHiddenElements() {
          this.settings.listOfHiddenElements = Array.from(this.hiddenElements).reduce((acc, el) => {
            if (el.checked) {
              acc.push(el.value);
            }
      
            return acc;
          }, []);
        }
}