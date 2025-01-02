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
  edit(id: any, dados: any){
    return this.http.patch<any[]>(`${environment.api}/messages/${id}`, dados);

  }
  create(dados: any) {
    return this.http.post<any[]>(`${environment.api}/messages`, dados);
  }
  // getAllByStatus(status: number) {
  //   // 1 = Aguardando confirmação...; 2 = Preparando pedido; 3 = Pedido pronto; 0 = Pedido cancelado
  //   return this.http.get<any[]>(`${environment.api}/orders/status/${status}`);
  // }
  // getAllByCategory(id: any, limit: number = 10, page: number = 0, ordem: number = 1, title: string = "name") {
    
  //   return this.http.get<any[]>(`${environment.api}/foods/category/${id}/${limit}/${page}/${ordem}/${title}`);
  // }
  // getOne(id:string) {
  //   return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  // }
  // getOneActive(id:string) {
  //   return this.http.get<any[]>(`${environment.api}/orders/active/${id}`);
  // }
  // create(dados: any) {
  //   return this.http.post<any[]>(`${environment.api}/orders`, dados);
  // }

  // fecharPedido(dados: any){
  //   return this.http.post<any[]>(`${environment.api}/order-tables`, dados).toPromise();

  // }
  // editaPedido(id: string, dados: any){
  //   return this.http.patch<any[]>(`${environment.api}/order-tables/${id}`, dados).toPromise();

  // }
  // getOneOrderTables(id:string) {
  //   return this.http.get<any[]>(`${environment.api}/order-tables/${id}`);
  // }
}
