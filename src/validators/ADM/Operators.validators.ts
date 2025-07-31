import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateOpertor = [
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isString().isLength({ min: 1, max: 15 }).custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-)]+$/.test(value)) {
        throw new Error('El campo solo debe tener números.');
      }
      return true;
    }
    return true;
  }),
  check("email").exists().isEmail().isLength({ min: 1 }),
  check("licence_number").optional().isString().isLength({ min: 1 }).custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9\-]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
      return true;
    }
    return true;
  }),
  check("due_date_licence").optional().isString().isLength({ min: 1 }).custom((value, { req }) => {
    if (!/^[A-Za-z0-9\-:.\s]+$/.test(value)) {
      throw new Error('El campo solo debe tener números y letras sin espacios.');
    }
    return true;
  }),
  check("username").exists().isString().isLength({ min: 1, max: 50 }),
  check("password").exists().isString().isLength({ min: 1, max: 255 }),
  // check("id_role").exists().isNumeric().isLength({ min: 1 }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateOpertor = [
  check("uuid").exists().isString().isLength({ min: 1, max: 250 }),
  check("name").exists().isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isString().isLength({ min: 1, max: 15 }).custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-)]+$/.test(value)) {
        throw new Error('El campo solo debe tener números.');
      }
      return true;
    }
    return true;
  }),
  check("email").exists().isEmail().isLength({ min: 1 }),
  check("licence_number").optional().isString().isLength({ min: 1 }).custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9\-]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
      return true;
    }
    return true;
  }),
  check("due_date_licence").optional().isString().isLength({ min: 1 }).custom((value, { req }) => {
    if (!/^[A-Za-z0-9\-:.\s]+$/.test(value)) {
      throw new Error('El campo solo debe tener números y letras sin espacios.');
    }
    return true;
  }),
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

const validatorDisableOpertor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableOpertor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteOpertor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadOpertor = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateOpertor, validatorUpdateOpertor, validatorDisableOpertor, validatorEnableOpertor, validatorDeleteOpertor, validatorReadOpertor }