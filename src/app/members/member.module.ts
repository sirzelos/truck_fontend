import { MemberRoutingModule } from "./member-routing.module";
import { NgModule } from "@angular/core";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";
import { AppCommonModule } from "../@common/common.module";

@NgModule({
  imports: [AppCommonModule, MemberRoutingModule],
  exports: [],
  declarations: [LoginPage, RegisterPage],
  providers: [],
})
export class MemberModule {}
