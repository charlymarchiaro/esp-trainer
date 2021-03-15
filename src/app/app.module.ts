import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { Trainer4ChoicesComponent } from './components/trainer-4-choices/trainer-4-choices.component';
import { ChoiceComponent } from './components/trainer-4-choices/choice/choice.component';
import { DecimalPipe } from '@angular/common';
import { RandomGeneratorService } from './services/random-generator.service';
import { RandomImageService } from './services/random-image.service';
import { Trainer4ChoicesService } from './services/trainer-4-choices.service';
import { AssetPreloaderService } from './services/asset-preloader.service';
import { SafeUrlPipe } from './services/safe-url-pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe,
    MainComponent,
    Trainer4ChoicesComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // Material
    MatProgressBarModule,

    BrowserAnimationsModule
  ],
  providers: [
    DecimalPipe,
    AssetPreloaderService,
    RandomGeneratorService,
    RandomImageService,
    Trainer4ChoicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
