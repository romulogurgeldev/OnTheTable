import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-erro',
  templateUrl: './alert-erro.component.html',
  styleUrls: ['./alert-erro.component.scss']
})
export class AlertErroComponent implements OnInit {
  @Output() erroChange = new EventEmitter<any>();
  @Input() erro = 'deu erro';
  constructor() { }

  ngOnInit(): void {
  }

  fechaErro(){
    this.erroChange.emit("");
  }

}
