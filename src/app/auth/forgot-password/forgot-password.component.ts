import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { EnumForForgotPasswordStep } from 'src/app/shared/enums/EnumForForgotPasswordStep.enum';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false}) ngOtpInputRef: ElementRef;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;

  /** FormGroup for forgot password form*/
  forgotPassForm: FormGroup;

  /** FormGroup for reset password form*/
  passwordForm: FormGroup;

  /**ENUM for Forgot Password Steps */
  enumForForgotPasswordStep = EnumForForgotPasswordStep;

  /** boolean to show/hide password */
  flagForPasswordHideShow: boolean = true;

  /** boolean to show/hide confirm password */
  flagForConfirmPasswordHideShow: boolean = true;

  /**Config for OTP */
  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true
  }

  /**Obj to Store Email*/
  userOb = {
    email: null
  };

  /**Variable to Store OTP Value */
  otpValue: any;

  /**Variable to store the current step in forgot password */
  forgotPasswordStep: string = this.enumForForgotPasswordStep.EMAIL;

  /**Request ID string */
  requestId: string;

  constructor(public utilsService: UtilsService, public fb: FormBuilder) { }

  ngOnInit() {

    this.forgotForm();
    this.newPasswordForm();
  }

  /**
   * Initializes the form for verifying email.
   * It sets up form controls for email
   * along with necessary validators.
   */
  forgotForm(): void {
    this.forgotPassForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_EMAIL)])],
    })
  }

  /**
   * Function to generate OTP for password reset.
   * It validates the email and sends an email verification request
   * to initiate the OTP generation process.
   */
  otpGeneration() {

    if (this.forgotPassForm.invalid) {
      this.forgotPassForm.markAllAsTouched();
      return;
    }

    const param = {
      email: this.userOb.email
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.FORGOT_PASSWORD_EMAIL_VERIFY, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.forgotPasswordStep = this.enumForForgotPasswordStep.OTP_PHASE
        this.requestId = response.requestId
      }
    })
  }

  /**
   * Initializes the form for setting a new password.
   * It sets up form controls for password and confirm password fields
   * along with necessary validators.
   */
  newPasswordForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_PASSWORD)])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, { validators: this.checkPasswords })
  }

  /**
   * Changes the step of the forgot password process.
   * @param value The new step to transition to.
   */
  onChangeStep(value: string) {
    this.forgotPasswordStep = value
  }

  /**
   * Custom validator to check if password and confirm password fields match.
   * @param group The form control group containing password and confirm password fields.
   * @returns Validation errors if passwords do not match, otherwise null.
   */
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password').value;
    let confirm_password = group.get('confirm_password').value
    return password === confirm_password ? null : { confirmed_check: true }
  }

  /**
   * Function to handle OTP submission.
   * If the response is valid, it proceeds to the next step of setting the password.
   */
  onSubmitOTP() {

    if (this.otpValue?.length === 6) {

      const param = {
        email: this.userOb.email,
        otp: this.otpValue,
        requestId: this.requestId
      };

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.FORGOT_PASSWORD_OTP_VERIFICATION, param, (response) => {
        if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
          this.forgotPasswordStep = this.enumForForgotPasswordStep.SET_PASSWORD;
        }
      })
    }
  }

  /**
   * Event handler for OTP input change.
   * It updates the OTP value based on the event.
   * @param event The event containing the new OTP value.
   */
  onOtpChange(event) {
    this.otpValue = event;
  }

  /**
   * Function to resend OTP.
   * It resets the OTP input and value, then triggers OTP generation again.
   */
  resendOtp() {
    this.ngOtpInput.setValue('')
    this.otpValue = '';
    this.otpGeneration();
  }

  /**
   * Function to handle password change.
   * It validates the password form and sends a request to change the password.
   * If the response is valid, it moves to the success page.
   */
  changePassword() {

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const passwordForm = this.passwordForm.value;

    const param = {
      email: this.userOb.email,
      password: passwordForm.password,
    };

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.CHANGE_PASSWORD, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.forgotPasswordStep = this.enumForForgotPasswordStep.SUCCESS_PAGE;
      }
    })
  }

}
