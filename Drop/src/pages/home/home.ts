import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Pickup } from '../pickup/pickup';
import { LoadingController } from 'ionic-angular';
import { DropServiceProvider } from '../../providers/drop-service/drop-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {


  constructor(public navCtrl: NavController, private geolocation: Geolocation, public alertCtrl: AlertController, public loadingCtrl: LoadingController,  public dataservice: DropServiceProvider ) {

  }

  dropMessage(){
    this.getLocationAndMessage();
  }


  getLocationAndMessage(){{

      const prompt = this.alertCtrl.create({
        title: 'Add',
        message: "Please enter item...",
        inputs: [
          {
            name: 'name',
            placeholder: 'Message'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: item => {
              this.geolocation.getCurrentPosition().then((resp) =>{ 
              var object = {
                lat:resp.coords.latitude,
                long: resp.coords.longitude,
                message: item.name
              };    
              this.dataservice.addItem(object)
            }).catch((error) => {
              console.log('Error getting location', error);
            });
            }
          }
        ]
      });
      prompt.present();
    }
  }
  



  pickMessageAndLoad(){
    this.presentLoading()
    this.pickMessage()
  }


  pickMessage(){
    this.navCtrl.push(Pickup, {data: this.dataservice.items});
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();

  }





}
