import { ObjectId } from "mongodb";

export interface Ingrediente {

    _id?: ObjectId;

    nombre: string;

    descripcion: string;

    precio: number;

    unidad: string;

    activo: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export interface IngredienteDTO {

    nombre?: string;

    descripcion?: string;

    precio?: number;

    unidad?: string;

    activo?: boolean;

}