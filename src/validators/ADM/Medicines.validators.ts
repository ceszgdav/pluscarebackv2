import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateMedicine = [
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("description").exists().isString().isLength({ min: 1, max: 13 }),
  check("quantity").exists().isNumeric().isLength({ min: 1 }),
  check("id_medicines_category").exists().isNumeric().isLength({ min: 1, max: 4 }),
  check("id_measurement_unit").exists().isNumeric().isLength({ min: 1, max: 4 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateMedicine = [
  check("uuid").isString().isLength({ min: 1, max: 250 }),
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("description").exists().isString().isLength({ min: 1, max: 13 }),
  check("quantity").exists().isNumeric().isLength({ min: 1 }),
  check("id_medicines_category").exists().isNumeric().isLength({ min: 1, max: 4 }),
  check("id_measurement_unit").exists().isNumeric().isLength({ min: 1, max: 4 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableMedicine = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableMedicine = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteMedicine = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadMedicine = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateMedicine, validatorUpdateMedicine, validatorDisableMedicine, validatorEnableMedicine, validatorDeleteMedicine, validatorReadMedicine }