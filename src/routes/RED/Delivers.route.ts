import { Router } from "express";
import { createDeliver, uploadFile, deleteDeliver, disableDeliver, enableDeliver, readDeliver, readDelivers, readDeliversToPay, updateDeliver, filterDeliver } from "../../controllers/RED/Delivers.Controller";
import { validatorCreateDeliver, validatorDeleteDeliver, validatorDisableDeliver, validatorEnableDeliver, validatorFilterDeliver, validatorReadDeliver, validatorUpdateDeliver } from "../../validators/RED/Delivers.validators";
import { uploadIneMiddleware } from "../../utils/handleStorageIneDriver";

const router = Router();

//Creamos un nuevo incidente
router.post("/c", createDeliver);

//Upload documents
router.post("/ud", uploadIneMiddleware.single('myFile'), uploadFile);

//Obtenemos los datos de la base de datos
router.post("/r", readDelivers);
router.post("/rd", readDeliversToPay);

//Obtenemos un solo incidente
router.post("/rs", validatorReadDeliver, readDeliver);

//Actualizamos un solo incidente
router.post("/u", updateDeliver);

//Deshabilitamos un incidente
router.post("/d", validatorDisableDeliver, disableDeliver);

//Habilitamos un incidente
router.post("/e", validatorEnableDeliver, enableDeliver);

//Eliminamos un incidente
router.post("/de", validatorDeleteDeliver, deleteDeliver);

//Filtramos los datos
router.post("/f", validatorFilterDeliver, filterDeliver

)

export { router };
