import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EditUser, UserResponse, UsuariosService } from '../../Services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userResponse:UserResponse={
    status:0,
    message:''
  }

  user:EditUser={
    idUsuario:'',
    nombre:'',
    apellidos:'',
    correo:'',
    celular:'',
    password:''
  }
  newPassword='';
  confirmPassword = '';
  oldPassword='';

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor( private UsuariosService:UsuariosService, private _snackBar: MatSnackBar, private activatedRoute:ActivatedRoute, private dialogRef:MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { 
    this.user.idUsuario=data.idUsuario;
    this.user.nombre=data.nombre;
    this.user.apellidos=data.apellidos;
    this.user.correo=data.correo;
    this.user.celular=data.celular;
    this.oldPassword=data.password;
  }

  ngOnInit(): void {
    
  }

  @ViewChild("inputPassword") inputPassword!: ElementRef;
  @ViewChild("inputConfPassword") inputConfPassword!: ElementRef;


  editarUsuario(){
    if(this.newPassword == this.confirmPassword){
      if(this.newPassword == "" && this.confirmPassword == ""){
        this.user.password = this.oldPassword;
      }else{
        this.user.password = this.newPassword;
      }
      this.UsuariosService.editUser(this.user).subscribe(
        res=>{
          this.userResponse = res;
          if(this.userResponse.status == 200){
            this.openSnackBar("Usuario Editado","Ok")
            this.inputPassword.nativeElement.value="";
            this.inputConfPassword.nativeElement.value="";
          }else{
            this.openSnackBar("Error al editar usuario","Ok")
          }
        },
        err=>console.log(err)
      );
    }else{
      this.openSnackBar("Las contraseñas no coinciden","Ok")
    }
  }

  eliminar(){
    this.UsuariosService.deleteUser(this.user).subscribe(
      res=>{
        this.userResponse = res;
        if(this.userResponse.status == 200){
          this.dialogRef.close();
          this.openSnackBar("Usuario eliminado", "Ok")
        }else{
          this.openSnackBar("Error al eliminar usuario","Ok")
        }
      },
      err=>console.log(err)
    );

  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000
    });
  }
}
