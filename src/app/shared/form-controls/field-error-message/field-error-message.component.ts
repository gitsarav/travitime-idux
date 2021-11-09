import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.css']
})
export class FieldErrorMessageComponent implements AfterViewInit, OnDestroy {
  @Input() visible = true;
  @Input() currentControl: FormControl;
  @Input() formLabel: String;

  errorMessage = null;
  private controlSubscription;
  constructor() { }

  ngAfterViewInit() {
    this.controlSubscription = this.currentControl.valueChanges.subscribe(() => {
      this.getErrorMessage();
    });
  }

  ngOnDestroy() {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  private getErrorMessage() {
    this.errorMessage = null;

    console.log(this.currentControl.errors);
    if (this.currentControl.errors) {
      Object.keys(this.currentControl.errors).forEach((key) => {
        this.errorMessage = this.getValidatorErrorMessage(key);
      });
    }
  }
  private getValidatorErrorMessage(validatorName: string) {
    // console.log('[getValidatorErrorMessage]', validatorName);
    console.log(this.currentControl);

    switch (validatorName) {
      case 'required':
        return 'FORM_VALIDATION_MESSAGES.REQUIRED';

      case 'invalid':
        return 'FORM_VALIDATION_MESSAGES.INVALID';

      default:
        return 'FORM_VALIDATION_MESSAGES.INVALID';
    }
  }

}
