import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearUbicacionComponent } from '../../crear-ubicacion/crear-ubicacion.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obra, ObraResponse, ObrasService } from 'src/app/Services/obras.service';
import { UbicacionesResponse, UbicacionesService, Ubicacion } from 'src/app/Services/ubicaciones.service'; 

@Component({
  selector: 'app-detalle-obra',
  templateUrl: './detalle-obra.component.html',
  styleUrls: ['./detalle-obra.component.css']
})
export class DetalleObraComponent implements OnInit {
  ubicacionesResponse!: UbicacionesResponse;
  listaUbicaciones!: Ubicacion[];

  obraResponse!: ObraResponse;

  public optionUbicacionesObra = '';

  obra:Obra={
    idObra:'',
    numero:'',
    titulo:'',
    descripcion:'',
    inicio:'',
    fin:'',
    prototipo:'',
    numeroContrato:'',
    importes:'',
    reglas:''
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private obrasService:ObrasService, private ubicacionesServie:UbicacionesService,  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.obra.idObra = data.idObra
    this.obra.numero = data.numero
    this.obra.titulo = data.titulo
    this.obra.descripcion = data. descripcion
    this.obra.inicio = data.inicio
    this.obra.fin = data.fin
    this.obra.ubicacionObra = data.ubicacionObra
    this.obra.prototipo = data.prototipo
    this.obra.numeroContrato = data.numeroContrato
    this.obra.importes = data.importes
    this.obra.reglas = data.reglas

    this.optionUbicacionesObra = data.ubicacionObra
  }

  ngOnInit(): void {
    this.listarUbicaciones();
  }

  editar(){
    this.obrasService.editObra(this.obra).subscribe(
      res=>{
        this.obraResponse = res;
        if(this.obraResponse.status == 200){
          this.openSnackBar("Usuario Editado","Ok")
        }else{
          this.openSnackBar("Error al editar usuario","Ok")
        }
      },
      err=>console.log(err)
    );
  }

  dialogUbicacion(){
    const dialogRef = this.dialog.open(CrearUbicacionComponent);
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarUbicaciones();
    });
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

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000
    });
  }
}
