import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { OfertaPage } from '../oferta/oferta.page';
import { MateriasPage } from '../materias/materias.page';
import { MateriasPageModule } from '../materias/materias.module';
import { OfertaPageModule } from '../oferta/oferta.module';
import { HomePage } from '../home/home.page';
import { HomePageModule } from '../home/home.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'oferta',
        outlet: 'oferta',
        component: OfertaPage
      },
      {
        path: 'materias',
        outlet: 'materias',
        component: MateriasPage
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MateriasPageModule,
    OfertaPageModule,
    HomePageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
