const defaultSettings = {
    language: 'eng',
    colorPallette: 'all',
    listOfLastColors: ['#d83786', '#186a3c', '#74e4fc', '#bb6103', '#044143'],
    listOfHiddenElements: [],
    
  };
  
  const settingsName = 'settings';

  export class SettingsService {
    static service;
  
    constructor() {
      const storedSettings = localStorage.getItem(settingsName);
  
      this.settings = storedSettings ? JSON.parse(storedSettings) : defaultSettings;
      this.listOfHiddenCallbacks = [];
      this.listOfLastColorsCallbacks = [];
    }
  
    static getInstance() {
      if (!SettingsService.service) {
        SettingsService.service = new SettingsService();
      }
      return SettingsService.service;
    }
  
    addCallbackToListOfHiddenUpdates(callback) {
      this.listOfHiddenCallbacks.push(callback);
    }

    addCallbackToLastColors(callback) {
      this.lastColorsCallbacks.push(callback);
    }
  
    get language() {
      return this.settings.language;
    }
  
    set language(lang) {
      this.settings.language = lang;
      this.#saveSettings();
    }
  
    get colorPallette() {
      return this.settings.colorPallette;
    }
  
    set colorPallette(color) {
      this.settings.colorPallette = color;
      this.#saveSettings();
    }
    
    get listOfLastColors() {
      return this.settings.listOfLastColors;
    }

    set listOfLastColors(list) {
      this.settings.listOfLastColors = list;
      console.log()
      this.#saveSettings();
      this.listOfLastColorsCallbacks.forEach((callback) => callback(list));
    }
  
    get listOfHiddenElements() {
      return this.settings.listOfHiddenElements;
    }
  
    set listOfHiddenElements(list) {
      this.settings.listOfHiddenElements = list;
      this.#saveSettings();
      this.listOfHiddenCallbacks.forEach((callback) => callback(list));
    }
    
    #saveSettings() {
      localStorage.setItem(settingsName, JSON.stringify(this.settings));
    }
  }