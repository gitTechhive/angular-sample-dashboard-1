import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Deserialize } from 'cerialize';
import { ResponseWrapperDTO } from 'src/app/models/response/ResponseWrapperDTO';
import { ServerVariableService } from './server-variable.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /** Variable to store the user's profile picture for display in navbar*/
  userProfilePicture: string;

  /** Variable to store the username for display in navbar*/
  username: string;

  /**List of API endpoints where the token is not required in the request header*/
  apisExcludingToken: string[] = [];

  /**Initial configuration settings for the toast notifications*/
  toastConfig = {
    disableTimeout: false,    
    timeoutDuration: 10000,   
    positionClass: 'toast-top-center',  
    closeButtonEnabled: true 
  };

  /** Variable for showing loader*/
  showLoader = 0;

  constructor(public http: HttpClient, public router: Router, public toasterService: ToastrService, public serverVariableService: ServerVariableService,) { }

  /**
   * Handles a POST request to an API endpoint.
   * 
   * @param isDisplayToast Indicates whether to display toast messages on response.
   * @param apiName The name or URL of the API endpoint.
   * @param params The parameters to be sent with the POST request.
   * @param callback Response from server
   * @param isCallbackRequired Indicates whether a callback function is required.
   * @param noLoaderRequire Indicates whether to skip showing loader.
 */
  postMethodAPI(isDisplayToast: boolean, apiName: any, params: any, callback: (response: any, isRoute: boolean) => void, isCallbackRequired?: boolean, noLoaderRequire?: boolean): Subscription {
    this.showLoader++;
    if (noLoaderRequire) {
      this.showLoader--;
    }
    this.customJsonInclude(params);
    let headers = new HttpHeaders();
    if (this.apisExcludingToken.indexOf(apiName) < 0) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    apiName = environment.API_URL + apiName;

    /**
     * Subscribing to observable
     */
    return this.http.post(apiName, params, { headers, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (this.showLoader > 0) {
          this.showLoader--;
        }

        /**
         *Response from the server
         */
        const serverResponse: ResponseWrapperDTO = Deserialize(response.body, ResponseWrapperDTO);

        // Validates successful server response status (200-299).
        // If successful, optionally displays a success toast and executes callback.
        if (!(serverResponse.status < 200 || serverResponse.status >= 300)) {
          if (isDisplayToast) {
            this.toasterService.success(serverResponse.message, '', {
              positionClass: 'toast-top-right',
              closeButton: true
            });
          }
          if (isCallbackRequired) {
            callback(serverResponse, true);
          } else {
            callback(serverResponse.data, true);
          }
        }

      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toasterService.error('Unable to Connect with server, Please check your internet connectivity or wait for the network to establish the connection.', '', this.toastConfig);
        }
        else {
          const errorDTO = Deserialize(error.error, ResponseWrapperDTO);

          if (errorDTO.status === 403) {
            this.goToSessionExpired();
          } else if (errorDTO.status === 500) {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          } else {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
            if (isCallbackRequired) {
              callback(errorDTO.message, true);
            }
          }
        }
        this.showLoader--;
      }
    })
  }

    /**
   * Handles a GET request to an API endpoint.
   * 
   * @param apiName The name or URL of the API endpoint.
   * @param params The parameters to be sent with the GET request.
   * @param callback Response from server
   * @param noLoaderRequire Indicates whether to skip showing loader.
  */
  getMethodAPI(apiName: any, params: any, callback: (response: any) => void, noLoaderRequire?: boolean): Subscription {
    this.showLoader++;
    if (noLoaderRequire) {
      this.showLoader--;
    }
    let httpParams = new HttpParams();
    if (!this.isNullUndefinedOrBlank(params)) {
      Object.keys(params).forEach(key => {
        if (key && params[key] && params.hasOwnProperty(key) && !this.isEmptyObjectOrNullUndefined(params[key])) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    let headers = new HttpHeaders();
    if (this.apisExcludingToken.indexOf(apiName) < 0) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    apiName = environment.API_URL + apiName;

    /**
     * Subscribing to observable
     */
    return this.http.get(apiName, { params: httpParams, headers, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (this.showLoader > 0) {
          this.showLoader--;
        }

        /**
         *Response from the server
          */
        const serverResponse: ResponseWrapperDTO = Deserialize(response.body, ResponseWrapperDTO);

        // Validates successful server response status (200-299).
        // If successful, optionally displays a success toast and executes callback.
        if (!(serverResponse.status < 200 || serverResponse.status >= 300)) {
          this.toasterService.error(serverResponse.message, '', this.toastConfig);
        }
        else {
          callback(serverResponse.data);
        }

      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toasterService.error('Unable to Connect with server, Please check your internet connectivity or wait for the network to establish the connection.', '', this.toastConfig);
        }
        else {
          const errorDTO = Deserialize(error.error, ResponseWrapperDTO);

          if (errorDTO.status === 403) {
            this.goToSessionExpired();
          } else if (errorDTO.status === 500) {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          } else {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          }
        }
        this.showLoader--;
      }
    })
  }

  /**
   * Handles a PUT request to an API endpoint.
   * @param isDisplayToast Indicates whether to display toast messages on response.
   * @param apiName The name or URL of the API endpoint.
   * @param id
   * @param params The parameters to be sent with the PUT request.
   * @param callback Response from server
   * @param noLoaderRequire Indicates whether to skip showing loader.
   * @param isCallbackRequired Indicates whether a callback function is required.
 */
  putMethodAPI(isDisplayToast: boolean, apiName: any, params: any, id: any, callback: (responseData: any, isRoute: boolean) => void, isCallbackRequired?: boolean): Subscription {
    this.showLoader++;
    let headers = new HttpHeaders();
    if (this.apisExcludingToken.indexOf(apiName) < 0) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    apiName = id ? (environment.API_URL + apiName + '/' + id) : environment.API_URL + apiName;

    /**
     * Subscribing to observable
     */
    return this.http.put(apiName, params, { headers, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (this.showLoader > 0) {
          this.showLoader--;
        }

        /**
         *Response from the server
         */
        const serverResponse: ResponseWrapperDTO = Deserialize(response.body, ResponseWrapperDTO);

        // Validates successful server response status (200-299).
        // If successful, optionally displays a success toast and executes callback.
        if (!(serverResponse.status < 200 || serverResponse.status >= 300)) {
          if (isDisplayToast) {
            this.toasterService.success(serverResponse.message, '', {
              positionClass: 'toast-top-right',
              closeButton: true
            });
          }
          callback(serverResponse.data, true);
        }

      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toasterService.error('Unable to Connect with server, Please check your internet connectivity or wait for the network to establish the connection.', '', this.toastConfig);
        }
        else {
          const errorDTO = Deserialize(error.error, ResponseWrapperDTO);

          if (errorDTO.status === 403) {
            this.goToSessionExpired();
          } else if (errorDTO.status === 500) {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          } else {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
            if (isCallbackRequired) {
              callback(errorDTO.message, true);
            }
          }
        }
        this.showLoader--;
      }
    })
  }

  /**
   * Handles a DELETE request to an API endpoint.
   * @param isDisplayToast Indicates whether to display toast messages on response.
   * @param apiName The name or URL of the API endpoint.
   * @param params The parameters to be sent with the DELETE request.
   * @param callback Response from server
  */
  deleteMethodAPI(isDisplayToast: boolean, apiName: any, params: any, callback: (response: any) => void): Subscription {
    this.showLoader++;
    let headers = new HttpHeaders();
    if (this.apisExcludingToken.indexOf(apiName) < 0) {
      headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    apiName = environment.API_URL + apiName;

    /**
     * Subscribing to observable
     */
    return this.http.delete(apiName, { headers, observe: 'response', body: params },).subscribe({
      next: (response: HttpResponse<any>) => {
        if (this.showLoader > 0) {
          this.showLoader--;
        }

        /**
         *Response from the server
         */
        const serverResponse: ResponseWrapperDTO = Deserialize(response.body, ResponseWrapperDTO);

        // Validates successful server response status (200-299).
        // If successful, optionally displays a success toast and executes callback.
        if (!(serverResponse.status < 200 || serverResponse.status >= 300)) {
          if (isDisplayToast) {
            this.toasterService.success(serverResponse.message, '', {
              positionClass: 'toast-top-right',
              closeButton: true
            });
          }
          callback(serverResponse.data);
        }

      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toasterService.error('Unable to Connect with server, Please check your internet connectivity or wait for the network to establish the connection.', '', this.toastConfig);
        }
        else {
          const errorDTO = Deserialize(error.error, ResponseWrapperDTO);

          if (errorDTO.status === 403) {
            this.goToSessionExpired();
          } else if (errorDTO.status === 500) {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          } else {
            this.toasterService.error(errorDTO.error ? errorDTO.message : errorDTO.message, '', this.toastConfig);
          }
        }
        this.showLoader--;
      }
    })
  }

  /**
   * Retrieves the authentication token from the local storage.
   * 
   * @returns {string | null} The authentication token if it exists in the local storage, otherwise null.
   */

  getToken(): string | null {
    return localStorage.getItem('token') ? localStorage.getItem('token') : null;
  }

  /**
   * Checks if a value, array, object, string, or any other type, contains any elements that are either null, undefined, blank, or empty objects.
   * 
   * @param {any} value - The value to be checked.
   * @returns {boolean} True if the value contains null, undefined, blank, or empty objects; otherwise, false.
   */

  isEmptyObjectOrNullUndefined(...value): boolean {
    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        if (this.isNullUndefinedOrBlank(value[i]) || this.isEmptyObject(value[i])) {
          return true;
        }
      }
    }
    return false;
  }

  /** 
  *
  * Used to check if Object is empty, undefined or blank!
  * @param obj Object which needs to be checked
  * @returns {boolean} True if object is empty, undefined or blank.
  */
  isNullUndefinedOrBlank(obj): boolean {
    if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
      return true;
    }
    return false;
  }

  /** 
  *
  * Used to check if Object is empty or not..!
  * @param obj Object which needs to be checked
  * @returns {boolean} True if object is empty.
  */
  isEmptyObject(obj): boolean {
    return (obj && (Object.keys(obj).length === 0));
  }

  /**
   * Redirects to the specified route.
   * @param route - Contains Route path segments.
   *                Example: ['/dashboard', '/profile']
   */
  redirectTo(...route): void {
    this.router.navigate(route);
  }

  /**
  * This Method Is Use For Remove Blank And Null Key From Object.
  * @param obj - Object in which blank or null keys to be removed.
  */
  customJsonInclude(obj): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (obj[key] && obj[key].length > 0) {
          obj[key] = this.removeEmptyElementsFromArray(obj[key]);
        }
        if (this.isEmptyObject(obj[key])) {
          delete obj[key];
        } else {
          this.customJsonInclude(obj[key]);
        }
      } else {
        if (obj[key] === undefined || obj[key] === null) {
          delete obj[key];
        }
      }
    }
  }

  /**
  * Method used to remove Empty Element From Array
  * @param arr  Selected Array.
  */
  removeEmptyElementsFromArray(arr): Array<any> {
    let index = -1;
    const arr_length = arr ? arr.length : 0;
    let resIndex = -1;
    const result = [];

    while (++index < arr_length) {
      const id = arr[index];
      if (id) {
        result[++resIndex] = id;
      }
    }
    return result;
  }

  /**
   * Function to retrieve logged-in user data from local storage
   */
  getLoggedInUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null) {
      return userData;
    }
  }

  /**
   * Function to retrieve a new refresh token from the server.
   */
  getRefreshToken() {

    const param = {}

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.getToken()}`);

    return this.http.post(environment.API_URL + this.serverVariableService.REFRESH_TOKEN, param, {headers})
  }

  /** 
  *
  * Used to decode token to get information
  * @param token Token which needs to be decoded
  * @returns {any} Returns information extracted from the token.
  */
  decodeToken(token): any {
    if (!this.isNullUndefinedOrBlank(token)) {
      const jwt = token.split('.')[1];
      const decodedJwtJsonData = JSON.parse(window.atob(jwt));
      return decodedJwtJsonData;
    }
  }

  /**
  * Clears Local Storage and Log out.
  */
  logout(): void {
    this.userProfilePicture = null;
    this.username = null;
    localStorage.clear();
    this.redirectTo('/auth/login');
  }

  /**
   * Stores data in the local storage with the provided key.
   * @param {string} key - The key under which the data will be stored in local storage.
   * @param {any} data - The data to be stored.
   */
  storeDataLocally(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  /**
   * Clear data in the local storage with the provided key.
   * @param {string} key - The key under which the data to be removed.
   */
  clearDataLocally(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Formats a time string in 24-hour format to 12-hour format with AM/PM indication.
   * @param {string} timeString - The time string in the format "HH:MM" (24-hour format).
   * @returns {string} The formatted time string in the format "HH:MM AM/PM" (12-hour format).
  */
  formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }
  
  /**
  * Redirect to Session Expired Page
  */
  goToSessionExpired() {
    this.redirectTo('/session-expired');
  }

  /**
  * Redirect to Access Denied Page
  */
  goToAccessDenied() {
    this.redirectTo('/access-denied');
  }



}
 