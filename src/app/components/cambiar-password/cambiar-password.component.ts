import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { PasswordChange, LoginService, ChangeResponse } from '../../Services/login.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  password='';
  confirmPassword='';
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  changePassInfo:PasswordChange={
    id:'',
    password:''
  }

  changeResponse:ChangeResponse={
    status:0,
    message:""
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( private LoginService:LoginService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')!=null){
      this.router.navigate(['/usuarios']);
    } else{
      this.router.navigate(['/cambiarPassword']);
    }
    if(sessionStorage.getItem('id') != null){
      this.changePassInfo.id = sessionStorage.getItem('id')!;
    } else{
      this.router.navigate(['/cambiarPassword']);
    }
  }

  @ViewChild("password") passwordInput!: ElementRef;
  @ViewChild("confirmPassword") confirmPasswordInput!: ElementRef;

  cambiarPassword(){
    if(this.password == this.confirmPassword){
      this.changePassInfo.password = this.password;
      this.LoginService.changePassword(this.changePassInfo).subscribe(
        res=>{
          this.changeResponse = res;
          if(this.changeResponse.status == 200){
            this.router.navigate(['/login']);
            this.openSnackBar("Contraseña cambiada", "Ok")
          }else{
            this.openSnackBar("No se pudo cambiar su contraseña. Contacte al administrador del sistema", "Ok")
          }
        },
        err=> this.openSnackBar("Error en el servidor: "+err, "Ok")
  
      );
    } else{

      this.openSnackBar("Las contraseñas no coinciden", "Ok");
      this.confirmPassword="";
      this.passwordFormControl.setErrors([Validators.required]);
      this.confirmPasswordFormControl.setErrors([Validators.required]);

    } 
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }
}
