import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldInputComponent } from './form-controls/field-input/field-input.component';
import { FieldDateComponent } from "./form-controls/field-date/field-date.component";
import { FieldDaterangeComponent } from "./form-controls/field-daterange/field-daterange.component";
import { FieldSelectComponent } from "./form-controls/field-select/field-select.component";

import { FieldErrorMessageComponent } from "./form-controls/field-error-message/field-error-message.component";
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [
    FieldInputComponent,
    FieldDateComponent,
    FieldDaterangeComponent,
    FieldSelectComponent,
    FieldErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forChild({})
  ],
  exports: [
    FieldInputComponent,
    FieldDateComponent,
    FieldDaterangeComponent,
    FieldSelectComponent,
    FieldErrorMessageComponent,
    TranslateModule
  ]
})
export class SharedModule { }
