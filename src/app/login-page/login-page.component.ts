import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  concat,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

export type RequestState = 'idle' | 'inProgress' | 'success' | 'error';

type Form = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private submitButtonSubject = new Subject<FormGroup<Form>>();
  state$: Observable<RequestState> = concat(
    of('idle' as RequestState),
    this.submitButtonSubject.pipe(
      switchMap((form: FormGroup<Form>) => {
        if (form.invalid) return of('idle' as RequestState);
        return concat(
          of('inProgress' as RequestState),
          this.http.post('http://localhost:4000/login', form.value).pipe(
            map((result) => {
              return 'success' as RequestState;
            }),
            tap((request) => {
              this.router.navigateByUrl('/home');
            }),
            catchError((error: HttpErrorResponse) => {
              return of('error' as RequestState);
            })
          )
        );
      })
    )
  );

  form: FormGroup<Form>;

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
      this.submitButtonSubject.next(this.form);
    }
  }
}
