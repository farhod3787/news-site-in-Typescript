import { Schema, model } from "mongoose";

const langSchema = new Schema({
    lang_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        reqired: true
    }
});

export const Languages = model('languages', langSchema);