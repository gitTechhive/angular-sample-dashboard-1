import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthHeaderSigninComponent } from './components/auth-header-signin/auth-header-signin.component';
import { AuthHeaderSignupComponent } from './components/auth-header-signup/auth-header-signup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NavbarComponent,
    NotFoundComponent,
    SessionExpiredComponent,
    AuthHeaderComponent,
    AuthHeaderSigninComponent,
    AuthHeaderSignupComponent,
    SidebarComponent,
    PaginationComponent,
  ],
  declarations: [AccessDeniedComponent, NavbarComponent, NotFoundComponent, SessionExpiredComponent, SidebarComponent, AuthHeaderComponent, AuthHeaderSigninComponent, AuthHeaderSignupComponent, SidebarComponent, PaginationComponent]
})

export class SharedModule {

  /*** This static forRoot block (provides and configures services) is
  * used in case of when we want use some services in one or more components.
  */
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}

