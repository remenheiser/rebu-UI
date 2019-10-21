import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotsComponent } from './spots/spots.component';
import { HttpClientModule } from '@angular/common/http';
import { ChosenSpotComponent } from './chosen-spot/chosen-spot.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SpotsComponent,
    ChosenSpotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
