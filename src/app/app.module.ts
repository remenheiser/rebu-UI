import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpotsComponent } from "./spots/spots.component";
import { HttpClientModule } from "@angular/common/http";
import { ChosenSpotComponent } from "./chosen-spot/chosen-spot.component";
import { HomeScreenComponent } from "./home-screen/home-screen.component";
import { AboutComponent } from "./about/about.component";
import { AgmCoreModule } from "@agm/core";
import { ListComponent } from "./list/list.component";
import { NearByComponent } from "./near-by/near-by.component";
import * as $ from "jquery";
import { LoginComponent } from "./login/login.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmDirectionModule } from "agm-direction";
import { SignupComponent } from "./signup/signup.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { CustomHttpInterceptorService } from "./httpinterceptor";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { NgxPayPalModule } from "ngx-paypal";
import { ErrorComponent } from './error/error.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SpotsComponent,
    ChosenSpotComponent,
    HomeScreenComponent,
    AboutComponent,
    ListComponent,
    NearByComponent,
    LoginComponent,
    SignupComponent,
    PostlistComponent,
    UnauthorizedComponent,
    ErrorComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AgmDirectionModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB5OJt9-wsH0qPuYPpTny8IlEruNUufNwI"
    }),
    NgxPayPalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
