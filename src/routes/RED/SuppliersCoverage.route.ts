import { Router } from "express";
import { createSupplierCoverage } from "../../controllers/RED/SupplierCoverage.controller";
import { validatorCreateSupplierCoverage } from "../../validators/RED/SupplierCoverage.validator";
const router = Router();

router.post("/c", validatorCreateSupplierCoverage, createSupplierCoverage)

export { router };
