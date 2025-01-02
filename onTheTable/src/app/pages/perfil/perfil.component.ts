import { MesasService } from './../../services/mesas/mesas.service';
import { ConfigService } from './../../services/config/config.service';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nome: any;
  idMesa: any;
  idRestaurante: any;
  configRestaurant: any;
  constructor(
    private configService: ConfigService,
    private mesasService: MesasService

  ) { }

  ngOnInit(): void {
    const url = window.location.href.split('/');
    this.idMesa = url[url.length-1];

    this.nome = window.localStorage.getItem('nome')
    this.mesasService.getOneByCode(this.idMesa).subscribe((res: any) => {
      this.configService.getOneByRestaurant(res.restaurant._id).subscribe((res: any) => {
        this.configRestaurant = res;
      })
    })
  }
  openConfirmBox(msg: string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Chat');
    newConfirmBox.setMessage(msg);

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.CUSTOM_ONE, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('ok', '');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID){
        console.log('Button clicked: ', resp.clickedButtonID);
      }
    });
}

}
