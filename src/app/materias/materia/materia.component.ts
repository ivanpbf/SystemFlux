import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
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
  prelaciones: Boolean;
  prelacion1: any;
  prelacion1n: any;
  prelacion2: any;
  prelacion2n: any;
  creditosParaVer: any;
  T1: any;
  T2: any;
  T3: any;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router) {
    this.initializeMateria();
  }

  initializeMateria() {
    if (this.materia) {
      return Promise.resolve(this.materia);
    }
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias/' + this.route.snapshot.paramMap.get('id'))
      .pipe(map(res => res.json())).subscribe(materia => {
        this.materia = materia;
        this.name = materia.name;
        this.codigo = materia.codigo;
        this.periodo = materia.periodo;
        if (materia.T1 === true) {
          this.T1 = 'T 1';
        }
        if (materia.T2 === true) {
          this.T2 = 'T 2';
        }
        if (materia.T3 === true) {
          this.T3 = 'T 3';
        }
        if (typeof materia.prelacion1 !== 'undefined') {
          this.prelaciones = true;
          this.http.get('http://localhost:3000/materias/' + this.materia.prelacion1)
          .pipe(map(res => res.json())).subscribe(prelacion1 => {
            this.prelacion1 = prelacion1._id;
            this.prelacion1n = prelacion1.name;
          });
        } else {
          this.prelacion1n = 'Ninguna';
          this.prelaciones = false;
        }
        if (typeof materia.prelacion2 !== 'undefined') {
          this.http.get('http://localhost:3000/materias/' + this.materia.prelacion2)
          .pipe(map(res => res.json())).subscribe(prelacion2 => {
            this.prelacion2 = prelacion2._id;
            this.prelacion2n = prelacion2.name;
          });
        }
        if (typeof materia.creditosParaVer !== 'undefined') {
          this.creditosParaVer = materia.creditosParaVer;
        } else {
          this.creditosParaVer = '0';
        }
        resolve(this.materia);
      });
    });
  }

  Go(item: string) {
    if (this.prelaciones === true) {
      this.router.navigateByUrl('/materias/' + item);
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
