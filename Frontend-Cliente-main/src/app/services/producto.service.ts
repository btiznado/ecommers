import { HttpClient } from '@angular/common/http'; // Importamos HttpClient para hacer solicitudes HTTP
import { Injectable } from '@angular/core'; // Importamos Injectable para inyectar el servicio
import { Observable } from 'rxjs'; // Importamos Observable para manejar operaciones asincrónicas
import { Producto } from '../models/producto'; // Importamos el modelo Producto

@Injectable({
  providedIn: 'root' // Definimos que este servicio estará disponible en toda la aplicación
})
export class ProductoService {
  
    url = 'http://localhost:4000/api/productos/'; // URL base para las solicitudes HTTP
  
    constructor(private http: HttpClient) { } // Inyectamos HttpClient para realizar solicitudes HTTP
  
    getProductos(): Observable<any> {
      // Método para obtener la lista de productos
      return this.http.get(this.url); // Realizamos una solicitud GET al servidor y devolvemos un Observable
    }

    eliminarProducto(id: string): Observable<any> {
      // Método para eliminar un producto
      return this.http.delete(this.url + id); // Realizamos una solicitud DELETE al servidor para eliminar un producto
    }

    guardarProducto(producto: Producto): Observable<any> {
      // Método para guardar un nuevo producto
      return this.http.post(this.url, producto); // Realizamos una solicitud POST al servidor con los datos del producto a guardar
    }

    obtenerProducto(id: string): Observable<any> {
      // Método para obtener los detalles de un producto específico
      return this.http.get(this.url + id); // Realizamos una solicitud GET al servidor para obtener los detalles del producto
    }
  
    editarProducto(id: string, producto: Producto): Observable<any>{
      // Método para editar un producto existente
      return this.http.put(this.url + id, producto); // Realizamos una solicitud PUT al servidor con los datos actualizados del producto
    }
}
