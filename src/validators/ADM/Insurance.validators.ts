import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateInsurance = [
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateInsurance = [
  check("uuid").isString().isLength({ min: 1, max: 250 }),
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableInsurance = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableInsurance = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteInsurance = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadInsurance = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateInsurance, validatorUpdateInsurance, validatorDisableInsurance, validatorEnableInsurance, validatorDeleteInsurance, validatorReadInsurance }