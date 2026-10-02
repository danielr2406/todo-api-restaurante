import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Plato } from "./plato.model";

export class PlatoRepository {

    private collection(): Collection<Plato> {
        return getDb().collection<Plato>("platos");
    }

    async create(data: Omit<Plato, "_id">): Promise<Plato> {
        const result = await this.collection().insertOne(data as Plato);

        return {
            _id: result.insertedId,
            ...data
        };
    }

    async findAll(): Promise<Plato[]> {
        return this.collection()
            .find()
            .sort({ createdAt: -1 })
            .toArray();
    }

    async findById(id: ObjectId): Promise<Plato | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(
        id: ObjectId,
        changes: Partial<Plato>
    ): Promise<Plato | null> {

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