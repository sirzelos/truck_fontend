import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Authentication } from "src/app/services/auth.service";

@Component({
  selector: "app-title",
  templateUrl: "title.page.html",
  styleUrls: ["title.page.scss"],
})
export class TitleComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private loadingController: LoadingController,
    private readonly auth: Authentication
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.auth.isLoggedIn()) {
      setTimeout(() => {
        this.router.navigate(["profile"]);
      }, 4000);
    } else {
      setTimeout(() => {
        this.router.navigate(["title"]);
      }, 4000);
    }
  }
}
