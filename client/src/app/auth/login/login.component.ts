import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  wrongInput: boolean = false;
  errorMessage: any;
  form: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    this.isUserLogin();
  }

  onSubmit(form: FormGroup) {
    this._auth.login(form.value.email, form.value.password).subscribe(
      (res) => {
        this._auth.setDataInLocalStorage(
          'userData',
          JSON.stringify(this._auth.parseJWT(res.token))
        );
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err['error'].message;
        this.wrongInput = true;
      }
    );
  }

  isUserLogin() {
    if (this._auth.getToken()) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this.isUserLogin();
  }

  back() {
    this._router.navigate(['/']);
  }
}
