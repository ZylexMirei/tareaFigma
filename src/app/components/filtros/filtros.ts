import { Component, output, signal, WritableSignal } from '@angular/core';
import { PRODUCTOS } from '../../data/productos';
import { Condicion, FiltrosActivos, PRECIO_MAX } from '../../models/producto';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss',
})
export class Filtros {
  cambio = output<FiltrosActivos>();

  readonly PRECIO_MAX = PRECIO_MAX;
  readonly totalProductos = PRODUCTOS.length;
  readonly marcas = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Alumin'];
  readonly almacenamientos = [32, 128, 256, 512];
  readonly condiciones: Condicion[] = ['Nuevo', 'Reacondicionado'];

  marcasSel = signal<string[]>([]);
  almacenamientosSel = signal<number[]>([]);
  condicionesSel = signal<Condicion[]>([]);
  precioMin = signal(0);
  precioMax = signal(PRECIO_MAX);

  totalMarca(marca: string): number {
    return PRODUCTOS.filter((p) => p.marca === marca).length;
  }

  totalCondicion(condicion: Condicion): number {
    return PRODUCTOS.filter((p) => p.condicion === condicion).length;
  }

  alternar<T>(lista: WritableSignal<T[]>, valor: T): void {
    lista.update((l) => (l.includes(valor) ? l.filter((v) => v !== valor) : [...l, valor]));
    this.emitir();
  }

  verTodasLasMarcas(): void {
    this.marcasSel.set([]);
    this.emitir();
  }

  fijarMin(evento: Event): void {
    const valor = Number((evento.target as HTMLInputElement).value) || 0;
    this.precioMin.set(Math.min(Math.max(valor, 0), this.precioMax()));
    this.emitir();
  }

  fijarMax(evento: Event): void {
    const valor = Number((evento.target as HTMLInputElement).value) || PRECIO_MAX;
    this.precioMax.set(Math.max(Math.min(valor, PRECIO_MAX), this.precioMin()));
    this.emitir();
  }

  limpiar(): void {
    this.marcasSel.set([]);
    this.almacenamientosSel.set([]);
    this.condicionesSel.set([]);
    this.precioMin.set(0);
    this.precioMax.set(PRECIO_MAX);
    this.emitir();
  }

  private emitir(): void {
    this.cambio.emit({
      marcas: this.marcasSel(),
      almacenamientos: this.almacenamientosSel(),
      condiciones: this.condicionesSel(),
      precioMin: this.precioMin(),
      precioMax: this.precioMax(),
    });
  }
}
