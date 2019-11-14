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
import { PostlistComponent } from "./postlist/postlist.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ErrorComponent } from './error/error.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { UserSpotsComponent } from './user-spots/user-spots.component';

const routes: Routes = [
  { path: "spots", component: SpotsComponent },
  { path: "chosen-spot/:id", component: ChosenSpotComponent },
  { path: "home", component: HomeScreenComponent },
  { path: "about", component: AboutComponent },
  { path: "list", component: ListComponent },
  { path: "near-by", component: NearByComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: UnauthorizedComponent },
  { path: "", component: HomeScreenComponent },
  { path: "postlist", component: PostlistComponent },
  { path: "unauthorized", component: UnauthorizedComponent },
  { path: 'account', component: AccountComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "contact", component: ContactComponent },
  { path: "user-spots", component: UserSpotsComponent },
  { path: '**', component: ErrorComponent }
  
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
  SignupComponent,
  UnauthorizedComponent,
  AccountComponent,
  ForgotPasswordComponent,
  ContactComponent,
  UserSpotsComponent
];
