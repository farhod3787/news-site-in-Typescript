import { BaseController } from "./baseControllers";
import { NextFunction, Router, Response } from "express";
import { BadRequest, NotFound } from "../http-status";
import * as Joi from "Joi";
import { message } from "../messages";
import { trCatRequest } from "../interfaces"
import { Translate } from "../models/trCategory";

const validateObject = Joi.object({
  source_id: Joi.string().min(3),
  lang_id: Joi.string().min(3),
  source_name: Joi.string().min(1)
})

export class trCatController extends BaseController {
  async create(req: trCatRequest, res: Response, next: NextFunction) {
    const { error, value } = validateObject.validate(req.body);

    if(!error) {
      const trCat = new Translate({
        source_id: value.source_id,
        lang_id: value.lang_id,
        source_name: value.source_name
      })
      try {
        await trCat.save();

        res.status(200).send(message.created);
      } catch (error) {
        next(new BadRequest('Error in save new data'))
      }
    } else {
      res.status(400).send(error.details[0].message);
    }
  }


  get routes() : Router {


    return this.router;
  }
}