import { Router } from "express";
import { createModuleAccess, createParamedic, deleteParamedic, disableParamedic, enableParamedic, readParamedic, readParamedics, updateParamedic } from "../../controllers/ADM/Paramedics.controller";
import { validatorCreateParamedic, validatorDeleteParamedic, validatorDisableParamedic, validatorEnableParamedic, validatorReadParamedic, validatorUpdateParamedic } from "../../validators/ADM/Paramedics.validators";

const router = Router();

//Creamos un nuevo paramedicos
router.post("/c", validatorCreateParamedic, createParamedic);

//Creamos los modulos
router.post("/cm", createModuleAccess);

//Obtenemos los datos de la base de datos
router.post("/r", readParamedics);

//Obtenemos un solo paramedicos
router.post("/rs", validatorReadParamedic, readParamedic);

//Actualizamos un solo paramedicos
router.post("/u", validatorUpdateParamedic, updateParamedic);

//Deshabilitamos un paramedicos
router.post("/d", validatorDisableParamedic, disableParamedic);

//Habilitamos un paramedicos
router.post("/e", validatorEnableParamedic, enableParamedic);

//Eliminamos un paramedicos
router.post("/de", validatorDeleteParamedic, deleteParamedic);

export { router };
