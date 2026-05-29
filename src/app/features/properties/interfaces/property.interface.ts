export interface PropertiesResponse {
  current_page: number;
  data: Property[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Property {
  id: string;
  imagenes: PropertyImage[];
  Metadescription: string;
  Precio: string;
  PrecioAnterior?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PropertyImage {
  PkImagen: number;
  FkPropiedad: string;
  Orden: string;
  Uri: string;
}

export interface PropertyDetail {
  id: string;
  imagenes: PropertyImage[];
}
