import { SettingsService } from './settings.service';

export class SettingsComponent extends HTMLElement {
  constructor() {
    super();
  //  this.shadowDom = this.attachShadow({ mode: 'open' });
    this.shadowDom = document.querySelector('app-settings');
    this.settings = SettingsService.getInstance();
  }

  connectedCallback() {
    const template = `
          <button class="show-modal">&#8801</button>
          <div class="modal settings-modal">
            <div class="modal-body">
              <button class="close-btn close-settings"></button>
              <div class="modal-content">
              <form name="settingsForm">
                <h3>Language</h3>
                <div class="radio-toolbar">
                <input type="radio" name="language" value="eng" id="radio1" checked/>
                <label for="radio1">English / Английский</label>
                <input type="radio" name="language" value="rus" id="radio2" checked/>
                <label for="radio2">Russian / Русский</label>
                </div>
                <h3>Color's pallette</h3>
                <div class="color-container">
                <label class="radio"><input type="radio" name="color" value="all"/><span></span>All colors</label>
                <label class="radio"><input type="radio" name="color" value="red"/><span></span>Red colors</label>
                <label class="radio"><input type="radio" name="color" value="pink"/><span></span>Pink colors</label>
                <label class="radio"><input type="radio" name="color" value="purple"/><span></span>Purple colors</label>
                <label class="radio"><input type="radio" name="color" value="blue"/><span></span>Blue colors</label>
                <label class="radio"><input type="radio" name="color" value="teal"/><span></span>Teal colors</label>
                <label class="radio"><input type="radio" name="color" value="green"/><span></span>Green colors</label>
                <label class="radio"><input type="radio" name="color" value="yellow"/><span></span>Yellow colors</label>
                <label class="radio"><input type="radio" name="color" value="orange"/><span></span>Orange colors</label>
                <label class="radio"><input type="radio" name="color" value="brown"/><span></span>Brown colors</label>
                <label class="radio"><input type="radio" name="color" value="white"/><span></span>White colors</label>
                <label class="radio"><input type="radio" name="color" value="black"/><span></span>Black colors</label>
                <label class="radio"><input type="radio" name="color" value="grey"/><span></span>Grey colors</label>
                </div>
                <h3>Hidden features</h3>
                <div class="checkbox-container">
                <label><input type="checkbox" name="hidden" value="Hex"/>Hex</label>
                <label><input type="checkbox" name="hidden" value="RGB"/>RGB</label>
                <label><input type="checkbox" name="hidden" value="color_name"/>Color name</label>
                </div>
              </form>
              </div>
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
  }

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
