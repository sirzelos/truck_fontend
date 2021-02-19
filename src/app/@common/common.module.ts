import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule,
];
const COMPONENTS = [];
const PROVIDERS = [];
const PIPES = [];

@NgModule({
  imports: [...BASE_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...PROVIDERS],
  exports: [...BASE_MODULES, ...COMPONENTS, ...PIPES],
})
export class AppCommonModule {}
