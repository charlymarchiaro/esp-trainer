import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssetPreloaderService } from 'src/app/services/asset-preloader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    assetPreloaderService: AssetPreloaderService,
  ) { }
}
