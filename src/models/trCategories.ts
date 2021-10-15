import { Schema, model, Document, Model } from "mongoose";

export interface ITrCat extends Document{
    source_id: string,
    lang_id: string,
    source_name: string
}

const trCategorySchema = new Schema({
    source_id: {
        type: String
    },
    lang_id: {type: String},
    source_name: {type: String}
});

export const Translate: Model<ITrCat> = model<ITrCat>('translate', trCategorySchema);