import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Ubicacion, editUbicacionResponse, UbicacionesService } from 'src/app/Services/ubicaciones.service';

@Component({
  selector: 'app-detalle-ubicacion',
  templateUrl: './detalle-ubicacion.component.html',
  styleUrls: ['./detalle-ubicacion.component.css']
})
export class DetalleUbicacionComponent implements OnInit {
  ubicacion:Ubicacion={
    idUbicacion:'',
    nombre:'',
    ciudad:'',
    estado:'',
    direccion:''
  }

  editUbicacionResponse!: editUbicacionResponse;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar, private UbicacionesService:UbicacionesService, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data)
    this.ubicacion.idUbicacion = data.idUbicacion;
    this.ubicacion.nombre = data.nombre;
    this.ubicacion.ciudad = data.ciudad;
    this.ubicacion.estado = data.estado;
    this.ubicacion.direccion = data.direccion;
  }

  editar(){
    this.UbicacionesService.editUbicacion(this.ubicacion).subscribe(
      res=>{
        this.editUbicacionResponse = res;
        if(this.editUbicacionResponse.status == 200){
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
