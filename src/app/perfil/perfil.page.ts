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

  //items son todas las materias
  items:any
  //materiasAprobadas se sacaran de local storage para asignarlas a una lista
  //mostrando asi en el perfil del usuario todas las materias que ha aprobado
  materiasAprobadas: any;

  constructor(public http: Http, public storage: Storage) { 
    this.getMaterias(storage);
  }

  getMaterias(storage) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //get de la base de datos para asignar a items todas las materias
        this.items = items;
        storage.get("nombres").then((val)=>{
          //por lo momentos solo saca la asignada en nombres, son pasos para luego sacar todas las del storage que son aprobadas
          this.materiasAprobadas=val;
        })
        resolve(this.items);
      });
    });
  }


  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
  }

  ngOnInit() {
  }

}
