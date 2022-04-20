import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { editEspecialidadResponse, Especialidad, EspecialidadesService } from '../../Services/especialidades.service';

@Component({
  selector: 'app-detalle-especialidad',
  templateUrl: './detalle-especialidad.component.html',
  styleUrls: ['./detalle-especialidad.component.css']
})

export class DetalleEspecialidadComponent implements OnInit {
  especialidad:Especialidad={
    idEspecialidad:'',
    nombre:'',
    descripcion:''
  };

  editEspecialidadResponse!:editEspecialidadResponse;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar, private EspecialidadesService:EspecialidadesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.especialidad.idEspecialidad = data.idEspecialidad;
    this.especialidad.nombre = data.nombre;
    this.especialidad.descripcion = data.descripcion;
  }

  editar(){
    this.EspecialidadesService.editEspecialidad(this.especialidad).subscribe(
      res=>{
        this.editEspecialidadResponse = res;
        if(this.editEspecialidadResponse.status == 200){
          this.openSnackBar("Usuario Editado","Ok")
        }else{
          this.openSnackBar("Error al editar usuario","Ok")
        }
      },
      err=>console.log(err)
    );
  }

  ngOnInit(): void {
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000
    });
  }

}
