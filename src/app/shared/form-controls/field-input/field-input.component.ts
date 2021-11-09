import {  Component, Input, Self, OnInit, Optional } from '@angular/core';
import { Validators, ControlValueAccessor, NgControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.css']
})
export class FieldInputComponent implements ControlValueAccessor, OnInit {
  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() mask: 'phone' | 'zip-code';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() validationIcon;
  @Input() icon;
  @Input() showValidationErrorMessage = true;
  value: string;
  isDisabled = false;

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  ngOnInit(): void {
    const { control } = this.ngControl;

    let validators = this.getValidators();
    validators = control.validator ? [control.validator, ...validators] : this.getValidators();

    control.setValidators(validators);
    control.updateValueAndValidity();
  }
  // FORM CONTROL FUNCTIONS
  setValue($event: any) {
    // console.log($event.target.value);
    this.value = $event.target.value;
    this.updateChanges();
  }

  updateChanges() {
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.updateChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  // PRIVATE
  private getValidators(): ValidatorFn[] {
    const validators = [];

    if (this.type === 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }

}
