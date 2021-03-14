import { HomePage } from "./home/home.page";
import { ProfilePage } from "./profile/profile.page";

import { Title2Page } from "./title2/title2.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TitleComponent } from "./title/title.page";
import { DetailShippingFormPage } from "./profile/detail-shipping-form/detail-shipping-form.page";

export const routes: Routes = [
  { path: "", component: TitleComponent },
  { path: "home", component: HomePage },
  { path: "title", component: Title2Page },
  { path: "profile", component: ProfilePage },
  { path: "detail-shipping-form/:mode", component: DetailShippingFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
