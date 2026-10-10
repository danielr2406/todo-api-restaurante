
import { ObjectId } from "mongodb";
import { CategoriaRepository } from "./categoria.repository";
import { Categories } from "./categoria.model";

export class CategoriaService {

    private repository = new CategoriaRepository();

    async create(data: Omit<Categories, "_id">): Promise<Categories> {
        const now = new Date();

        const categoria: Omit<Categories, "_id"> = {
            ...data,
            activo: true,
            createdAt: now,
            updatedAt: now
        };

        return this.repository.create(categoria);
    }

    async findAll(): Promise<Categories[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<Categories | null> {
        if (!ObjectId.isValid(id)) {
            throw new Error("El ID de la categoría no es válido");
        }

        return this.repository.findById(new ObjectId(id));
    }

    async update(
        id: string,
        changes: Partial<Categories>
    ): Promise<Categories | null> {

        if (!ObjectId.isValid(id)) {
            throw new Error("El ID de la categoría no es válido");
        }

        const categoria = {
            ...changes,
            updatedAt: new Date()
        };

        return this.repository.update(
            new ObjectId(id),
            categoria
        );
    }

    async delete(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new Error("El ID de la categoría no es válido");
        }

        return this.repository.delete(new ObjectId(id));
    }
}
