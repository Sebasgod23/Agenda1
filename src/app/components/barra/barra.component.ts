import { Component, OnInit } from '@angular/core';
import { IonHeader } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BarraComponent implements OnInit {
  autenticado = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.autenticado = true;
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Salir',
          handler: () => {
            localStorage.clear();
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }

  navega(url: string) {
    this.router.navigate([url]);
  }
}
