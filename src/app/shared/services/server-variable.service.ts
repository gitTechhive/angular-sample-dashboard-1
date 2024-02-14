import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariableService {

  PATH_FOR_API = '';

  // AUTH
  LOGIN_API = this.PATH_FOR_API + '';
  REGISTRATION_API = this.PATH_FOR_API + '';

  //REFRESH TOKEN
  REFRESH_TOKEN = this.PATH_FOR_API + '';

}
