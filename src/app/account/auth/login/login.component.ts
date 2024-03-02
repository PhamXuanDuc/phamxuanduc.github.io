import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  hidePassword = true;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute, private router: Router,
      private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // reset login status
    this.authenticationService.logout();

    document.body.style.backgroundImage = 'url(\'assets/images/background.png\')';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100% 100%';
    // document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = '#FFFFFF';
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'None';
    document.body.style.backgroundColor = 'transparent';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.loading = false;
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = error.error ? error.error.message : error;
      this.loading = false;
    });
  }
}
