import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { AlertsService } from 'src/app/service/alerts.service';
import { RegisterService } from 'src/app/service/register.service';
import { appSetSlogan } from 'src/app/store/app.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  //Variable interface usuario
  user : IUser = {
    email : '',
    password: '',
    userName: '',
    id: '',
    role: ''
  }

  //Variable con todos los usurios
  allUsers : IUser[] = [];

  flag : boolean = true;

  constructor(
    //Inyectamos el servicio de registro
    private registerService : RegisterService,

    //Inyeccion del store
    private store: Store,

    //Alertas
    private sweetAlert : AlertsService,
  ) { }

  //Variable para la suscripción de eventos
  private subscription = new Subscription;

  ngOnInit(): void {
    //Establecemos el slogan
    this.store.dispatch(
      appSetSlogan({slogan: 'Be part of something special makes you special. SignUp!'})
    )

    //Agregamos todos los usuario que tenemos en la API
    this.subscription.add(this.registerService.getUsers().subscribe(data => {
      this.allUsers = data;
      console.log(this.allUsers);
    }));

  }

  //Formulario de registro
  registerForm = new FormGroup ({
    userName : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    role : new FormControl('', Validators.required)
  });

  //Envio de formulario
  sendRegister() {

    //Paso de valores a la variable de tipo IUser
    this.user.email = this.registerForm.controls['email'].value;
    this.user.password = this.registerForm.controls['password'].value;
    this.user.userName = this.registerForm.controls['userName'].value;
    this.user.role = this.registerForm.controls['role'].value;

    //Llamamos al servicio
    this.subscription.add(this.registerService.postNewUser(this.user).subscribe(data => {
        console.log(`${data}`); //Falta el error
      })
    );

    //Buscamos q no exista el mail
    this.flag = (this.allUsers.findIndex(mail => mail.email == this.user.email)) > -1;

    //Si no estaba registrado, lo dejamos
    if(!this.flag) {
      this.allUsers.push(this.user);
      this.subscription.add(this.sweetAlert.goodAlert('Welcome!', 'You are successfully registered'));
    //Si estaba registrado, lo cortamos
    } else {
      this.subscription.add(this.sweetAlert.alert('Not cool buddy', 'This mail already exits!'));
    }

    //reseteo de todo el formulario
    this.registerForm.reset();
  }

  //Desuscripción al salir del componente
  ngOnDestroy(): void {
      this.subscription?.unsubscribe;
  }

}
