import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {

  public colors: string[] = ['Random','Red', 'Pink', 'Purple', 'Blue', 'Teal', 'Green', 'Yellow', 'Orange', 'Brown', 'White', 'Black', 'Grey']

  constructor() { }

  ngOnInit(): void {
  }

}
