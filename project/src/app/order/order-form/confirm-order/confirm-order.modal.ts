import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { Authentication } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/user.service";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "confirm-order.modal.html",
  styleUrls: ["confirm-order.modal.scss"],
})
export class ConfirmOrderModal implements OnInit {
  @Input() respone: any;
  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private userService: UsersService,
    private loadingController: LoadingController,
    private auth: Authentication,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();
    const result = await this.userService.createOrder(this.respone);
    await loading.dismiss();
    this.modalController.dismiss();
    window.sessionStorage.setItem("success_item", "yes");
    this.router.navigate(["order/my-order"]);
  }

  back() {
    this.modalController.dismiss();
  }
}
