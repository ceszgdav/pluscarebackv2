import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateUser = [
  // check("id_module").exists().isObject(),
  check("name").exists().isString().isLength({ min: 1, max: 150 }).trim(),
  check("email").exists().isString().isLength({ min: 1, max: 150 }).trim(),
  check("username").exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check("password").exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check("id_role").optional().custom((value, { req }) => {
    if (value === "" || value === undefined) {
      // Si la contraseña está vacía o no se proporciona, considera la validación como exitosa
      return true;
    } else {
      return true
    }
  }),
  // check("id_permission").exists().isNumeric().isLength({ min: 1 }),
  // check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateUser = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),
  check("name").exists().isString().isLength({ min: 1, max: 150 }).trim(),
  check("email").exists().isString().isLength({ min: 1, max: 150 }).trim(),
  check("username").exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check("password").optional().custom((value, { req }) => {
    if (value === "" || value === undefined) {
      // Si la contraseña está vacía o no se proporciona, considera la validación como exitosa
      return true;
    } else {
      return true
    }
  }),
  check("id_role").optional().custom((value, { req }) => {
    if (value === "" || value === undefined) {
      // Si la contraseña está vacía o no se proporciona, considera la validación como exitosa
      return true;
    } else {
      return true
    }
  }),
  check("id_permission").exists().isNumeric().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableUser = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableUser = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteUser = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadUser = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateUser, validatorUpdateUser, validatorDisableUser, validatorEnableUser, validatorDeleteUser, validatorReadUser }