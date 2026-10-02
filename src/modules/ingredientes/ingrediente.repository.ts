import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Ingrediente } from "./ingrediente.model";

export class IngredienteRepository {

    private collection(): Collection<Ingrediente> {
        return getDb().collection<Ingrediente>("ingredientes");
    }

    async create(
        data: Omit<Ingrediente, "_id">
    ): Promise<Ingrediente> {

        const result =
            await this.collection().insertOne(
                data as Ingrediente
            );

        return {
            _id: result.insertedId,
            ...data
        };
    }

    async findAll(): Promise<Ingrediente[]> {

        return this.collection()
            .find()
            .sort({ createdAt: -1 })
            .toArray();
    }

    async findById(
        id: ObjectId
    ): Promise<Ingrediente | null> {

        return this.collection().findOne({
            _id: id
        });
    }

    async update(
        id: ObjectId,
        changes: Partial<Ingrediente>
    ): Promise<Ingrediente | null> {

        const result =
            await this.collection().findOneAndUpdate(
                { _id: id },
                { $set: changes },
                { returnDocument: "after" }
            );

        return result ?? null;
    }

    async delete(
        id: ObjectId
    ): Promise<boolean> {

        const result =
            await this.collection().updateOne(
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