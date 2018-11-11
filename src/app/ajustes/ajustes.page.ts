import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(public storage: Storage, public alerCtrl: AlertController) { }


  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
    location.reload();     
  }

  async Reiniciar(){
    const confirm = await this.alerCtrl.create({
      header: 'Reinicio de Materias',
      message: 'Se reiniciaran todas las materias marcadas como aprobadas',
      buttons: [
        {
          text: 'Volver',
          handler: () => {
            console.log('Volver clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.storage.clear();
            console.log('Se reinicio el storage');
          }
        }
      ]
    });
    await confirm.present();
  }

  ngOnInit() {
  }

}
