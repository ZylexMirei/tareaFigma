import { DecimalPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-tarjeta-producto',
  imports: [DecimalPipe],
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.scss',
})
export class TarjetaProducto {
  producto = input.required<Producto>();
  comprar = output<Producto>();
  agregar = output<Producto>();

  favorito = signal(false);

  alternarFavorito(): void {
    this.favorito.update((v) => !v);
  }
}
