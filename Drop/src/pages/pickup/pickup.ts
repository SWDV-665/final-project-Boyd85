import { Component } from '@angular/core';
import {NavController, NavParams, Item} from 'ionic-angular';
import { DropServiceProvider } from '../../providers/drop-service/drop-service';



@Component({
  selector: 'page-pickup',
  templateUrl: 'pickup.html'
})
export class Pickup {

  items=[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public dataservice: DropServiceProvider) {
    dataservice.dataChanged$.subscribe((dateChange: boolean)=>{
      this.loadItems();
    })
    }

    ionViewDidLoad(){
      this.loadItems();
    }

    loadItems(){
      this.dataservice.getItems().subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
    }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }


}
