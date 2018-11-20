import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ThemeService } from '../theme.service';

const themes = {
  UNIMET: {
    primary: '#FF7700',
    secondary: '#2C6EE8',
    tertiary: '#7F7F7F',
    success: '#DCC7AA',
    warning: '#a0d3ff',
    danger: '#f04141',
    medium: '#BCC2C7',
    dark: '#FFFFFF',
    light: '#000000'
  },
  Dark: {
    primary: '#0C0C0C',
    secondary: '#566D72',
    tertiary: '#9EA8A1',
    success: '#3F000E',
    warning: '#a0d3ff',
    danger: '#f04141',
    dark: '#FDE8DF',
    medium: '#BCC2C7',
    light: '#FFFFFF'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    success: '#DCC7AA',
    warning: '#a0d3ff',
    danger: '#f04141',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  },
  default: {
    primary: '#6B7A8F',
    secondary: '#F7882F',
    tertiary: '#F7C331',
    success: '#DCC7AA',
    warning: '#a0d3ff',
    danger: '#f04141',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8',
  }
};

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(public storage: Storage, public alerCtrl: AlertController, private theme: ThemeService) { }

  // Metodo que cambia el tema de la app
  changeTheme(name) {
    this.theme.setTheme(themes[name]);
  }

  GoBack() { // metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
    location.reload();
  }

  async Reiniciar() {
    const confirm = await this.alerCtrl.create({
      header: 'Reinicio de Valores',
      message: 'Se reiniciaran todas las materias marcadas como aprobadas asi como tambien opciones seleccionadas por el usuario',
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
