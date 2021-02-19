import { Title2Page } from "./title2/title2.page";
import { HomeRoutingModule } from "./home-routing.module";
import { NgModule } from "@angular/core";
import { AppModule } from "../app.module";
import { AppCommonModule } from "../@common/common.module";
import { TitleComponent } from "./title/title.page";

@NgModule({
  imports: [AppCommonModule, HomeRoutingModule],
  exports: [],
  declarations: [TitleComponent, Title2Page],
  providers: [],
})
export class HomeModule {}
