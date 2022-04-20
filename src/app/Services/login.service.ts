import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = '/api/';
  constructor(private http:HttpClient) { }

  requestLogin(login:Login){
    return this.http.post(this.url+"login", login)
  }

  changePassword(passwordChange: PasswordChange){
    return this.http.post(this.url+"changePassword", passwordChange)
  }
}

export interface Login{
  correo?:string;
  password?:string;
}

export interface PasswordChange{
  id?:string;
  password?:string;
}

export interface LoginResponse{
  status?:number;
  message?:string;
  data?:{
    idUsuario?:number,
    nombre?:string,
    apellidos?:string,
    correo?:string,
    celular?:string,
    password?:string,
    rol?:string
  };
}

export interface ChangeResponse{
  status?:number;
  message?:string;
}