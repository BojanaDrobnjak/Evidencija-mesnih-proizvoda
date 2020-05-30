import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { RegistrationComponent } from "./components/registration/registration.component";
import { MatIconModule } from "@angular/material/icon";
import { PasswordValidatorDirective } from "./validators/password-validator.directive";
import { LoginComponent } from "./components/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./services/auth.guard";
import { HeaderComponent } from "./components/header/header.component";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from "@angular/material/paginator";
// ...
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "registration", component: RegistrationComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    PasswordValidatorDirective,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    //
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: [
          "localhost:8080/korisnik/auth",
          "localhost:8080/korisnik/create"
        ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
