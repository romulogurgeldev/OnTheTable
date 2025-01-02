import { MesasService } from 'src/app/services/mesas/mesas.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ComplementosService } from 'src/app/services/complementos/complementos.service';

@Component({
  selector: 'app-lista-complementos',
  templateUrl: './lista-complementos.component.html',
  styleUrls: ['./lista-complementos.component.scss']
})
export class ListaComplementosComponent implements OnInit {
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;
  @Output() complementoChange = new EventEmitter<any>();
  @Input() complemento: any;
  @Output() obrigatoriosChange = new EventEmitter<any>();
  @Input() obrigatorios: any;
  trocou = false;
  abrir: any = []
  verMenu: any = []
  complementos: any = []
 
  somaObrigatorios = 0;
  obrigatoriosFeitos = 0;

  constructor(
    private complementosService: ComplementosService,
    private categoriaService: CategoryService,
    private mesasService: MesasService,
  ) { }

  ngOnInit(): void {
    this.pegaComplementos();
  }
  pegaComplementos(){
    let idMesa: any = window.localStorage.getItem('mesa');
    this.mesasService.getOne(idMesa).subscribe((res: any) =>{
      console.log(res)
      this.categoriaService.getAllByRestaurant(res.restaurant._id, "complementos", 1000).subscribe((res) => {
        console.log(res)
          res.map((res2) => {
            
            this.complementosService.getAllByFoodAndCategory(this.produto, res2._id).subscribe((res3:any) =>{
              if (res3.length>0){
                this.abrir.push("")
                this.verMenu.push("")
                let complemento: any = {
                  tipo: "",
                  idCategoria: "",
                  complementos: {},
                  minimo: 0,
                  maximo: 0,
                  total: 0,
                };
                complemento.tipo = res2.name;
                complemento.minimo = res2.quantityPerFoodMin;
                complemento.maximo = res2.quantityPerFoodMax;
                
                
                complemento.idCategoria = res2._id;
                for (let i = 0; i < res3.length; i++) {
                  res3[i].quantidade = 0;
                  
                }
                if (res2.quantityPerFoodMin>0) {
                  this.obrigatoriosChange.emit(false);
                  this.somaObrigatorios++;
                }
               
                complemento.complementos = res3;

                this.complementos.push(complemento)
                
              }
            })
          })
          
        })
    })

  }
  // ngOnChanges(changes: SimpleChanges) {
    
  //   this.complementos = []
  //   this.abrir = []
  //   this.pegaComplementos();
  // }
  contador(e: any, item: any, index: number){
    console.log(e.checked)
    if (e.checked){
      item.total++;
      item.complementos[index].quantidade++;
      console.log(item)
      for (let i = 0; i < item.complementos.length; i++) {
        item.complementos[i]
        if (item.total>item.maximo){
          console.log(item.total, item.maximo)
          index==0 ? item.complementos[1].quantidade = 0 : item.complementos[0].quantidade = 0
          
        }
        
        
      }
      if (item.total>item.maximo) item.total--;
    }
    else {
      item.total--;
      item.complementos[index].quantidade--;
    }
    console.log(item)
    this.complementoChange.emit(this.complementos)
    this.verificaObrigatorio();
  }
  contador2(valor: number, item: any, index: number){
    item.complementos[index].quantidade = item.complementos[index].quantidade + valor;
    item.total = 0;
    if (item.complementos[index].quantidade<0) item.complementos[index].quantidade = 0;
    if (item.complementos[index].quantidade>item.maximo) item.complementos[index].quantidade --;
    
    for (let i = 0; i < item.complementos.length; i++) {
      item.total = item.total + item.complementos[i].quantidade;
      
    }
    this.complementoChange.emit(this.complementos)
    this.verificaObrigatorio();
  }
  verificaObrigatorio(){
    let aprovado = 0;
    for (let i = 0; i < this.complementos.length; i++) {
      
      if (this.complementos[i].minimo>=1 && this.complementos[i].total>=this.complementos[i].minimo){
        aprovado ++;
        
      }
      
    }
    console.log(aprovado, this.somaObrigatorios)
    if (aprovado >= this.somaObrigatorios){
      this.obrigatoriosChange.emit(true)
    }
    else{
      this.obrigatoriosChange.emit(false)
    }
  }

}
