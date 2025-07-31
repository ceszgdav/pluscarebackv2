import { Router } from "express";
import { createServiceTransfer, deleteServiceTransfer, disableServiceTransfer, enableServiceTransfer, readServiceTransfer, readServiceTransfers, updateServiceTransfer } from "../../controllers/CAT/ServiceTransfer.controller";
import { validatorCreateServiceTransfer, validatorDeleteServiceTransfer, validatorDisableServiceTransfer, validatorEnableServiceTransfer, validatorReadServiceTransfer, validatorUpdateServiceTransfer } from "../../validators/CAT/ServiceTransfer.validators";

const router = Router();

//Creamos un nuevo tipos de servicios
router.post("/c", validatorCreateServiceTransfer, createServiceTransfer);

//Obtenemos los datos de la base de datos
router.post("/r", readServiceTransfers);

//Obtenemos un solo tipos de servicios
router.post("/rs", validatorReadServiceTransfer, readServiceTransfer);

//Actualizamos un solo tipos de servicios
router.post("/u", validatorUpdateServiceTransfer, updateServiceTransfer);

//Deshabilitamos un tipos de servicios
router.post("/d", validatorDisableServiceTransfer, disableServiceTransfer);

//Habilitamos un tipos de servicios
router.post("/e", validatorEnableServiceTransfer, enableServiceTransfer);

//Eliminamos un tipos de servicios
router.post("/de", validatorDeleteServiceTransfer, deleteServiceTransfer);

export { router };
