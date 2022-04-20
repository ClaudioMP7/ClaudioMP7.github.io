import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitacorasService {
  url = '/api/';

  constructor(private http: HttpClient) { }

  addBitacora(bitacora:Bitacora){
    console.log(bitacora)
    return this.http.post(this.url+"addBitacora", bitacora)
  }

  addInvolucrado(involucrado:Involucrado){
    return this.http.post(this.url+"addInvolucrado", involucrado)
  }

  getBitacoras(){
    return this.http.get(this.url+"getBitacoras")
  }

  getInvolucrados(idBitacora:string){
    return this.http.post(this.url+"getInvolucradosBitEsp", {"idBitacora":idBitacora})
  }

  addNota(nota:Nota){
    return this.http.post(this.url+"addNota", nota)
  }

  getNotas(idBitacora:string){
    return this.http.post(this.url+"getNotas", {"idBitacora":idBitacora})
  }

  getRespuestas(idBitacora:string){
    return this.http.post(this.url+"getRespuestas", {"idBitacora":idBitacora})
  }
}

export interface Nota{
  idNota?:string;
  idBitacora?:string;
  tipo?:string;
  idAutor?:string;
  mensaje?:string;
  usuario?:string;
  fecha?:string;
}

export interface ListaNotasResponse{
  status?:string;
  message?:string;
  data?:Nota[]
}

export interface ListaInvolucradosResponse{
  status?:string;
  message?:string;
  data?:InvolucradoInfo[]
}

export interface InvolucradoInfo{
  idUsuario?:string;
  usuario?:string;
  correo?:string;
  notificaciones?:string;
  firma?:string;
}

export interface Involucrado{
  idBitacora?:string;
  idUsuario?:string;
  notificaciones?:string;
  firma?:string;
}

export interface BitacoraInfo{
  idBitacora?:string;
  idObra?:string;
  idContratista?:string;
  idEspecialidad?:string;
  idSupervisor?:string;
  folio?:string;
  nObra?:string;
  tObra?:string;
  contratista?:string;
  especialidad?:string;
  supervisor?:string;
  uObra?:string;
  involucrados?: InvolucradoInfo[]
}

export interface Bitacora{
  idBitacora?:string;
  folio?:string;
  idObra?:string;
  idContratista?:string;
  idEspecialidad?:string;
  idSupervisor?:string;
}

export interface AddResponse{
  status?:number;
  message?:string;
}

export interface ListBitacorasResponse{
  status?:number;
  message?:string;
  data?:Bitacora[];
}