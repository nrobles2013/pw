import { NgModule } from "@angular/core";

import { ResultPageComponent } from "../search-view/result-page/result-page.component";

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ResultPageComponent
  }
];
@NgModule({
  declarations: [ResultPageComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardViewModule { }
