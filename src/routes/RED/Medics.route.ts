import { Router } from "express";
import { validatorCreateMedic, validatorDeleteMedic, validatorDisableMedic, validatorEnableMedic, validatorFilterMedic, validatorReadMedic, validatorUpdateMedic } from "../../validators/RED/Medics.validators";
import { createMedic, deleteMedic, disableMedic, enableMedic, filterMedic, readMedic, readMedics, updateMedic } from "../../controllers/RED/Medic.Controller";

const router = Router();

//Creamos un nuevo incidente
router.post("/c", validatorCreateMedic, createMedic);

//Obtenemos los datos de la base de datos
router.post("/r", readMedics);

//Obtenemos un solo incidente
router.post("/rs", validatorReadMedic, readMedic);

//Actualizamos un solo incidente
router.post("/u", validatorUpdateMedic, updateMedic);

//Deshabilitamos un incidente
router.post("/d", validatorDisableMedic, disableMedic);

//Habilitamos un incidente
router.post("/e", validatorEnableMedic, enableMedic);

//Eliminamos un incidente
router.post("/de", validatorDeleteMedic, deleteMedic);

//Filtramos los datos
router.post("/f", validatorFilterMedic, filterMedic)

export { router };
