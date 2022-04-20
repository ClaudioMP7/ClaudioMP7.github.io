import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Filtros, ListObrasResponse,Obra,ObrasService} from '../../../Services/obras.service'; 
import { CrearObraComponent } from '../crear-obra/crear-obra.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CrearBitacoraComponent } from '../../Bitacoras/crear-bitacora/crear-bitacora.component';
import { DetalleObraComponent } from '../detalle-obra/detalle-obra.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css']
})
export class ListaObrasComponent implements OnInit {

  filtros:Filtros={
    inicioA:'',
    inicioB:'',
    finA:'',
    finB:'',
    local:''
  }

  numFilter = new FormControl('')
  tituloFilter = new FormControl('')
  ubiFilter = new FormControl('')
  protoFilter = new FormControl('')

  filterValues={
    numero:'',
    titulo:'',
    ubicacionObra:'',
    prototipo:''
  }

  listadoObras!: ListObrasResponse;
  displayedColumns: string[] = ['nObra', 'titulo', 'ubicacion', 'inicio', 'fin', 'prototipo']
  dataSource!: MatTableDataSource<Obra>;

  @ViewChild(MatTable) table!: MatTable<Obra>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private ObrasService: ObrasService) { 
    this.listar()
  }

  ngOnInit(): void {
    this.numFilter.valueChanges.subscribe(
      numero => {
        this.filterValues.numero = numero.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.tituloFilter.valueChanges.subscribe(
      titulo => {
        this.filterValues.titulo = titulo.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.ubiFilter.valueChanges.subscribe(
      ubicacionObra => {
        this.filterValues.ubicacionObra = ubicacionObra.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.protoFilter.valueChanges.subscribe(
      prototipo => {
        this.filterValues.prototipo = prototipo.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
  }

  listar(){
    this.ObrasService.getObras().subscribe(
      res=>{
        console.log(res)
        this.listadoObras =<any>res;
        this.dataSource = new MatTableDataSource(this.listadoObras.data);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err)
        this.openSnackBar("Error en el servidor. Inténtelo más tarde o llame al administrador del sistema","OK")
      }
    );
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.numero.toLowerCase().indexOf(searchTerms.numero) !== -1
        && data.titulo.toString().toLowerCase().indexOf(searchTerms.titulo) !== -1
        && data.ubicacionObra.toLowerCase().indexOf(searchTerms.ubicacionObra) !== -1
        && data.prototipo.toLowerCase().indexOf(searchTerms.prototipo) !== -1;
    }
    return filterFunction;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrar(){
    this.ObrasService.getObrasFilts(this.filtros).subscribe(
      res=>{
        console.log(res)
        this.listadoObras =<any>res;
        this.dataSource = new MatTableDataSource(this.listadoObras.data);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err)
        this.openSnackBar("Error en el servidor. Inténtelo más tarde o llame al administrador del sistema","OK")
      }
    );

    this.limpiarBuscadores();
  }

  @ViewChild("buscador1") buscador1!: ElementRef;
  @ViewChild("buscador2") buscador2!: ElementRef;
  @ViewChild("buscador3") buscador3!: ElementRef;
  @ViewChild("buscador4") buscador4!: ElementRef;
  limpiarBuscadores(){
    this.buscador1.nativeElement.value="";
    this.buscador2.nativeElement.value="";
    this.buscador3.nativeElement.value="";
    this.buscador4.nativeElement.value="";
  }

  borrarFiltros(){
    this.filtros.local = null!
    this.listar()
  }

  openDetail(obra:Obra){
    const dialogDetailRef = this.dialog.open(DetalleObraComponent,{
      data:{
        idObra:obra.idObra,
        numero:obra.numero,
        titulo:obra.titulo,
        descripcion:obra.descripcion,
        inicio:obra.inicio,
        fin:obra.fin,
        ubicacionObra: obra.ubicacionObra,
        prototipo:obra.prototipo,
        numeroContrato:obra.numeroContrato,
        importes:obra.importes,
        reglas:obra.reglas
      }
    });
    dialogDetailRef.afterOpened().subscribe((result:any)=>{
    });
    dialogDetailRef.afterClosed().subscribe((result: any) => {
      this.listar();
    });

  }
  
  openAddDialog() {
    const dialogRef = this.dialog.open(CrearObraComponent);
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
