import { UsersService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SignaturePad } from "angular2-signaturepad";

@Component({
  selector: "app-signaturepad",
  templateUrl: "signaturepad.page.html",
  styleUrls: ["signaturepad.page.scss"],
})
export class SignaturepadPage implements OnInit {
  mode: any;
  id: number;
  order: any;
  data: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  ngAfterViewInit() {
    // this.signaturePad is now available

    this.signaturePad.set("minWidth", 5); // set szimek/signature_pad options at runtime
    if (this.mode === "show") {
      this.signaturePad.off();
    } else if (this.mode === "new") {
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.data = this.signaturePad.toDataURL();
    console.log(this.data);
  }

  async save() {
    if (!this.data) {
      return;
    }
    const response = {
      signaturepad: this.data,
    };
    const result = await this.userService.saveSignaturepad(this.id, response);

    this.router.navigate(["order", "my-order"]);
  }

  setSignaturePad(data: string) {
    this.signaturePad.fromDataURL(data);
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawing");
  }
  constructor(
    private location: Location,
    private activate: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    const { mode, id } = this.activate.snapshot.params;
    this.mode = mode;
    this.id = id;
    if (mode === "show") {
      this.loadData();
    }
  }
  ngOnInit() {
    const { mode, id } = this.activate.snapshot.params;
    this.mode = mode;
    this.id = id;
    if (mode === "show") {
      this.loadData();
    }
  }

  async loadData() {
    this.order = await this.userService.getOrderByID(this.id);
    this.setSignaturePad(this.order?.signaturepad);
  }

  back() {
    this.location.back();
  }
}
