import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-cad-pessoal',
  templateUrl: './forms-cad-pessoal.component.html',
  styleUrls: ['./forms-cad-pessoal.component.scss']
})
export class FormsCadPessoalComponent implements OnInit {

  @Output() nomeChange = new EventEmitter<string>();
  @Input() nome: any;
  @Output() cpfChange = new EventEmitter<string>();
  @Input() cpf: any;
  @Output() paginaChange = new EventEmitter<number>();
  @Input() pagina: number = 0;
  @Output() dataNascimentoChange = new EventEmitter<number>();
  @Input() dataNascimento: number = 0;
  @Output() modeChange = new EventEmitter<number>();
  @Input() mode: number = 0;
  statusCPF = false;







  public form : FormGroup;


  constructor(private fb: FormBuilder, 
    private router: Router){
    this.form = this.fb.group({
      nome: ['', Validators.compose([
        Validators.required,
      ])],
      cpf: ['', Validators.compose([
        Validators.required,

        
      ])],
      dataNascimento: ['', Validators.compose([
        Validators.required,

      ])],

    
    })
    
  }

  ngOnInit(): void {
  }
  async save(){
    this.nomeChange.emit(this.form.controls['nome'].value);
    this.cpfChange.emit(this.form.controls['cpf'].value);
    this.paginaChange.emit(this.pagina+1);

  }
  verificaCPF(){
    let cpf = this.cpf;
    console.log(this.cpf)
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)){
      this.statusCPF = false;
      return false;
    } 
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e: any, i: any){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    if(result==true) this.statusCPF = true;
    else this.statusCPF = false;
    return result;
  }


}
