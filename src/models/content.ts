import { Schema, model, Document, Model } from "mongoose";

export interface IContent extends Document{
    title: string,
    data: string,
    view: number,
    photo: string,
    text: string,
    lang_id: string
}

const contentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }, // data
    view: {type: Number},
    photo: {type: String},
    text: {
        type: String,
        required: true
    },
    lang_id: {
        type: String,
        required: true
    }
});

export const Contents: Model<IContent> = model<IContent>('contents', contentSchema);