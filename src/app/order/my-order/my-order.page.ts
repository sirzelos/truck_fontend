import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Authentication } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/user.service";

@Component({
  selector: "app-my-order",
  templateUrl: "my-order.page.html",
  styleUrls: ["my-order.page.scss"],
})
export class MyOrderPage implements OnInit {
  user: any;
  orders: any;

  constructor(
    private userService: UsersService,
    private auth: Authentication,
    public toastController: ToastController,
    private router: Router
  ) {}
  ngOnInit() {}
  async ionViewWillEnter() {
    this.loadOrder();
    if (window.sessionStorage.getItem("success_item")) {
      window.sessionStorage.removeItem("success_item");
      const toast = await this.toastController.create({
        color: "success",
        message: "รับคำสั่งเรียบร้อย",
        duration: 2000,
        position: "top",
      });
      toast.present();
    }
  }
  getStatus(status: number) {
    if (status === 0) {
      return "รอบริษัทขนส่งยอมรับ";
    } else if (status === 1) {
      return "อยู่ระหว่างขนส่ง";
    } else if (status === 3) {
      return "ขนส่งสำเร็จ";
    } else if (status === 99) {
      return "บริษัทขนส่งปฏิเสธ";
    } else if (status === 55) {
      return "ผู้จ้างยกเลิก";
    }
  }

  showOrder(id: number) {
    this.router.navigate(["order", id]);
  }
  async loadOrder() {
    this.user = await this.auth.currentUser();
    this.orders = await this.userService.getMyOrder(this.user?.id);
    console.log(this.orders);
  }
}
