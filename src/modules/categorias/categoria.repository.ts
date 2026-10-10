
import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Categories } from "./categoria.model";

export class CategoriaRepository {

    private collection(): Collection<Categories> {
        return getDb().collection<Categories>("categorias");
    }

    async create(data: Omit<Categories, "_id">): Promise<Categories> {
        const result = await this.collection().insertOne(data as Categories);

        return {
            _id: result.insertedId,
            ...data
        };
    }

    async findAll(): Promise<Categories[]> {
        return this.collection()
            .find()
            .sort({ createdAt: -1 })
            .toArray();
    }

    async findById(id: ObjectId): Promise<Categories | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(
        id: ObjectId,
        changes: Partial<Categories>
    ): Promise<Categories | null> {

        const result = await this.collection().findOneAndUpdate(
            { _id: id },
            { $set: changes },
            { returnDocument: "after" }
        );

        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {

        const result = await this.collection().updateOne(
            { _id: id },
            {
                $set: {
                    activo: false,
                    updatedAt: new Date()
                }
            }
        );

        return result.matchedCount === 1;
    }
}
