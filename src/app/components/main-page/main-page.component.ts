import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { PaletteType, predefinedPalettes } from '../constants/predefined-palettes';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public selectedColors: string[] = [];
  public previousColors: string[] = [];
  private saveColors:string[]=[];

  constructor() {}

  ngOnInit(): void {
    this.applyNextColors();
  }

  applyNextColors(): void {
    let numberOfColors:number = 5;
   if (this.selectedColors.length > 0) {
      this.previousColors = this.selectedColors;
    }
   /*if ((this.saveColors.length) > 0 && (this.saveColors.length < 5)) {
       numberOfColors = 5-this.selectedColors.length;
       let arr = this.generateColors(numberOfColors);
       this.selectedColors.concat(this.saveColors, arr);
       console.log (this.selectedColors);
   }*/

    this.selectedColors = this.generateColors(numberOfColors);

  }

  applyPreviousColors(): void {
    if (this.previousColors.length > 0) {
      this.selectedColors = [...this.previousColors];
    }
  }

  private generateColors(numberOfColors:number,initialPalette: PaletteType = 'random'): string[] {
    if (initialPalette === 'random') {
      return Array(numberOfColors).fill(0).map(() => chroma.random().hex('rgb'));
    } else {
      return Array(numberOfColors).fill(0).map(() => this.getRandomColor(predefinedPalettes[initialPalette]));
    }
  }

  private getRandomColor(colors: string[]) {
    const colorIndex = Math.floor(Math.random() * (colors.length - 1));

    return colors[colorIndex];
  }

  public addColor(currentColor:string) {

    this.saveColors.push(currentColor);
    console.log (this.saveColors);
  }

}
