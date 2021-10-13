import { Schema, model } from "mongoose";

const contentSchema = new Schema({
    content_id: {
        type: String,
        reqiured: true,
        unique: true
    },
    title: {type: String},
    data: {type: String}, // data
    view: {type: Number},
    photo: {type: String},
    text: {type: String},
    lang_id: {type: String}
});

export const Contents = model('contents', contentSchema);