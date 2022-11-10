import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { LockChangeEvent } from '../color/color.component';

@Component({
  selector: 'app-colors-list',
  template: `
    <ul>
      <li *ngFor="let color of colors" [style.backgroundColor]="color">
        <app-color [color]="color" (lockChange)="lockColor($event)"></app-color>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsListComponent implements OnInit {
  @Input() colors: string[] = [];
  @Output() lockChange = new EventEmitter<LockChangeEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  lockColor(data: LockChangeEvent) {
    this.lockChange.emit(data);
  }
}
