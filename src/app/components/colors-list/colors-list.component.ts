import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colors-list',
  template: `
    <ul>
      <li *ngFor="let color of colors; index as i;" [style.backgroundColor]="color"><app-color [color]="color" (update)="checkColor($event)"></app-color><li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsListComponent implements OnInit {
  @Input() colors: string[] = [];
  @Output() update = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  checkColor (currentColor:string) {
    this.update.emit(currentColor);
  }

}
