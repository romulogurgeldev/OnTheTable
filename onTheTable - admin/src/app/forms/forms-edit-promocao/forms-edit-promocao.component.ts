import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, AppearanceAnimation, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ComidaService } from 'src/app/services/comida/comida.service';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-forms-edit-promocao',
  templateUrl: './forms-edit-promocao.component.html',
  styleUrls: ['./forms-edit-promocao.component.scss']
})
export class FormsEditPromocaoComponent implements OnInit {
  @Output() promotionsChange = new EventEmitter<string>();

  @Input() promotions: any;
  @Output() productsChange = new EventEmitter<any>();
  @Input() products: any;
  carregando = false;
  @Output() tipoChange = new EventEmitter<string>();

  @Input() tipo: any;
  @Output() categoriaChange = new EventEmitter<any>();
  @Input() categoria: any;

  @Output() categoriasChange = new EventEmitter<any>();
  @Input() categorias: any;
  semana: any = [false, false, false, false, false, false, false];
  horas: any = []
  periodo = false;
  semanaPeriodo = false;
  categoriaSelecionada: any;
  foodsSelect: any = []
  comidas: any;
  pesquisa = "";
  abrir: any;
  abrir2: any;
  valorDesconto = 0;
  ativo = [true, false, false]

  public form : FormGroup;


  constructor(
    private promotionServices: PromotionService,
    private fb: FormBuilder, 
    private mesaService: MesaService, 
    private comidaService: ComidaService,
    private categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private router: Router){

      this.form = this.fb.group({
        nome: ["", Validators.compose([
          Validators.required,
        ])],
        tamanho: ['', Validators.compose([
          Validators.required,
        ])],
  
        dataInicio: [""],
        dataFim: [""],
        horaInicio: ["", Validators.compose([
          Validators.required,
        ])],
        horaFim: ["", Validators.compose([
          Validators.required,
        ])],
        tipo: ["", Validators.compose([
          Validators.required,
        ])],
        valorDesconto: ["", Validators.compose([
          Validators.required,
        ])],
        emDobro: [false]
  
      })

    
  }

  ngOnInit(): void {
    for (let i = 0; i < 1440; i+=30) {
      const horas = Math.floor(i/ 60);          
      const min = i % 60;
      const textoHoras = (`00${horas}`).slice(-2);
      const textoMinutos = (`00${min}`).slice(-2);
      
      this.horas.push(`${textoHoras }:${textoMinutos}`);
      
    } 
    console.log(this.products)
    
    this.pegaForm();

  }
  pegaForm(){
    if (this.products.weekDay.length>0){
      this.semana = this.products.weekDay;
    }
    this.form = this.fb.group({
      nome: [this.products.name, Validators.compose([
        Validators.required,
      ])],
      tamanho: ['', Validators.compose([
        Validators.required,
      ])],

      dataInicio: [this.products.promotionStart],
      dataFim: [this.products.promotionEnd],
      horaInicio: [this.products.hourStart, Validators.compose([
        Validators.required,
      ])],
      horaFim: [this.products.hourEnd, Validators.compose([
        Validators.required,
      ])],
      tipo: [this.products.typeDiscount, Validators.compose([
        Validators.required,
      ])],
      valorDesconto: [this.products.discountValue, Validators.compose([
        Validators.required,
      ])],
      emDobro: [this.products.doubleFood]

    })
  }
  pegaRestaurante(){
    
    this.comidaService.getAllByRestaurant().subscribe(result =>{
      this.comidas = result;
      for (let i = 0; i < this.comidas.length; i++) {
        this.foodsSelect.push("")
        
      }
      console.log(this.comidas)

    })
  }

  selecionaSemana(index: number){
    this.semana[index] = !this.semana[index]

  }
  selecionaComida(e: any, index: number, id: string){
    if (e.checked){
      this.foodsSelect[index] = id;
    }
    else{
      this.foodsSelect[index] = "";
    }
    console.log(this.foodsSelect)
  }
  itemPesquisa(e: any){

    this.pesquisa =(e.target.value);

  }
  async save(){
    this.carregando = true;
    let comida: any = []
    for (let i = 0; i < this.foodsSelect.length; i++) {
      if(this.foodsSelect[i]){
        comida.push(this.foodsSelect[i])
      }
      
    }
    const dados = {
      name: this.form.controls['nome'].value,
      promotionStart: this.ativo[0]==true ? new Date() : this.form.controls['dataInicio'].value,
      promotionEnd: this.ativo[0]==true ? new Date() : this.form.controls['dataFim'].value,
      typeDiscount: this.form.controls['tipo'].value,
      discountValue: this.form.controls['valorDesconto'].value,
      doubleFood: this.form.controls['emDobro'].value,
      hourStart: this.form.controls['horaInicio'].value,
      hourEnd: this.form.controls['horaFim'].value,
      weekDay: this.ativo[0]==true ? [] : this.semana,
      status: true
    }
    console.log(dados)
    try {
      const result = await this.promotionServices.edit(this.products._id, dados);
      let item: any;
      let index = 0;
     
      for (item of this.promotions) {
        
        if(item._id = this.products._id){
         
          this.promotions[index]=result;
        }
        index++;
      }

      this.productsChange.emit(result)
      this.promotionsChange.emit(this.promotions)
      this._snackBar.open('Promoção alterada com sucesso', "ok");

    } catch (error) {
      this._snackBar.open('Erro ao alterar promoção', "ok");
      
    }

      this.carregando = false;


  }
  async delete(){
    try {
      const result = await this.promotionServices.delete(this.products._id);
      let item: any;
      let index = 0;
     
      for (item of this.promotions) {
        
        if(item._id = this.products._id){
         
          this.promotions.splice(index, 1);
          return
        }
        index++;
      }
 
      this.productsChange.emit(result)
      this.promotionsChange.emit(this.promotions)
      this._snackBar.open('Promoção deletada', "ok");

    } catch (error) {
      this._snackBar.open('Erro ao alterar promoção', "ok");
      
    }
  }
  openConfirmBox(msg: string, callFunction: string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Atenção');
    newConfirmBox.setMessage(msg);

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: callFunction === "delete" ? DialogLayoutDisplay.DANGER : DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.FADE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional 
    });

    newConfirmBox.setButtonLabels('Confirmar', 'Cancelar');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID == "confirmar"){
        callFunction === "delete" ? this.delete() : this.save();
      }
    });
  }
}
