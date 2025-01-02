import { SearchPipe } from './search.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
;

@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SearchPipe
  ]
})
export class CustomPipes { }
