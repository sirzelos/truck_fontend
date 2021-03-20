import { OrderFormPage } from "./order-form/order-form.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyOrderPage } from "./my-order/my-order.page";
import { ShowOrderIDPage } from "./my-order/show-order-id/show-order-id.page";
import { SignaturepadPage } from "./my-order/signaturepad/signaturepad.page";

export const routes: Routes = [
  { path: "order-form/:id", component: OrderFormPage },
  { path: "my-order", component: MyOrderPage },
  { path: ":id", component: ShowOrderIDPage },
  { path: "signaturepad/:mode/:id", component: SignaturepadPage },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
