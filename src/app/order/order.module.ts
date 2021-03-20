import { OrderRoutingModule } from "./order-routing.module";
import { NgModule } from "@angular/core";
import { AppCommonModule } from "../@common/common.module";
import { OrderFormPage } from "./order-form/order-form.page";
import { ConfirmOrderModal } from "./order-form/confirm-order/confirm-order.modal";
import { MyOrderPage } from "./my-order/my-order.page";
import { FooterComponent } from "../@common/footer/footer.component";
import { ShowOrderIDPage } from "./my-order/show-order-id/show-order-id.page";
import { SignaturepadPage } from "./my-order/signaturepad/signaturepad.page";
import { SignaturePadModule } from "angular2-signaturepad";

@NgModule({
  imports: [AppCommonModule, OrderRoutingModule, SignaturePadModule],
  exports: [],
  declarations: [
    OrderFormPage,
    ConfirmOrderModal,
    MyOrderPage,
    ShowOrderIDPage,
    SignaturepadPage,
  ],
  providers: [],
})
export class OrderModule {}
