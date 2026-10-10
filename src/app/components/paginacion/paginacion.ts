import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.html',
  styleUrl: './paginacion.scss',
})
export class Paginacion {
  pagina = input.required<number>();
  totalPaginas = input.required<number>();
  cambiar = output<number>();

  paginas = computed(() =>
    Array.from({ length: this.totalPaginas() }, (_, i) => i + 1),
  );

  ir(numero: number): void {
    if (numero >= 1 && numero <= this.totalPaginas() && numero !== this.pagina()) {
      this.cambiar.emit(numero);
    }
  }
}
