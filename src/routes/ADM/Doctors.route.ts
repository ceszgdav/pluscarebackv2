import { Router } from "express";
import { validatorCreateDoctor, validatorDeleteDoctor, validatorDisableDoctor, validatorEnableDoctor, validatorReadDoctor, validatorUpdateDoctor } from "../../validators/ADM/Doctors.validators";
import { createDoctor, deleteDoctor, disableDoctor, enableDoctor, readDoctor, readDoctors, updateDoctor } from "../../controllers/ADM/Doctors.controller";

const router = Router();

//Creamos un nuevo doctores
router.post("/c", validatorCreateDoctor, createDoctor);

//Obtenemos los datos de la base de datos
router.post("/r", readDoctors);

//Obtenemos un solo doctores
router.post("/rs", validatorReadDoctor, readDoctor);

//Actualizamos un solo doctores
router.post("/u", validatorUpdateDoctor, updateDoctor);

//Deshabilitamos un doctores
router.post("/d", validatorDisableDoctor, disableDoctor);

//Habilitamos un doctores
router.post("/e", validatorEnableDoctor, enableDoctor);

//Eliminamos un doctores
router.post("/de", validatorDeleteDoctor, deleteDoctor);

export { router };
