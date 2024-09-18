import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { UbicacionService } from '../../services/ubicacion.service';
import { Estamento } from 'src/app/models/estamento';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  links = [
    {
      titulo: 'Escáner',
      ruta: '/escaner',
      icono: 'fa-solid fa-qrcode fa-8x p-4 text-center color-icon color-icon',
      info: 'Lectura con cámara del qr para la identificación del usuario a ingresar o salir a la institución y registro manual para casos excepcionales.',
    },
    {
      titulo: 'Tiquete',
      ruta: '/tiquete-visitantes',
      icono: 'fa-solid fa-ticket fa-8x p-4 text-center color-icon',
      info: 'Generación de tiquetes de acceso para las personas externas a la institución.',
    },
  ];

  public perCodigo: number = this.auth.user.per_codigo;

  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;

  mobile: boolean = false;
  carnetEstudiante: boolean = false;
  carnetGraduado: boolean = false;
  carnetAdministrativo: boolean = false;
  carnetDocente: boolean = false;
  carnetVirtual: boolean = false;
  carnetIntercambio: boolean = false;

  carnets: Estamento[] = [];

  anio!: number;
  fecha = new Date();
  url: string = environment.URL_BACKEND;

  constructor(
    public auth: AuthService,
    private router: Router,
    public ubicacionService: UbicacionService
  ) {}

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.obtenerSedes();
    }
    this.anio = this.fecha.getUTCFullYear();

    if (window.screen.width <= 950) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt) => {
      if (window.screen.width <= 950) {
        // 768px portrait
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  }

  obtenerSedes() {
    this.ubicacionService.obtenerSedes().subscribe();
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio Un Error!',
    });
  }

  mensajeSuccses() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso Realizado',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');

    if (arr[0] == 'Access token expired') {
      this.auth.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
