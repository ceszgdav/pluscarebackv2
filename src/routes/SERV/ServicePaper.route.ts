import { Router } from "express";
import { createServicePaper, createServicePaperAtHome, readServicePaper, readServicePapers, searchMedicAtHomeService, updateServicePaper } from "../../controllers/SERV/ServicePaper.controller";
import { validatorCreateServicePaper, validatorCreateServicePaperMedicAtHome, validatorReadServicePaper, validatorUpdateService, validatorUpdateServicePaper } from "../../validators/SERV/ServicePaper.validator";

const router = Router();

//Creamos un nuevo ServicePapere
router.post("/c", createServicePaper);
router.post("/cmah", createServicePaperAtHome);

//Obtenemos los datos de la base de datos
router.post("/r", readServicePapers);

//Obtenemos un solo ServicePapere
router.post("/rs", validatorReadServicePaper, readServicePaper);

//Actualizamos un solo ServicePapere
router.post("/u", updateServicePaper);

//Actualizamos un solo ServicePapere
router.post("/us", validatorUpdateService, updateServicePaper);

router.post("/smah", searchMedicAtHomeService);

export { router };
