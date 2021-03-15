import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {

  constructor() { }


  public getRandomImage(): string {
    return 'https://picsum.photos/400?' + Date.now();
  }
}
