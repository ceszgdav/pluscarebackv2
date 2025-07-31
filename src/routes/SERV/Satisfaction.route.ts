import { Router } from "express";
import { createSatisfaction, readSatisfaction, storeSignsIncident } from "../../controllers/SERV/Satisfaction.controller";
import { validatorCreateSatisfactionLetter } from "../../validators/SERV/satisfactionLetter.validators";

const router = Router();

//Creamos un nuevo ServicePapere
router.post("/c", validatorCreateSatisfactionLetter, createSatisfaction);

//Creamos un nuevo ServicePapere
router.post("/cs", storeSignsIncident);

//Obtenemos los datos de la base de datos
router.post("/r", readSatisfaction);

//Obtenemos un solo ServicePapere
// router.post("/rs", validatorReadServicePaper, readServicePaper);

//Actualizamos un solo ServicePapere
// router.post("/u", validatorUpdateServicePaper, updateServicePaper);

export { router };
