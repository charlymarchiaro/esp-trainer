import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';


type State = 'off' | 'on' | 'pressed';


@Component({
  selector: 'app-choice-4',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit, OnDestroy {

  public offImgSrc: string;
  public onImgSrc: string;
  public shadowImgSrc: string;

  public state: State = 'off';


  @Input() id: number;
  @Input() sizePx: number;


  constructor(
    private decimalPipe: DecimalPipe,
  ) { }


  ngOnInit(): void {
    const idStr = this.decimalPipe.transform(this.id, '2.0');
    this.onImgSrc = `assets/images/4-choices/${idStr}_on.png`;
    this.offImgSrc = `assets/images/4-choices/${idStr}_off.png`;
    this.shadowImgSrc = `assets/images/4-choices/shadow.png`;

    document.addEventListener('mouseup', () => this.onMouseUp());
    document.addEventListener('touchend', () => this.onMouseUp());
  }


  ngOnDestroy(): void {
    document.removeEventListener('mouseup', () => this.onMouseUp());
    document.removeEventListener('touchend', () => this.onMouseUp());
  }


  public onMouseDown(): void {
    this.state = 'pressed';
  }


  public onMouseUp(): void {
    this.state = 'off';
  }


  public onClick(): void {
    this.state = 'off';
  }
}
