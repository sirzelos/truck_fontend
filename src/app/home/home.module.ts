import { ProfilePage } from "./profile/profile.page";
import { Title2Page } from "./title2/title2.page";
import { HomeRoutingModule } from "./home-routing.module";
import { NgModule } from "@angular/core";
import { AppModule } from "../app.module";
import { AppCommonModule } from "../@common/common.module";
import { TitleComponent } from "./title/title.page";
import { DetailShippingFormPage } from "./profile/detail-shipping-form/detail-shipping-form.page";
import { FooterComponent } from "./footer/footer.component";
import { HomePage } from "./home/home.page";

@NgModule({
  imports: [AppCommonModule, HomeRoutingModule],
  exports: [],
  declarations: [
    TitleComponent,
    Title2Page,
    ProfilePage,
    DetailShippingFormPage,
    FooterComponent,
    HomePage,
  ],
  providers: [],
})
export class HomeModule {}
