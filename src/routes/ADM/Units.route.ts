import { Router } from "express";
import { createUnit, deleteUnit, disableUnit, enableUnit, readUnit, readUnits, updateUnit } from "../../controllers/ADM/Units.controller";
import { validatorCreateUnit, validatorDeleteUnit, validatorDisableUnit, validatorEnableUnit, validatorReadUnit, validatorUpdateUnit } from "../../validators/ADM/Units.validators";

const router = Router();

//Creamos un nuevo unidades
router.post("/c", validatorCreateUnit, createUnit);

//Obtenemos los datos de la base de datos
router.post("/r", readUnits);

//Obtenemos un solo unidades
router.post("/rs", validatorReadUnit, readUnit);

//Actualizamos un solo unidades
router.post("/u", validatorUpdateUnit, updateUnit);

//Deshabilitamos un unidades
router.post("/d", validatorDisableUnit, disableUnit);

//Habilitamos un unidades
router.post("/e", validatorEnableUnit, enableUnit);

//Eliminamos un unidades
router.post("/de", validatorDeleteUnit, deleteUnit);

export { router };
