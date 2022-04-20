import { Component, OnInit } from '@angular/core';
import { Especialidad, EspecialidadesService } from '../../Services/especialidades.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-especialidad',
  templateUrl: './crear-especialidad.component.html',
  styleUrls: ['./crear-especialidad.component.css']
})
export class CrearEspecialidadComponent implements OnInit {
  especialidad: Especialidad={
    idEspecialidad:'',
    nombre:'',
    descripcion:''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private EspecialidadesService:EspecialidadesService, private router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3500
    });
  }

  crearEspecialidad(){
    delete this.especialidad.idEspecialidad;
    this.EspecialidadesService.addEspecialidad(this.especialidad).subscribe(
      res=>{
        console.log(res)
        this.openSnackBar("Especialidad Agregada", "Ok");
      },
      err=>console.log(err)
    );
  }
}
