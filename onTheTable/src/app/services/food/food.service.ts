import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http: HttpClient) { }
  getAll(id: any, limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/foods/${limit}/${page}`);
  }
  getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
    return this.http.get<any[]>(`${environment.api}/foods/category/${id}/${limit}/${page}/${ordem}/${title}`);
  }
  getAllByRestaurant(id: any) {
    
    return this.http.get<any[]>(`${environment.api}/foods/restaurant/${id}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  }
}
