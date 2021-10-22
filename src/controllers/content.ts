import { BaseController } from "./baseControllers";
import { NextFunction, Router, Response } from "express";
import * as Joi from "joi";
import { Contents } from "../models/content";
import { ContentRequest } from "../interfaces";
import { BadRequest, NotFound } from "../http-status";
import { message } from "../messages";

const validateContent = Joi.object({
  title: Joi.string().min(3).required(),
  data: Joi.string().min(8).required(),
  text: Joi.string().min(10).required(),
  lang_id: Joi.string().min(3).required()
})

export class ContentController extends BaseController {
  async create(req: ContentRequest, res: Response, next: NextFunction) {
    const { error, value } = validateContent.validate(req.body);
    if(!error) {
      const content = new Contents({
        title: value.title,
        data: value.data,
        text: value.text,
        lang_id: value.lang_id 
      });
      try {
        await content.save();

        res.status(200).send(message.created);
      } catch(err) {
        next(new BadRequest(err))
      }
    } else {
      next(new BadRequest(error))
    }
  }

  async get(req: ContentRequest, res: Response, next: NextFunction) {
    try {
      const content  = await Contents.findById(req.params.id);

      res.status(200).send(content);
    } catch(err) {
      next(new BadRequest(err));
    }
  }

  async delete(req: ContentRequest, res: Response, next: NextFunction) {
    try {
      await Contents.findByIdAndDelete(req.params.id);

      res.status(200).send(message.deleted);
    } catch (err) {
      next(new BadRequest(err))
    }
  }

  get routes(): Router {  
    this.router.post('/', this.create);
    this.router.get('/:id', this.get);
    this.router.delete('/:id', this.delete);

    return this.router;
  }
}