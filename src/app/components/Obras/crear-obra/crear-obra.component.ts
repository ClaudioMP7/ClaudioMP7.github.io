import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ubicacion, UbicacionesService, UbicacionesResponse } from 'src/app/Services/ubicaciones.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Obra, ObraResponse, ObrasService } from 'src/app/Services/obras.service';
import { CrearUbicacionComponent } from '../../crear-ubicacion/crear-ubicacion.component';

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.css']
})
export class CrearObraComponent implements OnInit {
  ubicacionesResponse!: UbicacionesResponse;
  listaUbicaciones!: Ubicacion[];

  obra: Obra={  
    idObra:'',
    numero:'',
    titulo:'',
    descripcion:'',
    inicio:'',
    fin:'',
    ubicacionObra:'',
    prototipo:'',
    numeroContrato:'',
    importes:'',
    reglas:''
  };

  public optionUbicacionesObra = 'Ubicación de la obra';
  public optionUbicacionesContrato = 'Ubicaciones';

  obraResponse!:ObraResponse;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private obrasService:ObrasService, private ubicacionesServie:UbicacionesService) { }

  ngOnInit(): void {
    this.listarUbicaciones();
  }

  dialogUbicacion(){
    const dialogRef = this.dialog.open(CrearUbicacionComponent);
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarUbicaciones();
    });
  }

  crear(){
    delete this.obra.idObra;
    this.obrasService.addObra(this.obra).subscribe(
      res=>{
        this.obraResponse = res;
        if( this.obraResponse.status == 200 ){
          this.openSnackBar("Obra Creada","Ok", 4000)
        }else{
          this.openSnackBar("No se pudo guardar su obra. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
        }
      },
      err=>this.openSnackBar("No se pudo guardar su obra. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
    );
  }

  listarUbicaciones(){
    this.ubicacionesServie.getUbicaciones().subscribe(
      res=>{
        this.ubicacionesResponse =<any>res;
        this.listaUbicaciones = this.ubicacionesResponse.data!;
        console.log(this.listaUbicaciones)
      },
      err => {
        console.log(err)
      }
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
