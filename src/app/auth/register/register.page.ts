import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "register.page.html",
  styleUrls: ["register.page.scss"],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  get passwordNotMath(): boolean {
    if (this.form.value.password !== this.form.value.password_confirmation) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private http: HttpClient,
    private loadingController: LoadingController
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required]],
      role: ["", [Validators.required]],
      password: ["", [Validators.required]],
      password_confirmation: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.reset();
  }

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

  async register() {
    this.markAsTouchedAllfield();
    if (this.form.invalid && this.passwordNotMath) {
      return;
    }
    const loading = await this.loadingController.create();
    await loading.present();
    const formData: any = this.form.value;

    const data = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    };

    const response = await this.http
      .post("http://127.0.0.1:8000/register", data)
      .toPromise();

    const auth = {
      username: formData.email,
      password: formData.password,
      grant_type: "password",
      client_id: 2,
      client_secret: "ZR0jxS0SvMyvwSDgR6LiUxAe0sc94rWLX0ou6KeY",
      scope: "*",
    };

    this.http.post("http://127.0.0.1:8000/oauth/token", auth).subscribe(
      (result: any) => {
        console.log("success");
        window.localStorage.setItem("token", result.access_token);

        this.router.navigate(["profile"]);
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );
    await loading.dismiss();
  }

  markAsTouchedAllfield() {
    this.form.markAllAsTouched();
  }
}
