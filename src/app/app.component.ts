import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { PaletteType, predefinedPalettes } from './constants/predefined-palettes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedColors: string[] = [];
  private previousColors: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.applyNextColors();
  }

  applyNextColors(): void {
    if (this.selectedColors.length > 0) {
      this.previousColors = this.selectedColors;
    }
    this.selectedColors = this.generateColors();
  }

  applyPreviousColors(): void {
    if (this.previousColors.length > 0) {
      this.selectedColors = [...this.previousColors];
    }
  }

  private generateColors(numberOfColors: number = 5, initialPalette: PaletteType = 'random'): string[] {
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
}
