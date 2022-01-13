import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //Formulario de login
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  sendLogin() {
    alert('Hola');
  }

}
