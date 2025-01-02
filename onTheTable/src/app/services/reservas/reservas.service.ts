import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  constructor(private http: HttpClient) { }
  getAllByUser(idMesa: any) {
    return this.http.get<any[]>(`${environment.api}/reservations/byUser/${idMesa}`);
  }
  // enviarMensagem(id: any, dados: any){
  //   return this.http.patch<any[]>(`${environment.api}/messages/enviar/${id}`, dados);

  // }

  create(dados: any) {
    return this.http.post<any[]>(`${environment.api}/reservations`, dados);
  }
}
