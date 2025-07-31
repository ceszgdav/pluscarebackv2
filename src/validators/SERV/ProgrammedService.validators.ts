import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateProgrammedIncident = [
  check("id_supplier").exists().isNumeric(),
  check("date").exists().isString().isLength({ min: 1, max: 100 }),
  check("description").exists().isString().isLength({ min: 1, max: 255 }),
  check("id_paramedic").exists().isNumeric(),
  check("id_operator").exists().isNumeric(),
  check("id_unit").exists().isNumeric(),
  check("plates").exists().isString().isLength({ min: 1, max: 10 }),
  check("hour").exists().isString(),
  check("pluscare_cost").exists().isNumeric(),
  check("supplier_cost").exists().isNumeric(),
  check("client_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("supplier_folio").exists().isString().isLength({ min: 1, max: 100 }),
  check("created_by").optional({ nullable: true }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateProgrammedIncident = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),
  check("id_supplier").exists().isNumeric(),
  check("date").exists().isString().isLength({ min: 1, max: 100 }),
  check("description").exists().isString().isLength({ min: 1, max: 255 }),
  check("id_paramedic").exists().isNumeric(),
  check("id_operator").exists().isNumeric(),
  check("id_unit").exists().isNumeric(),
  check("plates").exists().isString().isLength({ min: 1, max: 10 }),
  check("hour").exists().isString(),
  check("pluscare_cost").exists().isNumeric(),
  check("supplier_cost").exists().isNumeric(),
  check("client_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("supplier_folio").exists().isString().isLength({ min: 1, max: 100 }),
  check("updated_by").optional({ nullable: true }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadProgrammedIncident = [
  check("id").exists().isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableProgrammedIncident = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableProgrammedIncident = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatordeleteProgrammedIncident = [
  check("id").exists().isLength({ min: 1 }).isNumeric(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export {
  validatorCreateProgrammedIncident, validatorUpdateProgrammedIncident, validatorReadProgrammedIncident, validatorDisableProgrammedIncident, validatorEnableProgrammedIncident, validatordeleteProgrammedIncident
}