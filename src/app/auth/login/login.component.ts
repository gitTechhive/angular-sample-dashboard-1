import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deserialize } from 'cerialize';
import { EnumForLoginMode } from 'src/app/shared/enums/EnumForLoginMode.enum';
import { ServerVariableService } from 'src/app/shared/services/server-variable.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false}) ngOtpInputRef: ElementRef;

  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true
  }
  otpValue: any;

  /** boolean to show/hide password */
  flagForPasswordHideShow: boolean;

  /** FormGroup for fields in Login Form */
  loginFormGroup: FormGroup;

  enumForLoginMode = EnumForLoginMode;

  /** String to store login mode selected by user */
  selectedLoginMode: string = this.enumForLoginMode.EMAIL_PASSWORD

  /** Boolean to store if user reached verification phase */
  verifyPhase: boolean = false;

  captchaImage: string;
  captchaUUID: string;
  captchaInput: string;

  constructor(public utilsService: UtilsService, public fb: FormBuilder, public serverVariableService: ServerVariableService,) { }

  ngOnInit() {

    this.captchaGeneration();
    this.flagForPasswordHideShow = true;
    this.loginForm();
    this.verifyPhase = false;
  }

  captchaGeneration() {

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CAPTCHA_GENERATION, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.captchaImage = response.realCaptcha
        this.captchaUUID = response.uuid
      }
    })
  }

  captchaVerification() {

    const param = {
      uuId: this.captchaUUID,
      hiddenCaptcha: this.captchaInput
    }

    this.utilsService.getMethodAPI(true, this.utilsService.serverVariableService.CAPTCHA_VERIFICATION, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        console.log(response);
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

  /** 
   * function called on login mode change
   * @param mode Selected Login Mode string
  */
  onChangeLoginMode(mode: string) {
    this.selectedLoginMode = mode;
    this.loginFormGroup.reset();
  }

  onEmailPasswordLogin() {

    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    } 

    if(this.loginFormGroup.valid) {

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
            this.utilsService.redirectTo('customer/dashboard');
          })
        }
      })
    }

  }

  onOtpChange(event) {
    console.log(this.ngOtpInputRef);
    this.otpValue = event;
  }

  setLocalStorage(loginResponse, token) {

    const promise = new Promise((resolve, reject) => {
      try {
        this.utilsService.username = `${loginResponse.first_name} ${loginResponse.last_name}`;
        this.utilsService.userProfilePicture = loginResponse.profile_pic_url;
        this.utilsService.storeDataLocally('adminUser', JSON.stringify(loginResponse));
        this.utilsService.storeDataLocally('token', token);
        resolve('Success')
      }
      catch {
        reject()
      }
    });

    return promise;
  }

}
