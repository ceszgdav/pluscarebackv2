import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSatisfactionLetter = [
  check("id_incident").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("patient_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("date").exists().isString(),
  check("origin").exists().isString(),
  check("destiny").exists().isString().isLength({ min: 1, max: 100 }),
  check("name").exists().isString().isLength({ min: 1, max: 100 }),
  check("relationship").exists().isLength({ min: 1, max: 100 }),
  check("sign").exists().isString(),
  check("service_quality").exists().isLength({ min: 1, max: 255 }),
  check("how_know_service").exists().isLength({ min: 1, max: 255 }),
  // check("other").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
  //   if (value.length > 0 || value !== "" || value !== null || value !== "null") {
  //     if (!/^[0-9A-Za-z-áéíóúñÁÉÍÓÚÑ]+$/g.test(value)) {
  //       throw new Error('El formato del número de interior es incorrecto.');
  //     }
  //   } else {
  //     return true;
  //   }
  //   // Si el campo no existe o está vacío, no arrojará ningún error
  //   return true;
  // }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSatisfactionLetter = [
  check("id_incident").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("patient_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("date").exists().isString(),
  check("origin").exists().isString(),
  check("destiny").exists().isString().isLength({ min: 1, max: 100 }),
  check("name").exists().isString().isLength({ min: 1, max: 100 }),
  check("relationship").exists().isString().isLength({ min: 1, max: 100 }),
  check("sign").exists().isString(),
  check("service_quality").exists().isString().isLength({ min: 1, max: 255 }),
  check("how_know_service").exists().isString().isLength({ min: 1, max: 255 }),
  check("other").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
    if (value !== '' || value !== null || value !== 'null') {
      if (!/^[0-9A-Za-z-áéíóúñÁÉÍÓÚÑ]+$/g.test(value)) {
        throw new Error('El formato del número de interior es incorrecto.');
      }
    } else {
      return true;
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSatisfactionLetter = [
  check("uuid").exists().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSatisfactionLetter = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSatisfactionLetter = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatordeleteSatisfactionLetter = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export {
  validatorCreateSatisfactionLetter, validatorUpdateSatisfactionLetter, validatorReadSatisfactionLetter, validatorDisableSatisfactionLetter, validatorEnableSatisfactionLetter, validatordeleteSatisfactionLetter
}