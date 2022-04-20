import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = '/api/';
  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url+"getAll");
  }

  getContratistas(){
    return this.http.get(this.url+"getContratistas");
  }

  getRoles(){
    return this.http.get(this.url+"getAllRoles");
  }

  getUserById(id:string){
    return this.http.get(this.url+"getUserById/"+id);
  }

  getUserByEmail(email:string){
    return this.http.get(this.url+"getUserByEmail/"+email);
  }

  addUser(user:User){
    return this.http.post(this.url+"addUser", user);
  }

  editUser(user:EditUser){
    return this.http.post(this.url+"editUser", user);
  }

  deleteUser(user:EditUser){
    return this.http.post(this.url+"deleteUser", user);
  }
}

export interface responseRol{
  status?:string,
  message?:string,
  data?:Rol[]
}

export interface Rol{
  idRol?:string,
  nombre?:string,
  descripcion?:string,
  idRolesPermisos?:string
}

export interface UserResponse{
  status?:number;
  message?:string;
  data?:{
    idUsuario?:string,
    nombre?:string,
    apellidos?:string,
    correo?:string,
    celular?:string,
    password?:string,
    nombreRol?:string
  };
}

export interface User{
  idUsuario?:string;
  nombre?:string;
  apellidos?:string;
  correo?:string;
  celular?:string;
  password?:string;
  nombreRol?:string;
  idRol?:string;
}

export interface ListUsersResponse{
  status?:number;
  message?:string;
  data?: User[]
}

export interface EditUser{
  idUsuario?:string;
  nombre?:string;
  apellidos?:string;
  correo?:string;
  celular?:string;
  password?:string;
}