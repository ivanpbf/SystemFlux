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
  //18 en lista 1
  cuantasPorAprobar: number;
  //materiasAprobadas se sacaran de local storage para asignarlas a una lista
  //mostrando asi en el perfil del usuario todas las materias que ha aprobado
  materiasAprobadas: any;
  materiasPorAprobar: any;
  mostrarAprobadas: Boolean;
  mostrarPorAprobar: Boolean;
  lista: any;

  constructor(public http: Http, public storage: Storage) { 
    storage.get("lista").then(lista =>{
      if(lista == undefined){
        this.lista = "lista1";
      }
      else{
        this.lista = lista;
      }  
    })
    this.getMaterias(storage);   
  }

  getMaterias(storage) {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias')
      .pipe(map(res => res.json())).subscribe(items => {
        //get de la base de datos para asignar a items todas las materias
        this.items = items;
        this.cuantasPorAprobar = 67;  
        this.creditosAprobados = 0;
        items.forEach(materia => {
          this.storage.set(materia.name, this.storage.get(materia.name));
        });
        this.filtarLista(items);
        this.getAprobadas();
        resolve(this.items);
        
      });
    });
  }

  filtarLista(items){
    items.forEach(element => {
      if(element.periodo == 0){
        switch(this.lista){
          case "lista1":
            this.storage.set(element.name, true);
          break;
          case "lista2":
          if(element.lista2 == false){
            this.storage.set(element.name, true);  
          }
          else{
            this.storage.set(element.name, false)
          }
          break;
          case "lista3":
          if(element.lista3 == false){
            this.storage.set(element.name, true);            
          }
          else{
            this.storage.set(element.name, false)
          }
          break;
          case "lista4":
          if(element.lista4 == false){
            this.storage.set(element.name, true);            
          }
          else{
            this.storage.set(element.name, false)
          }
          break;
          case "lista5":
          if(element.lista5 == false){
            this.storage.set(element.name, true);            
          }
          else{
            this.storage.set(element.name, false)
          }
          break;
        }
      }
    });
  }

  getAprobadas(){
    this.materiasAprobadas = [];
    this.materiasPorAprobar = [];
    let cuantas = 0;
    let cuantasPA = 67;
    return this.storage.forEach((aprobada,name) =>{
      if (name != "undefined"){
        if(aprobada === true){
        this.materiasAprobadas.push(name);
        cuantas = cuantas+1;
        cuantasPA = cuantasPA-1;
        this.creditosAprobados = cuantas*3;
        this.cuantasPorAprobar = cuantasPA;
        }
        else{
          this.materiasPorAprobar.push(name);
        }
      }
    }).then(()=> this.materiasAprobadas);
  }

  Seleccionada(){
    this.storage.set("lista", this.lista);
    this.getMaterias(this.storage);       
    this.getAprobadas();    
  }
  

  GoBack(){ //metodo que vuelve a la pagina anterior como un navegador comun
    window.history.back(); 
  }

  ngOnInit() {
    this.mostrarAprobadas = true;
    this.mostrarPorAprobar = false;
    this.getMaterias(this.storage);       
  }

}
