export interface ProductoBusquedaModel {
    id: number;
    codigo: string;
    nombre: string;
    precio: number;
    max_base: number;
    min_base: number;
    
    max_adicion: number;
    min_adicion: number;
    
    min_cilindrico: number;
    max_cilindrico: number;

    min_esferico: number;
    max_esferico: number;

    iva: number;
}