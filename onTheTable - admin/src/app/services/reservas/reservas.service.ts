import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  idRestaurante: any;
  constructor(private http: HttpClient) {
    this.idRestaurante = window.localStorage.getItem('idRestaurante')
   }
  getAllByUser(idMesa: any) {
    return this.http.get<any[]>(`${environment.api}/reservations/byUser/${idMesa}`);
  }
  getAllByRestaurante() {
    return this.http.get<any[]>(`${environment.api}/reservations/byRestaurant/${this.idRestaurante}`);
  }
  edit(id: any, dados: any){
    return this.http.patch<any[]>(`${environment.api}/reservations/${id}`, dados);

  }

  create(dados: any) {
    return this.http.post<any[]>(`${environment.api}/reservations`, dados);
  }
}
