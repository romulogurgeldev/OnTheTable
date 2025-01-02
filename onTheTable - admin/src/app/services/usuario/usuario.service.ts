import { LoginService } from 'src/app/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  login: any;
  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.login = this.loginService.getInfoUser(window.localStorage.getItem('token'));
  }
  getAll() {
    return this.http.get<any[]>(`${environment.api}/users`);
  }
  getOne(id: string = this.login.sub) {

    return this.http.get<any[]>(`${environment.api}/users/${id}`);
  }
  getEmployees() {
    
    return this.http.get<any[]>(`${environment.api}/employee-users/boss/${this.login.sub}`);
  }
  async edit(id: string, dados: any) {
    const result = await this.http.patch<any>(`${environment.api}/users/${id}`, dados).toPromise();
    return result; 

  }

  verificaEmail(email: string, tipo: string){

    return this.http.get<any>(`${environment.api}/users/email/${tipo}/${email}`);;
  }
  async editLogin(dados: any, login: any) {

    const resultLogin = await this.loginService.login(login);

    if (resultLogin){
      const result = await this.http.patch<any>(`${environment.api}/users/${this.login.sub}`, dados).toPromise();
      return result; 
    }
    else{
      return false; 
    }

  }

  async createUsuario(dados: any){
    
    const result = await this.http.post<any>(`${environment.api}/users`, dados).toPromise();
    return result;
  }
  async deleteEmployee(id: any){
    const result = await this.http.delete<any>(`${environment.api}/employee-users/${id}`).toPromise();
    return result;
  }



}
