import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSupplierUnits = [
  check("id_supplier").exists().isNumeric(),
  check("unit_number").exists().isLength({ min: 1 }).isString(),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),
  check("files").exists().isArray(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorCreateSingleSupplierUnits = [
  check("id_supplier").exists().isLength({ min: 1 }).isNumeric(),
  check("bank").exists().isLength({ min: 1 }).isString(),
  check("clabe_number").exists().isLength({ min: 1, max: 18 }).isString(),
  check("account_number").exists().isLength({ min: 1, max: 10 }).isString(),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSupplierUnits = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("bank").exists().isLength({ min: 1 }).isString(),
  check("clabe_number").exists().isLength({ min: 1, max: 18 }).isString(),
  check("account_number").exists().isLength({ min: 1, max: 10 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierUnitss = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierUnits = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSupplierUnits = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSupplierUnits = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteSupplierUnits = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("deleted").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),
  check("deleted_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateSupplierUnits, validatorCreateSingleSupplierUnits, validatorUpdateSupplierUnits, validatorReadSupplierUnitss, validatorReadSupplierUnits, validatorDisableSupplierUnits, validatorEnableSupplierUnits, validatorDeleteSupplierUnits }