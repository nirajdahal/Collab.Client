import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/@core/services/auth.service';

import { User } from '../../../models/user';
import { I18nService } from 'ng-devui/i18n';

@Component({
  selector: 'da-header-operation',
  templateUrl: './header-operation.component.html',
  styleUrls: ['./header-operation.component.scss'],
})
export class HeaderOperationComponent implements OnInit {
  user: string="";
  
  haveLoggedIn = false;

  constructor(
    private route: Router,
    private authService: AuthService,
    
    private i18n: I18nService
  ) {}

  ngOnInit(): void {

    let isUserAuthenticated = this.authService.isUserAuthenticated();

    if(isUserAuthenticated){

      this.haveLoggedIn = true;
      this.user = this.authService.getCurrentUserName()
    }
    else {
      this.haveLoggedIn = false;
      this.authService.logout();
      this.route.navigate(['/', 'login']);
    }

    
  }

  onSearch(event: any) {
    console.log(event);
  }

  

  handleUserOps(operation: string) {
    switch (operation) {
      case 'logout': {
        this.haveLoggedIn = false;
        this.authService.logout();
        this.route.navigate(['/', 'login']);
        break;
      }
      default:
        break;
    }
  }
}
