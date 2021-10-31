import { SignupService } from '../../service/signup/signup.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../service/common/toast.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  @Input() param: any;
  isLoading = false;
  isSubmitted = false;
  isActivated = false;
  message:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signupService: SignupService,
    public toastService: ToastService,
  ) {
    
   }

  ngOnInit(): void {
    console.log(this.param);
    if(this.param){
      this.verifyActivationCode();
    }
    else{
      this.isSubmitted = true;
      this.message = "Link to activate your Travitime account password have been sent to your email. In case , if you don’t see the email please ensure you have entered the correct email address."
    }
    
  }
  verifyActivationCode(){
    let payLoad = {
      token :  this.param
    }
    
    this.isLoading = true;
    this.signupService.activateAccount(payLoad).subscribe(
      response => {
        this.isLoading = false;
        console.log(response);
        this.message = "Your account has been activated"
        this.isSubmitted = true;
        this.isActivated = true;
      },
      _err => {
        console.log(_err.error.msg);
        this.message = _err.error.msg;
        this.isLoading = false;
        this.isSubmitted = true;
        this.isActivated = false;
      }
    );
  }
}
