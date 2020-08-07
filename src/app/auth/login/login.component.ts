import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private user: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.isLoading = true;
    this.user.loginUser(this.loginForm.value).subscribe( (data: any) => {
      if (data) {
        this.toastr.success('Login successfull');
        localStorage.setItem('token', data.token);
        this.isLoading = false;
        this.router.navigate(['/user', 'board']);
      }
    }, err => {
      this.toastr.error(err.error);
    });
  }

}
