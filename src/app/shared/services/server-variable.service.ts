import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariableService {

  PATH_FOR_API = '';

  // AUTH
  CAPTCHA_GENERATION = this.PATH_FOR_API + 'captcha/generate';
  CAPTCHA_VERIFICATION = this.PATH_FOR_API + 'captcha/verification';
  CAPTCHA_REGENERATE = this.PATH_FOR_API + 'captcha/reGenerate';
  SEND_OTP_MOBILE = this.PATH_FOR_API + 'sendOtpLoginPhoneNo';
  MOBILE_LOGIN_VERIFICATION = this.PATH_FOR_API + 'loginPhoneNo';
  LOGIN_API = this.PATH_FOR_API + 'login';
  REGISTRATION_SEND_OTP_API = this.PATH_FOR_API + 'users/sendOtp';
  REGISTRATION_API = this.PATH_FOR_API + 'users/'
  REGISTRATION_GOOGLE = this.PATH_FOR_API + 'users/singUpGoogle'

  //FORGOT PASSWORD
  FORGOT_PASSWORD_EMAIL_VERIFY = this.PATH_FOR_API + 'forgotPassOtpGeneratorAdmin';
  FORGOT_PASSWORD_OTP_VERIFICATION = this.PATH_FOR_API + 'forgotPassOtpVerificationAdmin';
  CHANGE_PASSWORD = this.PATH_FOR_API + 'forgotPwd';

  //DASHBOARD 
  DASHBOARD_CHARTS_API = this.PATH_FOR_API + 'charts/';

  //SETTINGS
  GET_PROFILE_DETAILS = this.PATH_FOR_API + 'users/getUserData';
  UPDATE_PROFILE = this.PATH_FOR_API + 'users/updateUser';
  UPDATE_PROFILE_PASSWORD = this.PATH_FOR_API + 'changePwd'

  //REFRESH TOKEN
  REFRESH_TOKEN = this.PATH_FOR_API + '';

  //DROPDOWN
  COUNTRY_CODE_DROPDOWN = this.PATH_FOR_API + 'master/countryCodes'
  COUNTRIES_DROPDOWN = this.PATH_FOR_API + 'master/countriesDropdown'
  STATES_DROPDOWN = this.PATH_FOR_API + 'master/StatesDropdown'
  CITIES_DROPDOWN = this.PATH_FOR_API + 'master/citiesDropdown'

}
