import { ObjectId } from "mongodb";

import { Cliente, ClienteDTO } from "./cliente.model";
import { ClienteRepository } from "./cliente.repository";

import {
    BadRequestError,
    NotFoundError
} from "../../shared/errors/AppError";

export class ClienteService {

    private readonly clienteRepository =
        new ClienteRepository();

    async create(data: ClienteDTO): Promise<Cliente> {

        const nombre =
            this.requireString(data?.nombre, "nombre");

        const correo =
            this.requireString(data?.correo, "correo");

        const telefono =
            this.requireString(data?.telefono, "telefono");

        const direccion =
            this.requireString(data?.direccion, "direccion");

        const now = new Date();

        return this.clienteRepository.create({

            nombre,

            correo,

            telefono,

            direccion,

            activo:
                typeof data.activo === "boolean"
                    ? data.activo
                    : true,

            createdAt: now,

            updatedAt: now,

        });
    }

    async findAll(): Promise<Cliente[]> {

        return this.clienteRepository.findAll();
    }

    async findById(id: string): Promise<Cliente> {

        const cliente =
            await this.clienteRepository.findById(
                this.toObjectId(id)
            );

        if (!cliente) {
            throw new NotFoundError(
                "Cliente no encontrado"
            );
        }

        return cliente;
    }

    async update(
        id: string,
        data: ClienteDTO
    ): Promise<Cliente> {

        const objectId =
            this.toObjectId(id);

        const changes: Partial<Cliente> = {};

        if (data.nombre !== undefined) {

            changes.nombre =
                this.requireString(
                    data.nombre,
                    "nombre"
                );
        }

        if (data.correo !== undefined) {

            changes.correo =
                this.requireString(
                    data.correo,
                    "correo"
                );
        }

        if (data.telefono !== undefined) {

            changes.telefono =
                this.requireString(
                    data.telefono,
                    "telefono"
                );
        }

        if (data.direccion !== undefined) {

            changes.direccion =
                this.requireString(
                    data.direccion,
                    "direccion"
                );
        }

        if (data.activo !== undefined) {

            if (typeof data.activo !== "boolean") {

                throw new BadRequestError(
                    "El campo 'activo' debe ser booleano"
                );
            }

            changes.activo = data.activo;
        }

        if (Object.keys(changes).length === 0) {

            throw new BadRequestError(
                "No se enviaron campos para actualizar"
            );
        }

        changes.updatedAt = new Date();

        const updated =
            await this.clienteRepository.update(
                objectId,
                changes
            );

        if (!updated) {

            throw new NotFoundError(
                "Cliente no encontrado"
            );
        }

        return updated;
    }

    async delete(id: string): Promise<void> {

        const deleted =
            await this.clienteRepository.delete(
                this.toObjectId(id)
            );

        if (!deleted) {

            throw new NotFoundError(
                "Cliente no encontrado"
            );
        }
    }

    private requireString(
        value: unknown,
        field: string
    ): string {

        if (
            typeof value !== "string" ||
            value.trim() === ""
        ) {

            throw new BadRequestError(
                `El campo '${field}' es obligatorio y debe ser un texto no vacío`
            );
        }

        return value.trim();
    }

    private toObjectId(id: string): ObjectId {

        if (!ObjectId.isValid(id)) {

            throw new BadRequestError(
                `Identificador inválido: ${id}`
            );
        }

        return new ObjectId(id);
    }
}