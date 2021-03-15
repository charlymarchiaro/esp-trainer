import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface Entry {
  src: string;
}


const TOTAL_ENTRIES = 5;


@Injectable({
  providedIn: 'root'
})
export class RandomImageService {

  private entries: Entry[] = [];


  constructor(
    private http: HttpClient,
  ) {
    for (let i = 0; i < TOTAL_ENTRIES; i++) {
      this.loadEntry();
    }
  }


  private async loadEntry(): Promise<void> {
    const rnd = Math.floor(Math.random() * 100000000);
    const apiSrc = 'https://picsum.photos/400?' + rnd;

    const response = await this.http.get(
      apiSrc,
      { responseType: 'blob' }
    ).toPromise();

    const src = window.URL.createObjectURL(response);
    this.entries.push({ src });
  }


  public getRandomImage(): string {
    this.loadEntry();
    const entry = this.entries.shift();
    return entry.src;
  }
}
