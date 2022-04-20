import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserResponse, UsuariosService } from '../../Services/usuarios.service';
import {Router} from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-iforgot-card',
  templateUrl: './iforgot-card.component.html',
  styleUrls: ['./iforgot-card.component.css']
})
export class IforgotCardComponent implements OnInit {

  correo = "";
  emailFormControl = new FormControl('', [Validators.required]);

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
  };
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( private UsuariosService:UsuariosService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')!=null){
      this.router.navigate(['/usuarios']);
    } else{
      this.router.navigate(['/recovery']);
    }
  }

  @ViewChild("input") input!: ElementRef;

  cambiarPassword(){
    this.UsuariosService.getUserByEmail(this.correo).subscribe(
      res=>{
        this.userResponse = res;
        if (this.userResponse.status == 200){
          sessionStorage.setItem('id', this.userResponse.data?.idUsuario!);
          this.router.navigate(['/cambiarPassword']);
        } else{
          this.emailFormControl.setErrors([Validators.required]);
          this.openSnackBar("Correo electrónico no registrado", "Ok")
        }
      },
      err=> this.openSnackBar("Error en el servidor: "+err, "Ok")

    );
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }
}



