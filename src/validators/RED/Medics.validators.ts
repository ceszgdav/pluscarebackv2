import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateMedic = [
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
  check("professional_id").exists().isString().isLength({ min: 1 }),
  check("price").exists().isNumeric().isLength({ min: 1 }),
  check("bank_account_number").exists().isString().isLength({ min: 1 }),
  check("card_number").exists().isString().isLength({ min: 1 }),
  check("entity_bank").exists().isString().isLength({ min: 1 }),
  check("available_schedule").exists().isString().isLength({ min: 1 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateMedic = [
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
  check("professional_id").exists().isString().isLength({ min: 1 }),
  check("price").exists().isNumeric().isLength({ min: 1 }),
  check("bank_account_number").exists().isString().isLength({ min: 1 }),
  check("card_number").exists().isString().isLength({ min: 1 }),
  check("entity_bank").exists().isString().isLength({ min: 1 }),
  check("available_schedule").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableMedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableMedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteMedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadMedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorFilterMedic = [
  check("state").exists().isString().isLength({ min: 1 }),
  check("municipality").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateMedic, validatorUpdateMedic, validatorDisableMedic, validatorEnableMedic, validatorDeleteMedic, validatorReadMedic, validatorFilterMedic }