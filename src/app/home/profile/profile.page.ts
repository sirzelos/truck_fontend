import { UsersService } from "../../services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Authentication } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: any;

  loggedIn = false;

  isloadSuccess = false;

  detailShippingCompany: any;

  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly auth: Authentication,
    private readonly userService: UsersService
  ) {}

  async ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn();
    this.user = await this.auth.currentUser();

    if (this.user?.role === "บริษัทขนส่ง") {
      this.loadDetailShippingCompany();
    }
    this.isloadSuccess = true;
  }

  async loadDetailShippingCompany() {
    this.detailShippingCompany = await this.userService.getDetailShippingCompany(
      this.user?.id
    );
    console.log(this.detailShippingCompany);
  }
  async ionViewWillEnter() {
    this.loggedIn = this.auth.isLoggedIn();
    this.user = await this.auth.currentUser();
    console.log(this.user);

    if (this.user?.role === "บริษัทขนส่ง") {
      this.loadDetailShippingCompany();
    }
    this.isloadSuccess = true;
  }

  addDetailShippingCompany() {
    this.router.navigate(["detail-shipping-form", "new"]);
  }

  editDetailShippingCompany() {
    this.router.navigate(["detail-shipping-form", "edit"]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["title"]);
  }
}
