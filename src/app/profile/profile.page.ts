import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  // Variables para almacenar la información del usuario
  fullName: string = '';
  role: string = '';
  email: string = '';
  username: string = '';
  birthDate: string = '';
  createdAt: string = '';
  lastLogin: string = '';
  isTokenValid: boolean = false; // Indica si el token es válido

  // Constructor que inyecta NavController para la navegación y Firestore para obtener datos del usuario
  constructor(private navCtrl: NavController, private firestore: Firestore) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Verifica si el usuario está autenticado y obtiene su información de Firestore.
   */
  ngOnInit() {
    console.log('ngOnInit: Verificando usuario y token');
    
    // Obtiene los datos del usuario desde localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const token = localStorage.getItem('authToken');
    
    console.log('loggedInUser desde localStorage:', loggedInUser);
    console.log('Token desde localStorage:', token);

    if (!loggedInUser || !token) {
      console.log('No hay usuario o token, redirigiendo al home');
      this.navCtrl.navigateBack('/home');
      return;
    }

    // Desencripta el token almacenado
    const decryptedToken = this.decryptToken(token);
    console.log('Token descifrado:', decryptedToken);

    if (decryptedToken && decryptedToken.username) {
      this.username = decryptedToken.username; 
      console.log('Username del usuario logueado:', this.username);

      // Desencripta el rol del usuario
      const decryptedRole = this.decryptRole(decryptedToken.role);
      console.log('Rol desencriptado:', decryptedRole);
      this.role = decryptedRole;

      this.isTokenValid = true;

      console.log('Token válido, obteniendo datos de Firestore');
      this.getUserDataFromFirestore();
    } else {
      console.log('Token no válido o username no encontrado, redirigiendo al home');
      this.navCtrl.navigateBack('/home');
    }
  }

  /**
   * Desencripta el token almacenado en localStorage.
   * @param encryptedToken Token encriptado.
   * @returns Objeto con los datos desencriptados o null si falla la desencriptación.
   */
  decryptToken(encryptedToken: string): any {
    console.log('Desencriptando token...');
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, 'secreto');
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
        throw new Error('Desencriptación fallida');
      }

      console.log('Token desencriptado con éxito:', decryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error al desencriptar el token:', error);
      return null;
    }
  }

  /**
   * Desencripta el rol del usuario.
   * @param encryptedRole Rol encriptado.
   * @returns Rol desencriptado como string.
   */
  decryptRole(encryptedRole: string): string {
    console.log('Desencriptando rol...');
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedRole, 'secreto');
      const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedRole) {
        throw new Error('Desencriptación fallida del rol');
      }

      console.log('Rol desencriptado con éxito:', decryptedRole);
      return decryptedRole;
    } catch (error) {
      console.error('Error al desencriptar el rol:', error);
      return '';  
    }
  }

  /**
   * Obtiene los datos del usuario desde Firestore en función del nombre de usuario desencriptado.
   */
  async getUserDataFromFirestore() {
    console.log('Realizando consulta en Firestore para el usuario:', this.username);
    try {
      // Crea la referencia a la colección 'users' en Firestore
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('username', '==', this.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Usuario encontrado en Firestore');
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('Datos del usuario desde Firestore:', userData);

          // Asigna los datos recuperados a las variables de la clase
          this.fullName = userData['fullName'] || '';
          this.email = userData['email'] || '';
          this.birthDate = userData['birthDate'] || '';
          this.createdAt = userData['createdAt']?.toDate() || '';
          this.lastLogin = userData['lastLogin']?.toDate() || '';
        });
      } else {
        console.log('Usuario no encontrado en Firestore');
        this.navCtrl.navigateBack('/home');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario desde Firestore:', error);
      this.navCtrl.navigateBack('/home');
    }
  }

  /**
   * Redirige al usuario a la pantalla de inicio.
   */
  goToHome() {
    console.log('Redirigiendo al home');
    this.navCtrl.navigateBack('/inicio');
  }
}

// Autor: Sebastian Andoney
