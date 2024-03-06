import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deserialize } from 'cerialize';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Subscription } from 'rxjs';
import { EnumForLoginMode } from 'src/app/shared/enums/EnumForLoginMode.enum';
import { ServerVariableService } from 'src/app/shared/services/server-variable.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('ngOtpInput', { static: false}) ngOtpInputRef: ElementRef;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;

  /**Config for OTP */
  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true
  }
  /**Variable to Store OTP Value */
  otpValue: any;

  /**Obj to Store Mobile No */
  mobileLoginObj = {
    phone: null
  };

  /** boolean to show/hide password */
  flagForPasswordHideShow: boolean;

  /** FormGroup for fields in Email Login Form */
  loginFormGroup: FormGroup;

   /** FormGroup for fields in Mobile Login Form */
  mobileLoginFormGroup: FormGroup;

  /**ENUM for login modes */
  enumForLoginMode = EnumForLoginMode;

  /** String to store login mode selected by user */
  selectedLoginMode: string = this.enumForLoginMode.EMAIL_PASSWORD

  /** Boolean to store if user reached verification phase */
  verifyPhase: boolean = false;

  /** String to handle captcha Image */
  captchaImage: string;
  /** String to handle captcha UUID*/
  captchaUUID: string;
  /** String to handle captcha Input */
  captchaInput: string;

  /**Array holding Country Code Data */
  countryCodeList: string[] = [];

  /**Boolean for checking google login */
  isGoogleLogin: boolean = false;

  subs: Subscription;

  constructor(public utilsService: UtilsService, public fb: FormBuilder, public serverVariableService: ServerVariableService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit() {

    this.captchaGeneration();
    this.flagForPasswordHideShow = true;
    this.loginForm();
    this.loginFormMobile();
    this.getMobileCountryCode();
    this.verifyPhase = false;

    /**Handling google login by subscribe to get current logged in user data */
    this.subs = this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        console.log(user);
        this.isGoogleLogin = true;
        this.onGoogleLogin(user.email, user.id)
      }
    });
  }

  /** Captcha Generated function on page load */
  captchaGeneration() {

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

    const param = {
      uuId: this.captchaUUID,
      hiddenCaptcha: this.captchaInput
    }

    this.utilsService.getMethodAPI(true, this.utilsService.serverVariableService.CAPTCHA_VERIFICATION, param, (response) => {
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

    this.utilsService.getMethodAPI(true, this.utilsService.serverVariableService.CAPTCHA_REGENERATE, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.captchaUUID = response.uuid
        this.captchaImage = response.realCaptcha
      }
    })

  }

  /**Validating fields on page load */
  loginForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_EMAIL)])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  /**Validating fields on page load for mobile login */
  loginFormMobile() {
    this.mobileLoginFormGroup = this.fb.group({
      country_code: [null, Validators.compose([Validators.required])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])]
    })
  }

  /** 
   * Called on login mode change
   * @param mode Selected Login Mode string
  */
  onChangeLoginMode(mode: string) {
    this.selectedLoginMode = mode;
    this.mobileLoginFormGroup.reset();
    this.loginFormGroup.reset();
    this.mobileLoginObj.phone = null;
  }

  /** Login w/ email and password */
  onEmailPasswordLogin() {

    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    } 

    const formGroupValue = this.loginFormGroup.value;

    const param = {
      email: formGroupValue.email,
      password: formGroupValue.password,
      type: this.enumForLoginMode.EMAIL_PASSWORD,
      uuid: this.captchaUUID,
    }

    this.utilsService.postMethodAPI(true, this.serverVariableService.LOGIN_API, param, (response) => {

      if(!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        console.log(response);
        const loginResponse = Deserialize(response);
        this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
          this.utilsService.redirectTo('/customer/dashboard');
        })
      }
    })

  }

  /** 
   * Login with Google
   * @param email Email sent as request
   * @param googleId GoogleID to be sent as request acquired from google login
  */
  onGoogleLogin(email: string, googleId: string) {

    const param = {
      email: email,
      uuid: this.captchaUUID,
      googleId: googleId,
      type: this.enumForLoginMode.GOOGLE_LOGIN
    }

    this.utilsService.postMethodAPI(true, this.serverVariableService.LOGIN_API, param, (response) => {

      if(!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        console.log(response);
        const loginResponse = Deserialize(response);
        this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
          this.utilsService.redirectTo('/customer/dashboard');
        })
      }
    })

  }

  /** Mobile Login function*/
  onMobileOTPLogin() {

    if(this.mobileLoginFormGroup.invalid) {
      this.mobileLoginFormGroup.markAllAsTouched();
      return;
    } 

    const formGroupValue = this.mobileLoginFormGroup.value;

    const param = {
      phoneNo: formGroupValue.mobile_no,
      countryCode: formGroupValue.country_code,
      type: this.enumForLoginMode.MOBILE_LOGIN,
      uuid: this.captchaUUID,
    }

    this.utilsService.getMethodAPI(true, this.utilsService.serverVariableService.SEND_OTP_MOBILE, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.verifyPhase = true;
      }
    })
  }

  /** OTP Verification Phase */
  onMobileLoginVerification() {

    if (this.otpValue?.length === 6) {
      const param = {
        phoneNo: this.mobileLoginObj.phone,
        otp: this.otpValue
      }
  
      this.utilsService.postMethodAPI(true, this.serverVariableService.MOBILE_LOGIN_VERIFICATION, param, (response) => {
  
        if(!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
          console.log(response);
          const loginResponse = Deserialize(response);
          this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
            this.utilsService.redirectTo('/customer/dashboard');
          })
        }
      })
    }


  }

  /**Resend OTP function */
  onResendOTP() {
    this.ngOtpInput.setValue('')
    this.otpValue = '';
    this.onMobileOTPLogin();
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
      this.verifyPhase = false;
      this.mobileLoginFormGroup.reset();
      this.loginFormGroup.reset();
      this.mobileLoginObj.phone = null;
    }
    else {
      this.verifyPhase = false;
      this.loginFormGroup.reset();
      this.selectedLoginMode = this.enumForLoginMode.MOBILE_LOGIN
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if(this.isGoogleLogin) {
      this.socialAuthService?.signOut();   
    }
  }

}
