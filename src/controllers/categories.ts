import { BaseController } from "./baseControllers";
import { NextFunction, Router, Response } from "express";
import { Categories } from "../models/categories";
import * as Joi from "joi";
import { CategoryRequest } from "../interfaces";
import { BadRequest, DuplicateError, NotFound } from "../http-status";
import { message } from "../messages";

const ValidateCategory = Joi.object({
  name: Joi.string().min(3).required()
})

export class CategoryController extends BaseController {
  async create(req: CategoryRequest, res: Response, next: NextFunction) {
    const { error, value } = ValidateCategory.validate(req.body);

    if(!error) {
      const category = new Categories({
        name: value.name 
      });

      category.save()
      .then( () => {
        res.status(200).send(message.created);
      })
      .catch(error => {
        if(error.code =  11000) next(new DuplicateError('Duplicate error'));
        
        next(new BadRequest(error));
      })
    } else {
      next(new BadRequest(error));
    }
  }

  async getList(req: CategoryRequest, res: Response, next: NextFunction) {
    const categories = await Categories.find();

    if(categories.length) { res.status(200).send(categories) }
    else { next(new NotFound('Not found')) }
  }

  async get(req: CategoryRequest, res: Response, next: NextFunction) {
    const category = await Categories.findById(req.params.id);
    if(!category) next(new NotFound('Not found'));

    res.status(200).send(category);
  }

  async update(req: CategoryRequest, res: Response, next: NextFunction) {
    const { error, value } = ValidateCategory.validate(req.body);

    if(!error) {
      const category = await Categories.findByIdAndUpdate(req.params.id, {$set: value});
      if(!category) next(new BadRequest('Error in update'));

      res.status(200).send(message.updated)
    } else {
      next(new BadRequest(error));  
    }
  }

  async delete(req: CategoryRequest, res: Response, next: NextFunction) {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if(!category) next(new BadRequest('Error in delete'));

    res.status(200).send(message.deleted)
  }

  get routes() : Router {
    this.router.post('/', this.create);
    this.router.get('/', this.getList);
    this.router.get('/:id', this.get);
    this.router.patch('/:id', this.update);
    this.router.delete('/:id', this.delete);

    return this.router
  }
}