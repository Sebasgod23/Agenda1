import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
<<<<<<< HEAD
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
=======
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
>>>>>>> e2d75ef (Subida de Agenda1)
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email: string = '';
  fullName: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  birthDate: string = '';

  formValid: boolean = false;
  emailValid: boolean = true;
  passwordsMatch: boolean = true;
  passwordValid: boolean = true;
  usernameValid: boolean = true;
  birthDateValid: boolean = true;
  showCalendar: boolean = false; // Controla la visibilidad del calendario

  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
<<<<<<< HEAD
    private firestore: Firestore 
=======
    private firestore: Firestore
>>>>>>> e2d75ef (Subida de Agenda1)
  ) {}

  validateForm() {
    this.emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    this.usernameValid = !this.username.includes(' ');
<<<<<<< HEAD
    this.passwordsMatch = this.password === this.confirmPassword;
    this.birthDateValid = this.isValidAge(this.birthDate);

=======
    this.passwordsMatch = this.password === this.confirmPassword
>>>>>>> e2d75ef (Subida de Agenda1)
    this.formValid =
      this.emailValid &&
      this.email.trim() !== '' &&
      this.fullName.trim() !== '' &&
      this.usernameValid &&
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.passwordValid &&
      this.passwordsMatch &&
      this.birthDate.trim() !== '' &&
      this.birthDateValid;
  }

  validatePassword() {
<<<<<<< HEAD
    this.passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password);
=======
    this.passwordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        this.password
      );
>>>>>>> e2d75ef (Subida de Agenda1)
    this.validateForm();
  }

  formatFullName() {
    this.fullName = this.fullName.toUpperCase();
    this.validateForm();
  }

  removeSpaces() {
    this.username = this.username.replace(/\s/g, '');
    this.validateForm();
  }

<<<<<<< HEAD
  isValidAge(birthDate: string): boolean {
    if (!birthDate) return false;
=======
  isValidAge(birthDate: string): { isValid: boolean; message?: string } {
    if (!birthDate)
      return { isValid: false, message: 'Fecha de nacimiento inválida' };
>>>>>>> e2d75ef (Subida de Agenda1)
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

<<<<<<< HEAD
    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
=======
    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      return {
        isValid: false,
        message: 'Debes ser mayor de 18 años para registrarte',
      };
    }

    return { isValid: true };
>>>>>>> e2d75ef (Subida de Agenda1)
  }

  // Función para mostrar/ocultar el calendario
  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  async checkIfUserExists() {
    const usersCollection = collection(this.firestore, 'users');
    const qEmail = query(usersCollection, where('email', '==', this.email));
<<<<<<< HEAD
    const qUsername = query(usersCollection, where('username', '==', this.username));
=======
    const qUsername = query(
      usersCollection,
      where('username', '==', this.username)
    );
>>>>>>> e2d75ef (Subida de Agenda1)

    const emailSnapshot = await getDocs(qEmail);
    const usernameSnapshot = await getDocs(qUsername);

    if (!emailSnapshot.empty) {
      return 'El email ya está registrado';
    }
    if (!usernameSnapshot.empty) {
      return 'El nombre de usuario ya está registrado';
    }
    return null;
  }

  async registerUser() {
<<<<<<< HEAD
    if (!this.formValid) return;

=======
    this.validateForm();

    // Verifica la validez del formulario
    if (!this.formValid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Completa el formulario',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Verifica si la edad es válida
    const ageValidation = this.isValidAge(this.birthDate);
    if (!ageValidation.isValid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: ageValidation.message,
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
>>>>>>> e2d75ef (Subida de Agenda1)
    const userExistsMessage = await this.checkIfUserExists();
    if (userExistsMessage) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: userExistsMessage,
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
<<<<<<< HEAD
      const hashedPassword = CryptoJS.AES.encrypt(this.password, 'secreto').toString();

      const hashedRole = CryptoJS.AES.encrypt('admin', 'secreto').toString(); 
=======
      const hashedPassword = CryptoJS.AES.encrypt(
        this.password,
        'secreto'
      ).toString();

      const hashedRole = CryptoJS.AES.encrypt('admin', 'secreto').toString();
>>>>>>> e2d75ef (Subida de Agenda1)

      const newUser = {
        email: this.email,
        fullName: this.fullName,
        username: this.username,
<<<<<<< HEAD
        password: hashedPassword, 
        birthDate: this.birthDate,
        role: hashedRole, 
        createdAt: new Date(), 
=======
        password: hashedPassword,
        birthDate: this.birthDate,
        role: hashedRole,
        createdAt: new Date(),
>>>>>>> e2d75ef (Subida de Agenda1)
      };

      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, newUser);

      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: `Bienvenido ${this.fullName}`,
        buttons: ['OK'],
      });
      await alert.present();

      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al registrar usuario en Firestore:', error);

      const alert = await this.alertController.create({
        header: 'Error',
<<<<<<< HEAD
        message: 'Hubo un problema al registrar el usuario. Inténtalo de nuevo.',
=======
        message:
          'Hubo un problema al registrar el usuario. Inténtalo de nuevo.',
>>>>>>> e2d75ef (Subida de Agenda1)
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e2d75ef (Subida de Agenda1)
