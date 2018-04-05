import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') username;
  @ViewChild('password') password;
  value;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //checking if user is logged in
    this.value =  localStorage.getItem("isAuthniticated");
    if(this.value==1){
      this.navCtrl.push(ProfilePage);
    }
  }

  signin(){
    //manual signin checking
    if(this.username.value=="user" && this.password.value!="user"){
      alert('Wrong Password');
    }
    else if(this.username.value!="user" && this.password.value=="user"){
      alert('Wrong User Name');
    }
    else if(this.username.value!="user" && this.password.value!="user"){
      alert('Wrong User Name and Password');
    }
    else if(this.username.value=="user" && this.password.value=="user"){
      //setting auth token to localStorage
      localStorage.setItem("isAuthniticated", "1");
      this.navCtrl.push(ProfilePage);
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
