import { Component, OnInit } from '@angular/core';
import { Bitacora, BitacorasService, AddResponse } from 'src/app/Services/bitacoras.service';
import { Obra, ListObrasResponse, ObrasService } from 'src/app/Services/obras.service';
import { EspecialidadesService, EspecialidadResponse, Especialidad } from 'src/app/Services/especialidades.service';
import { User, ListUsersResponse, UsuariosService } from 'src/app/Services/usuarios.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-bitacora',
  templateUrl: './crear-bitacora.component.html',
  styleUrls: ['./crear-bitacora.component.css']
})
export class CrearBitacoraComponent implements OnInit {
  bitacora:Bitacora={
    idBitacora:'',
    folio:'',
    idObra:'',
    idContratista:'',
    idEspecialidad:'',
    idSupervisor:''
  };

  obrasResponse!: ListObrasResponse;
  listaObras!:Obra[]

  usuariosResponse!: ListUsersResponse;
  listaUsuarios!: User[];
  listaContratistas!: User[];


  especialidadesResponse!: EspecialidadResponse;
  listaEspecialidades!: Especialidad[];

  addedResponse!: AddResponse;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar, private ObraService:ObrasService, private userService:UsuariosService, private especialidadService:EspecialidadesService, private bitacorasService:BitacorasService) { }

  ngOnInit(): void {
    this.listarObras();
    this.listarContratistas();
    this.listarEspecialidades();
    this.listarSupervisores();
  }

  listarObras(){
    this.ObraService.getObras().subscribe(
      res=>{
        this.obrasResponse = <any>res;
        if(this.obrasResponse.data) this.listaObras = this.obrasResponse.data;
      },
      err=>{
        console.log(err)
      }
    );
  }

  listarContratistas(){
    this.userService.getContratistas().subscribe(
      res=>{
        this.usuariosResponse = <any>res;
        if(this.usuariosResponse.data) this.listaContratistas = this.usuariosResponse.data
      },
      err=>{
        console.log(err)
      }
    );
  }

  listarEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe(
      res=>{
        this.especialidadesResponse = <any>res;
        if(this.especialidadesResponse.data) this.listaEspecialidades = this.especialidadesResponse.data
      },
      err=>{
        console.log(err)
      }
    );
  }

  listarSupervisores(){
    this.userService.getUsuarios().subscribe(
      res=>{
        this.usuariosResponse = <any>res;
        console.log(this.usuariosResponse)
        if(this.usuariosResponse.data) this.listaUsuarios = this.usuariosResponse.data
      },
      err=>console.log(err)
    )
  }

  crear(){
    delete this.bitacora.idBitacora;
    this.bitacorasService.addBitacora(this.bitacora).subscribe(
      res=>{
        this.addedResponse = res;
        if( this.addedResponse.status == 200 ){
          this.openSnackBar("Obra Creada","Ok", 4000)
        }else{
          this.openSnackBar("No se pudo guardar su obra. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
        }
      },
      err=>this.openSnackBar("No se pudo guardar su obra. Inténtelo de nuevo o contacte al administrador del sistema", "Ok", 10000)
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
