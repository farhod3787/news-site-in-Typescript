import { Request } from 'express';
import { IAdmin } from "../models/admin";
import { ILang } from "../models/languages";
import { ICategories } from "../models/categories";
import { IContent } from '../models/content';

export interface AdminRequest extends Request {
  admin: IAdmin
}

export interface LangRequest extends Request {
  lang: ILang
}

export interface CategoryRequest extends Request {
  category: ICategories 
}

export interface ContentRequest extends Request {
  content: IContent
}