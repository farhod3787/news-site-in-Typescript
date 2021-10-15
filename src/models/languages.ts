import { Schema, model, Document, Model } from "mongoose";

export interface ILang extends Document{
    name: string,
    short_name: string
}

const langSchema = new Schema({
    name: {
        type: String,
        reqired: true,
        unique: true
    },
    short_name: {
        type: String,
        reqired: true,
        unique: true
    }
});

export const Languages: Model<ILang> = model<ILang>('languages', langSchema);