import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importamos FormBuilder y FormGroup para construir formularios
import { ActivatedRoute, Router } from '@angular/router'; // Importamos ActivatedRoute y Router para manejar rutas
import { ToastrService } from 'ngx-toastr'; // Importamos ToastrService para mostrar mensajes de notificación
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar directivas básicas de Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importamos BrowserAnimationsModule para manejar animaciones

import { Producto } from '../../models/producto'; // Importamos el modelo Producto
import { ProductoService } from '../../services/producto.service'; // Importamos el servicio ProductoService para la lógica de los productos

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css' // Archivo de estilos para el componente
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup; // Definimos el FormGroup para el formulario de productos
  titulo = 'Crear producto'; // Título por defecto del formulario
  id: string | null; // Identificador del producto, puede ser nulo si no se está editando
  constructor(private fb: FormBuilder, // Inyectamos FormBuilder para construir formularios
    private router: Router, // Inyectamos Router para la navegación
    private toastr: ToastrService, // Inyectamos ToastrService para mostrar mensajes de notificación
    private _productoService: ProductoService, // Inyectamos ProductoService para la lógica de productos
    private aRouter: ActivatedRoute, // Inyectamos ActivatedRoute para obtener parámetros de la ruta
    private CommonModule: CommonModule, // Inyectamos CommonModule para usar directivas básicas de Angular
    private BrowserAnimationsModule: BrowserAnimationsModule ) { // Inyectamos BrowserAnimationsModule para manejar animaciones
    // Creamos el formulario con los campos requeridos
    this.productoForm = this.fb.group({
      producto: ['', Validators.required], // Campo de producto
      categoria: ['', Validators.required], // Campo de categoría
      ubicacion: ['', Validators.required], // Campo de ubicación
      precio: ['', Validators.required], // Campo de precio
    })
    // Obtenemos el ID del producto de la ruta actual
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    // Llamamos a la función esEditar al iniciar el componente
    this.esEditar();
  }

  agregarProducto() {
    // Creamos un objeto Producto con los datos del formulario
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value, // Nombre del producto
      categoria: this.productoForm.get('categoria')?.value, // Categoría del producto
      ubicacion: this.productoForm.get('ubicacion')?.value, // Ubicación del producto
      precio: this.productoForm.get('precio')?.value, // Precio del producto
    }
    // Verificamos si estamos editando un producto o agregando uno nuevo
    if(this.id !== null) {
      // Editamos el producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        // Mostramos un mensaje de éxito
        this.toastr.info('El producto fue actualizado con exito!', 'Producto Actualizado!');
        // Navegamos de vuelta a la lista de productos
        this.router.navigate(['/']);
      }, error => {
        console.log(error); // Manejamos errores imprimiéndolos en la consola
        this.productoForm.reset(); // Reiniciamos el formulario en caso de error
      })
    } else {
      // Agregamos un nuevo producto
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        // Mostramos un mensaje de éxito
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        // Navegamos de vuelta a la lista de productos
        this.router.navigate(['/']);
      }, error => {
        console.log(error); // Manejamos errores imprimiéndolos en la consola
        this.productoForm.reset(); // Reiniciamos el formulario en caso de error
      })
    }
  }

  esEditar() {
    // Verificamos si estamos editando un producto
    if(this.id !== null) {
      // Cambiamos el título del formulario
      this.titulo = 'Editar producto';
      // Obtenemos los datos del producto a editar
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        // Seteamos los valores del formulario con los datos del producto
        this.productoForm.setValue({
          producto: data.nombre, // Nombre del producto
          categoria: data.categoria, // Categoría del producto
          ubicacion: data.ubicacion, // Ubicación del producto
          precio: data.precio, // Precio del producto
        })
      })
    }
  }
}
