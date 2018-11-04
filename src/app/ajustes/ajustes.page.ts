import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor() { }


  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
  }

  ngOnInit() {
  }

}
