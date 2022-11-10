import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import * as chroma from 'chroma-js';
import { map, Observable, of } from 'rxjs';
import { ColorNameService } from 'src/app/services/color-name.service';

export interface LockChangeEvent {
  color: string;
  locked: boolean;
}

@Component({
  selector: 'app-color',
  template: `
    <div class="col hex" data-type="copy">{{ color }}</div>
    <div class="col rgb" data-type="copy">{{ getRgb(color) }}</div>
    <div class="col name" data-type="copy">{{ name$ | async }}</div>

    <button class="lock" (click)="lockColor()">
      <i class="fa-solid" data-type="lock" [ngClass]="{'fa-lock-open': !locked, 'fa-lock': locked}"></i>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent implements OnChanges {
  @Input() color: string = '#fff';
  @Output() lockChange = new EventEmitter<LockChangeEvent>();

  public name$: Observable<string> = of('White');
  public locked: boolean = false;

  constructor(
    private colorService: ColorNameService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']?.currentValue) {
      this.name$ = this.getColorName$(changes['color']?.currentValue);
    }
  }

  getRgb(color: string): string {
    return chroma(color).rgb().join(', ');
  }

  getColorName$(color: string): Observable<string> {
    return this.colorService.getColorObject(color).pipe(
      map((data) => data.name.value)
    );
  }

  lockColor(): void {
    this.locked = !this.locked;
    this.lockChange.emit({ color: this.color, locked: this.locked });
  }

}
