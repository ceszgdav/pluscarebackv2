import { Router } from "express";
import { validatorCreateProgrammedIncident, validatordeleteProgrammedIncident, validatorDisableProgrammedIncident, validatorEnableProgrammedIncident, validatorReadProgrammedIncident, validatorUpdateProgrammedIncident } from "../../validators/SERV/ProgrammedService.validators";
import { createProgrammedService, deleteProgrammedService, disableProgrammedService, enableProgrammedService, readProgrammedService, readProgrammedServices, updateProgrammedService } from "../../controllers/SERV/ProgrammedService.Controller";

const router = Router();

//Creamos un nuevo incidente
router.post("/c", validatorCreateProgrammedIncident, createProgrammedService);

//Obtenemos los datos de la base de datos
router.post("/r", readProgrammedServices);

//Obtenemos un solo ProgrammedServicee
router.post("/rs", validatorReadProgrammedIncident, readProgrammedService);

//Habilitamos un solo incidente
router.post("/u", validatorUpdateProgrammedIncident, updateProgrammedService);

//Deshabilitamos un incidente
router.post("/d", validatorDisableProgrammedIncident, disableProgrammedService);

//Habilitamos un incidente
router.post("/e", validatorEnableProgrammedIncident, enableProgrammedService);

//Eliminamos un incidente
router.post("/de", validatordeleteProgrammedIncident, deleteProgrammedService);

export { router };
