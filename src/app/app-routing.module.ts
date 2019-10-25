import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotsComponent } from './spots/spots.component';
import { ChosenSpotComponent } from './chosen-spot/chosen-spot.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'spots', component: SpotsComponent},
  { path: 'chosen-spot/:id', component: ChosenSpotComponent},
  { path: 'home', component: HomeScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotsComponent, ChosenSpotComponent, HomeScreenComponent]
