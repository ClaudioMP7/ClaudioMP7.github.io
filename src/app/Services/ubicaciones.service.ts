import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  url = '/api/';

  constructor(private http: HttpClient) { }

  addUbicacion(ubicacion:Ubicacion){
    return this.http.post(this.url+"addUbicacion", ubicacion)
  }

  editUbicacion(ubicacion:Ubicacion){
    return this.http.post(this.url+"editUbicacion", ubicacion)
  }

  getUbicaciones(){
    return this.http.get(this.url+"getUbicaciones")
  }
}

export interface Ubicacion{
  idUbicacion?:string;
  nombre?:string;
  estado?:string;
  ciudad?:string;
  direccion?:string;
}

export interface editUbicacionResponse{
  status?:number;
  message?:string;
}

export interface UbicacionesResponse{
  status?:number;
  message?:string;
  data?:Ubicacion[];
}