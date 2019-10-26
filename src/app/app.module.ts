import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotsComponent } from './spots/spots.component';
import { HttpClientModule } from '@angular/common/http';
import { ChosenSpotComponent } from './chosen-spot/chosen-spot.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AboutComponent } from './about/about.component';
import { AgmCoreModule } from '@agm/core';
import { ListComponent } from './list/list.component';
import { NearByComponent } from './near-by/near-by.component'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SpotsComponent,
    ChosenSpotComponent,
    HomeScreenComponent,
    AboutComponent,
    ListComponent,
    NearByComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5OJt9-wsH0qPuYPpTny8IlEruNUufNwI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
