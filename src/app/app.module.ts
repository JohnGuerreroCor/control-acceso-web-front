import { NgModule, isDevMode, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material.modules';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';

//INICIO INTEGRACION FIREBASE PARA IMAGENES LINEALES EMAIL - REMPLAZO DE DATA URI BASE64

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

//FIN INTEGRACION FIREBASE PARA IMAGENES LINEALES EMAIL - REMPLAZO DE DATA URI BASE64

//SERVICIOS PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { PromptInstallComponent } from './components/prompt-install/prompt-install.component';
import { CheckForUpdateService } from './services/check-for-update.service';
import { LogUpdateService } from './services/log-update.service';
import { PromptUpdateService } from './services/prompt-update.service';
import { PromptNotificationService } from './services/promtp-notification.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';

//QR
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { VirtualComponent } from './components/virtual/virtual.component';
import { IntercambioComponent } from './components/intercambio/intercambio.component';
import { PublicoComponent } from './components/publico/publico.component';
import { DocenteComponent } from './components/docente/docente.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { GraduadoComponent } from './components/graduado/graduado.component';
import {
  TiqueteInvitadosComponent,
  ModalTiqueteInvitado,
} from './components/tiquete/tiquete-invitados/tiquete-invitados.component';
import {
  TiqueteVisitantesComponent,
  ModalTiqueteVisitante,
} from './components/tiquete/tiquete-visitantes/tiquete-visitantes.component';
import { TiquetesComponent } from './components/inicio/tiquetes/tiquetes.component';
import { EscanerComponent } from './components/escaner/escaner.component';
import { EmailHidePipe } from './pipes/email-hide.pipe';
import { InstructivoComponent } from './components/instructivo/instructivo.component';

const initializer =
  (promptNotificationService: PromptNotificationService) => () =>
    promptNotificationService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TokenComponent,
    PromptInstallComponent,
    NavbarComponent,
    InicioComponent,
    EstudianteComponent,
    VirtualComponent,
    IntercambioComponent,
    PublicoComponent,
    DocenteComponent,
    AdministrativoComponent,
    GraduadoComponent,
    TiqueteInvitadosComponent,
    TiqueteVisitantesComponent,
    ModalTiqueteInvitado,
    ModalTiqueteVisitante,
    TiquetesComponent,
    EscanerComponent,
    EmailHidePipe,
    InstructivoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPrintModule,
    ZXingScannerModule,
    MaterialModules,

    //INICIO FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    //FIN FIREBASE

    AppRoutingModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
  ],
  entryComponents: [
    ModalTiqueteInvitado,
    ModalTiqueteVisitante,
    /* ModalInformacion,
     */
  ],
  providers: [
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PromptNotificationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
