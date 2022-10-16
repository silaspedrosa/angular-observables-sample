import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  emailInput$ = new BehaviorSubject('');
  passwordInput$ = new BehaviorSubject('');

  constructor() {}

  ngOnInit(): void {}

  onEmailchange(event: Event) {
    if (event?.target instanceof HTMLInputElement) {
      const value = event.target.value;
      console.log(value);
      this.emailInput$.next(value);
    }
  }

  onPasswordchange(event: Event) {
    if (event?.target instanceof HTMLInputElement) {
      const value = event.target.value;
      console.log(value);
      this.passwordInput$.next(value);
    }
  }

  onSubmit(event: Event) {
    if (event?.target instanceof HTMLFormElement) {
      event.preventDefault();
      const value = event.target;
      console.log(value);
      console.log('email:', this.emailInput$.value);
      console.log('password:', this.passwordInput$.value);
      if (this.isEmailValid() && this.isPasswordValid()) {
        console.log('submit form!');
      } else {
        console.log('oops! something is wrong');
      }
    }
  }

  isEmailValid() {
    const value = this.emailInput$.value;
    if (typeof value !== 'string') return false;

    const sanitizedValue = value.replace(/ /g, '');
    if (sanitizedValue.length < 5) return false;
    if (!sanitizedValue.includes('@')) return false;

    return true;
  }

  isPasswordValid() {
    const value = this.passwordInput$.value;
    if (typeof value !== 'string') return false;
    if (value.length === 0) return false;

    return true;
  }
}
