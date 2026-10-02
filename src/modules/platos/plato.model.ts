import { ObjectId } from "mongodb";

export interface Plato {

    _id?: ObjectId;

    nombre: string;

    descripcion: string;

    precio: number;

    categoria: string;

    activo: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export interface PlatoDTO {

    nombre?: string;

    descripcion?: string;

    precio?: number;

    categoria?: string;

    activo?: boolean;

}