import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ObrasService {
  url = '/api/';

  constructor(private http: HttpClient) { }

  addObra(obra:Obra){
    return this.http.post(this.url+"addObra", obra)
  }

  editObra(obra:Obra){
    return this.http.post(this.url+"editObra", obra)
  }

  getObras(){
    return this.http.get(this.url+"getObras")
  }

  getObrasFilts(filtros:Filtros){
    return this.http.post(this.url+"getObrasFilts", filtros)
  }
}


export interface Obra{
  idObra?:string;
  numero?:string;
  titulo?:string; 
  descripcion?:string;
  inicio?:string;
  fin?:string;
  local?:string;
  ubicacionObra?:string; 
  prototipo?:string;
  numeroContrato?:string; 
  importes?:string;
  reglas?:string
}

export interface Filtros{
  inicioA?:string;
  inicioB?:string;
  finA?:string; 
  finB?:string;
  local?:string;
}

export interface ObraResponse{
  status?:number;
  message?:string;
}

export interface ListObrasResponse{
  status?:number;
  message?:string;
  data?:Obra[];
}