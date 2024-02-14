import { ChangeDetectorRef, Component } from '@angular/core';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sample-dashboard-1';

  ngAfterContentChecked() { this.cd.detectChanges() }

  constructor(public utilsService: UtilsService, public cd: ChangeDetectorRef) {}

  ngOnInit(): void { 
    
  }
}

