import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicModule } from '@ionic/angular';

import { OfertaPage } from './oferta.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaPage
  },

];

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfertaPage]
})
export class OfertaPageModule {}
