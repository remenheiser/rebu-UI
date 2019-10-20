import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotsComponent } from './spots/spots.component';


const routes: Routes = [
  { path: 'spots', component: SpotsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotsComponent]
