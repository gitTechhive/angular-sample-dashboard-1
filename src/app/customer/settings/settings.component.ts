import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Deserialize, Serialize } from 'cerialize';
import { UserMaster } from 'src/app/models/UserMaster';
import { ServerVariableService } from 'src/app/shared/services/server-variable.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // for profile pic
  @ViewChild('profilePic')
  profilePic: ElementRef;
  filenameForuserProfile: string;
  flagForInvalidDocSize = false;
  flagForInvalidExtension = false;
  selectedProfilePic: File = null;
  profile_url: any;

  countryList = new Array();
  stateList = new Array();
  cityList = new Array();
  countryCodeList = new Array();

  profileDetails = new UserMaster();
  accountForm: FormGroup; 
  passwordForm: FormGroup;

  constructor(public utilsService: UtilsService, public fb: FormBuilder, public serverVariableService: ServerVariableService,) { }

  ngOnInit() {

    this.getProfileDetails();
    this.accountFormGroup();

    this.getMobileCountryCode();
    this.getCountry();

    this.passwordForm = this.fb.group({
      current_password: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_PASSWORD)])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, { validators: this.checkPasswords })
  }

  getProfileDetails() {

    const param = {}

    this.utilsService.getMethodAPI(false, this.serverVariableService.GET_PROFILE_DETAILS, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.profileDetails = Deserialize(response, UserMaster);

        if (this.profileDetails.country_id) {
          this.getCountryState(this.profileDetails.country_id);
        }
        if (this.profileDetails.state_id) {
          this.getCityByState(this.profileDetails.state_id);
        }

        if(this.profileDetails.profilePicUrl) {
          this.profile_url = this.profileDetails.profilePicUrl
        }
      }
    })

  }

  accountFormGroup() {
    this.accountForm = this.fb.group({
      first_name: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.ONLY_SPACE_NOT_ALLOW)])],
      last_name: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.ONLY_SPACE_NOT_ALLOW)])],
      mobile_no: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_EMAIL)])],
      address: ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.ONLY_SPACE_NOT_ALLOW)])],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      pin_code: ['', Validators.compose([Validators.required])],
      country_code: [null, Validators.compose([Validators.required])],
      bio: ['', Validators.compose([Validators.required])],
    })
  }

  // City, Country, State

  getCountry() {

    const param = {};
    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.COUNTRIES_DROPDOWN, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.countryList = response;
      }
    })

  }
  
  getCountryState(id) {

    const param = {
      country_id: String(id)
    }

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.STATES_DROPDOWN, param, (response) => {

      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.stateList = response
      }
    })

  }

  getCityByState(id) {

    const param = {
      state_id: String(id)
    }

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CITIES_DROPDOWN, param, (response) => {

      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.cityList = Deserialize(response)
      }
    })

  }

  onChangeCountry(obj: any) {

    this.profileDetails.state_id = null;
    this.profileDetails.cities_id = null;
    if (this.utilsService.isEmptyObjectOrNullUndefined(obj)) {

      this.stateList = new Array<any>();
      this.cityList = new Array<any>();
      return;
    }
    this.getCountryState(obj.value);
  }

  onChangeState(obj: any) {

    this.profileDetails.cities_id = null;
    if (this.utilsService.isEmptyObjectOrNullUndefined(obj)) {

      this.cityList = new Array<any>();
      return;
    }
    this.getCityByState(obj.value);
  }

  updateProfile() {

    const formData = new FormData();

    if (this.selectedProfilePic) {
      formData.set('profilePic', this.selectedProfilePic);
      this.profileDetails.profilePicUrl = null
    }

    formData.set('userInfo', JSON.stringify(Serialize(this.profileDetails)));

    if(!(this.flagForInvalidExtension || this.flagForInvalidDocSize)) {

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.UPDATE_PROFILE, formData, (response) => {

          this.getProfileDetails();

          setTimeout(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            userData.first_name = this.profileDetails.firstName
            userData.last_name = this.profileDetails.lastName
            userData.profile_pic_url = this.profileDetails.profilePicUrl
            this.utilsService.storeDataLocally('userData', JSON.stringify(userData))

            this.utilsService.username = `${userData.first_name} ${userData.last_name}`;
            this.utilsService.userProfilePicture = userData.profile_pic_url;
          }, 150);


          this.selectedProfilePic = null;
          this.filenameForuserProfile = null;
      })
    }

  }

  onSelectProfile(event): void {

    if (event.target.files && event.target.files[0]) {
      this.flagForInvalidExtension = false;
      this.flagForInvalidDocSize = false;
      const reader = new FileReader();
      const max_file_size = 5242880;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const ext = selectedFile.name.substr(selectedFile.name.lastIndexOf('.') + 1);
        const ext1 = (ext).toLowerCase();

        if (ext1 === 'jpeg' || ext1 === 'png' || ext1 === 'jpg') {
          if (max_file_size < selectedFile.size) {
            this.flagForInvalidDocSize = true;
            this.filenameForuserProfile = '';
            this.profileDetails.profilePicUrl = 'assets/images/avatar-default.svg';
            this.profile_url = 'assets/images/avatar-default.svg';
            this.selectedProfilePic = undefined;
          } else {
            this.filenameForuserProfile = event.target.files[0].name;
            this.selectedProfilePic = event.target.files[0];
            this.profile_url = URL.createObjectURL(selectedFile);
          }
        } else {
          this.flagForInvalidExtension = true;
          this.filenameForuserProfile = '';
          this.selectedProfilePic = undefined;
          this.profileDetails.profilePicUrl  = 'assets/images/avatar-default.svg';
          this.profile_url = 'assets/images/avatar-default.svg';
        }
      }

    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let password = group.get('password').value;
    let confirm_password = group.get('confirm_password').value
    return password === confirm_password ? null : { confirmed_check: true }
  }

  changePassword() {

    const passwordForm = this.passwordForm.value;

    const param = {
      oldPassword: passwordForm.current_password,
      newPassword: passwordForm.password,
    };

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.UPDATE_PROFILE_PASSWORD, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.getProfileDetails();
        this.passwordForm.reset();
      }
    })

  }

  getMobileCountryCode() {

    const param = {};
    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.COUNTRY_CODE_DROPDOWN, param, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefined(response)) {
        this.countryCodeList = Deserialize(response);
      }
    })

  }

}
