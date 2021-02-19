import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-title",
  templateUrl: "title.page.html",
  styleUrls: ["title.page.scss"],
})
export class TitleComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    setTimeout(() => {
      this.router.navigate(["title"]);
    }, 3000);
  }
}
