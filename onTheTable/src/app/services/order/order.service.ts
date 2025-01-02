import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/foods/${limit}/${page}`);
  }
  getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
    return this.http.get<any[]>(`${environment.api}/foods/category/${id}/${limit}/${page}/${ordem}/${title}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  }
  getOneActive(id:string) {
    return this.http.get<any[]>(`${environment.api}/orders/active/${id}`);
  }
  create(dados: any) {
    return this.http.post<any[]>(`${environment.api}/orders`, dados);
  }
}
