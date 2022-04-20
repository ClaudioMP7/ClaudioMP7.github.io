import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Bitacora, BitacorasService, ListBitacorasResponse, BitacoraInfo } from '../../../Services/bitacoras.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CrearBitacoraComponent } from '../crear-bitacora/crear-bitacora.component';
import { BitacoraDetallesComponent } from '../bitacora-detalles/bitacora-detalles.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-bitacoras',
  templateUrl: './lista-bitacoras.component.html',
  styleUrls: ['./lista-bitacoras.component.css']
})
export class ListaBitacorasComponent implements OnInit {
  folioFilter = new FormControl('')
  contratistaFilter = new FormControl('')
  especialidadFilter = new FormControl('')
  supervisorFilter = new FormControl('')
  rolControl = new FormControl('todos');

  filterValues={
    folio:'',
    contratista:'',
    especialidad:'',
    supervisor:''
  }

  listadoBitacoras!: ListBitacorasResponse;
  dataSource!: MatTableDataSource<BitacoraInfo>;
  ListarBitacoras!: BitacoraInfo[];
  displayedColumns: string[] = ['folio', 'numeroObra', 'obra', 'contratista', 'especialidad', 'supervisor'];

  @ViewChild(MatTable) table!: MatTable<BitacoraInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private router:Router, public dialog: MatDialog, private bitacorasService:BitacorasService ) {
    this.listarBitacoras();
  }

  ngOnInit(): void {
    this.folioFilter.valueChanges.subscribe(
      folio => {
        this.filterValues.folio = folio.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.contratistaFilter.valueChanges.subscribe(
      contratista => {
        this.filterValues.contratista = contratista.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.especialidadFilter.valueChanges.subscribe(
      especialidad => {
        this.filterValues.especialidad = especialidad.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
    this.supervisorFilter.valueChanges.subscribe(
      supervisor => {
        this.filterValues.supervisor = supervisor.trim().toLowerCase();
        this.dataSource.filter =  JSON.stringify(this.filterValues);
      }
    )
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

  }


  openAddBitacoraDialog() {
    const dialogRef = this.dialog.open(CrearBitacoraComponent);
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarBitacoras();
    });
  }

  listarBitacoras(){
    this.bitacorasService.getBitacoras().subscribe(
      res=>{
        console.log(res)
        this.listadoBitacoras = <any>res;
        this.dataSource = new MatTableDataSource(this.listadoBitacoras.data);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.folio.toLowerCase().indexOf(searchTerms.folio) !== -1
        && data.contratista.toString().toLowerCase().indexOf(searchTerms.contratista) !== -1
        && data.especialidad.toLowerCase().indexOf(searchTerms.especialidad) !== -1
        && data.supervisor.toLowerCase().indexOf(searchTerms.supervisor) !== -1;
    }
    return filterFunction;
  }

  openBitacoraDetail(bitacora:BitacoraInfo){
    console.log(bitacora)
    sessionStorage['idBitacora'] = bitacora.idBitacora;
    sessionStorage['folio'] = bitacora.folio;
    sessionStorage['nObra'] = bitacora.nObra;
    sessionStorage['tituloObra'] = bitacora.tObra;
    sessionStorage['contratista'] = bitacora.contratista;
    sessionStorage['especialidad'] = bitacora.especialidad;
    sessionStorage['supervisor'] = bitacora.supervisor;
    sessionStorage['uObra'] = bitacora.uObra;
    sessionStorage['idObra'] = bitacora.idObra;
    sessionStorage['idContratista'] = bitacora.idContratista;
    sessionStorage['idEspecialidad'] = bitacora.idEspecialidad;
    sessionStorage['idSupervisor'] = bitacora.idSupervisor;

    this.router.navigate(['/detalle-bitacora'])
  }
  
}
