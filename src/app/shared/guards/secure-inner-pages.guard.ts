import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard {

  constructor(private utilsService: UtilsService, private router: Router) { }

  canActivate(): boolean {
    
    // Check if the logged-in user is not empty, null, or undefined
    if (!this.utilsService.isEmptyObjectOrNullUndefined(this.utilsService.getLoggedInUser())) {
      // Redirect to the customer dashboard to prevent access to the login page after login
      this.router.navigate(['/customer/dashboard']);
    }
    // Allow the route activation
    return true;
  }

}
