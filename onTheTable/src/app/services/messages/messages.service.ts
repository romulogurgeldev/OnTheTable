import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) { }
  getMsgAtivas(idMesa: any) {
    return this.http.get<any[]>(`${environment.api}/messages/byMesas/${idMesa}`).toPromise();
  }
  enviarMensagem(id: any, dados: any){
    return this.http.patch<any[]>(`${environment.api}/messages/enviar/${id}`, dados);

  }

  create(dados: any) {
    return this.http.post<any[]>(`${environment.api}/messages`, dados);
  }
}
