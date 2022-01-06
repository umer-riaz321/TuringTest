import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get f(): any {
    return this.loginForm.controls;
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      const currentUser = response.data.login;
      localStorage.setItem('accessToken', response.data.login.access_token);
      this.router.navigate(['/features/list']);
    });
  }

}
