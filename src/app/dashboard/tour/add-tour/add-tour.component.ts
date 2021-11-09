import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFormsService } from '../../../service/common/validation-form.service';
import { ValidationService } from '../../../common/validation.service';
import { TourService } from "../tour.service";
import { ToastService } from '../../../service/common/toast.service';
import { COUNTRIES } from 'src/app/data/countries';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  moment = moment;
  addTourForm: FormGroup;
  formErrors: any;
  isLoading = false;
  countryOptions = [];
  natureOfOptions = [
    {
      label:"Flight",
      value:"1"
    },
    {
      label:"Train",
      value:"2"
    },
    {
      label:"Car",
      value:"3"
    },
    {
      label:"Bus",
      value:"4"
    },
    {
      label:"Cruise Ship",
      value:"5"
    },
    {
      label:"Others",
      value:"0"
    }
  ];
  travelModeOptions = [
    {
      label:"Weekend Break",
      value:"1"
    },
    {
      label:"Package Holiday",
      value:"2"
    },
    {
      label:"Business Travel",
      value:"3"
    },
    {
      label:"Group Tour",
      value:"4"
    },
    {
      label:"Road Trip",
      value:"5"
    },
    {
      label:"Volunteer Travel",
      value:"6"
    },
    {
      label:"Long Term Travel",
      value:"7"
    },
    {
      label:"Student Travel",
      value:"8"
    },
    {
      label:"Visiting Friends or Relatives",
      value:"9"
    },
    {
      label:"Event Travel",
      value:"10"
    },
    {
      label:"Others",
      value:"0"
    }
  ];
  constructor(
    private fb: FormBuilder,
    private vf: ValidationFormsService,
    private tourSrv : TourService,
    public toastService: ToastService,
    private router: Router,
  ) { 
    
    this.countryOptions = COUNTRIES.map(item => {
      return {
        label: item.name,
        value: item.id
      };
    });
    console.log(this.countryOptions);
    this.initAddTourForm();
    
  }
  get f() {
    return this.addTourForm.controls;
  }
  ngOnInit(): void {
    this.updateNoOfDaysField();
  }
  initAddTourForm(): void {
    this.addTourForm = this.fb.group({
      tourName: ['', [Validators.required]],
      tourDate: [{}, [Validators.required]],
      country: ['', [Validators.required]],
      noOfDays: ['', [Validators.required]],
      travelMode: ['', [Validators.required]],
      natureOfTravel: ['', [Validators.required]]
    });
  }
  updateNoOfDaysField(){
    this.addTourForm.get("tourDate").valueChanges.subscribe(selectedValue => {
      console.log('tourDate changed')
      let startDate = selectedValue.start ? selectedValue.start : null;
      let endDate = selectedValue.end ? selectedValue.end : null;
      console.log(startDate);
      if(startDate && endDate){
        let formattedStartDate =  this.moment(startDate.year+'-'+startDate.month+'-'+startDate.day, 'YYYY-MM-DD');
        let formattedEndDate = this.moment(endDate.year+'-'+endDate.month+'-'+endDate.day, 'YYYY-MM-DD');
        let noOfDays = formattedEndDate.diff(formattedStartDate, 'days');
        this.addTourForm.controls['noOfDays'].setValue(noOfDays+1);
      }
      
    });
  }
  onSubmit() {
    console.log(this.addTourForm.invalid);
    if (this.addTourForm.invalid) return;
    let payLoad = JSON.parse(JSON.stringify(this.addTourForm.value));
    this.tourSrv.newTour(payLoad).subscribe(
      (res) => {
        console.log(res);
        this.toastService.show('Account created successfully', {
          classname: 'bg-success text-light',
          delay: 3000,
          autohide: true,
        });
        setTimeout(() => {
          this.router.navigate(['dashboard/tour/all']);
        }, 4000);
      },
      (error) => {
        this.isLoading = false;
        const dangerTpl = error;
        this.toastService.show(dangerTpl, {
          classname: 'bg-danger text-light',
          delay: 3000,
          autohide: true,
        });
      }
    );
  }

}
