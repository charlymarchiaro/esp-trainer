import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-choice-4',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit, OnDestroy, OnChanges {

  private offImgSrc: string;
  private onImgSrc: string;
  public foreImgSrc: string;
  public shadowImgSrc: string;

  public isPressed: boolean;


  @Input() id: number;
  @Input() sizePx: number;
  @Input() highlighted: boolean;
  @Input() disabled: boolean;

  @Output() clicked = new EventEmitter();


  constructor(
    private decimalPipe: DecimalPipe,
  ) { }


  ngOnInit(): void {
    const idStr = this.decimalPipe.transform(this.id, '2.0');
    this.onImgSrc = `assets/images/4-choices/${idStr}_on.png`;
    this.offImgSrc = `assets/images/4-choices/${idStr}_off.png`;
    this.shadowImgSrc = `assets/images/4-choices/shadow.png`;

    this.updateForeImg();

    document.addEventListener('mouseup', () => this.onMouseUp());
    document.addEventListener('touchend', () => this.onMouseUp());
  }


  ngOnDestroy(): void {
    document.removeEventListener('mouseup', () => this.onMouseUp());
    document.removeEventListener('touchend', () => this.onMouseUp());
  }


  ngOnChanges(): void {
    this.updateForeImg();
  }


  public onMouseDown(): void {
    if (this.disabled) {
      return;
    }
    this.isPressed = true;
  }


  public onMouseUp(): void {
    this.isPressed = false;
  }


  public onClick(): void {
    if (this.disabled) {
      return;
    }
    this.clicked.emit();
  }


  private updateForeImg(): void {
    this.foreImgSrc = this.highlighted ? this.onImgSrc : this.offImgSrc;
  }
}
