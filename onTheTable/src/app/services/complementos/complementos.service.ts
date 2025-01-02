import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplementosService {
  idRestaurante: any;
  constructor(private http: HttpClient) {
    this.idRestaurante = window.localStorage.getItem('idRestaurante')
  }
  getAllByFoodAndCategory(food: string, category: string) {
    return this.http.get<any[]>(`${environment.api}/atributos-comidas/${food}/${category}`);
  }
  getOne(food: string) {
    return this.http.get<any[]>(`${environment.api}/atributos-comidas/${food}`);
  }
  // getAllByRestaurante() {
  //   return this.http.get<any[]>(`${environment.api}/reservations/byRestaurant/${this.idRestaurante}`);
  // }
  edit(id: any, dados: any){
    return this.http.patch<any[]>(`${environment.api}/atributos-comidas/${id}`, dados).toPromise();

  }

  create(dados: any) {
    
    return this.http.post<any[]>(`${environment.api}/atributos-comidas`, dados).toPromise();
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/atributos-comidas/${id}`).toPromise();
    return result; 
  }
}
