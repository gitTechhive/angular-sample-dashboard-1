import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

/** Customer Child Routes*/
const routes: Routes = [
  {
    path: '', component: CustomerComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
  // { path: '', redirectTo: 'work_area', pathMatch: 'full' },
  // {
  //   path: 'work_area', component: CustomerComponent, children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'my-profile', component: MyProfileComponent },
  //   ]
  // }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerComponent, DashboardComponent, MyProfileComponent]
})
export class CustomerModule { }
