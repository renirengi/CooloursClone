import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-colors-list',
  template: `
    <ul>
      <li *ngFor="let color of colors; index as i;" [style.backgroundColor]="color"><app-color [color]="color"></app-color><li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsListComponent implements OnInit {
  @Input() colors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
