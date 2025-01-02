import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  idRestaurante: any;
  constructor(private http: HttpClient) { 
    this.idRestaurante = window.localStorage.getItem("idRestaurante");

  }

  getOneByRestaurant(id: string = this.idRestaurante) {
    
    return this.http.get<any[]>(`${environment.api}/configs/restaurant/${id}`);
  }

  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/configs/${id}`, dados).toPromise();
    return result; 
  }

}
