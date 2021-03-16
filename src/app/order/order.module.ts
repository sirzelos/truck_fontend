import { OrderRoutingModule } from "./order-routing.module";
import { NgModule } from "@angular/core";
import { AppCommonModule } from "../@common/common.module";
import { OrderFormPage } from "./order-form/order-form.page";
import { ConfirmOrderModal } from "./order-form/confirm-order/confirm-order.modal";
import { MyOrderPage } from "./my-order/my-order.page";
import { FooterComponent } from "../@common/footer/footer.component";

@NgModule({
  imports: [AppCommonModule, OrderRoutingModule],
  exports: [],
  declarations: [OrderFormPage, ConfirmOrderModal, MyOrderPage],
  providers: [],
})
export class OrderModule {}
