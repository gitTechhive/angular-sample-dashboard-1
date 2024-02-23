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
  REGISTRATION_API = this.PATH_FOR_API + '';

  //REFRESH TOKEN
  REFRESH_TOKEN = this.PATH_FOR_API + '';

  //DROPDOWN
  COUNTRY_CODE_DROPDOWN = this.PATH_FOR_API + 'master/CountriesDropdownFlag'

}
