import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  url = '/api/';

  constructor(private http: HttpClient) { }

  addEspecialidad(especialidad:Especialidad){
    return this.http.post(this.url+"addEspecialidad", especialidad);
  }

  editEspecialidad(especialidad:Especialidad){
    return this.http.post(this.url+"editEspecialidad", especialidad);
  }

  getEspecialidades(){
    return this.http.get(this.url+"getEspecialidades");
  }
}

export interface Especialidad{
  idEspecialidad?:string,
  nombre?:string;
  descripcion?:string;
}

export interface editEspecialidadResponse{
  status?:number;
  message?:string;
}

export interface EspecialidadResponse{
  status?:number;
  message?:string;
  data?:Especialidad[];
}