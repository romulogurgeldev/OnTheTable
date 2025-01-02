import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/categories/${limit}/${page}`);
  }
  getAllByRestaurant(id: string, tipo: any, limit: number = 10, page: number = 0) {
    
    return this.http.get<any[]>(`${environment.api}/categories/restaurant/${tipo}/${id}/${limit}/${page}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/categories/${id}`);
  }
}
