import { Schema, model } from "mongoose";

const trContentSchema = new Schema({
    content_id: {type: String},
    lang_id: {type: String},
    title: {type: String},
    text: {type: String}
});

export const trContent = model('trContent', trContentSchema);