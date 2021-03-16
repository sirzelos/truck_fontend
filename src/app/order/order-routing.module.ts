import { OrderFormPage } from "./order-form/order-form.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyOrderPage } from "./my-order/my-order.page";

export const routes: Routes = [
  { path: "order-form/:id", component: OrderFormPage },
  { path: "my-order", component: MyOrderPage },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
