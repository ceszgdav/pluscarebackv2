import { Router } from "express";
import { createServiceType, deleteServiceType, disableServiceType, enableServiceType, readServiceType, readServiceTypes, updateServiceType } from "../../controllers/CAT/ServiceTypes.controller";
import { validatorCreateServiceType, validatorDeleteServiceType, validatorDisableServiceType, validatorEnableServiceType, validatorReadServiceType, validatorUpdateServiceType } from "../../validators/CAT/ServiceTypes.validators";

const router = Router();

//Creamos un nuevo tipos de servicios
router.post("/c", validatorCreateServiceType, createServiceType);

//Obtenemos los datos de la base de datos
router.post("/r", readServiceTypes);

//Obtenemos un solo tipos de servicios
router.post("/rs", validatorReadServiceType, readServiceType);

//Actualizamos un solo tipos de servicios
router.post("/u", validatorUpdateServiceType, updateServiceType);

//Deshabilitamos un tipos de servicios
router.post("/d", validatorDisableServiceType, disableServiceType);

//Habilitamos un tipos de servicios
router.post("/e", validatorEnableServiceType, enableServiceType);

//Eliminamos un tipos de servicios
router.post("/de", validatorDeleteServiceType, deleteServiceType);

export { router };
