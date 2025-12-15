import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${endpoint}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    // CORREGIDO: Ahora usa la URL limpia (ej: localhost:3000/productos)
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, data);
  }

  putData(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${endpoint}/${id}`, data);
  }

  deleteData(endpoint: string, id: number): Observable<any> {
    // CORREGIDO: Ahora usa slash (ej: localhost:3000/productos/1)
    return this.http.delete<any>(`${this.apiUrl}${endpoint}/${id}`);
  }
}