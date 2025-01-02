import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  idRestaurante: any;
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");

  }

  getByRestaurant(id: string = this.idRestaurante) {
    
    return this.http.get<any[]>(`${environment.api}/notifications/restaurant/${id}`);
  }
  edit(id: string, dados: any) {
    
    return this.http.patch<any[]>(`${environment.api}/notifications/${id}`, dados);
  }
  delete(id: string) {
    
    return this.http.delete<any[]>(`${environment.api}/notifications/${id}`).toPromise();
  }
}
