import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSupplier = [
  check("social_reazon").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("rfc").exists().isLength({ min: 1 }).matches(/^[A-Za-z0-9]+$/, 'g'),
  check("zip_code").exists().isLength({ min: 1 }).isNumeric(),
  check("neighborhood").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("city").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("state").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("country").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("street_number").exists().isLength({ min: 1 }).matches(/^[A-Za-z0-9\-]+$/, 'g'),
  check("internal_number").optional().isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9\-]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("street").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSupplier = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("social_reazon").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("rfc").exists().isLength({ min: 1 }).matches(/^[A-Za-z0-9]+$/, 'g'),
  check("zip_code").exists().isLength({ min: 1 }).isNumeric(),
  check("neighborhood").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("city").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("state").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("country").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("street_number").exists().isLength({ min: 1 }).matches(/^[A-Za-z0-9\-]+$/, 'g'),
  check("internal_number").optional().isString().custom((value, { req }) => {
    if (value != '') {
      if (!/^[A-Za-z0-9\-]+$/.test(value)) {
        throw new Error('El campo solo debe tener números y letras sin espacios.');
      }
    }
    // Si el campo no existe o está vacío, no arrojará ningún error
    return true;
  }),
  check("street").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]+$/, 'g'),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplier = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSupplier = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSupplier = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatordeleteSupplier = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorFilterSupplier = [
  check("state").exists().isString().isLength({ min: 1 }),
  check("municipality").exists().isString().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateSupplier, validatorUpdateSupplier, validatorReadSupplier, validatorDisableSupplier, validatorEnableSupplier, validatordeleteSupplier, validatorFilterSupplier }