import { Injectable } from '@angular/core';
import { MatRangeDateSelectionModel } from '@angular/material/datepicker';

export interface IDefaultSettings {
  language: string,
  colorPallette: string,
  history: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // private _currentSettings$ = new BehaviorSubject<IUser|null>(null);

  public defaultSettings = {
    language: 'eng',
    colorPallette: 'random',
    history: true,
  };

  public settingsName = 'settings';

  public settings = {
    language: "",
    colorPallette: "",
  }

  constructor() {}

  public getSettingsInstance(){
    const storedSettings = localStorage.getItem(this.settingsName);
    this.settings = storedSettings ? JSON.parse(storedSettings) : this.defaultSettings;
    this.saveSettings();
  }

  get language() {
    return this.settings.language;
  }

  set language(lang) {
    this.settings.language = lang;
    this.saveSettings();
  }

  get colorPallette() {
    return this.settings.colorPallette;
  }

  set colorPallette(color) {
    this.settings.colorPallette = color;
    this.saveSettings();
  }

  saveSettings() {
    localStorage.setItem(this.settingsName, JSON.stringify(this.settings));
  }
}
