const defaultSettings = {
    language: 'eng',
    colorPallette: 'all',
    listOfHiddenElements: [],
  };
  
  const settingsName = 'settings';

  export class SettingsService {
    static service;
  
    constructor() {
      const storedSettings = localStorage.getItem(settingsName);
  
      this.settings = storedSettings ? JSON.parse(storedSettings) : defaultSettings;
      this.listOfHiddenCallbacks = [];
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