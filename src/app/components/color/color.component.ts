import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import * as chroma from 'chroma-js';
import { join } from 'path';
import { firstValueFrom } from 'rxjs';
import { ColorNameService } from 'src/app/services/color-name.service';



@Component({
  selector: 'app-color',
  template: `
    <div class="col hex" data-type="copy">{{ color }}</div>
    <div class="col rgb" data-type="copy">{{ getRgb(color) }}</div>
    <div class="col name" data-type="copy">{{name}}</div>
    <button data-type="lock" class="lock">
      <i class="fa-solid fa-lock-open" data-type="lock"></i>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent implements OnInit {
  @Input() color: string = '#fff';

  public name:any;

  constructor(
    private colorName: ColorNameService,
  ) { }

  ngOnInit(): void {
    this.getName(this.color);
  }

  getRgb(color: string): string {
    return chroma(color).rgb().join(', ');
  }

  async getName(color:string) {

   const i = await firstValueFrom(this.colorName.getColorObject(color));
   this.name = i.name.value;
   console.log(this.name);
   ///return this.name.value;
  }

}
