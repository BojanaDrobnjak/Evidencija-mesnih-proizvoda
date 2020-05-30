import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  odjava() {
    this.authService.odjava();
  }

  odvediNaPocetnuStranu() {
    this.router.navigate(['home']);
  }
}
