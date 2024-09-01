import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'; // Importamos ProductoService para la lógica de productos
import { error } from 'console'; // Importamos error de la consola
import { Producto } from '../../models/producto'; // Importamos el modelo Producto
import { ToastrService } from 'ngx-toastr'; // Importamos ToastrService para mostrar mensajes de notificación

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css' // Archivo de estilos para el componente
})
export class ListarProductosComponent implements OnInit {
  listProducto: Producto[] = []; // Lista de productos inicialmente vacía

  constructor(private _productoService: ProductoService, // Inyectamos ProductoService para la lógica de productos
    private toastr: ToastrService) { // Inyectamos ToastrService para mostrar mensajes de notificación
  }

  ngOnInit(): void {
    // Al iniciar el componente, llamamos a la función obtenerProductos para cargar la lista de productos
    this.obtenerProductos();
  }
    
  obtenerProductos() {
    // Método para obtener la lista de productos desde el servicio
    this._productoService.getProductos().subscribe(data => { // Llamamos al método getProductos del servicio
      console.log(data); // Imprimimos los datos recibidos en la consola
      this.listProducto = data; // Asignamos la lista de productos recibida a la variable listProducto
    }, error => { // Manejo de errores en caso de que falle la solicitud
      console.log(error); // Imprimimos el error en la consola
    });
  }

  eliminarProducto(id: any) {
    // Método para eliminar un producto
    this._productoService.eliminarProducto(id).subscribe(data => { // Llamamos al método eliminarProducto del servicio
      this.toastr.error('El producto fue eliminado con exito', 'Producto Eliminado'); // Mostramos un mensaje de éxito con Toastr
      this.obtenerProductos(); // Volvemos a cargar la lista de productos después de eliminar uno
    }, error => { // Manejo de errores en caso de que falle la solicitud
      console.log(error); // Imprimimos el error en la consola
    });
  }
}
