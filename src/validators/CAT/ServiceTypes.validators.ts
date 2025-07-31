import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateServiceType = [
  check("name").isString().isLength({ min: 1, max: 250 }),
  check("description").isString().isLength({ min: 1, max: 250 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateServiceType = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),
  check("name").isString().isLength({ min: 1, max: 250 }),
  check("description").isString().isLength({ min: 1, max: 250 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableServiceType = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableServiceType = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteServiceType = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadServiceType = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateServiceType, validatorUpdateServiceType, validatorDisableServiceType, validatorEnableServiceType, validatorDeleteServiceType, validatorReadServiceType }