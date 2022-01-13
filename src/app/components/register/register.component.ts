import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    //Inyectamos el servicio de registro
    private registerService : RegisterService
  ) { }

  //Variable para la suscripción de eventos
  private subscription : Subscription | undefined;

  ngOnInit(): void {

    //Agregamos todos los usuario que tenemos en la API
    this.subscription = this.registerService.getUsers().subscribe(data => {
      this.allUsers = data;
    });

  }

  //Formulario de registro
  registerForm = new FormGroup ({
    userName : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    role : new FormControl('', Validators.required)
  });

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

  //Envio de formulario
  sendRegister() {

    //Paso de valores a la variable de tipo IUser
    this.user.email = this.registerForm.controls['email'].value;
    this.user.password = this.registerForm.controls['password'].value;
    this.user.userName = this.registerForm.controls['userName'].value;
    this.user.role = this.registerForm.controls['role'].value;

    console.log(this.user);

    // this.registerService.validateNewUser(this.user).subscribe(data =>{
    //   this.flag = data
    // });

    // if (!this.flag){
    //   this.subscription?.add(
        this.registerService.postNewUser(this.user).subscribe(data => {
        console.log(`${this.user.email} has been registered`);
      })
    //   );
    // } else alert("This mail already exists")

    //reseteo de todo el formulario
    this.registerForm.reset();
  }

  //Desuscripción al salir del componente
  ngOnDestroy(): void {
      this.subscription?.unsubscribe;
  }

}
