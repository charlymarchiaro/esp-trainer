import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-trainer-4-choices',
  templateUrl: './trainer-4-choices.component.html',
  styleUrls: ['./trainer-4-choices.component.scss']
})
export class Trainer4ChoicesComponent implements OnInit {


  public choiceSizePx: number;


  constructor() { }


  ngOnInit(): void {
    window.addEventListener('resize', () => this.onWindowResize());

    this.updateChoiceSize();
  }


  private onWindowResize(): void {
    this.updateChoiceSize();
  }


  private updateChoiceSize(): void {
    if (window.innerWidth > window.innerHeight) {
      this.choiceSizePx = window.innerHeight * 0.35;
    } else {
      this.choiceSizePx = Math.min(window.innerWidth * 0.45, window.innerHeight * 0.35);
    }
  }
}
