import {  Component, Input, Self, OnInit, Optional } from '@angular/core';
import { Validators, ControlValueAccessor, NgControl, ValidatorFn } from '@angular/forms';
import { FieldSelectOption } from './field-select.interface';
import { FieldRadioOption } from '../field-radio/field-radio.interface';

@Component({
  selector: 'field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.css']
})
export class FieldSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() options: FieldSelectOption[] = [];
  @Input() showValidationErrorMessage = true;
  @Input() multiple = false;
  value: string;
  isDisabled = false;
  interfaceOptions = {};

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};
  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  ngOnInit(): void {
    this.setInterfaceOptions();
  }

  trackByOptions(index: number, option: FieldRadioOption) {
    return option.value;
  }

  // FORM CONTROL FUNCTIONS
  setValue($event: any) {
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
  setInterfaceOptions() {
    this.interfaceOptions = {
      header: this.label,
    };
  }

}
