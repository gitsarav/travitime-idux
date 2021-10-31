import { SignupService } from './../service/signup/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../common/validation.service';
import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ValidationFormsService } from '../service/common/validation-form.service';
import { ToastService } from '../service/common/toast.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  formErrors: any;
  isLoading = false;
  accountActivated = false;
  sigunpSuccess = false;
  show = true;

  get f() {
    return this.signupForm.controls;
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private vf: ValidationFormsService,
    public toastService: ToastService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm(): void {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      userEmail: [
        '',
        [Validators.required, ValidationService.emailValidator],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(this.vf.formRules.passwordMin),
          Validators.pattern(this.vf.formRules.passwordPattern),
        ],
      ],
      companyName: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vf.formRules.phonePattern),
        ],
      ],
    });
  }

  onSubmit() {
    // this.recaptchaService.execute({ action: 'signup' }).then((token) => {
    //   // Backend verification method
    //   this.sendTokenToBackend(token);
    // });
    if (this.signupForm.invalid) return;
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => this.handleRecaptchaToken(token));


    // const timerSource = timer(3000);

    // timerSource.subscribe((val) => {
    //   this.isLoading = false;
    //   this.sigunpSuccess = true;
    // });
  }
  handleRecaptchaToken(token){
    console.log(token);
    console.log(this.signupForm.value);
    let payLoad = JSON.parse(JSON.stringify(this.signupForm.value));
    payLoad.recaptchaToken = token;
    console.log(payLoad);
    this.isLoading = true;
    this.isLoading = true;
    this.signupService.newSignup(payLoad).subscribe(
      (res) => {
        console.log(res);
        this.toastService.show('Account created successfully', {
          classname: 'bg-success text-light',
          delay: 3000,
          autohide: true,
        });
        setTimeout(() => {
          this.router.navigate(['auth/activate-account']);
        }, 4000);
        // this.router.navigate(['login']);
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
  onCaptchaResponse(event) {
    console.log(event);
  }
}
