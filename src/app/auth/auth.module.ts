import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";
import { AppCommonModule } from "../@common/common.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  imports: [AppCommonModule, AuthRoutingModule, HttpClientModule],
  exports: [],
  declarations: [LoginPage, RegisterPage],
  providers: [],
})
export class AuthModule {}
