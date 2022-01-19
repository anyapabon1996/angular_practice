import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IMostViewMovies } from 'src/app/models/mostView.model';
import { MostViewAdminService } from 'src/app/service/most-view-admin.service';
import { MostViewService } from 'src/app/service/most-view.service';

@Component({
  selector: 'app-most-view-admin',
  templateUrl: './most-view-admin.component.html',
  styleUrls: ['./most-view-admin.component.scss']
})
export class MostViewAdminComponent implements OnInit, OnDestroy {

  //titulos
  updateTitle: string = 'You can modify any movie providing its id and replacing the inputs content';
  createTitle : string = 'Add one movie to the package of most viewed';
  deleteTitle: string = 'Eliminate movie by its id';

  //contenedor de todas las pelis
  allMovies: IMostViewMovies[] =[];

  //Variable suscripcion
  private subscription = new Subscription;

  //Variable control
  continue: number = -2;

  //Variable parametro a pasar
  movie: IMostViewMovies = {
    id: '',
    title: '',
    premiere: 0,
    genre: '',
    adultsOnly: false,
    description: '',
    image: ''
  }

  constructor(
    private adminService : MostViewAdminService,
    private mostViewService : MostViewService
  ) { }

  ngOnInit(): void {
    //Le pasamos todas las pelis del array
    this.subscription.add(this.mostViewService.getMovies().subscribe(data => {
      this.allMovies = data;
      console.log(this.allMovies);
      //Esto controla el error en caso de que ocurra alguno, y le avisa al usuario
    }, (err) => {
      alert('There is an error at mostViewComponent');
    }
    ));
  }

  //Formulario de edicion
  updateForm = new FormGroup ({
    id: new FormControl('',[Validators.required]),
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    premiere: new FormControl(''),
    genre: new FormControl(''),
    adultsOnly: new FormControl('')
  });

  //Formulario de creacion de pelicula
  createForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    premiere: new FormControl('',[Validators.required]),
    genre: new FormControl('',[Validators.required]),
    adultsOnly: new FormControl('',[Validators.required])
  });

  //Formulario de eliminacion
  deleteForm = new FormGroup({
    id: new FormControl('', Validators.required)
  });

  //Metodo de edicion
  makesChanges(){
    this.continue = this.allMovies.findIndex(m => m.id == this.updateForm.controls['id'].value);

    if(this.continue != -1){

      //Pasamos todos los datos de la peli a editar previos a los cambios
      this.movie = this.allMovies[this.continue];

      this.movie.id = this.updateForm.controls['id'].value;

      //Validacion para ingresar los cambios
      if (this.updateForm.controls['image'].value != ''){
        this.movie.image = this.updateForm.controls['image'].value;
      }

      //Incompleto. ACOMODAR
      if (this.updateForm.controls['adultsOnly'].value != ''){
        this.movie.adultsOnly = this.updateForm.controls['adultsOnly'].value;
      }

      if(this.updateForm.controls['description'].value != ''){
        this.movie.description = this.updateForm.controls['description'].value;
      }

      if (this.updateForm.controls['genre'].value != ''){
        this.movie.genre =  this.updateForm.controls['gender'].value;

        this.movie.genre = this.movie.genre.toLowerCase().trim();
      }

      if(this.updateForm.controls['premiere'].value > 1900){
        this.movie.premiere = this.updateForm.controls['premiere'].value;
      }

      if(this.updateForm.controls['title'].value != ''){
        this.movie.title = this.updateForm.controls['title'].value;
        this.movie.title = this.movie.title.toLowerCase().trim();
      }

      this.subscription.add(this.adminService.updateMovies(this.movie).subscribe(data => {
        alert('movie edited: ' + data)
        }, (err) => {
          alert('There is an Error at mostViewAdminComponent');
        }
      ));

      //reseteo de todo el formulario
      this.updateForm.reset();

    } else {
      alert ('You are looking for an unexisting movie');
    }
  }

  //Metodo de creacion
  createMovie(){

    this.subscription.add(this.adminService.addMovie(
      {
      title: this.createForm.controls['title'].value,
      premiere: this.createForm.controls['premiere'].value,
      description: this.createForm.controls['description'].value,
      image: this.createForm.controls['image'].value,
      genre: this.createForm.controls['genre'].value,
      adultsOnly: this.createForm.controls['adultsOnly'].value,
      id: "0",
      }
    ).subscribe(data => {
      console.log(data);
      alert('Movie created')
    }));

    //reseteo de todo el formulario
    this.createForm.reset();
  }

  //Metodo de eliminacion
  deleteMovie(){
    this.subscription.add(this.adminService.deleteMovie(String(this.deleteForm.controls['id'].value)).subscribe(
      data => {
        alert(data);
        //Controlamos el error
      }, (err) => {
        console.log(err);
        alert('You are eliminating an unexisting movie or there is an error at MostViewAdminService');
      }
    ));

    //reseteo de todo el formulario
    this.deleteForm.reset();
  };

  //Desuscripcion al salir del componente
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
