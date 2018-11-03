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
  items: any;
  itemsb: any;
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
        this.items = items.filter((item) => item.name != "Electiva");
        this.itemsb = undefined;
        this.itemst1 = items.filter((item) => item.T1 === true && item.name != "Electiva");
        this.itemst2 = items.filter((item) => item.T2 === true && item.name != "Electiva");
        this.itemst3 = items.filter((item) => item.T3 === true && item.name != "Electiva");
        resolve(this.items);
    });
  });
}

getItems(ev) {
      // Reset items back to all of the items
      this.getMaterias().then(res => {
        this.items = res;

      // set val to the value of the ev target
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
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

  Go(item: string) {
    this.router.navigateByUrl('/materias/' + item);
  }

  ngOnInit() {
  }

}
