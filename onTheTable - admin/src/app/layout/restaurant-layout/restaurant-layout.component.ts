import { NotificationsService } from './../../services/notifications/notifications.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
  ConfirmBoxInitializer,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-restaurant-layout',
  templateUrl: './restaurant-layout.component.html',
  styleUrls: ['./restaurant-layout.component.scss']
})
export class RestaurantLayoutComponent implements OnInit {
  estabelecimento: any;
  notifications: any;
  totalNotification = 0;
  telaNotification = false;
  CLOCK: any;
  constructor(
    private notificationsService: NotificationsService,
    private estabelecimentoService: EstabelecimentoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.estabelecimentoService.getById(id).subscribe(res => {
        window.localStorage.setItem('idRestaurante', id);
        this.getNotification();
      }, err => {
        this.toastNotification("Error", "Restaurante não encontrado", DialogLayoutDisplay.DANGER);
        window.location.href = '#/home'
      })

    });
  }
  // standard typescript method.
  toastNotification(title:string, msg: string, tipo: any) {

    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(title);  
    newToastNotification.setMessage(msg);
    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 5000, // optional
      textPosition: 'left', // optional
      layoutType: tipo, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: ToastPositionEnum.BOTTOM_RIGHT,
      buttonPosition: 'right', // optional 
    });



    // Simply open the popup and observe button click
    newToastNotification.openToastNotification$().subscribe(resp => {
      if (resp.clickedButtonID) {
        console.log('Button clicked: ', resp.clickedButtonID);
      }
    });
  }

  getNotification() {
    clearTimeout(this.CLOCK)
    this.notificationsService.getByRestaurant().subscribe((res: any) => {
      this.totalNotification = 0;
      this.notifications = res;
      for (let i = 0; i < res.length; i++) {
        if (!res[i].notificou){
          if (res[i].type == "cozinha"){
            this.toastNotification(res[i].type, res[i].table.name+" "+res[i].msg, DialogLayoutDisplay.CUSTOM_ONE);
  
          }
          
          else if (res[i].type == "mesa"){
            this.toastNotification(res[i].type, res[i].table.name+" "+res[i].msg, DialogLayoutDisplay.CUSTOM_TWO);
          }
          res[i].notificou = true;
          this.notificationsService.edit(res[i]._id, res[i]).subscribe(res => {}, err => {})
        }
                
        if (res[i].lida == false)
          this.totalNotification ++;
        
      }
      setTimeout(() => {
        this.CLOCK = this.getNotification();
      }, 8000)
    })
  }
  readNotification(item: any){
    item.lida = true;
    this.notificationsService.edit(item._id, item).subscribe(res => {
      this.getNotification();
    }, err => {})

  }
  async deleteNotification(id: string){
    console.log(id)
    try {
      await this.notificationsService.delete(id)
      this.toastNotification("Error", "Notificação removida", DialogLayoutDisplay.SUCCESS);
      
    } catch (error) {
      this.toastNotification("Error", "Notificação não apagado", DialogLayoutDisplay.DANGER);
      
    }
  }

  openConfirmBox(id: string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Atenção');
    newConfirmBox.setMessage('Essa notificação será removida da lista de notificações!');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('Confirmar', 'Cancelar');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      console.log(resp.clickedButtonID)
      if(resp.clickedButtonID == "confirmar"){
        this.deleteNotification(id);
      }
    });
  }

}
