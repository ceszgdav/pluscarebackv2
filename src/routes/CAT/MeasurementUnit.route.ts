import { Router } from "express";
import { createMeasurementUnit, deleteMeasurementUnit, disableMeasurementUnit, enableMeasurementUnit, readMeasurementUnit, readMeasurementUnits, updateMeasurementUnit } from "../../controllers/CAT/MeasurementUnit.controller";
import { validatorCreateMeasurementUnit, validatorDeleteMeasurementUnit, validatorDisableMeasurementUnit, validatorEnableMeasurementUnit, validatorReadMeasurementUnit, validatorUpdateMeasurementUnit } from "../../validators/CAT/MeasurementUnit.validators";

const router = Router();

//Creamos un nuevo unidad de medida
router.post("/c", validatorCreateMeasurementUnit, createMeasurementUnit);

//Obtenemos los datos de la base de datos
router.post("/r", readMeasurementUnits);

//Obtenemos un solo unidad de medida
router.post("/rs", validatorReadMeasurementUnit, readMeasurementUnit);

//Actualizamos un solo unidad de medida
router.post("/u", validatorUpdateMeasurementUnit, updateMeasurementUnit);

//Deshabilitamos un unidad de medida
router.post("/d", validatorDisableMeasurementUnit, disableMeasurementUnit);

//Habilitamos un unidad de medida
router.post("/e", validatorEnableMeasurementUnit, enableMeasurementUnit);

//Eliminamos un unidad de medida
router.post("/de", validatorDeleteMeasurementUnit, deleteMeasurementUnit);

export { router };
