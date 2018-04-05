import { Component } from '@angular/core';
import { IonicPage, LoadingController,NavController, NavParams } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  value ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public loading: LoadingController) {

            //authentication check
            this.value =  localStorage.getItem("isAuthniticated");
            //if authentication failed pushed to login page
            if(this.value!=1){
              this.navCtrl.push(LoginPage);
            }

            //loading profile
            this.loadJson();
  }

  users:any;
  name:any;

  loadJson(){
    //loading spinner
    let loader = this.loading.create({
        content: 'Loadig new profile...',
      });

      //http call to api with loading spinner
      loader.present().then(() => {
        this.http.get('https://randomuser.me/api/')
        .map(res => res.json())
          .subscribe(res => {
            this.users = res.results;
            this.name =  this.users[0].name.first+" "+this.users[0].name.last;
            //console.log(this.name);
            }, (err) => {
              alert("failed loading json data");
            });
        loader.dismiss();
      });

  }

  logout(){
    //logout => authentication token remove
    localStorage.removeItem("isAuthniticated");
    this.navCtrl.push(LoginPage);
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

}
