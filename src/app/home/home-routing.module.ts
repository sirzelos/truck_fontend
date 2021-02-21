import { HomePage } from "./home/home.page";
import { Title2Page } from "./title2/title2.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TitleComponent } from "./title/title.page";

export const routes: Routes = [
  { path: "", component: TitleComponent },
  { path: "title", component: Title2Page },
  { path: "home", component: HomePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
