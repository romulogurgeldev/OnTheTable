import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, AppearanceAnimation, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-forms-edit-mesa',
  templateUrl: './forms-edit-mesa.component.html',
  styleUrls: ['./forms-edit-mesa.component.scss']
})
export class FormsEditMesaComponent implements OnInit {

  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  @Output() idprodutoChange = new EventEmitter<any>();
  @Input() idproduto: any;

  categoriaSelecionada: any;
  public produto: any;



  public form : FormGroup;


  constructor(private fb: FormBuilder, private mesaService: MesaService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({})

    
  }


  ngOnInit(): void {
    this.pegaMesa();
    

  }
  pegaMesa(){
    this.mesaService.getOne(this.idproduto).subscribe(res => {
      this.produto = res;
      this.pegaForm();
      this.carregando = false;

    })
  }
  pegaForm(){
    this.form = this.fb.group({
      nome: [this.produto.name, Validators.compose([
        Validators.required,
      ])],
      tamanho: [this.produto.size, Validators.compose([
        Validators.required,
      ])],
      categoria: [this.categoria.index, Validators.compose([
        Validators.required,
      ])],


    })
  }
  async save(){
    this.carregando = true;
    const category = this.form.controls['categoria'].value.split('/');
 
    const index = parseInt(category[0]);

    let dados = {
      restaurant: window.localStorage.getItem('idRestaurante'),
      category: category[1],
      name: this.form.controls['nome'].value,
      size: this.form.controls['tamanho'].value,
    }

    try {
      const idComida = this.produto._id;
      let result = await this.mesaService.edit(this.produto._id, dados);
      const antigoIndexCategoria = this.categoria.index.split('/');

      const indexComida = this.categorias[antigoIndexCategoria[0]].comidas.indexOf(this.categorias[index].comidas.filter(function(obj: any){
        return obj._id == idComida;
      })[0]);

      this.categorias[antigoIndexCategoria[0]].mesas.splice(indexComida,1)
      this.categorias[index].mesas.push(dados)
      this.categoria.index = category[0] + "/" + category[1]
      // this.categorias[index].comidas[indexComida] = dados;
      // this.categoriasChange.emit(this.categorias)
      // const apagaImage = await this.imageService.delete(this.produto.image.key);
      this.pegaMesa();
      this._snackBar.open('Editado com sucesso', "ok");
    } catch (error) {
 
      console.log(error)
      this._snackBar.open('Erro ao salvar', "ok");

    }
    this.carregando = false;






   
  }
  openConfirmBox(msg: string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Atenção');
    newConfirmBox.setMessage(msg);

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('Confirmar', 'Cancelar');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID == "Confirmar"){
        this.save();
      }
    });
  }
}
