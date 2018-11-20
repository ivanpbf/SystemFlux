import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  // items son el objeto materia
  // organizados por total, busqueda y luego por periodo
  lista: any;
  items: any;
  itemsb: any;
  itemsp0: any;
  mostrarNivelacion: Boolean;
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
  mostrarP1: Boolean;
  mostrarP2: Boolean;
  mostrarP3: Boolean;
  mostrarP4: Boolean;
  mostrarP5: Boolean;
  mostrarP6: Boolean;
  mostrarP7: Boolean;
  mostrarP8: Boolean;
  mostrarP9: Boolean;
  mostrarP10: Boolean;
  mostrarP11: Boolean;
  mostrarP12: Boolean;

  constructor(private router: Router, public http: Http, public storage: Storage, private theme: ThemeService) {
    storage.get('lista').then(lista => {
      // este metodo revisa si en el storage hay algo asignado a lista
      if (lista === undefined || lista === 'lista1') {
        this.lista = 'lista1';
        storage.set('lista', 'lista1'); // asigna a lista 1 tambien aqui si es undefined
        this.mostrarNivelacion = false;
        // si esta en lista 1 no hace falta ver las materias de nivelacion en el flujograma
      } else {
        this.lista = lista;
        // si la lista es diferente de lista 1, procede a mostrar las materias de nivelacion de la lista (que falten por ver)
        this.mostrarNivelacion = true;
      }
    });
    this.getMaterias();
  }

  getMaterias() {
    if (this.items) { // si ya las materias existen, no tiene que hacerle un get de nuevo
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        // del get recibe todas las materias de la base de datos y los asigna a items
        this.items = items;
        // itemsb son los items de busqueda, en este caso comienzan indefinidos (vacios)
        // porque no se ha buscado nada
        this.itemsb = undefined;
        // luego por periodo filtra los items del get para de esta manera tener las materias por periodo
        // como un flujograma
        if (this.mostrarNivelacion) {
          // si se mostrara de nivelacion, lo mostrara dependiendo de las materias que falten por pasar en la lista
          this.itemsp0 = items.filter((item) => item.periodo === 0);
          this.itemsp0 = this.itemsp0.filter((item) => {
            switch (this.lista) {
              case 'lista2':
              return item.lista2 === true;
              case 'lista3':
              return item.lista3 === true;
              case 'lista4':
              return item.lista4 === true;
              case 'lista5':
              return item.lista5 === true;
            }
          });
        }
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
      this.itemsp0 = this.itemsp0.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
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

 // recibe un string que es el id de la materia y navega a la pagina de informacion de la misma
  Go(item: string) {
    this.router.navigateByUrl('/materias/' + item);
  }

  ngOnInit() {
    this.mostrarNivelacion = false;
    this.mostrarP1 = false;
    this.mostrarP2 = false;
    this.mostrarP3 = false;
    this.mostrarP4 = false;
    this.mostrarP5 = false;
    this.mostrarP6 = false;
    this.mostrarP7 = false;
    this.mostrarP8 = false;
    this.mostrarP9 = false;
    this.mostrarP10 = false;
    this.mostrarP11 = false;
    this.mostrarP12 = false;

  }

}
