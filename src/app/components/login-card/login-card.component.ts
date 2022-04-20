import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Login, LoginService, LoginResponse} from '../../Services/login.service'
import {FormControl, Validators} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {
  hide = true;

  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required])
  loginInfo:Login={
    correo:'',
    password:''
  };

  loginRes:LoginResponse={
    status:0,
    message:'',
    data:{
      idUsuario:0,
      nombre:'',
      apellidos:'',
      correo:'',
      celular:'',
      password:'',
      rol:''
    }
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private LoginService:LoginService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  @ViewChild("input") input!: ElementRef;
  @ViewChild("passwordInput") passwordInput!: ElementRef;

  login(){
    this.LoginService.requestLogin(this.loginInfo).subscribe(
      res=>{
        console.log(res)
        this.loginRes =<any>res;
        if(this.loginRes.status == 200){
          localStorage.setItem('id',this.loginRes.data?.idUsuario+""!);
          this.router.navigate(['/usuarios']);
        } else{
          this._snackBar.open("Credenciales incorrectas", "Entendido", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3500
          });

          this.passwordInput.nativeElement.value="";
          this.emailFormControl.setErrors([Validators.required]);
          this.passwordFormControl.setErrors([Validators.required]);
        }
      },
      err=>console.log(err)
    );
    //console.log(this.loginInfo);
  }
  
}

