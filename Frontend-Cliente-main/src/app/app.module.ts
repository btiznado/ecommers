import { NgModule } from '@angular/core'; // Importamos NgModule para definir un módulo
import { BrowserModule, provideClientHydration } from '@angular/platform-browser'; // Importamos BrowserModule y provideClientHydration para la aplicación web
import { AppRoutingModule } from './app-routing.module'; // Importamos AppRoutingModule para las rutas de la aplicación
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importamos BrowserAnimationsModule para las animaciones
import { ToastrModule } from 'ngx-toastr'; // Importamos ToastrModule para mostrar mensajes de notificación
import { HttpClientModule } from '@angular/common/http'; // Importamos HttpClientModule para hacer solicitudes HTTP
import { provideAnimations } from '@angular/platform-browser/animations'; // Importamos provideAnimations para las animaciones
import { AppComponent } from './app.component'; // Importamos AppComponent, el componente principal de la aplicación
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component'; // Importamos CrearProductoComponent
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component'; // Importamos ListarProductosComponent
import { ReactiveFormsModule } from '@angular/forms'; // Importamos ReactiveFormsModule para trabajar con formularios reactivos
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importamos provideHttpClient y withFetch para configurar el cliente HTTP

@NgModule({
  declarations: [ // Declaramos los componentes que pertenecen a este módulo
    AppComponent,
    CrearProductoComponent,
    ListarProductosComponent
  ],
  imports: [ // Importamos otros módulos necesarios para este módulo
    BrowserModule, // Módulo que contiene todas las funcionalidades de la aplicación web
    AppRoutingModule, // Módulo de enrutamiento de la aplicación
    ReactiveFormsModule, // Módulo para trabajar con formularios reactivos
    BrowserAnimationsModule, // Módulo para manejar animaciones en la aplicación
    ToastrModule.forRoot(), // Módulo para mostrar mensajes de notificación
    HttpClientModule // Módulo para hacer solicitudes HTTP
  ],
  providers: [ // Proveemos servicios y configuraciones que estarán disponibles en toda la aplicación
    provideAnimations(), // Proporciona configuraciones para las animaciones
    provideClientHydration(), // Proporciona configuraciones para la hidratación del cliente
    provideHttpClient(withFetch()) // Proporciona configuraciones para el cliente HTTP
  ],
  bootstrap: [AppComponent] // Componente principal que se inicia cuando se carga la aplicación
})
export class AppModule { } // Exportamos el módulo principal de la aplicación
