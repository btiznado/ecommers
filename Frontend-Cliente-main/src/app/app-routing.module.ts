import { NgModule } from '@angular/core'; // Importamos NgModule para definir un módulo
import { RouterModule, Routes } from '@angular/router'; // Importamos RouterModule y Routes para configurar las rutas
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component'; // Importamos el componente ListarProductosComponent
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component'; // Importamos el componente CrearProductoComponent

const routes: Routes = [ // Definimos las rutas de la aplicación
  { path: '', component: ListarProductosComponent }, // Ruta para mostrar el listado de productos
  { path: 'crear-producto', component: CrearProductoComponent }, // Ruta para mostrar el formulario de creación de producto
  { path: 'editar-producto/:id', component: CrearProductoComponent }, // Ruta para mostrar el formulario de edición de producto con un ID específico
  { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta por defecto, redirige a la página principal si la URL no coincide con ninguna ruta definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importamos y configuramos las rutas principales de la aplicación
  exports: [RouterModule] // Exportamos el módulo de rutas para que esté disponible en otros módulos
})
export class AppRoutingModule { } // Exportamos el módulo de rutas principal de la aplicación
