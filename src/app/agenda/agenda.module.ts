import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD

=======
import { BarraComponent } from '../components/barra/barra.component'
>>>>>>> e2d75ef (Subida de Agenda1)
import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    AgendaPageRoutingModule
=======
    AgendaPageRoutingModule,
    BarraComponent,
>>>>>>> e2d75ef (Subida de Agenda1)
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
