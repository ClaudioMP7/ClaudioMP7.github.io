import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitacoraInfo, Bitacora, BitacorasService } from 'src/app/Services/bitacoras.service';
import { Router } from '@angular/router';
import { EspecialidadesService, EspecialidadResponse, Especialidad } from 'src/app/Services/especialidades.service';


@Component({
  selector: 'app-bitacora-detalles',
  templateUrl: './bitacora-detalles.component.html',
  styleUrls: ['./bitacora-detalles.component.css']
})
export class BitacoraDetallesComponent implements OnInit {
  bitacora:Bitacora={
    idBitacora:'',
    folio:'',
    idObra:'',
    idContratista:'',
    idEspecialidad:'',
    idSupervisor:''
  };
  
  bitacoraInfo:BitacoraInfo={
    idBitacora:'',
    folio:'',
    nObra:'',
    tObra:'',
    contratista:'',
    especialidad:'',
    supervisor:'',
    uObra:'',
    involucrados: []
  };

  especialidadesResponse!: EspecialidadResponse;
  listaEspecialidades!: Especialidad[];

  constructor( private especialidadService:EspecialidadesService, private router:Router, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listarEspecialidades();
    if(sessionStorage.getItem('idBitacora')){
      this.bitacoraInfo.idBitacora = sessionStorage.getItem('idBitacora')!
      this.bitacoraInfo.folio = sessionStorage.getItem('folio')!
      this.bitacoraInfo.nObra = sessionStorage.getItem('nObra')!
      this.bitacoraInfo.tObra = sessionStorage.getItem('tituloObra')!
      this.bitacoraInfo.contratista = sessionStorage.getItem('contratista')!
      this.bitacoraInfo.especialidad = sessionStorage.getItem('especialidad')!
      this.bitacoraInfo.supervisor = sessionStorage.getItem('supervisor')!
      this.bitacoraInfo.uObra = sessionStorage.getItem('uObra')!
      
    }else{
      this.router.navigate(['/bitacoras'])
    } 
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

}
