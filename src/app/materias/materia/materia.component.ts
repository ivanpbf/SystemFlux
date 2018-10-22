import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  id;
  materia: any;
  name: any;
  codigo: any;
  periodo: any;
  prelacion1: any;
  prelacion2: any;
  creditosParaVer: any;
  T1: any;
  T2: any;
  T3: any;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router) { 
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
        this.name = materia.name;
        this.codigo = materia.codigo;
        this.periodo = materia.periodo;
        if(materia.T1 === true){
          this.T1 = "T 1";
        }
        if(materia.T2 === true){
          this.T2 = "T 2";
        }
        if(materia.T3 === true){
          this.T3 = "T 3";
        }
        if(typeof materia.prelacion1 !== 'undefined'){
          this.prelacion1 = materia.prelacion1;
        }
        else{
          this.prelacion1 = "Ninguna";
        }
        if(typeof materia.prelacion2 !== 'undefined'){
          this.prelacion2 = materia.prelacion2;
        }
        if(typeof materia.creditosParaVer !== 'undefined'){
          this.creditosParaVer = materia.creditosParaVer;
        }
        else{
          this.creditosParaVer = "0";
        }
        resolve(this.materia);
      })
    })
  }

  Go(item: string) {
    var idnuevo;
    this.http.get('http://localhost:3000/materias/'+item)
    .pipe(map(res=>res.json())).subscribe(id =>{
      idnuevo = id;
    })
    this.router.navigateByUrl('/materias/'+idnuevo);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
