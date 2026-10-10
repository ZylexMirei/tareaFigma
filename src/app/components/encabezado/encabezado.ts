import { Component, output } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.scss',
})
export class Encabezado {
  buscar = output<string>();

  alEscribir(evento: Event): void {
    this.buscar.emit((evento.target as HTMLInputElement).value);
  }
}
