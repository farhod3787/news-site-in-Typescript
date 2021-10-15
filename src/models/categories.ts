import { Schema, model, Document, Model } from "mongoose";

export interface ICategories extends Document{
    name: string
}

const catSchema = new Schema({
    name: {
        type: String
    }
});

export const Categories: Model<ICategories> = model<ICategories>('categories', catSchema);