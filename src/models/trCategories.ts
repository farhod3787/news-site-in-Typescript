import { Schema, model } from "mongoose";

const trCategorySchema = new Schema({
    source_id: {
        type: String
    },
    lang_id: {type: String},
    source_name: {type: String}
});

export const Translate = model('translate', trCategorySchema);