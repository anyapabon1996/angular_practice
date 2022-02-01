import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  //Función de que todo salió ok
  goodAlert(title: string, message: string) {
    Swal.fire({
      title: `<h3 class="alert-title">${title}</h3>`, //titulo de la alerta
      html: `<span class="alert-text">${message}</span>`, // cuerpo o descripcion, podriamos usar text en vez de html, pero no la podríamos editar
      icon: 'success', //tipo de icono
      backdrop: true, //que el fondo se oscurezca al salir
      timer: 2000, // tiempo de duracion de la alerta
      showConfirmButton: false, //para que no me muestre el botón
    });
  }

  //Función de alerta, de tipo error
  alert(title: string, message: string){
    Swal.fire({
      title: `<h3 class="alert-title2">${title}!</h3>`,
      html: `<span class="alert-text">${message}</span>`,
      icon: 'error',
      backdrop: true,
      showConfirmButton: true,
      buttonsStyling: false,
      confirmButtonText: '<span class="alert-text style-button">Got it</span>'
    });
  };

  //Función de tipo warning
  warningAlert(title: string, message: string){
    Swal.fire({
      title: `<h3 class="alert-title">${title}</h3>`,
      html: `<span class="alert-text">${message}</span>`,
      icon: 'warning',
      backdrop: true,
      timer: 2000,
      showConfirmButton: false,
    });
  }

}
