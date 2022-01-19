//Este archivo solo se usa apra hacear test
import { Observable, of } from "rxjs";
import { IMostViewMovies } from "../models/mostView.model";

export const adminMock = {

  //edita una pelicula
  updateMovies: (movie: IMostViewMovies): Observable<IMostViewMovies> => {
    return of({
      title: "Harry Potter and the sorcere's stone",
      description: "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.",
      image: "https://kbimages1-a.akamaihd.net/93affabc-5161-421e-80d5-4477a07b8cee/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
      premiere: 2001,
      gender: "virtual",
      adultsOnly: false,
      id: "1",
      genre: "Fantasy"
    });
  },

  //Postea una pelicula
  addMovie: (movie: IMostViewMovies): Observable<IMostViewMovies> => {
    return of({
      title: "Harry Potter and the sorcere's stone",
      description: "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.",
      image: "https://kbimages1-a.akamaihd.net/93affabc-5161-421e-80d5-4477a07b8cee/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
      premiere: 2001,
      gender: "virtual",
      adultsOnly: false,
      id: "1",
      genre: "Fantasy"
    });
  },

  //Elimina la pelicula
  deleteMovie: (id: string): Observable<boolean> => {
    return of(false);
  }
}
