import { OrderService } from './../../services/orders/order.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-perfil-mesa',
  templateUrl: './perfil-mesa.component.html',
  styleUrls: ['./perfil-mesa.component.scss']
})
export class PerfilMesaComponent implements OnInit {
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;
  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;

  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.QUARTILE;

  qrsrc: any;
  order: any;
  constructor(private mesaService: MesaService, private orderService: OrderService) {


  }

  ngOnInit(): void {

    this.orderService.getOneActive(this.produto._id).subscribe(result => {
      this.order = result;
      console.log(this.order)
    })

  }
  async disponibilidade(event: any){
    this.produto.status = !this.produto.status
    const result = await this.mesaService.edit(this.produto._id, this.produto);

  }

    pegaQrCode(){
      this.qrsrc = document.getElementsByClassName("aclass");

      for (let item of this.qrsrc) {
        if(item.firstChild){
          return item.firstChild.src;

        }
      }
    }
  
    

}
