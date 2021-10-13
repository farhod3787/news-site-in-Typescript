import {Schema, model, Document, Model} from "mongoose";

export interface IAdmin extends Document{
    login: string,
    password: string
}

const adminSchema = new Schema({
    login: { type: String },
    password: { type: String }
});

export const Admin: Model<IAdmin> = model<IAdmin>('admin', adminSchema);