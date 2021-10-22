import { BaseController, ICustomResponse } from "./baseControllers";
import { NextFunction, Router } from "express";
import { Language } from "../models/languages";
import * as Joi from 'Joi';
import { BadRequest, DuplicateError, NotFound } from "../http-status";
import { LangRequest } from "../interfaces";
import { message } from "../messages";

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
      try {
        await lang.save();
        res.status(200).send(message.created);
      } catch(err) {
        if (err.code = 11000) next(new DuplicateError("Duplicate error"));
        next(new BadRequest('Error in save new data'));
      }
    } else {
      next(new BadRequest(error.details[0].message));
    }
  }

  async getList(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const langs = await Language.find();
    if(langs.length) {
      res.status(200).send(langs);
    } else {
      next(new NotFound('Not found'));
    }
  }

  async getLang(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const lang = await Language.findById(req.params.id);
    if (!lang) next(new BadRequest('Language not found'))
      
    res.status(200).send(lang);
  }

  async update(req: LangRequest, res:ICustomResponse, next: NextFunction) {
    const { error, value } = ValidateLanguage.validate(req.body);
    
    if(!error) {
      const lang = await Language.findByIdAndUpdate(req.params.id, {$set: value});
      if(!lang) next(new BadRequest('Language not found'))

      res.status(200).send(message.updated)
    } else {
      next(new BadRequest(error));
    }
  }

  async delete(req: LangRequest, res: ICustomResponse, next: NextFunction) {
    const lang = await Language.findByIdAndDelete(req.params.id)
      if(!lang) next(new NotFound('Data not found'));

      res.status(200).send(message.deleted);
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