import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private theme: ThemeService) { }

   // metodo que vuelve a la pagina anterior como un navegador comun
  GoBack() {
    window.history.back();
  }

  ngOnInit() {
  }

}
