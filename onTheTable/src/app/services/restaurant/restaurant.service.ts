import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  // getAll(estabelecimento:string) {
  //   return this.http.get<Compras[]>(`${environment.api}/api/compra/getall/${estabelecimento}`);
    
    
  // }
  // getAllAvaliar() {
    
  //   return this.http.get<Compras[]>(`${environment.api}/participante/avaliar`);
    
  // }

  getById(id: string) {
    
    return this.http.get<any>(`${environment.api}/restaurant/pwa/public/${id}`);
  }




}
