import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<any[]>(`${environment.api}/foods`);
  }
  getAllByCategory(id: any) {
    
    return this.http.get<any[]>(`${environment.api}/foods/category/${id}`);
  }
  getOne(id:string) {
    return this.http.get<any[]>(`${environment.api}/foods/${id}`);
  }

  async edit(id:string, dados: any) {
    const result = await this.http.put<any>(`${environment.api}/api/usuario/${id}`, dados).toPromise();
    return result; 
  }
  async delete(id:string) {
    const result = await this.http.delete<any>(`${environment.api}/upload/${id}`).toPromise();
    return result; 
  }

  async create(dados: any){
    const result = await this.http.post<any>(`${environment.api}/upload`, dados).toPromise();
    return result;
  }
}
