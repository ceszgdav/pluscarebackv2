import { Router } from "express";
import { validatorCreateInsurance, validatorDeleteInsurance, validatorDisableInsurance, validatorEnableInsurance, validatorReadInsurance, validatorUpdateInsurance } from "../../validators/ADM/Insurance.validators";
import { createInsurance, deleteInsurance, disableInsurance, enableInsurance, readInsurance, readInsurances, updateInsurance } from "../../controllers/ADM/Insurance.controller";

const router = Router();

//Creamos un nuevo aseguradoras
router.post("/c", validatorCreateInsurance, createInsurance);

//Obtenemos los datos de la base de datos
router.post("/r", readInsurances);

//Obtenemos un solo aseguradoras
router.post("/rs", validatorReadInsurance, readInsurance);

//Actualizamos un solo aseguradoras
router.post("/u", validatorUpdateInsurance, updateInsurance);

//Deshabilitamos un aseguradoras
router.post("/d", validatorDisableInsurance, disableInsurance);

//Habilitamos un aseguradoras
router.post("/e", validatorEnableInsurance, enableInsurance);

//Eliminamos un aseguradoras
router.post("/de", validatorDeleteInsurance, deleteInsurance);

export { router };
