//Este archivo solo se usa para hacer test.
import { Observable, of } from "rxjs";
import { IMostViewMovies } from "../models/mostView.model";

export const MostViewMockService = {

  //Metodo que llama a todas las peliculas GET
  getMovies: (): Observable<IMostViewMovies[]> =>  {

    //Pasamos por parametro el headers, que es el token
    return of(
      [
        {
        "title": "Harry Potter and the sorcere's stone",
        "description": "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.",
        "image": "https://kbimages1-a.akamaihd.net/93affabc-5161-421e-80d5-4477a07b8cee/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        "premiere": 2001,
        "gender": "virtual",
        "adultsOnly": false,
        "id": "1",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the chamber of secrets",
        "description": "Terminado el verano, Harry no ve la hora de abandonar la casa de sus odiosos tíos. Inesperadamente se presenta en su dormitorio Dobby, un elfo doméstico, que le anuncia que correrá un gran peligro si vuelve a Hogwarts.",
        "image": "https://images-na.ssl-images-amazon.com/images/I/51TA3VfN8RL._SX342_SY445_QL70_ML2_.jpg",
        "premiere": 2002,
        "gender": "bluetooth",
        "adultsOnly": false,
        "id": "2",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the prisioner of Azkaban",
        "description": "El tercer año de estudios de Harry en Hogwarts se ve amenazado por la fuga de Sirius Black de la prisión de Azkaban. Al parecer, se trata de un peligroso mago que fue cómplice de Lord Voldemort y que intentará vengarse de Harry Potter.",
        "image": "https://kbimages1-a.akamaihd.net/69eca8ca-652c-4641-b86f-42de460a6d4d/1200/1200/False/harry-potter-and-the-prisoner-of-azkaban-6.jpg",
        "premiere": 2004,
        "gender": "solid state",
        "adultsOnly": false,
        "id": "3",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the goblet of fire",
        "description": "Hogwarts se prepara para el Torneo de los Tres Magos, en el que competirán tres escuelas de hechicería. Para sorpresa de todos, Harry Potter es elegido para participar en la competencia, en la que deberá luchar contra dragones, internarse en el agua y enfrentarse a sus mayores miedos.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47kxKTZKcDv6M0gj_rJKzLg3NRwFVePLPxQ&usqp=CAU",
        "premiere": 2005,
        "gender": "haptic",
        "adultsOnly": false,
        "id": "4",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the order of Phoenix",
        "description": "En su quinto año en Hogwarts, Harry descubre que muchos integrantes de la comunidad de magos no conocen la verdad acerca de su encuentro con Lord Voldemort. Cornelius Fudge, ministro de magia, designa a Dolores Umbridge como maestra de defensa contra de las artes oscuras porque cree que el profesor Dumbledore planea apoderarse de su trabajo. Pero sus enseñanzas son inadecuadas, por lo que Harry prepara a los estudiantes para defender la escuela en contra del mal.",
        "image": "https://m.media-amazon.com/images/I/51-SI2+aQ2L.jpg",
        "premiere": 2007,
        "gender": "back-end",
        "adultsOnly": false,
        "id": "5",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the half blood prince",
        "description": "Sexta entrega de la saga del joven mago, en la que Harry descubre un poderoso libro y, mientras trata de descubrir sus orígenes, colabora con Dumbledore en la búsqueda de una serie de objetos mágicos que ayudarán en la destrucción de Lord Voldemort.",
        "image": "https://m.media-amazon.com/images/I/51myHyjJsyL.jpg",
        "premiere": 2009,
        "gender": "wireless",
        "adultsOnly": false,
        "id": "6",
        "genre": "Fantasy"
        },
        {
        "title": "Harry Potter and the deathly hallows",
        "description": "Harry, Ron y Hermione se marchan de Hogwarts para iniciar su misión más importante: tienen que destruir los horrocruxes, el secreto del poder y la inmortalidad de Voldemort, en los que el temido mago oscuro guarda los fragmentos de su alma.",
        "image": "https://kbimages1-a.akamaihd.net/05987f79-41b3-4b05-a68e-87f16e60c66a/1200/1200/False/harry-potter-and-the-deathly-hallows-3.jpg",
        "premiere": 2010,
        "gender": "haptic",
        "adultsOnly": false,
        "id": "7",
        "genre": "Fantasy"
        }
      ]
    );
  }

}
