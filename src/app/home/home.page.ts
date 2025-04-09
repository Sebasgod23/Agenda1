import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
<<<<<<< HEAD
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
=======
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
>>>>>>> e2d75ef (Subida de Agenda1)
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  messageVisible = false;
  username: string = '';
  password: string = '';
  isValid = false;
  isLoading = true;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
<<<<<<< HEAD
    private firestore: Firestore 
=======
    private firestore: Firestore
>>>>>>> e2d75ef (Subida de Agenda1)
  ) {}

  ngOnInit() {
    this.checkTokenAndRedirect();
    this.showLoadingInit();
  }

  // Verifica si existe un token en el almacenamiento local y redirige si es válido
  checkTokenAndRedirect() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.navCtrl.navigateForward('/inicio');
    }
  }

  // Muestra un mensaje temporal en la interfaz
  showMessage() {
    this.messageVisible = true;
    setTimeout(() => {
      this.messageVisible = false;
    }, 5000);
  }

  // Navega a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // Valida que los campos de usuario y contraseña sean correctos
  validateFields() {
    this.username = this.username.toLowerCase().trim();
    this.password = this.password.trim();
<<<<<<< HEAD
    this.isValid = this.username !== '' && this.password !== '' && !this.username.includes(' ') && !this.password.includes(' ');
=======
    this.isValid =
      this.username !== '' &&
      this.password !== '' &&
      !this.username.includes(' ') &&
      !this.password.includes(' ');
>>>>>>> e2d75ef (Subida de Agenda1)
  }

  // Muestra una animación de carga inicial
  async showLoadingInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  // Maneja el proceso de inicio de sesión
<<<<<<< HEAD
=======
  // Maneja el proceso de inicio de sesión
>>>>>>> e2d75ef (Subida de Agenda1)
  async login() {
    this.validateFields();

    if (!this.isValid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese un nombre de usuario y contraseña válidos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('username', '==', this.username));
    const userSnapshot = await getDocs(q);

    if (!userSnapshot.empty) {
<<<<<<< HEAD
      const userDoc = userSnapshot.docs[0].data();
      const encryptedPassword = userDoc['password'];  
      const decryptedPassword = this.decryptPassword(encryptedPassword); 

      if (decryptedPassword === this.password) {
        const decryptedRole = this.getDecryptedRole(userDoc['role']);
        
        const permissions = await this.getRolePermissions(decryptedRole); 

        const token = this.generateToken(userDoc, permissions);

        const userData = {
          fullName: userDoc['fullName'], 
          role: decryptedRole,
          token: token
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userData));  
        localStorage.setItem('authToken', token);  

        await this.updateLastLogin(userDoc['username']);
=======
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const encryptedPassword = userData['password'];
      const decryptedPassword = this.decryptPassword(encryptedPassword);

      if (decryptedPassword === this.password) {
        const decryptedRole = this.getDecryptedRole(userData['role']);
        const permissions = await this.getRolePermissions(decryptedRole);

        const token = this.generateToken(userData, permissions);

        // Guardar los datos del usuario junto con el UID en el localStorage
        const user = {
          fullName: userData['fullName'],
          role: decryptedRole,
          token: token,
          userId: userDoc.id, // Guardamos el ID único del usuario
        };

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);

        await this.updateLastLogin(userData['username']);
>>>>>>> e2d75ef (Subida de Agenda1)
        await this.showLoadingLoginSuccess();
        this.navCtrl.navigateForward('/agenda');
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Contraseña incorrecta.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre de usuario no encontrado.',
        buttons: ['OK'],
      });
      await alert.present();
    }

    this.isLoading = false;
  }

  // Desencripta la contraseña almacenada
  decryptPassword(encryptedPassword: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secreto');
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error al desencriptar la contraseña:", error);
      return ''; 
=======
      console.error('Error al desencriptar la contraseña:', error);
      return '';
>>>>>>> e2d75ef (Subida de Agenda1)
    }
  }

  // Desencripta el rol almacenado
  getDecryptedRole(encryptedRole: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedRole, 'secreto');
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error al desencriptar el rol:", error);
      return ''; 
=======
      console.error('Error al desencriptar el rol:', error);
      return '';
>>>>>>> e2d75ef (Subida de Agenda1)
    }
  }

  // Obtiene los permisos según el rol del usuario
  async getRolePermissions(role: string): Promise<string[]> {
    const rolesCollection = collection(this.firestore, 'rol');
    const q = query(rolesCollection, where('role', '==', role));
    const roleSnapshot = await getDocs(q);
<<<<<<< HEAD
    return !roleSnapshot.empty ? roleSnapshot.docs[0].data()['permissions'] || [] : [];
=======
    return !roleSnapshot.empty
      ? roleSnapshot.docs[0].data()['permissions'] || []
      : [];
>>>>>>> e2d75ef (Subida de Agenda1)
  }

  // Genera un token de autenticación para el usuario
  generateToken(user: any, permissions: string[]): string {
    const tokenData = {
      username: user.username,
      role: user.role,
      permissions: permissions,
<<<<<<< HEAD
      expiration: new Date().getTime() + (60 * 60 * 1000), 
    };
    return CryptoJS.AES.encrypt(JSON.stringify(tokenData), 'secreto').toString(); 
=======
      expiration: new Date().getTime() + 60 * 60 * 1000,
    };
    return CryptoJS.AES.encrypt(
      JSON.stringify(tokenData),
      'secreto'
    ).toString();
>>>>>>> e2d75ef (Subida de Agenda1)
  }

  // Actualiza el último inicio de sesión del usuario
  async updateLastLogin(username: string) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('username', '==', username));
    const userSnapshot = await getDocs(q);
<<<<<<< HEAD
    
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await updateDoc(doc(this.firestore, 'users', userDoc.id), { lastLogin: new Date() });
=======

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await updateDoc(doc(this.firestore, 'users', userDoc.id), {
        lastLogin: new Date(),
      });
>>>>>>> e2d75ef (Subida de Agenda1)
    }
  }

  // Muestra animación de carga al iniciar sesión
  async showLoadingLoginSuccess() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Verificando credenciales...',
      duration: 3000,
    });
    await loading.present();
<<<<<<< HEAD
    setTimeout(() => { this.isLoading = false; loading.dismiss(); }, 3000);
  }
}

// Autor: Sebastian Andoney
=======
    setTimeout(() => {
      this.isLoading = false;
      loading.dismiss();
    }, 3000);
  }
}

// Autor: Sebastian Andoney
>>>>>>> e2d75ef (Subida de Agenda1)
