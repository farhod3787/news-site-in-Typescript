import { Request } from 'express';
import { IAdmin } from "../models/admin";
import { ILang } from "../models/languages";

export interface AdminRequest extends Request {
  admin: IAdmin
}

export interface LangRequest extends Request {
  lang: ILang
}