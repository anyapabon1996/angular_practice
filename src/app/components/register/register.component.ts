import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    //Inyectamos el servicio de registro
    private registerService : RegisterService
  ) { }

  //Variable para la suscripción de eventos
  private subscription : Subscription | undefined;

  ngOnInit(): void {
  }

  //Formulario de registro
  registerForm = new FormGroup ({
    userName : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email])
  });

  //Envio de formulario
  sendRegister() {

  }

}
