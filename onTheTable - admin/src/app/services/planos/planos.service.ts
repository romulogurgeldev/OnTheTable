import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  constructor(private http: HttpClient) {}
  getAll(limit: number = 10, page: number = 0) {
    return this.http.get<any[]>(`${environment.api}/planos`);
  }
  create(dados: any) {
    return this.http.post<any>(`${environment.api}/plano-users`, dados);
  }
  getByUser(idUser: string){
    return this.http.get<any[]>(`${environment.api}/plano-users/${idUser}`);
  }
  edit(idPlano: string, dados: any){
    return this.http.patch<any>(`${environment.api}/plano-users/${idPlano}`, dados);
  }
}
