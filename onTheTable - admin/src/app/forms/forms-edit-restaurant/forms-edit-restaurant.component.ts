import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { ImageService } from 'src/app/services/image/image.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-forms-edit-restaurant',
  templateUrl: './forms-edit-restaurant.component.html',
  styleUrls: ['./forms-edit-restaurant.component.scss']
})
export class FormsEditRestaurantComponent implements OnInit {
  @Output() idRestauranteChange = new EventEmitter<any>();
  @Input() idRestaurante: any;
  restaurante: any;
  dono: any;
  form: any;
  image: any;
  imagem: any;
  mostraForm = false;
  carregando = false;
  cepCompleto = false;
  keyImagem = ""
  
  
  constructor(
    private imageService: ImageService,
    private usuariosService: UsuarioService,
    private fb: FormBuilder, 
    private restaurantesService: EstabelecimentoService){
    this.form = this.fb.group({})
    
  }
  ngOnInit(): void {
    this.idRestaurante = window.localStorage.getItem('idRestaurante')

    this.getRestaurantes();
  }
  getForms(){
    this.form = this.fb.group({
      nome: [this.restaurante.name, Validators.compose([
        Validators.required,
      ])],
      cnpj: [this.restaurante.cnpj, Validators.compose([
        Validators.required,
        
      ])],
      razaoSocial: [this.restaurante.razaoSocial, Validators.compose([
        Validators.required,
      ])],
      telefone: [this.dono.address.telphone, Validators.compose([
        Validators.required,
        Validators.minLength(11),
      ])],
      

    })
    this.mostraForm = true;
  }
  getRestaurantes(){
    this.restaurantesService.getById(this.idRestaurante).subscribe((res: any) => {
      this.restaurante = res;
      this.imagem = this.restaurante.foto?.location
      this.usuariosService.getOne(this.restaurante.userAdm).subscribe((res2: any) => {
        this.dono = res2;
        this.getForms();
        
      })
    })
  }
  async save(){
    this.carregando = true;
    console.log(this.restaurante)
    let resultImage;
    console.log(this.image, this.imagem)
    if(this.image && this.imagem!=this.restaurante.foto?.location){
      console.log(this.image)
      
      resultImage = await this.imageService.create(this.image);
      this.restaurante.foto ? await this.imageService.delete(this.restaurante.foto.key) : null
    }
    else console.log('imagem igual')
    console.log(resultImage)
    let dadosRestaurant: any = {
      
      name: this.form.controls['nome'].value,

      cnpj: this.form.controls['cnpj'].value,
      razaoSocial: this.form.controls['razaoSocial'].value,
      address: this.restaurante.address,

    }
    if (this.imagem)
    dadosRestaurant.foto = {
      nome: this.form.controls['nome'].value, 
      key: resultImage ? resultImage.key : this.restaurante.foto.key, 
      location: resultImage ? resultImage.Location : this.restaurante.foto.location
    };
    
    const result = await this.restaurantesService.edit(this.restaurante._id, dadosRestaurant);
    this.carregando = false;
    window.location.reload();
  }


  openConfirmBox() {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Atenção');
    newConfirmBox.setMessage('Ao apagar o restaurante todos os dados serão apagados, não é possível reverter essa ação!');

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
      if(resp.clickedButtonID == "Confirmar"){
        this.delete();
      }
    });
  }
  async delete(){
    const resulta = await this.restaurantesService.delete(this.idRestaurante)
  }
} 
