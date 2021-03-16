import { Authentication } from "src/app/services/auth.service";
import { UsersService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-shippingCompany",
  templateUrl: "shippingCompany.page.html",
  styleUrls: ["shippingCompany.page.scss"],
})
export class ShippingCompanyPage implements OnInit {
  user: any;
  detailShippingCompany: any;
  role: string;
  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private auth: Authentication
  ) {}

  async ionViewWillEnter() {
    const { id } = this.route.snapshot.params;
    const result = await this.auth.currentUser();
    this.role = result?.role;
    this.detailShippingCompany = await this.userService.getDetailShippingCompany(
      id
    );

    this.user = await this.userService.getUserByID(id);
  }

  ngOnInit() {}

  hire() {
    const { id } = this.route.snapshot.params;
    this.router.navigate(["order", "order-form", id]);
  }

  back() {
    this.router.navigate(["home"]);
  }
}
