import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    private apiUrl = 'http://localhost:3000/';  // URL base de la API

  constructor(private http: HttpClient) { }
  // Método genérico para obtener datos (GET)
  getData(action: string): Observable<any> {
    const url = `http://localhost:3000/carritos/1`;  // URL dinámica basada en la acción
    return this.http.get<any>(url);  // Hacer la solicitud GET
  }


}
