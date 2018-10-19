import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MateriasPage } from './materias.page';
import { MateriaComponent } from './materia/materia.component';

const routes: Routes = [
  {
    path: '',
    component: MateriasPage
  },
  {
    path: ':id', //id de la materia
    component: MateriaComponent //deberia llevar a la pagina con el id especificado o elegido
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MateriasPage, MateriaComponent]
})
export class MateriasPageModule {}
