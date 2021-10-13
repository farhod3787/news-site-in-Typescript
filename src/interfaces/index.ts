import { Request } from 'express';
import { IAdmin } from "../models/admin";

export interface AdminRequest extends Request {
  admin: IAdmin
}