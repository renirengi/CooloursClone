import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {

  public language: string = '';
  public color: string = '';
  public colors: string[] = ['Random','Red', 'Pink', 'Purple', 'Blue', 'Teal', 'Green', 'Yellow', 'Orange', 'Brown', 'White', 'Black', 'Grey']

  public settingsForm = new FormGroup({
    language: new FormControl('', []),
    color: new FormControl('', []),
  })
  constructor(
    private dialogRef: MatDialogRef<SettingModalComponent>,
    private settings: SettingsService,
  ) {

  }

  ngOnInit(): void {
   this.settings.getSettingsInstance();
   this.language = this.settings.language;
   this.color = this.settings.colorPallette;
   this.settingsForm.controls['language'].setValue(this.language);
   this.settingsForm.controls['color'].setValue(this.color);
  }

  public onSubmit() {
    this.settings.colorPallette = this.settingsForm.value["color"];
    this.settings.language = this.settingsForm.value["language"];
    this.settings.saveSettings();
    this.dialogRef.close();
  }

}
