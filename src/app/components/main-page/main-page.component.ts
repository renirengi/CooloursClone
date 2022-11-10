import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { LockChangeEvent } from '../color/color.component';
import { PaletteType, predefinedPalettes } from '../constants/predefined-palettes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public selectedColors: string[] = [];
  public previousColors: string[] = ['#d83786', '#186a3c', '#74e4fc', '#bb6103', '#044143'];

  private lockedColors: Set<string> = new Set();

  constructor() { }

  public ngOnInit(): void {
    this.applyNextColors();
  }

  public applyNextColors(): void {
    let numberOfColors: number = 5;
    if (this.selectedColors.length > 0) {
      this.previousColors = this.selectedColors;
    }

    this.selectedColors = this.generateColors(numberOfColors);
  }

  public applyPreviousColors(): void {
    if (this.previousColors.length > 0) {
      this.selectedColors = [...this.previousColors];
    }
  }

  public lockColor({color, locked}: LockChangeEvent) {
    if (locked) {
      this.lockedColors.add(color);
    } else {
      this.lockedColors.delete(color);
    }
  }

  private generateColors(numberOfColors: number, initialPalette: PaletteType = 'random'): string[] {
    return Array(numberOfColors).fill(0)
      .map((_val, i) => this.isColorLocked(this.selectedColors[i]) ? this.selectedColors[i] : this.generateColor(initialPalette));
  }

  private generateColor(initialPalette: PaletteType = 'random'): string {
    if (initialPalette === 'random') {
      return chroma.random().hex('rgb');
    }

    return this.getRandomColor(predefinedPalettes[initialPalette]);
  }

  private isColorLocked(color: string) {
    return this.lockedColors.has(color);
  }

  private getRandomColor(colors: string[]) {
    const colorIndex = Math.floor(Math.random() * (colors.length - 1));

    return colors[colorIndex];
  }

}
