import { Router } from "express";
import { createRol, deleteRol, disableRol, enableRol, readRol, readRoles, updateRol } from "../../controllers/ADM/Roles.controller";
import { validatorCreateRol, validatorDeleteRol, validatorDisableRol, validatorEnableRol, validatorReadRol, validatorUpdateRol } from "../../validators/ADM/Roles.validators";

const router = Router();

//Creamos un nuevo roles
router.post("/cr", validatorCreateRol, createRol);

//Obtenemos los datos de la base de datos
router.post("/r", readRoles);

//Obtenemos un solo roles
router.post("/rs", validatorReadRol, readRol);

//Actualizamos un solo roles
router.post("/u", validatorUpdateRol, updateRol);

//Deshabilitamos un roles
router.post("/d", validatorDisableRol, disableRol);

//Habilitamos un roles
router.post("/e", validatorEnableRol, enableRol);

//Eliminamos un roles
router.post("/de", validatorDeleteRol, deleteRol);

export { router };
