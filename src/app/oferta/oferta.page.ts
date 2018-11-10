import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})

export class OfertaPage implements OnInit {
  //items son todas las materias
  items: any;
  //itemsb son las materias de la busqueda
  itemsb: any;
  //itemst1-3 son las materias asignadas por el trimestre en el que abren
  itemst1: any;
  itemst2: any;
  itemst3: any;

  constructor(private router: Router, public http: Http, public alerCtrl: AlertController) {
    this.getMaterias();
  }

  getMaterias() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //asigna a items todas las materias de la base de datos recolectadas por el get
        this.items = items.filter((item) => item.name != "Electiva");
        //como no comienza con busqueda, las materias/items de busqueda (itemsb) esta vacio
        this.itemsb = undefined;
        //filtro de la base de datos para asignar las materias por trimestre Y eliminando las electivas ya que esas abren todos los trimestres
        this.itemst1 = items.filter((item) => item.T1 === true && item.name != "Electiva 1" && item.name != "Electiva 2" && item.name != "Electiva 3"
        && item.name != "Electiva 4" && item.name != "Electiva 5" && item.name != "Electiva 6" && item.name != "Electiva 7");
        this.itemst2 = items.filter((item) => item.T2 === true && item.name != "Electiva 1" && item.name != "Electiva 2" && item.name != "Electiva 3"
        && item.name != "Electiva 4" && item.name != "Electiva 5" && item.name != "Electiva 6" && item.name != "Electiva 7");
        this.itemst3 = items.filter((item) => item.T3 === true && item.name != "Electiva 1" && item.name != "Electiva 2" && item.name != "Electiva 3"
        && item.name != "Electiva 4" && item.name != "Electiva 5" && item.name != "Electiva 6" && item.name != "Electiva 7");
        resolve(this.items);
    });
  });
}

getItems(ev) {
    // reinicia materias a todas las materias
      this.getMaterias().then(res => {
        this.items = res;

      // asignar val al valor del ev objetivo
      const val = ev.target.value;

      /* si el valor es un string vacio, no filtra los items
    este metodo filtrara todas las materias tanto por trimestre en que abren como mostrar en itemsb las mas relevantes de acuerdo a la busqueda
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
        this.itemst1 = this.itemst1.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
      if (val && val.trim() !== '') {
        this.itemst2 = this.itemst2.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
      if (val && val.trim() !== '') {
        this.itemst3 = this.itemst3.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    });
  }

  async doConfirm(item) {
    /*este es el popup que aparece al darle clic a una materia
    en vez de tener que ir a la materia de inmediato, el usuario puede elegir para seguir viendo 
    la oferta academica o ir a la informacion de la materia*/
    const confirm = await this.alerCtrl.create({
      header: item.name,
      message: ' Codigo: ' + item.codigo,
      buttons: [
        {
          text: 'Volver',
          handler: () => {
            console.log('Volver clicked');
          }
        },
        {
          text: 'Ver Informacion',
          handler: () => {
            this.Go(item._id);
          }
        }
      ]
    });
    await confirm.present();
  }

  Go(item: string) { //recibe un string que es el id de la materia y navega a la pagina de informacion de la misma
    this.router.navigateByUrl('/materias/' + item);
  }

  ngOnInit() {
  }

}
