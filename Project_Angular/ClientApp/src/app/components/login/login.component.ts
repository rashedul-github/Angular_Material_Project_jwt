import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { LoginViewModel } from '../../models/view-models/login-view-model';
import { AuthenticationService } from '../../Services/authentication.service';
import { NotifyService } from '../../Services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  loginButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Sign in',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',

  };
  returnUrl: string;
  loginError: string;
  constructor(
    private authenticationService: AuthenticationService,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loginButtonOptions.active = true;
    const loginData = new LoginViewModel(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    );
    this.loginError = "";
    this.authenticationService.login(loginData)
      .subscribe(x => {
        console.log('done')
        this.loginButtonOptions.active = false;
        this.router.navigate([this.returnUrl]);
      },
        err => {
          this.loginError = "Login failed. Check username and password.."
          this.loginButtonOptions.active = false;
        });
  }
  ngOnInit() {
    //console.log(this.route.snapshot.queryParams);
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    console.log(this.returnUrl);
  }


}
