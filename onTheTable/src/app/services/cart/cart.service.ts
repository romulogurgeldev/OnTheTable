import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/carts/${limit}/${page}`);
  }

  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/carts/${id}`);
  }
  create(dados: any){
    return this.http.post<any[]>(`${environment.api}/carts`, dados);

  }

}
