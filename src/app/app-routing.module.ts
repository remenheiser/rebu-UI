import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpotsComponent } from "./spots/spots.component";
import { ChosenSpotComponent } from "./chosen-spot/chosen-spot.component";
import { HomeScreenComponent } from "./home-screen/home-screen.component";
import { AboutComponent } from "./about/about.component";
import { ListComponent } from "./list/list.component";
import { NearByComponent } from "./near-by/near-by.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: "spots", component: SpotsComponent },
  { path: "chosen-spot/:id", component: ChosenSpotComponent },
  { path: "home", component: HomeScreenComponent },
  { path: "about", component: AboutComponent },
  { path: "list", component: ListComponent },
  { path: "near-by", component: NearByComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", component: HomeScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  SpotsComponent,
  ChosenSpotComponent,
  HomeScreenComponent,
  AboutComponent,
  ListComponent,
  LoginComponent,
  SignupComponent
];
