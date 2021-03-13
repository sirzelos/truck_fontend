import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Authentication } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  user: any;

  loggedIn = false;

  isloadSuccess = false;

  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly auth: Authentication
  ) {}

  async ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn();
    this.user = await this.auth.currentUser();
    this.isloadSuccess = true;
  }
  ionViewWillEnter() {}

  logout() {
    this.auth.logout();
    this.router.navigate(["title"]);
  }
}
