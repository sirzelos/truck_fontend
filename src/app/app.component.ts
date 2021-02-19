import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { DataService } from "./services/data.service";
const { SplashScreen } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  employees: any;
  constructor() {
    this.initializeApp();
  }

  async ngOnInit() {
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
