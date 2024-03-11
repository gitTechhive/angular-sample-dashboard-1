import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deserialize, Serialize } from 'cerialize';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Subscription } from 'rxjs';
import { RegistrationObj } from 'src/app/models/RegistrationObj';
import { EnumForSignUpProcess } from 'src/app/shared/enums/EnumForSignUpProcess.enum';
import { ServerVariableService } from 'src/app/shared/services/server-variable.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('ngOtpInput', { static: false}) ngOtpInputRef: ElementRef;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;

  /**Config for OTP */
  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true
  }
  /**Variable to Store OTP Value */
  otpValue: any;

  /**Obj to Store Email */
  signUpObj = new RegistrationObj();

  /**FormGroup for SignUp Form */
  signUpFormGroup: FormGroup;
  
  /** boolean to show/hide password */
  flagForPasswordHideShow: boolean;

  /** String to handle captcha Image */
  captchaImage: string;
  /** String to handle captcha UUID*/
  captchaUUID: string;
  /** String to handle captcha Input */
  captchaInput: string;

  /**Array holding Country Code Data */
  countryCodeList: string[] = [];

  /**Defining SignUP Process ENUM to variable */
  enumForSignupStep = EnumForSignUpProcess

  /**Store current step in SignUp Process */
  step: string = this.enumForSignupStep.USER_DETAILS;

  /**Boolean to check Google Login */
  isGoogleLogin: boolean = false;

  /**Subscription to store google */
  subs: Subscription;

  constructor(public utilsService: UtilsService, public fb: FormBuilder, public serverVariableService: ServerVariableService,private socialAuthService: SocialAuthService) {
    
  }

  ngOnInit() {

    this.flagForPasswordHideShow = true;
    this.captchaGeneration();
    this.signUpForm();
    this.getMobileCountryCode();

    /**Handling SignUp process by Google */
    this.subs = this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        this.isGoogleLogin = true;
        console.log(user);
        this.onGoogleSignUp(user)
      }
    });
  }

  /** Captcha Generated on page load */
  captchaGeneration() {

    this.captchaUUID = null;

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CAPTCHA_GENERATION, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.captchaImage = response.realCaptcha
        this.captchaUUID = response.uuid
      }
    })
  }

  /** Verify Captcha with Backend */
  captchaVerification() {

    if(this.utilsService.isEmptyObjectOrNullUndefined(this.captchaInput)) {
      this.utilsService.toasterService.error("Please enter Captcha!", '', {
        closeButton: true,
      });
      return;
    }

    const param = {
      uuId: this.captchaUUID,
      hiddenCaptcha: this.captchaInput
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.CAPTCHA_VERIFICATION, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.captchaInput = null;
      }
    })
  }

  /** Regenerate Captcha if required */
  captchaRegenertion() {

    this.captchaInput = null;

    const param = {
      uuId: this.captchaUUID,
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.CAPTCHA_REGENERATE, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.captchaUUID = response.uuid
        this.captchaImage = response.realCaptcha
      }
    })

  }

  /**Validating fields on page load */
  signUpForm() {
    this.signUpFormGroup = this.fb.group({
      first_name: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.ONLY_SPACE_NOT_ALLOW)])],
      last_name: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.ONLY_SPACE_NOT_ALLOW)])],
      country_code: [null, Validators.compose([Validators.required])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_EMAIL)])],
    })
  }

  /**Signup using GoogleID */
  onGoogleSignUp(googleObj: SocialUser) {

    const param = {
      firstName: googleObj.firstName,
      lastName: googleObj.lastName,
      email: googleObj.email,
      googleId: googleObj.id,
      type: this.enumForSignupStep.GOOGLE_SIGNUP,
      uuid: this.captchaUUID,
    }

    this.utilsService.postMethodAPI(true, this.serverVariableService.REGISTRATION_GOOGLE, param, (response) => {

      if(!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        console.log(response);
        const loginResponse = Deserialize(response);
        this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
          this.step = this.enumForSignupStep.ACCOUNT_CREATED
        })
      }
    })
  }

  /** Registration of User */
  onRegistration() {

    if(this.signUpFormGroup.invalid) {
      this.signUpFormGroup.markAllAsTouched();
      return;
    }

    const param = {
      firstName: this.signUpObj.firstName,
      lastName: this.signUpObj.lastName,
      countryCode: this.signUpObj.countryCode,
      email: this.signUpObj.email,
      mobileNo: this.signUpObj.mobileNo,
      uuid: this.captchaUUID
    }

    this.utilsService.postMethodAPI(true, this.serverVariableService.REGISTRATION_SEND_OTP_API, param, (response) => {

      if(!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.step = this.enumForSignupStep.OTP_VERIFICATION;
        this.signUpObj.requestId = response.requestId;
      }
    })
  }

  /**On Submit OTP in Registration */
  onSubmitOTP() {

    if (this.otpValue?.length === 6) {
      this.signUpObj.otp = this.otpValue;
      const param = Serialize(this.signUpObj)
      console.log(param);

      this.utilsService.postMethodAPI(true, this.serverVariableService.REGISTRATION_API, param, (response) => {

        if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
          console.log(response);
          const loginResponse = Deserialize(response);
          this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
            this.step = this.enumForSignupStep.ACCOUNT_CREATED
          })
        }
      })
    }
  }

  /**Resend OTP method */
  onResendOTP() {
    this.ngOtpInput.setValue('')
    this.otpValue = '';
    this.onRegistration();
  }

  /**Setting up userData, token to localStorage after login phase */
  setLocalStorage(loginResponse, token) {

    const promise = new Promise((resolve, reject) => {
      try {
        this.utilsService.username = `${loginResponse.firstName} ${loginResponse.lastName}`;
        this.utilsService.userProfilePicture = loginResponse.profile_pic_url;
        this.utilsService.storeDataLocally('userData', JSON.stringify(loginResponse));
        this.utilsService.storeDataLocally('token', token);
        resolve('Success')
      }
      catch {
        reject()
      }
    });

    return promise;
  }

  /** Input OTP value in field function */
  onOtpChange(event) {
    console.log(this.ngOtpInputRef);
    this.otpValue = event;
  }

  /** Function to get Country Dropdown */
  getMobileCountryCode() {

    const param = {};
    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.COUNTRY_CODE_DROPDOWN, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.countryCodeList = Deserialize(response);
      }
    })

  }

  /**
  Redirects to the SignIn page, resetting form fields and switching between edit mode and full reset mode.
  @param {boolean} editForm - Indicates whether the form should be in edit mode (true) or full reset mode (false).
  */
  redirectToSignIn(editForm: boolean) {

    if (editForm) {
      this.step = this.enumForSignupStep.USER_DETAILS
    }
    else {
      this.signUpFormGroup.reset();
      this.signUpObj = new RegistrationObj();
      this.step = this.enumForSignupStep.USER_DETAILS
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if(this.isGoogleLogin) {
      this.socialAuthService?.signOut();   
    }
  }

}
