import { Router } from "express";
import { validatorCreateSupplier, validatordeleteSupplier, validatorDisableSupplier, validatorEnableSupplier, validatorFilterSupplier, validatorReadSupplier, validatorUpdateSupplier } from "../../validators/RED/Supplier.validator";
import { createSupplier, deleteSupplier, disableSupplier, enableSupplier, filterSupplier, readSupplier, readSuppliers, updateSupplier, uploadUnitsFiles } from "../../controllers/RED/Supplier.controller";
import { uploadMultipleTemporalMiddleware } from "../../utils/handleMultipleStorageTempts"
import { uploadTemporalMiddleware } from "../../utils/handleStorageTemp";
const router = Router();

router.post("/c", validatorCreateSupplier, createSupplier);

router.post("/uu", uploadMultipleTemporalMiddleware.array('files', 10), uploadUnitsFiles);
// router.post("/uu", uploadTemporalMiddleware.single('myFile'), uploadUnitsFiles);

router.post("/r", readSuppliers);

router.post("/rs", validatorReadSupplier, readSupplier);

router.post("/u", validatorUpdateSupplier, updateSupplier);

router.post("/d", validatorDisableSupplier, disableSupplier);

router.post("/e", validatorEnableSupplier, enableSupplier);

router.post("/de", validatordeleteSupplier, deleteSupplier);

router.post("/f", validatorFilterSupplier, filterSupplier);

export { router };
