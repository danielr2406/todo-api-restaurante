import { ObjectId } from "mongodb";

export interface Cliente {

    _id?: ObjectId;

    nombre: string;

    correo: string;

    telefono: string;

    direccion: string;

    activo: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export interface ClienteDTO {

    nombre?: string;

    correo?: string;

    telefono?: string;

    direccion?: string;

    activo?: boolean;

}