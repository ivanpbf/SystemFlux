import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor() { }

  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
    location.reload();     
  }
  
  ngOnInit() {
  }
  
}
