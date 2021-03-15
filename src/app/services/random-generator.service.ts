import { Injectable } from '@angular/core';

// Seedranrom
import * as seedrandom from 'seedrandom';


@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  // Global seedable random generator
  private random = seedrandom();

  constructor() { }


  public getRandomInt(minValue: number, maxValue: number): number {
    // Seed the random generator with the number of
    // milliseconds elapsed since January 1, 1970 00:00:00 UTC.
    this.random = seedrandom(Date.now());

    // 0 <= rnd < 1
    const rnd = this.random();

    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(rnd * (maxValue - minValue + 1)) + minValue;
  }
}
