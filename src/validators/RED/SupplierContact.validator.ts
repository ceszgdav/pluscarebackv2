import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSupplierContact = [
  check("supplier_contact").exists().isArray(),
  check("supplier_contact.*.id_supplier").exists().isNumeric(),
  check("supplier_contact.*.name").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'g'),
  check("supplier_contact.*.email").exists().isLength({ min: 1 }).isEmail(),
  check("supplier_contact.*.phone").exists().isLength({ min: 1 }).isString(),
  check("supplier_contact.*.created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorCreateSingleSupplierContact = [
  check("id_supplier").exists().isNumeric(),
  check("name").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'g'),
  check("email").exists().isLength({ min: 1 }).isEmail(),
  check("phone").exists().isLength({ min: 1 }).isString(),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSupplierContact = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("name").exists().isLength({ min: 1 }).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'g'),
  check("email").exists().isLength({ min: 1 }).isEmail(),
  check("phone").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierContacts = [
  check("clientesId").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierContact = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSupplierContact = [
  check("uuid").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSupplierContact = [
  check("uuid").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteSupplierContact = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("deleted").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),
  check("deleted_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateSupplierContact, validatorCreateSingleSupplierContact, validatorUpdateSupplierContact, validatorReadSupplierContacts, validatorReadSupplierContact, validatorDisableSupplierContact, validatorEnableSupplierContact, validatorDeleteSupplierContact }