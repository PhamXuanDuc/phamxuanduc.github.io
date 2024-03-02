import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../../core/services/auth/auth.service";

@Component({
    selector: 'app-passwordreset',
    templateUrl: './passwordreset.component.html',
    styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit, AfterViewInit {

    resetForm: FormGroup;
    submitted = false;
    error = '';
    success = '';
    loading = false;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,) {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.resetForm.controls;
    }

    ngOnInit() {

        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });

        document.body.style.backgroundImage = 'url(\'assets/images/background.png\')';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100% 100%';
        // document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundColor = '#FFFFFF';
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
    }

    /**
     * On submit form
     */
    onSubmit() {
        this.success = '';
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }

        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this.success = 'We have sent you an email containing a link to reset your password';
        }, 1000);
    }
}
