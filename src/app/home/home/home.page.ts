import { Router } from "@angular/router";
import { UsersService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  data: any;

  constructor(
    private readonly userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    this.data = await this.userService.getShippingCompany();
  }

  showDetail(id: number) {
    this.router.navigate(["detailShippingCompany", id]);
  }
}
