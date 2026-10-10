export type Condicion = 'Nuevo' | 'Reacondicionado';
export type Orden = 'recomendados' | 'precio-asc' | 'precio-desc';

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  almacenamiento: number; // en GB
  color: string;
  precio: number;
  condicion: Condicion;
  etiqueta?: string;
  enStock: boolean;
  tono: string; // color del teléfono dibujado en la tarjeta
}

export interface FiltrosActivos {
  marcas: string[];
  almacenamientos: number[];
  condiciones: Condicion[];
  precioMin: number;
  precioMax: number;
}

export const PRECIO_MAX = 12000;

export const FILTROS_INICIALES: FiltrosActivos = {
  marcas: [],
  almacenamientos: [],
  condiciones: [],
  precioMin: 0,
  precioMax: PRECIO_MAX,
};
