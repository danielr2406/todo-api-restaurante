import { ObjectId } from "mongodb";

import {
    Ingrediente,
    IngredienteDTO
} from "./ingrediente.model";

import { IngredienteRepository } from "./ingrediente.repository";

import {
    BadRequestError,
    NotFoundError
} from "../../shared/errors/AppError";

export class IngredienteService {

    private readonly ingredienteRepository =
        new IngredienteRepository();

    async create(
        data: IngredienteDTO
    ): Promise<Ingrediente> {

        const nombre =
            this.requireString(
                data?.nombre,
                "nombre"
            );

        const descripcion =
            this.requireString(
                data?.descripcion,
                "descripcion"
            );

        const precio =
            this.requireNumber(
                data?.precio,
                "precio"
            );

        const unidad =
            this.requireString(
                data?.unidad,
                "unidad"
            );

        const now = new Date();

        return this.ingredienteRepository.create({

            nombre,

            descripcion,

            precio,

            unidad,

            activo:
                typeof data.activo === "boolean"
                    ? data.activo
                    : true,

            createdAt: now,

            updatedAt: now,

        });
    }

    async findAll(): Promise<Ingrediente[]> {

        return this.ingredienteRepository.findAll();
    }

    async findById(
        id: string
    ): Promise<Ingrediente> {

        const ingrediente =
            await this.ingredienteRepository.findById(
                this.toObjectId(id)
            );

        if (!ingrediente) {
            throw new NotFoundError(
                "Ingrediente no encontrado"
            );
        }

        return ingrediente;
    }

    async update(
        id: string,
        data: IngredienteDTO
    ): Promise<Ingrediente> {

        const objectId =
            this.toObjectId(id);

        const changes: Partial<Ingrediente> = {};

        if (data.nombre !== undefined) {

            changes.nombre =
                this.requireString(
                    data.nombre,
                    "nombre"
                );
        }

        if (data.descripcion !== undefined) {

            changes.descripcion =
                this.requireString(
                    data.descripcion,
                    "descripcion"
                );
        }

        if (data.precio !== undefined) {

            changes.precio =
                this.requireNumber(
                    data.precio,
                    "precio"
                );
        }

        if (data.unidad !== undefined) {

            changes.unidad =
                this.requireString(
                    data.unidad,
                    "unidad"
                );
        }

        if (data.activo !== undefined) {

            if (
                typeof data.activo !== "boolean"
            ) {
                throw new BadRequestError(
                    "El campo 'activo' debe ser booleano"
                );
            }

            changes.activo =
                data.activo;
        }

        if (
            Object.keys(changes).length === 0
        ) {
            throw new BadRequestError(
                "No se enviaron campos para actualizar"
            );
        }

        changes.updatedAt =
            new Date();

        const updated =
            await this.ingredienteRepository.update(
                objectId,
                changes
            );

        if (!updated) {

            throw new NotFoundError(
                "Ingrediente no encontrado"
            );
        }

        return updated;
    }

    async delete(
        id: string
    ): Promise<void> {

        const deleted =
            await this.ingredienteRepository.delete(
                this.toObjectId(id)
            );

        if (!deleted) {

            throw new NotFoundError(
                "Ingrediente no encontrado"
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

    private requireNumber(
        value: unknown,
        field: string
    ): number {

        if (
            typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < 0
        ) {

            throw new BadRequestError(
                `El campo '${field}' debe ser un número válido mayor o igual a 0`
            );
        }

        return value;
    }

    private toObjectId(
        id: string
    ): ObjectId {

        if (!ObjectId.isValid(id)) {

            throw new BadRequestError(
                `Identificador inválido: ${id}`
            );
        }

        return new ObjectId(id);
    }
}