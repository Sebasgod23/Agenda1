import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone:false
})
export class AgendaPage implements OnInit {

 constructor(
     private alertController: AlertController,
     private navCtrl: NavController,
     private loadingController: LoadingController,
     private firestore: Firestore 
   ) {}

  ngOnInit() {
  }
  
  logout() {
    localStorage.clear();
    this.navCtrl.navigateBack('/home');
  }

}
