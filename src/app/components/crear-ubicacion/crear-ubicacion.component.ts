import { Component, OnInit } from '@angular/core';
import { Ubicacion, UbicacionesService } from '../../Services/ubicaciones.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {
  ubicacion: Ubicacion={
    idUbicacion:'',
    nombre:'',
    estado:'',
    ciudad:'',
    direccion:''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private UbicacionesService:UbicacionesService) { }

  ngOnInit(): void {
  }

  crear(){
    delete this.ubicacion.idUbicacion;
    this.UbicacionesService.addUbicacion(this.ubicacion).subscribe(
      res=>{
        console.log(res)
        this.openSnackBar("Ubicación Agregada", "Ok");
      },
      err=>console.log(err)
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
