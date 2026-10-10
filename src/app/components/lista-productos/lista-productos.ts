import { Component, input, output } from '@angular/core';
import { Producto } from '../../models/producto';
import { TarjetaProducto } from '../tarjeta-producto/tarjeta-producto';

@Component({
  selector: 'app-lista-productos',
  imports: [TarjetaProducto],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.scss',
})
export class ListaProductos {
  productos = input.required<Producto[]>();
  comprar = output<Producto>();
  agregar = output<Producto>();
}
