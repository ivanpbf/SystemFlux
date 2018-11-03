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
  constructor(public http: Http, public storage: Storage) { 
    this.getMaterias(storage);
  }

  getMaterias(storage) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        this.items = items;
        storage.get("nombres").then((val)=>{
          this.materiasAprobadas=val;
        })
        resolve(this.items);
      });
    });
  }


  GoBack(){
    window.history.back();
  }

  ngOnInit() {
  }

}
