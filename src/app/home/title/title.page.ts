import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-title",
  templateUrl: "title.page.html",
  styleUrls: ["title.page.scss"],
})
export class TitleComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (localStorage.getItem("token") !== null) {
      setTimeout(() => {
        this.router.navigate(["home"]);
      }, 4000);
    } else {
      setTimeout(() => {
        this.router.navigate(["title"]);
      }, 4000);
    }
  }
}
