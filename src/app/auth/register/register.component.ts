import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'core/services/auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private user: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {


    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submitSignup() {
    this.isLoading = true;
    this.user.registerUser(this.registerForm.value).subscribe( data => {
      if (data) {
        this.toastr.success('Registration successfull');
        this.isLoading = false;
        this.router.navigate(['/auth', 'login']);
      }
    }, err => {
      this.toastr.error(err.error);
    });
  }

}
