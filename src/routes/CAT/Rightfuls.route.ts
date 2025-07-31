import { Router } from "express";
import { createRightful, deleteRightful, disableRightful, enableRightful, readRightful, readRightfuls, updateRightful } from "../../controllers/CAT/Rightfuls.controller";
import { validatorCreateRightful, validatorDeleteRightful, validatorDisableRightful, validatorEnableRightful, validatorReadRightful, validatorUpdateRightful } from "../../validators/CAT/Rightfuls.validators";

const router = Router();

//Creamos un nuevo derecohabiente
router.post("/c", validatorCreateRightful, createRightful);

//Obtenemos los datos de la base de datos
router.post("/r", readRightfuls);

//Obtenemos un solo derecohabiente
router.post("/rs", validatorReadRightful, readRightful);

//Actualizamos un solo derecohabiente
router.post("/u", validatorUpdateRightful, updateRightful);

//Deshabilitamos un derecohabiente
router.post("/d", validatorDisableRightful, disableRightful);

//Habilitamos un derecohabiente
router.post("/e", validatorEnableRightful, enableRightful);

//Eliminamos un derecohabiente
router.post("/de", validatorDeleteRightful, deleteRightful);

export { router };
