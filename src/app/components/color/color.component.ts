import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import * as chroma from 'chroma-js';
import { join } from 'path';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { ColorNameService } from 'src/app/services/color-name.service';



@Component({
  selector: 'app-color',
  template: `
    <div class="col hex" data-type="copy">{{ color }}</div>
    <div class="col rgb" data-type="copy">{{ getRgb(color) }}</div>
    <div class="col name" data-type="copy">{{ name$ | async }}</div>

  <ng-container *ngIf="!lock; else lockOrUnlock">
    <button data-type="lock" class="lock">
      <i class="fa-solid fa-lock-open" data-type="lock" (click)="saveColor(color)"></i>
    </button>
  </ng-container>

  <ng-template #lockOrUnlock>
  <button data-type="lock" class="lock" (click)="saveColor(color)">
      <i class="fa-solid fa-lock" data-type="lock"></i>
  </button>
  </ng-template>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent implements OnChanges {
  @Input() color: string = '#fff';
  @Output() update = new EventEmitter();

  public name$: Observable<string> = of('White');
  public lock:boolean = false;

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

  saveColor(color:string){
    this.lock = !this.lock;
    if(this.lock) {
      this.update.emit(color);
    }
  }



}
