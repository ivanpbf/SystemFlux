import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  //items son el objeto materia
  //organizados por total, busqueda y luego por periodo
  items: any;
  itemsb: any;
  itemsp1: any;
  itemsp2: any;
  itemsp3: any;
  itemsp4: any;
  itemsp5: any;
  itemsp6: any;
  itemsp7: any;
  itemsp8: any;
  itemsp9: any;
  itemsp10: any;
  itemsp11: any;
  itemsp12: any;

  constructor(private router: Router, public http: Http) {
    this.getMaterias();
  }

  getMaterias() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //del get recibe todas las materias de la base de datos y los asigna a items
        this.items = items;
        //itemsb son los items de busqueda, en este caso comienzan indefinidos (vacios)
        //porque no se ha buscado nada
        this.itemsb = undefined;
        //luego por periodo filtra los items del get para de esta manera tener las materias por periodo 
        //como un flujograma
        this.itemsp1 = items.filter((item) => item.periodo === 1);
        this.itemsp2 = items.filter((item) => item.periodo === 2);
        this.itemsp3 = items.filter((item) => item.periodo === 3);
        this.itemsp4 = items.filter((item) => item.periodo === 4);
        this.itemsp5 = items.filter((item) => item.periodo === 5);
        this.itemsp6 = items.filter((item) => item.periodo === 6);
        this.itemsp7 = items.filter((item) => item.periodo === 7);
        this.itemsp8 = items.filter((item) => item.periodo === 8);
        this.itemsp9 = items.filter((item) => item.periodo === 9);
        this.itemsp10 = items.filter((item) => item.periodo === 10);
        this.itemsp11 = items.filter((item) => item.periodo === 11);
        this.itemsp12 = items.filter((item) => item.periodo === 12);
        resolve(this.items);
      });
    });
  }

  getItems(ev) {

    // reinicia materias a todas las materias
    this.getMaterias().then(res => {
      this.items = res;

    // set val al valor del ev objetivo
    const val = ev.target.value;

    /* si el valor es un string vacio, no filtra los items
    este metodo filtrara todas las materias tanto por periodo como mostrar en itemsb las mas relevantes
    que luego seran mostradas al comienzo */
    if (val && val.trim() !== '') {
      this.itemsb = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val.trim() === '') {
      this.itemsb = undefined;
    }
    if (val && val.trim() !== '') {
      this.itemsp1 = this.itemsp1.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp2 = this.itemsp2.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp3 = this.itemsp3.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp4 = this.itemsp4.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp5 = this.itemsp5.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp6 = this.itemsp6.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp7 = this.itemsp7.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp8 = this.itemsp8.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp9 = this.itemsp9.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp10 = this.itemsp10.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp11 = this.itemsp11.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    if (val && val.trim() !== '') {
      this.itemsp12 = this.itemsp12.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  });
}

  Go(item: string) { //recibe un string que es el id de la materia y navega a la pagina de informacion de la misma
    this.router.navigateByUrl('/materias/' + item);
  }

  ngOnInit() {
  }

}
