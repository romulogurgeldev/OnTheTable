import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  idRestaurante: string | null;
  
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");
  }
  async create(dados: any){
    dados.restaurant = this.idRestaurante;
    const result = await this.http.post<any>(`${environment.api}/promotions`, dados).toPromise();
    return result;
  }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/promotions/${limit}/${page}`);
  }
  getAllByRestaurant() {
    
    return this.http.get<any[]>(`${environment.api}/promotions/restaurant/${this.idRestaurante}`);
  }
  // getOne(id:string) {
  //   return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  // }

  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/promotions/${id}`, dados).toPromise();
    return result; 
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/promotions/${id}`).toPromise();
    return result; 
  }


  // getAllByRestaurant(id = this.idRestaurante) {
    
  //   return this.http.get<any[]>(`${environment.api}/foods/restaurant/${id}`);
  // }
}
