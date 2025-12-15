import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient) { }

  // Obtener (GET)
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${endpoint}`);
  }

  // Crear (POST)
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, data);
  }

  // Eliminar (DELETE)
  deleteData(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${endpoint}/${id}`);
  }
}