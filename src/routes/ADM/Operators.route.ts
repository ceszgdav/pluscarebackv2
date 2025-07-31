import { Router } from "express";
import { createModuleAccess, createOperator, deleteOperator, disableOperator, enableOperator, readOperator, readOperators, updateOperator } from "../../controllers/ADM/Operators.controller";
import { validatorCreateOpertor, validatorDeleteOpertor, validatorDisableOpertor, validatorEnableOpertor, validatorReadOpertor, validatorUpdateOpertor } from "../../validators/ADM/Operators.validators";

const router = Router();

//Creamos un nuevo operador
router.post("/c", validatorCreateOpertor, createOperator);

//Creamos los modulos
router.post("/cm", createModuleAccess);

//Obtenemos los datos de la base de datos
router.post("/r", readOperators);

//Obtenemos un solo operador
router.post("/rs", validatorReadOpertor, readOperator);

//Actualizamos un solo operador
router.post("/u", validatorUpdateOpertor, updateOperator);

//Deshabilitamos un operador
router.post("/d", validatorDisableOpertor, disableOperator);

//Habilitamos un operador
router.post("/e", validatorEnableOpertor, enableOperator);

//Eliminamos un operador
router.post("/de", validatorDeleteOpertor, deleteOperator);

export { router };
