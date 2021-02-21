import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  user: any;

  loggedIn = false;

  constructor(private http: HttpClient, private readonly router: Router) {}

  ngOnInit() {
    this.loggedIn = localStorage.getItem("token") !== null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    this.http
      .get("http://127.0.0.1:8000/user", { headers: headers })
      .subscribe((result) => (this.user = result));
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["title"]);
  }
}
