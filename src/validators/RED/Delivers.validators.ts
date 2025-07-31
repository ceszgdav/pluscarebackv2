import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateDeliver = [
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-))]+$/.test(value)) {
        throw new Error('El formato del número de teléfono es incorrecto.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("state").exists().isString().isLength({ min: 1 }),
  check("coverage").exists().isArray().isLength({ min: 1 }),
  check("ineBack").exists().isString().isLength({ min: 1 }),
  check("ineFront").exists().isString().isLength({ min: 1 }),
  check("bank_account").exists().isArray().isLength({ min: 1 }),
  check("price").exists().isNumeric().isLength({ min: 1 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateDeliver = [
  check("uuid").exists().isString().isLength({ min: 1, max: 255 }),
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-))]+$/.test(value)) {
        throw new Error('El formato del número de teléfono es incorrecto.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("state").exists().isString().isLength({ min: 1 }),
  check("coverage").exists().isArray().isLength({ min: 1 }),
  check("bank_account").exists().isArray().isLength({ min: 1 }),
  check("price").exists().isNumeric().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableDeliver = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableDeliver = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteDeliver = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadDeliver = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorFilterDeliver = [
  check("state").exists().isString().isLength({ min: 1 }),
  check("municipality").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateDeliver, validatorUpdateDeliver, validatorDisableDeliver, validatorEnableDeliver, validatorDeleteDeliver, validatorReadDeliver, validatorFilterDeliver }