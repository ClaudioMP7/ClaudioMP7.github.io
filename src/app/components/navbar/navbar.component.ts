import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse, UsuariosService } from '../../Services/usuarios.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navLinks: any[];

  userResponse:UserResponse={
    status:0,
    message:'',
    data:{
      idUsuario:'',
      nombre:'',
      apellidos:'',
      correo:'',
      celular:'',
      password:'',
      nombreRol:''
    }
  }

  user:User={
      idUsuario:'',
      nombre:'',
      apellidos:'',
      correo:'',
      celular:'',
      password:'',
      nombreRol:''
  }

  constructor( private UsuariosService:UsuariosService, private router: Router) { 
    this.navLinks = [
      {
          link: '/usuarios',
          index: 0
      },
      {
        link: '/bitacoras',
        index: 1
      }
    ];
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getNombre();
  }

  getNombre(){
    this.UsuariosService.getUserById(localStorage.getItem('id')!).subscribe(
      res=>{
        this.userResponse = res;
        if(this.userResponse.status == 200){
          this.user.nombre = this.userResponse.data?.nombre+" "+this.userResponse.data?.apellidos
        }else{
          this.user.nombre = "Mi perfil"
        }
      },
      err=> this.user.nombre = "Mi perfil"
    );
  }

}
