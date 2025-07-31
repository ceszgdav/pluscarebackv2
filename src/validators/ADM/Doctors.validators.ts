import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateDoctor = [
  check("name").isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-))]+$/.test(value)) {
        throw new Error('El formato del número de teléfono es incorrecto.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("email").isEmail().isLength({ min: 1 }),
  check("professional_id").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("especiality").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        throw new Error('El campo solo debe tener letras.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("university_degree").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        throw new Error('El campo solo debe tener letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("created_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateDoctor = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),
  check("name").isString().isLength({ min: 1, max: 250 }),
  check("phone").optional().isLength({ min: 1, max: 15 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[0-9\()\-))]+$/.test(value)) {
        throw new Error('El formato del número de teléfono es incorrecto.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("email").isEmail().isLength({ min: 1 }),
  check("professional_id").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("especiality").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        throw new Error('El campo solo debe tener letras.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("university_degree").optional().isLength({ min: 1 }).isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        throw new Error('El campo solo debe tener letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableDoctor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableDoctor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteDoctor = [
  check("uuid").exists().isString().isLength({ min: 1 }),
  check("updated_by").exists().isNumeric().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadDoctor = [
  check("uuid").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateDoctor, validatorUpdateDoctor, validatorDisableDoctor, validatorEnableDoctor, validatorDeleteDoctor, validatorReadDoctor }