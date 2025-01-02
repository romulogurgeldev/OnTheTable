import { LoginService } from 'src/app/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private http: HttpClient, private loginService: LoginService) { }
  getAllByUser() {
    const token = window.localStorage.getItem('token');
    const login: any = this.loginService.getInfoUser(token);
    return this.http.get<any[]>(`${environment.api}/restaurant/adm/${login.sub}`);
    
    
  }
  
  async createEstabelecimento(dados: any){
    const result = await this.http.post<any>(`${environment.api}/restaurant`, dados).toPromise();
    return result;
  }
  async edit(id:string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/restaurant/${id}`, dados).toPromise();
    return result; 
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/restaurant/${id}`).toPromise();
    return result; 
  }

  getById(id: string) {
    
    return this.http.get<any>(`${environment.api}/restaurant/${id}`);
  }

  getCEP(cep: string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);

  }


  
  
}
