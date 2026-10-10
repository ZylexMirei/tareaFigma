import { Component, input, output } from '@angular/core';
import { Orden } from '../../models/producto';

@Component({
  selector: 'app-barra-orden',
  templateUrl: './barra-orden.html',
  styleUrl: './barra-orden.scss',
})
export class BarraOrden {
  total = input.required<number>();
  ordenar = output<Orden>();

  alCambiar(evento: Event): void {
    this.ordenar.emit((evento.target as HTMLSelectElement).value as Orden);
  }
}
