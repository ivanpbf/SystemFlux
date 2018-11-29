import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // items son todas las materias
  items: any;
  creditosAprobados: number;
  // 18 en lista 1
  cuantasPorAprobar: number;
  // materiasAprobadas se sacaran de local storage para asignarlas a una lista
  // mostrando asi en el perfil del usuario todas las materias que ha aprobado
  materiasAprobadas: any;
  materiasPorAprobar: any;
  mostrarAprobadas: Boolean;
  mostrarPorAprobar: Boolean;
  materiasTotales: number;
  lista: any;

  constructor(public http: Http, public storage: Storage, public alerCtrl: AlertController) {
  }

  getMaterias() {
    if (this.items) { // si ya las materias existen, no tiene que hacerle un get de nuevo
      this.filtrarLista();
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('https://apiflux.herokuapp.com/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        // get de la base de datos para asignar a items todas las materias
        this.items = items;
        this.cuantasPorAprobar = 67;
        this.creditosAprobados = 0;
        items.forEach(materia => {
          this.storage.set(materia.name, this.storage.get(materia.name));
        });
        this.materiasTotales = items.length;
        this.filtrarLista();
        resolve(this.items);
      });
    });
  }

  filtrarLista() {
    // este metodo permite agrega las materias a aprobadas dependiendo de la lista inicial
    console.log('no prestarle atencion al error que da'); // por alguna razon da un error
    // revisar bien o ignorar
    this.items.forEach(element => {
      if (element.periodo === 0) {
        // las materias de periodo 0 son las de nivelacion
        switch (this.lista) {
          case 'lista1':
            this.storage.set(element.name, true);
          break;
          case 'lista2':
          if (element.lista2 === false) {
            this.storage.set(element.name, true);
          } else {
            this.storage.set(element.name, false);
          }
          break;
          case 'lista3':
          if (element.lista3 === false) {
            this.storage.set(element.name, true);
          } else {
            this.storage.set(element.name, false);
          }
          break;
          case 'lista4':
          if (element.lista4 === false) {
            this.storage.set(element.name, true);
          } else {
            this.storage.set(element.name, false);
          }
          break;
          case 'lista5':
            this.storage.set(element.name, false);
          break;
        }
      }
    });
    this.getAprobadas();
  }

  getAprobadas() {
    // este es el metodo que ubica en los arrays cuales estan aprobadas y cuales no
    this.materiasAprobadas = [];
    this.materiasPorAprobar = [];
    let cuantas = 0;
    // reinicia los valores tanto de cuales hay aprobadas como cuantas materias faltan por aprobar
    let cuantasPA = this.materiasTotales;
    this.storage.forEach((aprobada, name) => {
      // las materias las va a sacar de storage y acomodar dependiendo de su estado
      if (name !== 'undefined' && name !== 'lista') {
        if (aprobada === true) {
          if (!this.materiasAprobadas.includes(name)) {
            // luego hace la matematica necesaria para agregar la materia a aprobada y bajar/subir contadores respectivos
            this.materiasAprobadas.push(name);
            cuantas = cuantas + 1;
            cuantasPA = cuantasPA - 1;
            this.creditosAprobados = cuantas * 3;
            this.cuantasPorAprobar = cuantasPA;
          }
        } else {
          this.materiasPorAprobar.push(name);
        }
      }
    });
  }

  Seleccionada(valor: any) {
    // este es el codigo que se ejecuta al cambiar de lista, agrega la lista a local storage, filtra las materias y lanza un pop-up
    this.storage.set('lista', valor.detail.value);
    this.filtrarLista();
    this.doConfirm();
  }

  async doConfirm() {
    /*Lo siento pero no vi otra manera de que se actualizara el array mejor
    porque no se actualizaba en tiempo real*/
    const confirm = await this.alerCtrl.create({
      header: 'Cambio de Lista',
      message: 'Debido a un cambio de lista, se procedera a refrescar la pagina',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            location.reload();
          }
        }
      ]
    });
    await confirm.present();
  }

  GoBack() { // metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
  }

  ngOnInit() {
    this.mostrarAprobadas = true;
    this.mostrarPorAprobar = false;
    this.storage.get('lista').then(lista => {
      // si en el storage no hay lista, la ubica como vacio
      if (lista === undefined) {
        this.lista = '';
      } else {
        // sino, ubica dependiendo de cual es
        this.lista = lista;
      }
    });
    this.getMaterias();
  }

}
