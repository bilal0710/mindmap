import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {TranslateModule} from "@ngx-translate/core";
import {AngularMaterialModule} from "../angular-material.module";
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ConfirmationDialogComponent],
  exports: [],
  imports: [
    CommonModule,
    TranslateModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class LibraryModule {
}
