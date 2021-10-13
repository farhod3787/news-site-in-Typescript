import { Schema, model } from "mongoose";

const catSchema = new Schema({
    category_id: {
        type: String,
        reqired: true,
        unique: true
    },
    name: {
        type: String
    }
});

export const Categories = model('categories', catSchema);