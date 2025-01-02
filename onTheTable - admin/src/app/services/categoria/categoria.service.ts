import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/categories/${limit}/${page}`);
  }
  getAllByRestaurant(tipo: any, limit: number = 10, page: number = 0) {
    const id = window.localStorage.getItem('idRestaurante')
    return this.http.get<any[]>(`${environment.api}/categories/restaurant/${tipo}/${id}/${limit}/${page}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/categories/${id}`);
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/categories/${id}`).toPromise();
    return result; 
  }

  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/categories/${id}`, dados).toPromise();
    return result; 
  }

  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/categories`, dados).toPromise();
    return result;
  }
}
