import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Trainer4ChoicesComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    DecimalPipe,
    RandomGeneratorService,
    RandomImageService,
    Trainer4ChoicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
