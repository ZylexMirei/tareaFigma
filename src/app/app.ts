import { Component, computed, signal } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { Filtros } from './components/filtros/filtros';
import { BarraOrden } from './components/barra-orden/barra-orden';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { Paginacion } from './components/paginacion/paginacion';
import { PiePagina } from './components/pie-pagina/pie-pagina';
import { PRODUCTOS } from './data/productos';
import { FILTROS_INICIALES, FiltrosActivos, Orden, Producto } from './models/producto';

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

@Component({
  selector: 'app-root',
  imports: [Encabezado, Filtros, BarraOrden, ListaProductos, Paginacion, PiePagina],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly porPagina = 6;

  protected readonly busqueda = signal('');
  protected readonly filtros = signal<FiltrosActivos>(FILTROS_INICIALES);
  protected readonly orden = signal<Orden>('recomendados');
  protected readonly pagina = signal(1);
  protected readonly aviso = signal<string | null>(null);
  private temporizador?: ReturnType<typeof setTimeout>;

  protected readonly filtrados = computed(() => {
    const f = this.filtros();
    const texto = normalizar(this.busqueda());

    const lista = PRODUCTOS.filter(
      (p) =>
        (f.marcas.length === 0 || f.marcas.includes(p.marca)) &&
        (f.almacenamientos.length === 0 || f.almacenamientos.includes(p.almacenamiento)) &&
        (f.condiciones.length === 0 || f.condiciones.includes(p.condicion)) &&
        p.precio >= f.precioMin &&
        p.precio <= f.precioMax &&
        (texto === '' || normalizar(`${p.nombre} ${p.marca}`).includes(texto)),
    );

    switch (this.orden()) {
      case 'precio-asc':
        return [...lista].sort((a, b) => a.precio - b.precio);
      case 'precio-desc':
        return [...lista].sort((a, b) => b.precio - a.precio);
      default:
        return lista;
    }
  });

  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.porPagina)),
  );

  protected readonly visibles = computed(() => {
    const actual = Math.min(this.pagina(), this.totalPaginas());
    const inicio = (actual - 1) * this.porPagina;
    return this.filtrados().slice(inicio, inicio + this.porPagina);
  });

  protected alBuscar(texto: string): void {
    this.busqueda.set(texto);
    this.pagina.set(1);
  }

  protected alFiltrar(filtros: FiltrosActivos): void {
    this.filtros.set(filtros);
    this.pagina.set(1);
  }

  protected alOrdenar(orden: Orden): void {
    this.orden.set(orden);
    this.pagina.set(1);
  }

  protected alAgregar(producto: Producto): void {
    this.mostrarAviso(`${producto.nombre} se añadió al carrito`);
  }

  protected alComprar(producto: Producto): void {
    this.mostrarAviso(`Compra de ${producto.nombre} iniciada`);
  }

  private mostrarAviso(texto: string): void {
    this.aviso.set(texto);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.aviso.set(null), 2200);
  }
}
