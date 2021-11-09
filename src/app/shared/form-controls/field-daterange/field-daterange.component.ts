import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Validators, ControlValueAccessor, NgControl, ValidatorFn , NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'field-daterange',
  templateUrl: './field-daterange.component.html',
  styleUrls: ['./field-daterange.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldDaterangeComponent),
      multi: true
    }
  ]
})
export class FieldDaterangeComponent implements ControlValueAccessor, OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;
  value = {};
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  isDisabled = false;
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};
  constructor(
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.value['start'] = calendar.getToday();;
    this.value['end'] = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit(): void {
    
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.value['start'] = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.value['end'] = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.value['start'] = date;
      this.value['end'] = null;
    }
    this.updateChanges();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  updateChanges() {
    this.onChange(this.value);
  }
  writeValue(value: number): void {
    this.value = value;
    this.updateChanges();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
