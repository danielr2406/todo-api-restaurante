import { ObjectId } from "mongodb";
import { Plato, PlatoDTO } from "./plato.model";
import { PlatoRepository } from "./plato.repository";
import {
    BadRequestError,
    NotFoundError
} from "../../shared/errors/AppError";

export class PlatoService {

    private readonly platoRepository = new PlatoRepository();

    async create(data: PlatoDTO): Promise<Plato> {

        const nombre = this.requireString(data?.nombre, "nombre");

        const descripcion = this.requireString(
            data?.descripcion,
            "descripcion"
        );

        const precio = this.requireNumber(
            data?.precio,
            "precio"
        );

        const categoria = this.requireString(
            data?.categoria,
            "categoria"
        );

        const now = new Date();

        return this.platoRepository.create({
            nombre,
            descripcion,
            precio,
            categoria,
            activo:
                typeof data.activo === "boolean"
                    ? data.activo
                    : true,
            createdAt: now,
            updatedAt: now,
        });
    }

    async findAll(): Promise<Plato[]> {
        return this.platoRepository.findAll();
    }

    async findById(id: string): Promise<Plato> {

        const plato = await this.platoRepository.findById(
            this.toObjectId(id)
        );

        if (!plato) {
            throw new NotFoundError("Plato no encontrado");
        }

        return plato;
    }

    async update(
        id: string,
        data: PlatoDTO
    ): Promise<Plato> {

        const objectId = this.toObjectId(id);

        const changes: Partial<Plato> = {};

        if (data.nombre !== undefined) {
            changes.nombre = this.requireString(
                data.nombre,
                "nombre"
            );
        }

        if (data.descripcion !== undefined) {
            changes.descripcion = this.requireString(
                data.descripcion,
                "descripcion"
            );
        }

        if (data.precio !== undefined) {
            changes.precio = this.requireNumber(
                data.precio,
                "precio"
            );
        }

        if (data.categoria !== undefined) {
            changes.categoria = this.requireString(
                data.categoria,
                "categoria"
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
            await this.platoRepository.update(
                objectId,
                changes
            );

        if (!updated) {
            throw new NotFoundError("Plato no encontrado");
        }

        return updated;
    }

    async delete(id: string): Promise<void> {

        const deleted =
            await this.platoRepository.delete(
                this.toObjectId(id)
            );

        if (!deleted) {
            throw new NotFoundError("Plato no encontrado");
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

    private toObjectId(id: string): ObjectId {

        if (!ObjectId.isValid(id)) {
            throw new BadRequestError(
                `Identificador inválido: ${id}`
            );
        }

        return new ObjectId(id);
    }
}