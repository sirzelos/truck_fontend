import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-title2",
  templateUrl: "title2.page.html",
  styleUrls: ["title2.page.scss"],
})
export class Title2Page implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  login() {
    // this.router.navigate()
  }
  register() {
    // this.router.navigate()
  }
}
