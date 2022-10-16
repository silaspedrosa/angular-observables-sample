import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
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
        this.http
          .post('http://localhost:4000/login', this.form.value)
          .subscribe(
            (result) => {
              console.log('result of request:aaaaaaaaaaaaaaaaaaaaaaaa', result);
              this.router.navigate(['/home']);
            },
            (error) => {
              console.log('aqui foi erro', error);
            },
            () => {
              console.log('complete, ignore it');
            }
          );
      } else {
        console.log('oops! something is wrong');
      }
    }
  }
}
