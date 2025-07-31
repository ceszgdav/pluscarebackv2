import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateSupplierCoverage = [
  check("supplier_coverage").exists().isArray(),
  check("supplier_coverage.*.id_supplier").exists().isNumeric(),
  check("supplier_coverage.*.coverage_place").exists().isLength({ min: 1 }).isString(),
  check("supplier_coverage.*.tab").exists().isLength({ min: 1 }).isNumeric(),
  check("supplier_coverage.*.created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorCreateSingleSupplierCoverage = [
  check("id_supplier").exists().isLength({ min: 1 }).isNumeric(),
  check("coverage_place").exists().isLength({ min: 1 }).isString(),
  check("tab").exists().isLength({ min: 1 }).isNumeric(),
  check("created_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateSupplierCoverage = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("coverage_place").exists().isLength({ min: 1 }).isString(),
  check("tab").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierCoverages = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadSupplierCoverage = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableSupplierCoverage = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableSupplierCoverage = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDeleteSupplierCoverage = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("active").exists().isLength({ min: 1 }).isBoolean(),
  check("deleted").exists().isLength({ min: 1 }).isBoolean(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),
  check("deleted_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validatorCreateSupplierCoverage, validatorCreateSingleSupplierCoverage, validatorUpdateSupplierCoverage, validatorReadSupplierCoverages, validatorReadSupplierCoverage, validatorDisableSupplierCoverage, validatorEnableSupplierCoverage, validatorDeleteSupplierCoverage }