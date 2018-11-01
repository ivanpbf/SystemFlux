import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  items:any
  materiasAprobadas: any;
  constructor(public http: Http, private storage: Storage) { 
    this.getMaterias();
  }

  getMaterias() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        this.items = items;
        this.materiasAprobadas = this.storage.get(items.names);
        resolve(this.items);
      })
    });
  }

  ngOnInit() {
  }

}
