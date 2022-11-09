import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { SettingModalComponent } from '../setting-modal/setting-modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() colors!:string[];

  private readonly headerModalConfig = { width: '70vw', height: '70vh', data: {} };

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public showSettingsModal() {
    console.log (1);
    this.dialog.open(SettingModalComponent,this.headerModalConfig);
  }

}
