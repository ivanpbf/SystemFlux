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
  creditosAprobados: number;
  //materiasAprobadas se sacaran de local storage para asignarlas a una lista
  //mostrando asi en el perfil del usuario todas las materias que ha aprobado
  materiasAprobadas: any;
  materiasPorAprobar: any;
  mostrarAprobadas: Boolean;
  mostrarPorAprobar: Boolean;

  constructor(public http: Http, public storage: Storage) { 
    this.getMaterias(storage);
  }

  getMaterias(storage) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //get de la base de datos para asignar a items todas las materias
        this.items = items;
        this.creditosAprobados = 0;
        this.getAprobadas();
        this.materiasPorAprobar = this.items.filter((item)=>
          this.materiasAprobadas.indexOf(item.name)<0
          //por ahora no filtra las que ya estan aprobadas
        );
        resolve(this.items);
      });
    });
  }


  getAprobadas(){
    this.materiasAprobadas = [];
    this.creditosAprobados = 0;
    let cuantas = 0;
    return this.storage.forEach((aprobada,name) =>{
      if (name != "undefined"){
        if(aprobada === true){
        this.materiasAprobadas.push(name);
        cuantas = cuantas+1;
        this.creditosAprobados = cuantas*3;
        }
      }
    }).then(()=> this.materiasAprobadas);
  }
  


  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back();
  }

  ngOnInit() {
    this.mostrarAprobadas = true;
    this.mostrarPorAprobar = false;
  }

}
