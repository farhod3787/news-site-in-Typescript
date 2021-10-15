import { Schema, model, Document, Model } from "mongoose";

export interface ITrCon extends Document{
    content_id: string,
    lang_id: string,
    title: string,
    text: string
}

const trContentSchema = new Schema({
    content_id: {type: String},
    lang_id: {type: String},
    title: {type: String},
    text: {type: String}
});

export const trContent: Model<ITrCon> = model<ITrCon>('trContent', trContentSchema);