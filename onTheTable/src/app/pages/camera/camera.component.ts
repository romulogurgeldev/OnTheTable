import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CameraComponent implements OnInit {
  output: any;
  achou = false;
  // @ViewChild(QrScannerComponent, { static: false}) qrScannerComponent: QrScannerComponent ;
  @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;
  
  constructor() { }

 
  ngOnInit() {
    this.action.start();
  }
  ngAfterViewInit() {
    // this.qrScannerComponent.getMediaDevices().then(devices => {
    //   console.log(devices);
    //   const videoDevices: MediaDeviceInfo[] = [];
    //   for (const device of devices) {
    //       if (device.kind.toString() === 'videoinput') {
    //           videoDevices.push(device);
    //       }
    //   }
    //   if (videoDevices.length > 0){
    //       let choosenDev;
    //       for (const dev of videoDevices){
    //           if (dev.label.includes('front')){
    //               choosenDev = dev;
    //               break;
    //           }
    //       }
    //       if (choosenDev) {
    //           this.qrScannerComponent.chooseCamera.next(choosenDev);
    //       } else {
    //           this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
    //       }
    //   }
    // });
    // this.qrScannerComponent.capturedQr.subscribe(result => {
    //   console.log(result)
    //     if (result.includes('#/mesa/')){
    //       window.location.href = result;
    //     }
    // });
  }
  irPara(e: any){
    this.output = e.toString();
    if(this.output.includes('#/mesa/') && !this.achou){
      window.location.href = this.output;
      this.achou = true;
    }
  }
}
