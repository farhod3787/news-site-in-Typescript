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
    title: {type: String},
    data: {type: String}, // data
    view: {type: Number},
    photo: {type: String},
    text: {type: String},
    lang_id: {type: String}
});

export const Contents: Model<IContent> = model<IContent>('contents', contentSchema);