import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  async login(user: any){
    
    const result = await this.http.post<any>(`${environment.api}/auth/login`, user).toPromise();
    if (result && result.access_token){
      
      window.localStorage.setItem('token', result.access_token);
      const name: any = this.getInfoUser(result.access_token);
      window.localStorage.setItem('nome', name.name)
      return result.access_token;
    }
    return false;
  }
  async loginCliente(user: any){
    
    const result = await this.http.post<any>(`${environment.api}/users/loginCliente`, user).toPromise();
    // if (result && result.access_token){
      
    //   window.localStorage.setItem('token', result.access_token);
      
    //   return result.access_token;
    // }
    return false;
  }
  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/users/cliente`, dados).toPromise();
    return result;
  }

  getInfoUser(token: any){
    if (token){
      const result = jwt_decode(token);
      return result;
    }


  }
}
