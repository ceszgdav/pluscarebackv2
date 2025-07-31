import { Router } from "express";
import { createGender, deleteGender, disableGender, enableGender, readGender, readGenders, updateGender } from "../../controllers/CAT/Gender.controller";
import { validatorCreateGender, validatorDeleteGender, validatorDisableGender, validatorEnableGender, validatorReadGender, validatorUpdateGender } from "../../validators/CAT/Gender.validators";

const router = Router();

//Creamos un nuevo genero
router.post("/c", validatorCreateGender, createGender);

//Obtenemos los datos de la base de datos
router.post("/r", readGenders);

//Obtenemos un solo genero
router.post("/rs", validatorReadGender, readGender);

//Actualizamos un solo genero
router.post("/u", validatorUpdateGender, updateGender);

//Deshabilitamos un genero
router.post("/d", validatorDisableGender, disableGender);

//Habilitamos un genero
router.post("/e", validatorEnableGender, enableGender);

//Eliminamos un genero
router.post("/de", validatorDeleteGender, deleteGender);

export { router };
