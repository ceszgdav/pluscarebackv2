import { Router } from "express";
import { createUser, deleteUser, disableUser, enableUser, readUser, readUsers, updateUser } from "../../controllers/ADM/Users.controller";
import { validatorCreateUser, validatorDeleteUser, validatorDisableUser, validatorEnableUser, validatorReadUser, validatorUpdateUser } from "../../validators/ADM/Users.validators";

const router = Router();

//Creamos un nuevo usuario
router.post("/c", validatorCreateUser, createUser);

//Obtenemos los datos de la base de datos
router.post("/r", readUsers);

//Obtenemos un solo usuario
router.post("/rs", validatorReadUser, readUser);

//Actualizamos un solo usuario
router.post("/u", validatorUpdateUser, updateUser);

//Deshabilitamos un usuario
router.post("/d", validatorDisableUser, disableUser);

//Habilitamos un usuario
router.post("/e", validatorEnableUser, enableUser);

//Eliminamos un usuario
router.post("/de", validatorDeleteUser, deleteUser);

export { router };
