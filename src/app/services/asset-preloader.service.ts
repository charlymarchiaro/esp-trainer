import { Injectable } from '@angular/core';


const IMAGES_SRC: string[] = [
  'assets/images/4-choices/00_on.png',
  'assets/images/4-choices/00_off.png',
  'assets/images/4-choices/01_on.png',
  'assets/images/4-choices/01_off.png',
  'assets/images/4-choices/02_on.png',
  'assets/images/4-choices/02_off.png',
  'assets/images/4-choices/03_on.png',
  'assets/images/4-choices/03_off.png',
  'assets/images/4-choices/shadow.png',
];


@Injectable({
  providedIn: 'root'
})
export class AssetPreloaderService {


  constructor() {
    this.loadAssets();
  }


  private loadAssets(): void {
    IMAGES_SRC.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}
