import { Router } from "express";
import { createMedicine, deleteMedicine, disableMedicine, enableMedicine, readMedicine, readMedicines, updateMedicine } from "../../controllers/ADM/Medicines.controller";
import { validatorCreateMedicine, validatorDeleteMedicine, validatorDisableMedicine, validatorEnableMedicine, validatorReadMedicine, validatorUpdateMedicine } from "../../validators/ADM/Medicines.validators";

const router = Router();

//Creamos un nuevo medicinas
router.post("/c", validatorCreateMedicine, createMedicine);

//Obtenemos los datos de la base de datos
router.post("/r", readMedicines);

//Obtenemos un solo medicinas
router.post("/rs", validatorReadMedicine, readMedicine);

//Actualizamos un solo medicinas
router.post("/u", validatorUpdateMedicine, updateMedicine);

//Deshabilitamos un medicinas
router.post("/d", validatorDisableMedicine, disableMedicine);

//Habilitamos un medicinas
router.post("/e", validatorEnableMedicine, enableMedicine);

//Eliminamos un medicinas
router.post("/de", validatorDeleteMedicine, deleteMedicine);

export { router };
