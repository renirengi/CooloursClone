const defaultSettings = {
    language: 'eng',
    colorPallet: 'all',
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
  
    get colorPallet() {
      return this.settings.colorPallet;
    }
  
    set colorPallet(color) {
      this.settings.colorPallet = color;
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