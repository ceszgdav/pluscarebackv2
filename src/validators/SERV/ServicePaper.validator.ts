import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validatorCreateServicePaper = [
  check("creation_event_place").exists().isString().isLength({ min: 1, max: 100 }),
  check("folio").exists().isString().isLength({ min: 1, max: 100 }),
  check("date").exists().isString().isLength({ min: 1, max: 100 }),
  check("programmed").exists().isBoolean(),
  check("external").exists().isBoolean(),
  check("received_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("id_insurance").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("activation_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("place_occurrence").exists().isArray(),
  check("place_occurrences").exists().isString().isLength({ min: 1, max: 255 }),
  check("answer_call").exists().isString().isLength({ min: 1, max: 255 }),
  check("service_cost").exists().isNumeric().isLength({ min: 1, max: 255 }),
  check("expedient").exists().isString().isLength({ min: 1, max: 255 }),
  check("requester").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_year").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_diagnostic").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_weight").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("patient_phone").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address_destiny").exists().isString().isLength({ min: 1, max: 100 }),
  check("arrive_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("observation").exists().isString().isLength({ min: 1, max: 255 }),
  check("contact_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("finished_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("name_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("equipment_used_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("cost_support").exists().isNumeric(),
  check("deducible_support").exists().isNumeric(),
  check("units").exists().isString().isLength({ min: 1, max: 100 }),
  check("operators").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isString().isLength({ min: 1, max: 100 }),
  check("operator").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("operator").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("id_paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("departure_time").exists().isString().isLength({ min: 1, max: 100 }),
  check("on_site").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_frap").exists().isBoolean(),
  check("start_transfer").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_recipe").exists().isBoolean(),
  check("on_hospital").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_report").exists().isBoolean(),
  check("email_serv_ambulance").optional().isBoolean(),
  check("created_by").optional().isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorCreateServicePaperMedicAtHome = [
  check("creation_event_place").exists().isString().isLength({ min: 1, max: 100 }),
  check("folio").exists().isString().isLength({ min: 1, max: 100 }),
  check("date").exists().isString().isLength({ min: 1, max: 100 }),
  check("programmed").exists().isBoolean(),
  check("external").exists().isBoolean(),
  check("received_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("id_insurance").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("activation_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("place_occurrence").exists().isArray(),
  check("place_occurrences").exists().isString().isLength({ min: 1, max: 255 }),
  check("answer_call").exists().isString().isLength({ min: 1, max: 255 }),
  check("service_cost").exists().isNumeric().isLength({ min: 1, max: 255 }),
  check("expedient").exists().isString().isLength({ min: 1, max: 255 }),
  check("requester").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_year").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_diagnostic").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_weight").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("patient_phone").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address_destiny").exists().isString().isLength({ min: 1, max: 100 }),
  check("arrive_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("observation").exists().isString().isLength({ min: 1, max: 255 }),
  check("contact_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("finished_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("name_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("equipment_used_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("cost_support").exists().isNumeric(),
  check("deducible_support").exists().isNumeric(),
  check("units").exists().isString().isLength({ min: 1, max: 100 }),
  check("operators").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isString().isLength({ min: 1, max: 100 }),
  check("operator").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("operator").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("id_paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("departure_time").exists().isString().isLength({ min: 1, max: 100 }),
  check("on_site").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_frap").exists().isBoolean(),
  check("start_transfer").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_recipe").exists().isBoolean(),
  check("on_hospital").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_report").exists().isBoolean(),
  check("email_serv_ambulance").optional().isBoolean(),
  check("created_by").optional().isNumeric(),
  check("passwordServicePaper").exists().isString().isLength({ min: 1, max: 100 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateServicePaper = [
  check("uuid").isString().isLength({ min: 1, max: 255 }),

  check("creation_event_place").exists().isString().isLength({ min: 1, max: 100 }),
  check("folio").exists().isString().isLength({ min: 1, max: 100 }),
  check("date").exists().isString().isLength({ min: 1, max: 100 }),
  check("programmed").exists().isBoolean(),
  check("external").exists().isBoolean(),
  check("received_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("id_insurance").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("activation_call").exists().isString().isLength({ min: 1, max: 100 }),
  check("place_occurrence").exists().isArray(),
  check("place_occurrences").exists().isString().isLength({ min: 1, max: 255 }),
  check("answer_call").exists().isString().isLength({ min: 1, max: 255 }),
  check("service_cost").exists().isNumeric().isLength({ min: 1, max: 255 }),
  check("expedient").exists().isString().isLength({ min: 1, max: 255 }),
  check("requester").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_name").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_year").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_diagnostic").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_weight").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("patient_phone").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address").exists().isString().isLength({ min: 1, max: 100 }),
  check("patient_address_destiny").exists().isString().isLength({ min: 1, max: 100 }),
  check("arrive_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("observation").exists().isString().isLength({ min: 1, max: 255 }),
  check("contact_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("finished_hour").exists().isString().isLength({ min: 1, max: 100 }),
  check("name_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("equipment_used_support").exists().isString().isLength({ min: 1, max: 100 }),
  check("cost_support").exists().isNumeric(),
  check("deducible_support").exists().isNumeric(),
  check("units").exists().isString().isLength({ min: 1, max: 100 }),
  check("operators").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isString().isLength({ min: 1, max: 100 }),
  check("operator").exists().isString().isLength({ min: 1, max: 100 }),
  check("unit").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("operator").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("id_paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("paramedic").exists().isNumeric().isLength({ min: 1, max: 100 }),
  check("departure_time").exists().isString().isLength({ min: 1, max: 100 }),
  check("on_site").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_frap").exists().isBoolean(),
  check("start_transfer").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_recipe").exists().isBoolean(),
  check("on_hospital").exists().isString().isLength({ min: 1, max: 100 }),
  check("with_report").exists().isBoolean(),
  check("email_serv_ambulance").optional().isBoolean(),
  check("updated_by").optional({ nullable: true }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorUpdateService = [
  check("id").isNumeric().isLength({ min: 1, max: 255 }),
  check("initialized").exists().isNumeric().isLength({ min: 1, max: 100 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorReadServicePaper = [
  check("uuid").exists().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorDisableServicePaper = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatorEnableServicePaper = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validatordeleteServicePaper = [
  check("uuid").exists().isLength({ min: 1 }).isString(),
  check("updated_by").exists().isLength({ min: 1 }).isNumeric(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export {
  validatorCreateServicePaper, validatorCreateServicePaperMedicAtHome, validatorUpdateServicePaper, validatorUpdateService, validatorReadServicePaper, validatorDisableServicePaper, validatorEnableServicePaper, validatordeleteServicePaper
}