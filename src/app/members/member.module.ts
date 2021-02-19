import { MemberRoutingModule } from "./member-routing.module";
import { AppModule } from "./../app.module";
import { NgModule } from "@angular/core";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";

@NgModule({
  imports: [AppModule, MemberRoutingModule],
  exports: [],
  declarations: [LoginPage, RegisterPage],
  providers: [],
})
export class MemberModule {}
