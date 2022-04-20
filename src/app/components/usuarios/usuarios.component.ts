import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { UsuariosService, User, ListUsersResponse } from '../../Services/usuarios.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Bitacora } from 'src/app/Services/bitacoras.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  rolControl = new FormControl('todos');
  value = '';
  ListarUsuarios!: ListUsersResponse;
  

  displayedColumns: string[] = ['idUsuario','nombre', 'correo', 'celular', 'rol'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatTable) table!: MatTable<User>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(public dialog: MatDialog, private UsuariosService:UsuariosService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.UsuariosService.getUsuarios().subscribe(
      res=>{
        this.ListarUsuarios =<any>res;
        /*this.ListarUsuarios.forEach((user) =>{
          console.log(user)
        });*/
        this.dataSource = new MatTableDataSource(this.ListarUsuarios.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    );
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      data:[]
    });
    dialogRef.afterOpened().subscribe((result:any)=>{
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.listarUsuarios();
    });
  }

  ngAfterViewInit(){
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDetail(user:User){
    const dialogDetailRef = this.dialog.open(UserDetailsComponent,{
      data:{
        idUsuario:user.idUsuario,
        nombre:user.nombre,
        apellidos:user.apellidos,
        correo:user.correo,
        celular:user.celular,
        password:user.password
      }
    });
    dialogDetailRef.afterOpened().subscribe((result:any)=>{
    });
    dialogDetailRef.afterClosed().subscribe((result: any) => {
      this.listarUsuarios();
    });
  }
  
}

function createNewUser(id: string, nombre:string, apellidos:string, correo:string, celular:string, password:string, nombreRol:string): User {
  return {
    idUsuario:id,
    nombre:nombre,
    apellidos:apellidos,
    correo:correo,
    celular:celular,
    password:password,
    nombreRol:nombreRol
  };
}