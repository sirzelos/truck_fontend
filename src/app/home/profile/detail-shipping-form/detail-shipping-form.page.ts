import { UsersService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Authentication } from "src/app/services/auth.service";

@Component({
  selector: "app-detail-shipping-form",
  templateUrl: "detail-shipping-form.page.html",
  styleUrls: ["detail-shipping-form.page.scss"],
})
export class DetailShippingFormPage implements OnInit {
  form: FormGroup;
  user: any;
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private loadingController: LoadingController,
    private readonly userService: UsersService,
    private readonly auth: Authentication,
    private readonly aroute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      mini_weight: ["", Validators.required],
      oil_cost: ["", [Validators.required]],
      north_mini_weight_cost: ["", [Validators.required]],
      bangkok_mini_weight_cost: ["", [Validators.required]],
      east_mini_weight_cost: ["", [Validators.required]],
      west_mini_weight_cost: ["", [Validators.required]],
      south_mini_weight_cost: ["", [Validators.required]],
      northeast_mini_weight_cost: ["", [Validators.required]],
      central_mini_weight_cost: ["", [Validators.required]],
      weight_to_kk: ["", [Validators.required]],
      product_type: ["", [Validators.required]],
    });
  }
  async loadForm() {
    const result = await this.userService.getDetailShippingCompany(
      this.user?.id
    );
    this.form.get("mini_weight").setValue(result?.mini_weight);
    this.form.get("oil_cost").setValue(result?.oil_cost);
    this.form
      .get("north_mini_weight_cost")
      .setValue(result?.north_mini_weight_cost);
    this.form
      .get("bangkok_mini_weight_cost")
      .setValue(result?.bangkok_mini_weight_cost);
    this.form
      .get("east_mini_weight_cost")
      .setValue(result?.east_mini_weight_cost);
    this.form
      .get("west_mini_weight_cost")
      .setValue(result?.west_mini_weight_cost);
    this.form
      .get("south_mini_weight_cost")
      .setValue(result?.south_mini_weight_cost);
    this.form
      .get("northeast_mini_weight_cost")
      .setValue(result?.northeast_mini_weight_cost);
    this.form
      .get("central_mini_weight_cost")
      .setValue(result?.central_mini_weight_cost);
    this.form.get("weight_to_kk").setValue(result?.weight_to_kk);
    this.form.get("product_type").setValue(result?.product_type);
  }
  isInvalid(name: string) {
    return this.form.get(name).invalid && this.form.get(name).touched;
  }
  ionViewDidLeave() {
    this.reset();
  }

  reset() {
    this.form.reset();
  }
  async ngOnInit() {
    this.reset();
    const { mode } = this.aroute.snapshot.params;
    this.user = await this.auth.currentUser();
    if (mode === "edit") {
      this.loadForm();
    }
  }

  back() {
    this.router.navigate(["profile"]);
  }
  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
    }
    const formData: any = this.form.value;
    const loading = await this.loadingController.create();

    const data = {
      ...formData,
      user_id: this.user?.id,
    };
    const result = await this.userService.saveDetailShippingCompany(data);
    await loading.present();
    await loading.dismiss();
    this.router.navigate(["profile"]);
  }
}
