import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Especialidad, EspecialidadesService, EspecialidadResponse } from '../../Services/especialidades.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEspecialidadComponent } from '../crear-especialidad/crear-especialidad.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DetalleEspecialidadComponent } from '../detalle-especialidad/detalle-especialidad.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  listadoEspecialidades!: EspecialidadResponse;
  displayedColumns: string[] = ['nombre','descripcion'];

  dataSource!: MatTableDataSource<Especialidad>;

  @ViewChild(MatTable) table!: MatTable<Especialidad>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog: MatDialog, private EspecialidadesService: EspecialidadesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.EspecialidadesService.getEspecialidades().subscribe(
      res=>{
        console.log(res)
        this.listadoEspecialidades =<any>res;
        this.dataSource = new MatTableDataSource(this.listadoEspecialidades.data);
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

  openDetail(especialidad:Especialidad){
    const dialogDetailRef = this.dialog.open(DetalleEspecialidadComponent,{
      data:{
        idEspecialidad:especialidad.idEspecialidad,
        nombre:especialidad.nombre,
        descripcion:especialidad.descripcion
      }
    });
    dialogDetailRef.afterOpened().subscribe((result:any)=>{
    });
    dialogDetailRef.afterClosed().subscribe((result: any) => {
      this.listar();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CrearEspecialidadComponent);
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
