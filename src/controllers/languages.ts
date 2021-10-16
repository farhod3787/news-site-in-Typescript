import { BaseController, ICustomResponse } from "./baseControllers";
import { NextFunction, Router } from "express";
import { Language } from "../models/languages";
import * as Joi from 'Joi';
import { BadRequest } from "../http-status";
import { LangRequest } from "../interfaces";

const ValidateLanguage = Joi.object({
  name: Joi.string().min(3).required(),
  short_name: Joi.string().min(2).required()
})

export class LangController extends BaseController {
  async create(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const { error, value } = ValidateLanguage.validate(req.body);

    if (!error) {
      const lang = new Language({
        name: value.name,
        short_name: value.short_name
      })
      await lang.save();

      res.status(200).send({
        message: "Successfully requested",
        status: 200
      })
    } else {
      next(new BadRequest(error));
    }
  }

  async getList(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const langs = await Language.find();
    if(langs.length) {
      res.status(200).send(langs);
    } else {
      res.status(200).send({
        message: 'Languages not found',
        status: 200
      })
    }
  }

  async getLang(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const lang = await Language.findById(req.params.id);
      res.status(200).send(lang);
      // error xolatini tekshirish kerak 
  }

  async update(req: LangRequest, res:ICustomResponse, next: NextFunction) {
    const { error, value } = ValidateLanguage.validate(req.body);
    
    if(!error) {
      await Language.findByIdAndUpdate(req.params.id, {$set: value});

      res.status(200).send({
        message: 'Successfully updated',
        status: 200
      })
    } else {
      next(new BadRequest(error));
    }
  }

  async delete(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    Language.findByIdAndDelete(req.params.id)
      .then( () => {
        res.status(200).send({
          message: 'Data is successfully deleted',
          status: 200
        })
      })
      .catch( error => {
      next(new BadRequest(error));
    });
  }

  get routes(): Router {
    this.router.post('/', this.create);
    this.router.get('/', this.getList);
    this.router.get('/:id', this.getLang);
    this.router.delete('/:id', this.delete);
    this.router.patch('/:id', this.update)
    
    return this.router;
  }
}