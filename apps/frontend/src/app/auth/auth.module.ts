import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication/authentication.component';
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {AngularMaterialModule} from "../angular-material.module";

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, FormsModule, TranslateModule, AngularMaterialModule ],
})
export class AuthModule {}
