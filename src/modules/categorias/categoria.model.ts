
import { ObjectId } from "mongodb";

export interface Categories {
    _id?: ObjectId;
    name: string;
    description?: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
}
