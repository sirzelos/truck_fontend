import { Authentication } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-show-order-id",
  templateUrl: "show-order-id.page.html",
  styleUrls: ["show-order-id.page.scss"],
})
export class ShowOrderIDPage implements OnInit {
  id: number;
  order: any;
  shippingCompany: any;
  shipDetail: any;
  user: any;
  constructor(
    private activigate: ActivatedRoute,
    private userService: UsersService,
    private auth: Authentication,
    private router: Router
  ) {}

  get status() {
    if (this.order?.status === 0) {
      return "รอบริษัทขนส่งยอมรับ";
    } else if (this.order?.status === 1) {
      return "อยู่ระหว่างขนส่ง";
    } else if (this.order?.status === 3) {
      return "ขนส่งสำเร็จ";
    } else if (this.order?.status === 99) {
      return "บริษัทขนส่งปฏิเสธ";
    } else if (this.order?.status === 55) {
      return "ผู้จ้างยกเลิก";
    }
  }
  async ngOnInit() {
    this.id = this.activigate.snapshot.params.id;
    this.user = await this.auth.currentUser();

    this.loadOrder();
  }
  async ionViewWillEnter() {
    this.id = this.activigate.snapshot.params.id;
    this.user = await this.auth.currentUser();
    this.loadOrder();
  }
  async loadOrder() {
    this.order = await this.userService.getOrderByID(this.id);
    this.shippingCompany = await this.userService.getUserByID(
      this.order?.shipping_company_id
    );
    this.shipDetail = await this.userService.getDetailShippingCompany(
      this.order?.shipping_company_id
    );
    console.log(this.shippingCompany);

    console.log(this.order);
  }
  back() {
    this.router.navigate(["order/my-order"]);
  }

  async accept() {
    const result = await this.userService.updateOrder(this.id, 1);
    this.router.navigate(["order/my-order"]);
  }
  async denine() {
    const result = await this.userService.updateOrder(this.id, 99);
    this.router.navigate(["order/my-order"]);
  }
  async cancel() {
    const result = await this.userService.updateOrder(this.id, 55);
    this.router.navigate(["order/my-order"]);
  }
  sign() {
    this.router.navigate(["order", "signaturepad", "new", this.id]);
  }
  showSign() {
    this.router.navigate(["order", "signaturepad", "show", this.id]);
  }
}
