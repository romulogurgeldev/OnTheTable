import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  idRestaurante: any;
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");
  }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/tables/${limit}/${page}`);
  }
  getAllByRestaurant(id = this.idRestaurante, limit: number = 1000, page: number = 0, ordem: number = 1, title: string = "name") {
    return this.http.get<any[]>(`${environment.api}/tables/restaurant/${id}/${limit}/${page}/${ordem}/${title}`);
  }
  getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
    return this.http.get<any[]>(`${environment.api}/tables/category/${id}/${limit}/${page}/${ordem}/${title}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/tables/${id}`);
  }
  getName(id:string) {
    return this.http.get<any[]>(`${environment.api}/tables/${id}`).toPromise();;
  }

  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/tables/${id}`, dados).toPromise();
    return result; 
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/tables/${id}`).toPromise();
    return result; 
  }

  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/tables`, dados).toPromise();
    return result;
  }
  async link(link: string){
    
    const result = await this.http.post<any>(`${environment.api}/tables/encurta/link`, {link: link}).toPromise();
    return result;
  }

  async cart(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/tables/cart/${id}`, dados).toPromise();
    return result; 
  }
  async deleteCart(id: string, index: number){
    return this.http.delete<any[]>(`${environment.api}/tables/cart/${id}/${index}`).toPromise();

  }
  async editCart(id: string, index: number, valor: number){
    return this.http.patch<any[]>(`${environment.api}/tables/cart/${id}/${index}`, {valor}).toPromise();

  }
}
