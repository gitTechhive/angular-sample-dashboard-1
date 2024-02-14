import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private utilsService: UtilsService, private router: Router) {}

  canActivate(): boolean {

    // Check if the logged-in user is empty, null, or undefined
    if (this.utilsService.isEmptyObjectOrNullUndefined(this.utilsService.getLoggedInUser())) {
      this.router.navigate(['/auth/login']);
      return false; // Return false if user is not authenticated and redirects to Login Page
    }
    return true; // Return true if user is authenticated
  }
}
