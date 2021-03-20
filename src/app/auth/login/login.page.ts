import { Authentication } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private http: HttpClient,
    private auth: Authentication,
    private loadingController: LoadingController
  ) {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewDidLeave() {
    this.reset();
  }

  ionViewWillEnter() {
    this.reset();
  }

  reset() {
    this.form.reset();
  }

  back() {
    this.router.navigate(["title"]);
  }

  isInvalid(name: string) {
    return this.form.get(name).invalid && this.form.get(name).touched;
  }

  markAsTouchedAllfield() {
    this.form.markAllAsTouched();
  }

  async login() {
    this.markAsTouchedAllfield();
    if (this.form.invalid) {
      return;
    }
    const formData: any = this.form.getRawValue();
    let client_secret = this.auth.getKey();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: "password",
      client_id: 2,
      client_secret,
      scope: "*",
    };
    const loading = await this.loadingController.create();
    await loading.present();

    this.http.post("http://127.0.0.1:8000/oauth/token", data).subscribe(
      (result: any) => {
        console.log("success");
        console.log(result);
        window.localStorage.setItem("token", result.access_token);
        this.router.navigate(["profile"]);
      },
      (error) => {
        console.log("error");
        console.log(error);
        this.form.get("password").setErrors({ match: true });
      }
    );
    await loading.dismiss();
  }
}
