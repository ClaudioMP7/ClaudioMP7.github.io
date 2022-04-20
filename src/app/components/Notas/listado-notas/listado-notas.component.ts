import { Component, OnInit } from '@angular/core';
import { ListaNotasResponse, BitacorasService, Nota } from 'src/app/Services/bitacoras.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearNotaComponent } from '../crear-nota/crear-nota.component';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-listado-notas',
  templateUrl: './listado-notas.component.html',
  styleUrls: ['./listado-notas.component.css']
})
export class ListadoNotasComponent implements OnInit {
  nota:Nota={
    idNota:'',
    idBitacora:'',
    tipo:'',
    idAutor:''
  }
  notasResponse!:ListaNotasResponse
  listaNotas!:Nota[]
  listaRespuestas!:Nota[]
    
  idBitacora:string
  notasExistentes!:boolean
  firmas: FormGroup;
  ultimaRespuesta:string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb:FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar, private bitacorasService:BitacorasService) {
    this.ultimaRespuesta = "Na"
    this.idBitacora = sessionStorage.getItem("idBitacora")!
    this.listarNotas()
    this.firmas = fb.group({
      firmaCarpin:false,
      firmaContratista:false
    })
  }

  ngOnInit(): void {
  }

  listarNotas(){
    this.bitacorasService.getNotas(this.idBitacora).subscribe(
      res=>{
        this.notasResponse = <any>res;
        if(this.notasResponse.data){
          this.listaNotas = this.notasResponse.data
        } 
        this.notasExistentes = this.listaNotas.length>0
      },
      err=>{
        console.log(err)
      }
    );

    this.bitacorasService.getRespuestas(this.idBitacora).subscribe(
      res=>{
        this.notasResponse = <any>res;
        if(this.notasResponse.status=='200'){
          this.listaRespuestas = this.notasResponse.data!
          this.ultimaRespuesta = this.listaRespuestas[0].fecha!
        } 
      },
      err=>{
        console.log(err)
      }
    );
  }

  crearNota(tipo:string){
    const dialogRef = this.dialog.open(CrearNotaComponent,{
      data:{
        tipo:tipo
      }
    });
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarNotas();
    });
  }

  openSnackBar(message:string, btn:string, duration:number){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }

}
