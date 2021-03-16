import { Authentication } from "src/app/services/auth.service";
import { UsersService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import * as moment from "moment";
import { ConfirmOrderModal } from "./confirm-order/confirm-order.modal";

@Component({
  selector: "app-order-form",
  templateUrl: "order-form.page.html",
  styleUrls: ["order-form.page.scss"],
})
export class OrderFormPage implements OnInit {
  id: number;
  form: FormGroup;
  meId: number;

  sector: any;
  detailShippingCompany: any;

  get now(): string {
    //1994-03-14
    const now = new Date();
    const tomorrow: Date = moment(now).add(1, "days").toDate();
    const convert =
      tomorrow.getFullYear() +
      "-0" +
      (tomorrow.getMonth() + 1) +
      "-" +
      tomorrow.getDate();

    return convert;
  }

  get dDate(): string {
    if (this.form.value.pick_up_date) {
      const now = new Date(this.form.value.pick_up_date);
      const tomorrow: Date = moment(now).add(1, "days").toDate();
      const convert =
        tomorrow.getFullYear() +
        "-0" +
        (tomorrow.getMonth() + 1) +
        "-" +
        tomorrow.getDate();
      return convert;
    } else {
      return this.now;
    }
  }

  get price(): number {
    if (
      this.form.value.sector &&
      this.detailShippingCompany &&
      this.form.value.weight_product
    ) {
      let price: any = 0;
      let weight: any = 0;
      price += this.detailShippingCompany?.oil_cost;
      if (
        this.form.value.weight_product > this.detailShippingCompany?.mini_weight
      ) {
        weight =
          this.form.value.weight_product -
          this.detailShippingCompany?.mini_weight;
        price += weight * this.detailShippingCompany?.weight_to_kk;
      }
      if (this.sector === "กรุงเทพมหานคร") {
        price += this.detailShippingCompany?.bangkok_mini_weight_cost;
      } else if (this.sector === "ภาคกลาง") {
        price += this.detailShippingCompany?.central_mini_weight_cost;
      } else if (this.sector === "ภาคเหนือ") {
        price += this.detailShippingCompany?.north_mini_weight_cost;
      } else if (this.sector === "ภาคอีสาน") {
        price += this.detailShippingCompany?.northeast_mini_weight_cost;
      } else if (this.sector === "ภาคตะวันออก") {
        price += this.detailShippingCompany?.east_mini_weight_cost;
      } else if (this.sector === "ภาคตะวันตก") {
        price += this.detailShippingCompany?.west_mini_weight_cost;
      } else if (this.sector === "ภาคใต้") {
        price += this.detailShippingCompany?.south_mini_weight_cost;
      }
      return price;
    }
  }

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private userService: UsersService,
    private loadingController: LoadingController,
    private auth: Authentication,
    public modalController: ModalController
  ) {
    this.form = this.fb.group({
      name_recipient: ["", Validators.required],
      detail_address_recipient: ["", [Validators.required]],
      subdistrict_recipient: ["", [Validators.required]],
      district_recipient: ["", [Validators.required]],
      province_recipient: ["", [Validators.required]],
      name_giver: ["", [Validators.required]],
      detail_address_giver: ["", [Validators.required]],
      subdistrict_giver: ["", [Validators.required]],
      district_giver: ["", [Validators.required]],
      province_giver: ["", [Validators.required]],
      pick_up_date: ["", [Validators.required]],
      delivery_date: ["", [Validators.required]],
      postCode_giver: ["", [Validators.required]],
      postCode_recipient: ["", [Validators.required]],
      weight_product: ["", [Validators.required]],
      product_type: ["", [Validators.required]],
      tel_recipient: ["", [Validators.required]],
      tel_giver: ["", [Validators.required]],
      sector: ["", [Validators.required]],
    });
  }
  isInvalid(name: string) {
    return this.form.get(name).invalid && this.form.get(name).touched;
  }
  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.atvRoute.snapshot.params.id;
    this.loadDetail();
  }
  async loadDetail() {
    this.detailShippingCompany = await this.userService.getDetailShippingCompany(
      this.id
    );
    const result = await this.auth.currentUser();
    this.meId = result?.id;
  }

  selectSector(name: string) {}

  back() {
    this.router.navigate(["detailShippingCompany", this.id]);
  }

  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    let created_at: string = String(new Date());
    let updated_at: string = String(new Date());
    const respone = {
      ...data,
      employer_id: this.meId,
      shipping_company_id: this.id,
      created_at,
      updated_at,
      cost: this.price,
    };

    const modal = await this.modalController.create({
      component: ConfirmOrderModal,
      componentProps: {
        respone,
      },
    });
    await modal.present();
  }
}
