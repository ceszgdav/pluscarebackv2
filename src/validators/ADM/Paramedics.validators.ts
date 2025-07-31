import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateParamedic = [
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("username").exists().isString().isLength({ min: 1, max: 50 }),
  check("password").exists().isString().isLength({ min: 1, max: 255 }),
  // check("id_role").exists().isNumeric().isLength({ min: 1 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateParamedic = [
  check("uuid").isString().isLength({ min: 1, max: 250 }),
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("username").exists().isString().isLength({ min: 1, max: 50 }),
  check("password").optional().custom((value, { req }) => {
    if (value === "" || value === undefined) {
      // Si la contraseña está vacía o no se proporciona, considera la validación como exitosa
      return true;
    } else {
      return true
    }
  }),
  // check("id_role").exists().isNumeric().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableParamedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableParamedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteParamedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadParamedic = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateParamedic, validatorUpdateParamedic, validatorDisableParamedic, validatorEnableParamedic, validatorDeleteParamedic, validatorReadParamedic }