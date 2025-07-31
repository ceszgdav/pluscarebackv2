import { Router } from "express";
import { createEventPlace, deleteEventPlace, disableEventPlace, enableEventPlace, readEventPlace, readEventPlaces, updateEventPlace } from "../../controllers/CAT/EventPlaces.controller";
import { validatorCreateEventPlace, validatorDeleteEventPlace, validatorDisableEventPlace, validatorEnableEventPlace, validatorReadEventPlace, validatorUpdateEventPlace } from "../../validators/CAT/EventPlaces.validators";

const router = Router();

//Creamos un nuevo evento
router.post("/c", validatorCreateEventPlace, createEventPlace);

//Obtenemos los datos de la base de datos
router.post("/r", readEventPlaces);

//Obtenemos un solo evento
router.post("/rs", validatorReadEventPlace, readEventPlace);

//Actualizamos un solo evento
router.post("/u", validatorUpdateEventPlace, updateEventPlace);

//Deshabilitamos un evento
router.post("/d", validatorDisableEventPlace, disableEventPlace);

//Habilitamos un evento
router.post("/e", validatorEnableEventPlace, enableEventPlace);

//Eliminamos un evento
router.post("/de", validatorDeleteEventPlace, deleteEventPlace);

export { router };
