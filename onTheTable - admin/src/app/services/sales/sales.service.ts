import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  idRestaurante: string | null;
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");

  }
  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/sales`, dados).toPromise();
    return result;
  }
  getFood(month: any = 0, year: any = 0, day: any = 0, limit = 5, allMonth = false) {
    return this.http.get<any[]>(`${environment.api}/sales/foods/${this.idRestaurante}?month=${month}&year=${year}&day=${day}&allMonth=${allMonth.toString()}&limit=${limit}`);
  }
  getTable(month: any = 0, year: any = 0, day: any = 0, limit = 5, allMonth = false) {
    return this.http.get<any[]>(`${environment.api}/sales/tables/${this.idRestaurante}?month=${month}&year=${year}&day=${day}&allMonth=${allMonth.toString()}&limit=${limit}`);
  }
  // getAllByRestaurant() {
    
  //   return this.http.get<any[]>(`${environment.api}/promotions/restaurant/${this.idRestaurante}`);
  // }
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
}
