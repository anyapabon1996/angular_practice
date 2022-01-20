import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { appSetSlogan } from 'src/app/store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription = new Subscription;

  //Variable de mensaje
  error : string = '';

  constructor(
    private loginService : LoginService,
    private router : Router,

    //inyeccion del store
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(
      appSetSlogan({slogan: 'Glad to see you again. Login, we must go on!'})
    );
  }

  //Formulario de login
  loginForm = new FormGroup({
    user : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  sendLogin() {
    this.subscription.add(this.loginService.validateCredentials(this.loginForm.controls['user'].value, this.loginForm.controls['password'].value).subscribe(
      valid => {
        if (valid){
          this.router.navigate(['movie']);
        } else {
          this.error = 'Invalid User or Password';
        }
      }
    ));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
