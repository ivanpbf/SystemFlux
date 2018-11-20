import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  // atributos de la informacion de la materia
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
  antelaciones: Boolean;
  antelacion1: any;
  antelacion1n: any;
  antelacion2: any;
  antelacion2n: any;
  antelacion3: any;
  antelacion3n: any;
  creditosParaVer: any;
  T1: any;
  T2: any;
  T3: any;
  aprobada: Boolean;

  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public storage: Storage ) {
    this.initializeMateria();
  }

  initializeMateria() {
    if (this.materia) { // si ya la materia existe, no tiene que hacerle un get de nuevo
      return Promise.resolve(this.materia);
    }
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/materias/' + this.route.snapshot.paramMap.get('id'))
      .pipe(map(res => res.json())).subscribe(materia => {
        // el get retorna una materia luego de buscarla por id de la cual se pueden descomponer sus atributos
        this.materia = materia;
        this.name = materia.name;
        this.codigo = materia.codigo;
        this.periodo = materia.periodo;
        // aqui verifica en que trimestres abre la materia
        if (materia.T1 === true) {
          this.T1 = 'T 1';
        }
        if (materia.T2 === true) {
          this.T2 = 'T 2';
        }
        if (materia.T3 === true) {
          this.T3 = 'T 3';
        }
        if (typeof materia.prelacion1 !== 'undefined') { // validaciones de prelacion y agarra la primera prelacion de la base de datos
          this.prelaciones = true;
          this.http.get('http://localhost:3000/materias/' + this.materia.prelacion1)
          .pipe(map(res => res.json())).subscribe(prelacion1 => {
            this.prelacion1 = prelacion1._id;
            this.prelacion1n = prelacion1.name;
          });
        } else {
          // si no hay una prelacion1 entonces la materia no tiene prelaciones
          this.prelaciones = false;
        }
        if (typeof materia.prelacion2 !== 'undefined') { // validaciones de prelacion y agarra la segunda prelacion de la base de datos
          this.http.get('http://localhost:3000/materias/' + this.materia.prelacion2)
          .pipe(map(res => res.json())).subscribe(prelacion2 => {
            this.prelacion2 = prelacion2._id;
            this.prelacion2n = prelacion2.name;
          });
        }
        if (typeof materia.antelacion1 !== 'undefined') {
          this.antelaciones = true;
          // get de la antelacion1 para asignarla a las antelaciones de la materia actual
          this.http.get('http://localhost:3000/materias/' + this.materia.antelacion1)
          .pipe(map(res => res.json())).subscribe(antelacion1 => {
            this.antelacion1 = antelacion1._id;
            this.antelacion1n = antelacion1.name;
            // esto verifica si la antelacion 1 esta aprobada (en storage) y marca como aprobada esta materia
            this.storage.get(antelacion1.name).then(antelacion1aprobada => {
              if (antelacion1aprobada === true) {
                this.aprobada = antelacion1aprobada;
                this.storage.set(this.name, antelacion1aprobada);
              }
            });
          });
        } else { // si no hay una antelacion1 en la base de datos para la materia, no tiene antelaciones
          this.antelaciones = false;
        }
        if (typeof materia.antelacion2 !== 'undefined') {
          // get de la antelacion2 para asignarla a las antelaciones de la materia actual
          this.http.get('http://localhost:3000/materias/' + this.materia.antelacion2)
          .pipe(map(res => res.json())).subscribe(antelacion2 => {
            this.antelacion2 = antelacion2._id;
            this.antelacion2n = antelacion2.name;
            // esto verifica si la antelacion 2 esta aprobada (en storage) y marca como aprobada esta materia
            this.storage.get(antelacion2.name).then(antelacion2aprobada => {
              if (antelacion2aprobada === true) {
                this.aprobada = antelacion2aprobada;
                this.storage.set(this.name, antelacion2aprobada);
              }
            });
          });
        }
        if (typeof materia.antelacion3 !== 'undefined') {
          // get de la antelacion3 para asignarla a las antelaciones de la materia actual
          this.http.get('http://localhost:3000/materias/' + this.materia.antelacion3)
          .pipe(map(res => res.json())).subscribe(antelacion3 => {
            this.antelacion3 = antelacion3._id;
            this.antelacion3n = antelacion3.name;
            // esto verifica si la antelacion 3 esta aprobada (en storage) y marca como aprobada esta materia
            this.storage.get(antelacion3.name).then(antelacion3aprobada => {
              if (antelacion3aprobada === true) {
                this.aprobada = antelacion3aprobada;
                this.storage.set(this.name, antelacion3aprobada);
              }
            });
          });
        }
        // si la materia requiere de creditos para ver, los asignara
        if (typeof materia.creditosParaVer !== 'undefined') {
          this.creditosParaVer = materia.creditosParaVer;
        }  else { // sino, los creditos necesarios para ver la materia son 0
          this.creditosParaVer = '0';
        }
         // esto saca del storage si esta aprobada o no (si fue marcada antes)
        this.storage.get(this.name).then(aprobada => this.aprobada = aprobada);
        resolve(this.materia);
      });
    });
  }

  // ira a la prelacion indicada, el item que recibe es el id de la materia
  GoPrelaciones(item: string) {
    if (this.prelaciones === true && typeof item !== 'undefined') {
      this.router.navigateByUrl('/materias/' + item);
    }
  }

// ira a la antelacion indicada, el item que recibe es el id de la materia
  GoAntelaciones(item: string) {
    if (this.antelaciones === true && typeof item !== 'undefined') {
      this.router.navigateByUrl('/materias/' + item);
    }
  }

 // al darle clic al check, introduce en storage el nombre de la materia actual y su valor de aprobada
  public checkAprobada() {
    this.storage.set(this.name, this.aprobada);
  }

  // metodo de volver a la pagina anterior (funciona como el de navegacion normal)
  GoBack() {
    window.history.back();
  }

// del snapshot de la ruta agarra el id y se lo asigna a la materia que se esta viendo
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
