import { Component, OnInit, ViewChild } from '@angular/core';
import { Ubicacion, UbicacionesService, UbicacionesResponse } from 'src/app/Services/ubicaciones.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { CrearUbicacionComponent } from '../crear-ubicacion/crear-ubicacion.component';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DetalleUbicacionComponent } from '../detalle-ubicacion/detalle-ubicacion.component';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {
  listadoUbicaciones!: UbicacionesResponse;
  displayedColumns: string[] = ['nombre', 'ciudad', 'estado','direccion'];

  dataSource!: MatTableDataSource<Ubicacion>;

  @ViewChild(MatTable) table!: MatTable<Ubicacion>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private UbicacionesService: UbicacionesService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.UbicacionesService.getUbicaciones().subscribe(
      res=>{
        console.log(res)
        this.listadoUbicaciones =<any>res;
        this.dataSource = new MatTableDataSource(this.listadoUbicaciones.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err)
        this.openSnackBar("Error en el servidor. Inténtelo más tarde o llame al administrador del sistema","OK")
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetail(ubicacion:Ubicacion){
    const dialogDetailRef = this.dialog.open(DetalleUbicacionComponent,{
      data:{
        idUbicacion:ubicacion.idUbicacion,
        nombre:ubicacion.nombre,
        estado:ubicacion.estado,
        ciudad:ubicacion.ciudad,
        direccion:ubicacion.direccion
      }
    });
    dialogDetailRef.afterOpened().subscribe((result:any)=>{
    });
    dialogDetailRef.afterClosed().subscribe((result: any) => {
      this.listar();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CrearUbicacionComponent);
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listar();
    });
  }

  openSnackBar(message:string, btn:string){
    this._snackBar.open(message, btn, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000
    });
  }
}
