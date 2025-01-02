import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/tables/${limit}/${page}`);
  }
  getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
    return this.http.get<any[]>(`${environment.api}/tables/category/${id}/${limit}/${page}/${ordem}/${title}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/tables/${id}`);
  }
  getOneByCode(code:string) {
    return this.http.get<any[]>(`${environment.api}/tables/by/code/${code}`);
  }
  findParticipante() {
    const user = window.localStorage.getItem("user")
    const id = window.localStorage.getItem("mesa")
    return this.http.get<any[]>(`${environment.api}/tables/participante/${id}/${user}`);
  }

  async checkin(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/tables/checkin/${id}`, dados).toPromise();
    return result; 
  }
  async FazerPedidio(id:string) {
    const result = await this.http.patch<any>(`${environment.api}/tables/fazerPedido/${id}`, {}).toPromise();
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

}
