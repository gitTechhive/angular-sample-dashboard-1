import { ChangeDetectorRef, Component } from '@angular/core';
import { UtilsService } from './shared/services/utils.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sample-dashboard-1';

  ngAfterContentChecked() { this.cd.detectChanges() }

  constructor(public utilsService: UtilsService, public cd: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    
  }
}

