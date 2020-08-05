import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private user: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submitSignup() {
    console.log(this.registerForm.value);
    this.user.registerUser(this.registerForm.value).subscribe( data => {
      if (data) {
        console.log(data);
        this.router.navigate(['/auth', 'login']);
        // dont forget to add toastr
      }
    }, err => {
      console.log(err.error);
    });
  }

}
