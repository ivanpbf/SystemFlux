import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  id;
  materia: any;

  constructor(private route: ActivatedRoute, public http: Http) { 
    this.initializeMateria();
  }

  initializeMateria(){
    if(this.materia){
      return Promise.resolve(this.materia);
    }
    return new Promise(resolve=>{
      this.http.get('http://localhost:3000/materias/'+this.route.snapshot.paramMap.get('id'))
      .pipe(map(res=>res.json())).subscribe(materia =>{
        this.materia = materia;
        resolve(this.materia);
      })
    })
  }

//da errores a lo que no hay asi que hay que verificar que exista para tal objeto
// por ejemplo mate general da errores porque no tiene creditos para verla y cosas asi
//mostrar informacion dependiendo de la materia

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
