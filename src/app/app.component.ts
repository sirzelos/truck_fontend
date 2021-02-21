import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { DataService } from "./services/data.service";
const { SplashScreen } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  employees: any;
  constructor() {
    this.initializeApp();
  }

  loggedIn = false;

  ngOnInit() {
    this.loggedIn = localStorage.getItem("token") !== null;
    // let data = await this.dtService.getData().toPromise();
    // console.log(data);
  }
  initializeApp() {
    /* To make sure we provide the fastest app loading experience 
       for our users, hide the splash screen automatically 
       when the app is ready to be used:
        
        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();
  }
}
