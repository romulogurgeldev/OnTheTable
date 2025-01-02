import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ComplementosService } from 'src/app/services/complementos/complementos.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lista-complementos',
  templateUrl: './lista-complementos.component.html',
  styleUrls: ['./lista-complementos.component.scss']
})
export class ListaComplementosComponent implements OnInit {
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;
  trocou = false;
  abrir: any = []
  verMenu: any = []
  complementos: any = []
  complementoEscolhido: any;
  constructor(
    private complementosService: ComplementosService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    
  }
  pegaComplementos(){
    this.categoriaService.getAllByRestaurant("complementos", 1000).subscribe((res) => {
    
      res.map((res2) => {
        
        this.complementosService.getAllByFoodAndCategory(this.produto, res2._id).subscribe(res3 =>{
          if (res3.length>0){
            this.abrir.push("")
            this.verMenu.push("")
            let complemento: any = {
              tipo: "",
              idCategoria: "",
              complementos: {},
              minimo: 0,
              maximo: 0,
            };
            complemento.tipo = res2.name;
            complemento.minimo = res2.quantityPerFoodMin;
            complemento.maximo = res2.quantityPerFoodMax;
            complemento.idCategoria = res2._id;
            complemento.complementos = res3;
            this.complementos.push(complemento)
            
          }
        })
      })
      
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    
    this.complementos = []
    this.abrir = []
    this.pegaComplementos();
  }
}
