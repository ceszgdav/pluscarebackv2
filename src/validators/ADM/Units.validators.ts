import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateUnit = [
  check("type").exists().isString().isLength({ min: 1, max: 25 }),
  check("model").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("plate").exists().isString().isLength({ min: 1, max: 100 }),
  check("kilometer").exists().isString().isLength({ min: 1, max: 100 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateUnit = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),
  check("type").exists().isString().isLength({ min: 1, max: 25 }),
  check("model").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("plate").exists().isString().isLength({ min: 1, max: 100 }),
  check("kilometer").exists().isString().isLength({ min: 1, max: 100 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),


  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableUnit = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableUnit = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteUnit = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadUnit = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateUnit, validatorUpdateUnit, validatorDisableUnit, validatorEnableUnit, validatorDeleteUnit, validatorReadUnit }