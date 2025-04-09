import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddTaskComponent implements OnInit {
  @Input() taskToEdit?: { name: string; date: string; color: string };
  task: string = '';
  taskDate: string = '';
  selectedColor: string = '';

  @Output() taskAdded = new EventEmitter<{
    name: string;
    date: string;
    color: string;
  }>();

  selectedImage: string | null = null;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.taskDate);
    if (this.taskToEdit) {
      this.task = this.taskToEdit.name;
      this.taskDate = this.taskToEdit.date;
      this.selectedColor = this.taskToEdit.color;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openColorPicker() {
    const inputOptions = [
      { label: 'Verde', value: '#2ecc71' },
      { label: 'Amarillo', value: '#f1c40f' },
      { label: 'Rojo', value: '#e74c3c' },
      { label: 'Azul', value: '#3498db' },
      { label: 'Morado', value: '#9b59b6' },
      { label: 'Rosa', value: '#e91e63' },
    ];

    const alert = await this.alertController.create({
      header: 'Selecciona un color',
      inputs: inputOptions.map((option) => ({
        type: 'radio',
        label: option.label,
        value: option.value,
        checked: this.selectedColor === option.value,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Seleccionar',
          handler: (value: string) => {
            this.selectedColor = value;
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para seleccionar la imagen (tomar foto o elegir de la galería)
  async selectImage() {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Seleccionar Imagen';
    actionSheet.buttons = [
      {
        text: 'Tomar Foto',
        handler: () => {
          this.takePhoto();
        },
      },
      {
        text: 'Elegir de Galería',
        handler: () => {
          this.selectFromGallery();
        },
      },
      {
        text: 'Cancelar',
        role: 'cancel',
      },
    ];
    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }

  // Función para tomar la foto
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true, // Permitir editar la foto después de tomarla
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.selectedImage = image.dataUrl || null; // Asignar la imagen tomada
  }

  // Función para seleccionar de la galería
  async selectFromGallery() {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    this.selectedImage = image.dataUrl || null; // Asignar la imagen seleccionada
  }

  async addTask() {
    if (this.task && this.taskDate && this.selectedColor) {
      await this.modalController.dismiss({
        name: this.task,
        date: this.taskDate,
        color: this.selectedColor,
      });
    }
  }

}
