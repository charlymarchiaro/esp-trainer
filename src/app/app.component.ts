import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'esp-trainer';

  public headerHeightPx: number;
  public contentHeightPx: number;


  ngOnInit(): void {
    window.addEventListener('resize', () => this.onWindowResize());
    this.updateSizes();
  }


  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.onWindowResize());
  }


  private onWindowResize(): void {
    this.updateSizes();
  }


  private updateSizes(): void {
    this.headerHeightPx = Math.min(60, 0.12 * window.innerHeight);
    this.contentHeightPx = window.innerHeight - this.headerHeightPx;
  }
}
