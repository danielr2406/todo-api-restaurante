import { Collection, ObjectId } from "mongodb";
import { getDb } from "../../config/database";
import { Cliente } from "./cliente.model";

export class ClienteRepository {

    private collection(): Collection<Cliente> {
        return getDb().collection<Cliente>("clientes");
    }

    async create(data: Omit<Cliente, "_id">): Promise<Cliente> {

        const result =
            await this.collection().insertOne(data as Cliente);

        return {
            _id: result.insertedId,
            ...data
        };
    }

    async findAll(): Promise<Cliente[]> {

        return this.collection()
            .find()
            .sort({ createdAt: -1 })
            .toArray();
    }

    async findById(id: ObjectId): Promise<Cliente | null> {

        return this.collection()
            .findOne({ _id: id });
    }

    async update(
        id: ObjectId,
        changes: Partial<Cliente>
    ): Promise<Cliente | null> {

        const result =
            await this.collection().findOneAndUpdate(
                { _id: id },
                { $set: changes },
                { returnDocument: "after" }
            );

        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {

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