import { ComidaService } from 'src/app/services/comida/comida.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image/image.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-forms-edit-food',
  templateUrl: './forms-edit-food.component.html',
  styleUrls: ['./forms-edit-food.component.scss']
})
export class FormsEditFoodComponent implements OnInit {
  carregando = true;
  @Output() tipoChange = new EventEmitter<string>();
  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;
  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  categoriaSelecionada: any;
  image: any;
  @Output() produtoChange = new EventEmitter<any>();
  @Input() produto: any;
  @Output() idprodutoChange = new EventEmitter<any>();
  @Input() idproduto: any;


  public form : FormGroup;


  constructor(
    private imageService: ImageService,
    private fb: FormBuilder, private comidaService: ComidaService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

    this.form = this.fb.group({});


  }
  preencheForm(){
  
    this.form = this.fb.group({
      nome: [this.produto.name, Validators.compose([
        Validators.required,
      ])],
      descricao: [this.produto.description, Validators.compose([
        Validators.required,
      ])],
      tamanho: [this.produto.type, Validators.compose([
        Validators.required,
      ])],
      preco: [this.produto.price, Validators.compose([
        Validators.required,
      ])],
      categoria: [this.categoria.index, Validators.compose([
        Validators.required,
      ])],      
      tempo: [this.produto.preparationTime, Validators.compose([
        Validators.required,
      ])],

    });
    
  }
  ngOnInit(): void {
    this.pegaComida();


  }
  pegaComida(){
    this.comidaService.getOne(this.idproduto).subscribe(res => {
      this.produto = res;

      this.preencheForm();
      this.carregando = false;

    })
  }
  async save(){
    this.carregando = true;
    const category = this.form.controls['categoria'].value.split('/');
 
    const index = parseInt(category[0]);
    var resultImage;
    if(this.image){
       resultImage = await this.imageService.create(this.image);

    }
    let dados = {
      restaurant: window.localStorage.getItem('idRestaurante'),
      categories: category[1],
      name: this.form.controls['nome'].value,
      image: {nome: this.form.controls['nome'].value, key: resultImage.key, location: resultImage.Location},
      // image: this.produto.image,
      available: this.produto.available,
      description: this.form.controls['descricao'].value,
      preparationTime: this.form.controls['tempo'].value,
      type: this.form.controls['tamanho'].value,
      price: this.form.controls['preco'].value,

    }

    try {
      const idComida = this.produto._id;
      let result = await this.comidaService.edit(this.produto._id, dados);
      const antigoIndexCategoria = this.categoria.index.split('/');

      const indexComida = this.categorias[antigoIndexCategoria[0]].comidas.indexOf(this.categorias[index].comidas.filter(function(obj: any){
        return obj._id == idComida;
      })[0]);

      this.categorias[antigoIndexCategoria[0]].comidas.splice(indexComida,1)
      this.categorias[index].comidas.push(dados)
      this.categoria.index = category[0] + "/" + category[1]
      // this.categorias[index].comidas[indexComida] = dados;
      // this.categoriasChange.emit(this.categorias)
      // const apagaImage = await this.imageService.delete(this.produto.image.key);
      this.pegaComida();
      this._snackBar.open('Editado com sucesso', "ok");
    } catch (error) {
      if (resultImage){
        const apagaImage = await this.imageService.delete(resultImage.key);

      }
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
