import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSupplierBankAccount = [
  check("supplier_bank_account").exists().isArray(),
  check("supplier_bank_account.*.id_supplier").exists().isLength({ min: 1 }).isNumeric(),
  check("supplier_bank_account.*.bank").exists().isLength({ min: 1 }).isString(),
  check("supplier_bank_account.*.clabe_number").exists().isLength({ min: 1, max: 18 }).isString(),
  check("supplier_bank_account.*.account_number").exists().isLength({ min: 1, max: 10 }).isString(),
  check("supplier_bank_account.*.created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorCreateSingleSupplierBankAccount = [
  check("id_supplier").exists().isLength({ min: 1 }).isNumeric(),
  check("bank").exists().isLength({ min: 1 }).isString(),
  check("clabe_number").exists().isLength({ min: 1, max: 18 }).isString(),
  check("account_number").exists().isLength({ min: 1, max: 10 }).isString(),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSupplierBankAccount = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("bank").exists().isLength({ min: 1 }).isString(),
  check("clabe_number").exists().isLength({ min: 1, max: 18 }).isString(),
  check("account_number").exists().isLength({ min: 1, max: 10 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierBankAccounts = [
  check("clientesId").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierBankAccount = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSupplierBankAccount = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSupplierBankAccount = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteSupplierBankAccount = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("deleted").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),
  check("deleted_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateSupplierBankAccount, validatorCreateSingleSupplierBankAccount, validatorUpdateSupplierBankAccount, validatorReadSupplierBankAccounts, validatorReadSupplierBankAccount, validatorDisableSupplierBankAccount, validatorEnableSupplierBankAccount, validatorDeleteSupplierBankAccount }