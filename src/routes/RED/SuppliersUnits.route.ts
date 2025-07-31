import { Router } from "express";
import { uploadMultipleTemporalMiddleware } from "../../utils/handleMultipleStorageTempts";
import { validatorCreateSupplierUnits, validatorDeleteSupplierUnits, validatorReadSupplierUnits, validatorReadSupplierUnitss, validatorUpdateSupplierUnits } from "../../validators/RED/SupplierUnits.validator";
import { createSupplierUnits, deleteSupplierUnits, readSupplierUnitss, updateSupplierUnits, uploadUnit } from "../../controllers/RED/SupplierUnits.controller";
const router = Router();

router.post("/cu", uploadMultipleTemporalMiddleware.array('files', 10), uploadUnit);
// router.post("/uu", uploadTemporalMiddleware.single('myFile'), uploadUnitsFiles);

router.post("/c", validatorCreateSupplierUnits, createSupplierUnits)

router.post("/r", validatorReadSupplierUnitss, readSupplierUnitss);

router.post("/u", validatorUpdateSupplierUnits, updateSupplierUnits);

router.post("/de", validatorDeleteSupplierUnits, deleteSupplierUnits);

export { router };
