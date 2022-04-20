import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarInvolucradoComponent } from '../agregar-involucrado/agregar-involucrado.component';
import { InvolucradoInfo, ListaInvolucradosResponse, BitacorasService } from 'src/app/Services/bitacoras.service';


@Component({
  selector: 'app-involucrados',
  templateUrl: './involucrados.component.html',
  styleUrls: ['./involucrados.component.css']
})
export class InvolucradosComponent implements OnInit {
  involucradosResponse!:ListaInvolucradosResponse
  listaInvolucrados!:InvolucradoInfo[]
  idBitacora:string

  constructor(public dialog: MatDialog, private bitacorasService:BitacorasService) {
    this.idBitacora = sessionStorage.getItem("idBitacora")!
    this.listarInvolucrados(sessionStorage.getItem("idBitacora")!)
  }

  ngOnInit(): void {
  }

  listarInvolucrados(bitacora:string){
    this.bitacorasService.getInvolucrados(this.idBitacora).subscribe(
      res=>{
        this.involucradosResponse = <any>res;
        if(this.involucradosResponse.data) this.listaInvolucrados = this.involucradosResponse.data
      },
      err=>{
        console.log(err)
      }
    );
  }

  openAddInvolucradoDialog(){
    const dialogRef = this.dialog.open(AgregarInvolucradoComponent);
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarInvolucrados(sessionStorage.getItem("idBitacora")!);
    });
  }
}
