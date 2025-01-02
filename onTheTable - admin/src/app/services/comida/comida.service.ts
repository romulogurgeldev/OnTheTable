import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  idRestaurante: string | null;
  
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");
  }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/foods/${limit}/${page}`);
  }
  getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
    return this.http.get<any[]>(`${environment.api}/foods/category/${id}/${limit}/${page}/${ordem}/${title}`);
  }

  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  }
  getName(id:string) {
    return this.http.get<any[]>(`${environment.api}/foods/${id}`).toPromise();
  }

  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/foods/${id}`, dados).toPromise();
    return result; 
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/foods/${id}`).toPromise();
    return result; 
  }

  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/foods`, dados).toPromise();
    return result;
  }
  getAllByRestaurant(id = this.idRestaurante) {
    
    return this.http.get<any[]>(`${environment.api}/foods/restaurant/${id}`);
  }
}
