import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/auth/auth.service';
import { CustomValidators } from 'src/app/helper/Validators';

@Component({
    selector: 'security-component',
    templateUrl: 'security.component.html'
})
export class SecurityComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.auth.ensureUserLoaded().subscribe((user) => {
            if (!user) {
                this.router.navigate(['']);
            }

            this.formGroup = this.fb.group({
                email: [user.email, Validators.required],
                passwords: this.fb.group(
                    {
                        password: [
                            '',
                            Validators.compose([Validators.required])
                        ],
                        repeatedPassword: ['', Validators.required]
                    },
                    CustomValidators.passwordEquality
                )
            });
        });
    }
}
