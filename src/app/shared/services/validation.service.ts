import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  /* MAX Length Variables*/
  MAX_30 = 30;
  MAX_2000 = 2000;
  MAX_200 = 200;
  MAX_100 = 100;
  MAX_60 = 60;
  MAX_20 = 20;
  MAX_10 = 10;
  MAX_15 = 15;
  MAX_4 = 4;
  MAX_5 = 5;
  MAX_3 = 3;
  MAX_32 = 32;
  MAX_50 = 50;
  MAX_300 = 300;
  MAX_13 = 13;
  MAX_6 = 6;
  MAX_7 = 7;
  MAX_8 = 8;
  MAX_11 = 11;
  MAX_12 = 12;
  MAX_25 = 25;
  PASSWORD = 32;

  /* Pattern use for Validation */

  ONLY_NUMBERS = '^[0-9]*$';
  ONLY_NUMBERS_AND_DOT = /^[0-9]+(?:\.[0-9]+)?$/;
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH_DIGIT = '^[a-zA-Z0-9- ]*$';
  PATTERN_FOR_DASH_DIGIT = '^[0-9.-]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH = '^[a-zA-Z- ]*$';
  PATTERN_FOR_ALPHABATES_AND_SPACE_AND_ROUND_BRACKETS = '^([a-zA-Z()][a-zA-Z() ]*)';
  PATTERN_FOR_NUMBER = '^[0-9]*$';
  LAB_MASTER_NAME = /.*\S.*/;
  ONLY_SPACE_NOT_ALLOW = /.*\S.*/;
  PATTERN_FOR_EMAIL = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,50}';

  //Pattern for Password for 6 characters,one upper case letter,lower case letter,digit and special character like *,@,$. 
  PATTERN_FOR_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,32}$/;

  /* End pattern use for validation */
  

  /* Validation Messages */

  EMAIL_REQUIRED = 'Email is required!';
  EMAIL_INVALID = 'Please enter valid Email.';
  PHONE_NUMBER_REQUIRED = 'Phone Number is required!';
  PHONE_NUMBER_INVALID = 'Please enter valid Phone Number.';
  PASSWORD_REQUIRED = 'Password is required!';
  CURRENT_PASSWORD_REQUIRED = 'Current Password is required!';
  NEW_PASSWORD_REQUIRED = 'New Password is required!';
  CONFIRM_PASSWORD_REQUIRED = 'Confirm Password is required!';
  CONFIRM_NEW_PASSWORD_REQUIRED = 'Confirm New Password is required!';
  PASSWORD_NOT_MATCHED = 'Password and Confirm new password not equal.';
  CONFIRM_PASSWORD_NOT_MATCHED = 'Password and Confirm password not equal.';
  PASSWORD_INVALID = 'Should contains atleast 6 characters,one upper case letter,lower case letter,digit and special character like *,@,$.'
  COUNTRY_CODE_REQUIRED = 'Country Code is required!';
  FIRST_NAME_REQUIRED = 'First Name is required!'
  LAST_NAME_REQUIRED = 'Last Name is required!'

  // Document Related Validation Messages
  DOCUMENT_REQUIRED = 'Document is required!';
  DOCUMENT_MAX_FILE_SIZE = 'The Document size must be less than';
  ATTACHMENT_MAX_FILE_SIZE = 'The Attachment size must be less than';
  DOCUMENT_INVALID_EXTENSION = 'Please select valid Document.';
  IMAGE_MAX_FILE_SIZE = 'The Image size must be less than';
  IMAGE_INVALID_EXTENSION = 'Please select valid Image.';
  FILE_INVALID_EXTENSION = 'Please select valid File.';
  
  /* End of Validation Messages */

constructor() { }

}
