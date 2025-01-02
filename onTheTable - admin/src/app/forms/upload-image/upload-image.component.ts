import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Output() imageChange = new EventEmitter<any>();
  @Input() image: any;
  @Output() imagemChange = new EventEmitter<any>();
  @Input() imagem: any;
  statusImagem = true;
  constructor() { 

  }

  ngOnInit(): void {
    console.log(this.imagem)
    if (!this.imagem){
      console.log(this.imagem)
      this.imagem = "./assets/icones/upload.png";;
    }
  }
  async uploadFoto(e: any){
    //this.image = e.target.files[0];
    
    const extensaoOk = ["jpg", "png", "jpeg", "gif", "bmp", "tif", "tiff"];
    let ok = 0;
    
    if(e.target.files){
      var reader = new FileReader();
      const formData = new FormData();
      let file: File = e.target.files[0];
      formData.append('image', file, file.name);
      this.imageChange.emit(formData);
      console.log(formData);
      reader.readAsDataURL(e.target.files[0]);
      
      const resultado = e.target.files[0].type.split("/");
      
      
      for (var i=0; i< extensaoOk.length ; i++){
        if (extensaoOk[i]==resultado[1]){
          ok++;  
        }
      }
      

      if (ok>0 && e.target.files[0].size<1000000){
        reader.onload = async () => {
          
          this.imagem = reader.result;
          this.imagemChange.emit(this.imagem)
          this.statusImagem = true;
        };
        
        
      }
      

    }
    
  }
}
