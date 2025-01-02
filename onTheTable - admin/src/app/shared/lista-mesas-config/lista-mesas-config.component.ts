import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mesas-config',
  templateUrl: './lista-mesas-config.component.html',
  styleUrls: ['./lista-mesas-config.component.scss']
})
export class ListaMesasConfigComponent implements OnInit {
  categorias: any;
  constructor(private categoriaService: CategoriaService) { }
  
  ngOnInit(): void {
    this.categoriaService.getAllByRestaurant("mesa").subscribe(res => {
      this.categorias = res;
    })
  }

}
