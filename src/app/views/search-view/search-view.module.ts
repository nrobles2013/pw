import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SearchViewRoutingModule } from "./search-view-routing.module";
import { ResultPageComponent } from "./result-page/result-page.component";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    MatCardModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    SearchViewRoutingModule
  ]
})
export class SearchViewModule {}
