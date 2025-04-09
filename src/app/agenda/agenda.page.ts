import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { AddTaskComponent } from '../components/add-task/add-task.component';

interface Task {
  id: string;
  name: string;
  date: string;
  color: string;
  ownerId: string;
  createdAt: Date;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {
  tasks: Task[] = [];
  userId: string = '';

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userId = parsedData.userId;
    }
    this.loadTasks();
  }

  // Cargar las tareas del usuario
  async loadTasks() {
    if (!this.userId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha detectado un usuario logueado.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const tasksCollection = collection(this.firestore, 'tasks');
    const q = query(tasksCollection, where('ownerId', '==', this.userId));
    const querySnapshot = await getDocs(q);
    this.tasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Task[];
  }

  // Abrir Modal para agregar tarea
  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.addTask(result.data);
      }
    });

    return await modal.present();
  }


  async addTask(taskData: { name: string; date: string; color: string }) {
    if (!this.userId) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha detectado un usuario logueado.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const task = {
      name: taskData.name,
      date: taskData.date,
      color: taskData.color,
      ownerId: this.userId,
      createdAt: new Date(),
    };

    const tasksCollection = collection(this.firestore, 'tasks');
    const docRef = await addDoc(tasksCollection, task);
    const taskId = docRef.id;

    this.tasks.push({
      ...task,
      id: taskId,
    });
  }

  async editTask(task: Task) {
    console.log(task.name)
    const modal = await this.modalController.create({
      component: AddTaskComponent,
      componentProps: {
        taskToEdit: {
          name: task.name,
          date: task.date,
          color: task.color,
        },
      },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        const taskRef = doc(this.firestore, 'tasks', task.id);
        await updateDoc(taskRef, {
          name: result.data.name,
          date: result.data.date,
          color: result.data.color,
        });
        this.loadTasks();
      }
    });

    return await modal.present();
  }


  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Aquí eliminarías la tarea de Firestore
            const taskRef = doc(this.firestore, 'tasks', task.id);
            await deleteDoc(taskRef);
            this.loadTasks(); // Vuelve a cargar las tareas
          },
        },
      ],
    });

    await alert.present();
  }
}
