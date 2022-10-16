import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    if (event?.target instanceof HTMLFormElement) {
      event.preventDefault();
      const value = event.target;

      if (this.form.valid) {
        console.log('submit form!');
      } else {
        console.log('oops! something is wrong');
      }
    }
  }
}
