import { Component, OnInit, EventEmitter, Output, Input,  VERSION } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { environment } from './../../../environments/environment';


import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {
  @Output() tipoChange = new EventEmitter<any>();
  @Input() tipo: any;
  @Output() modeChange = new EventEmitter<any>();
  @Input() mode: any;
  @Output() abrirChange = new EventEmitter<any>();
  @Input() abrir: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;
  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;

  abrir2: any = [];
  pesquisa: string = "";
  ordemSize = 1;
  ordemName = -1;
  qrsrc: any;

  constructor(private categoriaService: CategoriaService, private mesaService: MesaService,
    private comidaService: ComidaService) { }

  ngOnInit(): void {
    this.categoriaService.getAllByRestaurant(this.tipo).subscribe(res => {
      this.categorias = res;

      for (let i = 0; i < this.categorias.length; i++) {
        this.abrir2.push(null)
        this.categorias[i].index = i+'/'+this.categorias[i]._id ;

        this.pegaComida(1, "name", i);
        this.pegaMesa(1, "name", i);

      }
      this.categoriasChange.emit(this.categorias);
    })



  }
  pegaComida(ordem = 1, title = "name", index = 0){
    this.comidaService.getAllByCategory(this.categorias[index]._id, 10, 0, ordem, title).subscribe(result =>{
      this.categorias[index].comidas = result;
      
    })
  }
  pegaMesa(ordem = 1, title = "name", index = 0){
    this.mesaService.getAllByCategory(this.categorias[index]._id, 10, 0, ordem, title).subscribe(async result =>{
      this.categorias[index].mesas = result;

    })
  }


  deleteFood(id: string, indexComida: number, indexCategoria: number){
    this.categorias[indexCategoria].comidas.splice(indexComida, 1);
    this.comidaService.delete(id);
  }
  deleteCategoria(id: string, indexCategoria: number){
    this.categorias.splice(indexCategoria, 1);
    this.categoriaService.delete(id);
  }
  deleteMesa(id: string, indexMesa: number, indexCategoria: number){
    this.categorias[indexCategoria].mesas.splice(indexMesa, 1);
    this.mesaService.delete(id);
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }

// mode -> 3 add food / mesa; 4 ver comida / mesa; edit comida; 5 edit food/mesa; 6 complementos
  abrirJanela(mode: number, categoria: any, produto: any = null){

    if(produto){
      this.produtoChange.emit(produto);
    }
    this.modeChange.emit(mode);
    this.abrirChange.emit(true);
    this.categoriaChange.emit(categoria);
  } 
  async disponibilidade(event: any, produto: any){
    produto.available = !produto.available
    const result = await this.comidaService.edit(produto._id, produto);
  
  }
  // async link(id: string){
  //   
  //   const link = `${environment.pwa}/#/home/mesa/${id.substr(0, 6)}`;
  //   // let sizei = new Blob([link]).size;
  //   
  //  

  //   try {
  //     const result: any  = await this.mesaService.link(link);
  //     return result.result;
  //   } catch (error) {
  //     console.log(error)
  //     return link;
  //   }

  //   // this.produto.link = link;
    
  // }
  
  pegaQrCode(){
    this.qrsrc = document.getElementsByClassName("aclass2 ");
   
    for (let item of this.qrsrc) {
      if(item.firstChild){
        const src = item.firstChild.src;
        item.firstChild.parentNode.removeChild(item.firstChild);
        return src;

      }
    }

  }
  openConfirmBox(msg: string, id: string, indexComida: number, indexCategoria: number) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Atenção');
    newConfirmBox.setMessage(msg);

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
      if(resp.clickedButtonID == "confirmar"){
        this.tipo==="comida" ? this.deleteFood(id, indexComida, indexCategoria) : this.deleteMesa(id, indexComida, indexCategoria);
      }
    });
  }

}
