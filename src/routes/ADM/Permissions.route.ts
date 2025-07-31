import { Router } from "express";
import { validatorCreatePermission, validatorDeletePermission, validatorDisablePermission, validatorEnablePermission, validatorReadPermission, validatorUpdatePermission } from "../../validators/ADM/Permissions.validators";
import { createPermission, createPermissionTests, deletePermission, disablePermission, enablePermission, readPermission, readPermissions, updatePermission } from "../../controllers/ADM/Permissions.controller";

//http://localhost:5120/api/adm/permissions/cp

const router = Router();

//Creamos un nuevo usuario
router.post("/c", validatorCreatePermission, createPermission);

//Crear los datos de prueba en la base de datos
router.post("/cp", createPermissionTests);

//Obtenemos los datos de la base de datos
router.post("/r", readPermissions);

//Obtenemos un solo usuario
router.post("/rs", validatorReadPermission, readPermission);

//Actualizamos un solo usuario
router.post("/u", validatorUpdatePermission, updatePermission);

//Deshabilitamos un usuario
router.post("/d", validatorDisablePermission, disablePermission);

//Habilitamos un usuario
router.post("/e", validatorEnablePermission, enablePermission);

//Eliminamos un usuario
router.post("/de", validatorDeletePermission, deletePermission);

export { router };
