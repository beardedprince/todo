import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private user: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    console.log(this.loginForm.value);
    this.user.loginUser(this.loginForm.value).subscribe( (data: any) => {
      if (data) {
        console.log(data);
        localStorage.setItem('token', data.token);
        console.log('token', data.token);
        this.router.navigate(['/user', 'list']);
      }
    }, err => {
      console.log(err.error);
    });
  }

}
