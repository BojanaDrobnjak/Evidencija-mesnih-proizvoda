import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  sakrijSifru = true;
  istaSifra = true;

  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  submitForm() {
    if (this.username.invalid || this.password.invalid) {
      return;
    }
    this.login(this.username.value, this.password.value);
  }

  redirectToRegister() {
    this.router.navigate(["registration"]);
  }

  login(username: string, password: string) {
    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe(
        result => {
          alert("Ulogovali ste se!");
          this.router.navigate(["home"]);
        },
        err => console.log("Auth neuspesna")
      );
  }
}
