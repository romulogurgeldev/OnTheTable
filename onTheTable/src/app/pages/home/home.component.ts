import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  mode = 0;

  
  constructor() { }

 
  ngOnInit() {
    
  }
  irPara(){
    window.location.href = "#/camera"
  }

}
