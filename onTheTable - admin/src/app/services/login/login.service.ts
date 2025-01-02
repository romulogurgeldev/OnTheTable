import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async login(user: any){
    
    const result = await this.http.post<any>(`${environment.api}/auth/login`, user).toPromise();
    if (result && result.access_token){
      
      window.localStorage.setItem('token', result.access_token);
      const resultTipoUsuario: any = this.getInfoUser(result.access_token);
      console.log(this.getInfoUser(result.access_token));

      if(resultTipoUsuario.category == "funcionario"){
        const funcionario: any = await this.getFuncionario(resultTipoUsuario.sub);
        console.log(funcionario)
        window.localStorage.setItem("idRestaurante", funcionario.restaurant)
      }
      return result.access_token;
    }
    return false;
  }

    // Esqueceu senha

    async esqueceuSenhaSendEmail(dados: any){
      const result = await this.http.post<any>(`${environment.api}/users/forget-password`, dados).toPromise();
      return result;
    }
    async esqueceuSenhaSendCode(dados: any){
      const result = await this.http.post<any>(`${environment.api}/users/compare-password`, dados).toPromise();
      return result;
    }
    async trocaSenha(dados: any){
      const result = await this.http.post<any>(`${environment.api}/users/change-password`, dados).toPromise();
      return result;
    }
    async getFuncionario(id: string){
      return await this.http.get<any[]>(`${environment.api}/employee-users/${id}`).toPromise();
    }
  

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);
    
    // if (decoded.exp === undefined) {
    //   return undefined;
    // }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } 
    // else if (this.isTokenExpired(token)) {
    //   return false;
    // }

    return true;
  }
  getInfoUser(token: any){
    if (token){
      const result = jwt_decode(token);
      return result;
    }


  }
}
