import { BaseController } from "./baseControllers";
import { NextFunction, Router, Response } from "express";
import { BadRequest, NotFound } from "../http-status";
import * as Joi from "Joi";
import { message } from "../messages";
import { trCatRequest } from "../interfaces"

export class trCatController extends BaseController {


  get routes() : Router {


    return this.router;
  }
}