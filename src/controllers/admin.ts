import { BaseController, ICustomResponse } from "./baseControllers";
import { NextFunction, Router } from 'express';
import { Admin } from '../models/admin';
import { AdminRequest } from '../interfaces';
import * as Joi from 'joi';
import { BadRequest } from "../http-status";
import { message } from "../messages";

const ValidateAdmin = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(3).required() 
})

export class AdminController extends BaseController {
  async createAdmin(req: AdminRequest, res: ICustomResponse, next: NextFunction) {
    const { error, value } = ValidateAdmin.validate(req.body);

    if(!error) {
      const admin = new Admin({
        login: value.login,
        password: value.password
      })
      try {
        await admin.save();
        res.status(200).send(message.created);
      }
      catch (err) {
        next(new BadRequest(err));
      }
    } else {
      next(new BadRequest(error));
    }
  }

  async deleteAdmin(req: AdminRequest, res: ICustomResponse, next: NextFunction) {    
    try{
      await Admin.findByIdAndDelete(req.params.id);
      res.status(200).send(message.deleted);
    } catch(err) {
      next(new BadRequest(err))
    }
  }

  async updateAdmin(req: AdminRequest, res: ICustomResponse, next: NextFunction) {
    const { error, value } = ValidateAdmin.validate(req.body);

    if(!error) {
      const admin = new Admin({
        _id: value._id,
        login: value. login,
        password: value.password
      });
      try {
        await Admin.findByIdAndUpdate(admin._id, {$set: admin});
        res.status(200).send(message.updated);
      } catch (err) { 
        next(new BadRequest(err));
      }
    } else {  
      next(new BadRequest(error));
    }
  }

  async getAdmins(req: AdminRequest, res: ICustomResponse, next: NextFunction ) {
    const admins = await Admin.find();
    res.status(200).send({
      message: 'Successfull request',
      status: 200,
      admins
    });
  }

  get routes(): Router{
    this.router.get('/', this.getAdmins);
    this.router.post('/', this.createAdmin);
    this.router.patch('/:id', this.updateAdmin);
    this.router.delete('/:id', this.deleteAdmin);
    
    return this.router;
  }
}