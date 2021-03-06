import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'contact'
    },
    {
      title: 'Informacion',
      url: '/informacion',
      icon: 'information-circle'
    },
    {
      title: 'Ajustes',
      url: '/ajustes',
      icon: 'settings'
    },

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    /*this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });*/
  }
}
