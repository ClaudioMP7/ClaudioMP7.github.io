import { Component, OnInit, Inject } from '@angular/core';
import { AddResponse, BitacorasService, Nota } from 'src/app/Services/bitacoras.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.component.html',
  styleUrls: ['./crear-nota.component.css']
})
export class CrearNotaComponent implements OnInit {
  nota:Nota={
    idNota:'',
    idBitacora:'',
    tipo:'',
    idAutor:'',
    mensaje:''
  }
  addedResponse!:AddResponse;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar, private bitacorasService:BitacorasService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nota.tipo = data.tipo
  }

  ngOnInit(): void {
  }

  crearNota(tipo:string){
    delete this.nota.idNota;
    this.nota.idBitacora = sessionStorage.getItem('idBitacora')!
    this.nota.tipo = tipo
    this.nota.idAutor = localStorage.getItem('id')!

    this.bitacorasService.addNota(this.nota).subscribe(
      res=>{
        this.addedResponse = res;
        if( this.addedResponse.status == 200 ){
          this.openSnackBar("Nota Creada","Ok", 4000)
        }else{
          this.openSnackBar("No se pudo guardar su nota. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
        }
      },
      err=>this.openSnackBar("No se pudo guardar su nota. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
    );
  }

  openSnackBar(message:string, btn:string, duration:number){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }

}
