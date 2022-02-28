import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { I18nService } from 'ng-devui/i18n';
import { Subject } from 'rxjs';
import { DValidateRules } from 'ng-devui';

import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/@core/services/auth.service';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { ThemeType } from '../../models/theme';
import { FormLayout } from 'ng-devui/form';
import { environment } from 'src/environments/environment';
import { UserForAuthenticationDto } from '../../models/users/userForAuthenticationDto';


@Component({
  selector: 'da-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject();


  showPassword = false;
  horizontalLayout: FormLayout = FormLayout.Horizontal;

  toastMessage: any;





  formData = {
    userAccount: 'dahnee26@gmail.com',
    userAccountPassword: 'Needah@123',
    userEmail: 'dahnee26@gmail.com',
    userEmailPassword: 'Needah@123'
  };

  formRules: { [key: string]: DValidateRules } = {
    usernameRules: {
      validators: [
        { required: true },
        { minlength: 3 },
        { maxlength: 20 },
        {
          pattern: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/,
          message: 'The user name cannot contain characters except uppercase and lowercase letters.',
        },
      ]
    },
    emailRules: {
      validators: [
        { required: true },
        { email: true },
      ],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
  };



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,

    private i18n: I18nService,
    private personalizeService: PersonalizeService
  ) {

  }

  ngOnInit(): void {

    this.personalizeService.setRefTheme(ThemeType.Default);


  }

  onClick() {

    let user: UserForAuthenticationDto = {
      email: this.formData.userEmail,
      password: this.formData.userEmailPassword,
      clientURI: "http://localhost:4200"
    }
    this.authService
      .login(user)
      .subscribe(
        (res) => {
          this.authService.setSession(res);
          
          this.router.navigate(['/']);
        },
        (error) => {
          this.toastMessage = [
            {
              severity: 'error',
              summary: 'Login Failed',
              content: 'Please input correct username and password, username: admin@devui.com, password: devuiadmin'
            }
          ];
        }
      );


  }








}
