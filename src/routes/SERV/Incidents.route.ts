import { Router } from "express";
import { countIncidents, createIncident, readIncident, readIncidents, storeCoordsIncident, storeSignsIncident, updateCoordsIncident, updateIncident, updateIncidentStatus } from "../../controllers/SERV/Incident.Controller";
import { validatorCreateIncident, validatorUpdateCoords, validatorUpdateIncident } from "../../validators/SERV/Incident.validators";

const router = Router();

//Creamos un nuevo incidente
router.post("/c", createIncident);

//Almacenamos las firmas
router.post("/ss", storeSignsIncident);

//Almacenamos las coordenadas de las lesiones
router.post("/sc", storeCoordsIncident);

//Contamos los incidentes para crear el folio
router.post("/co", countIncidents);

//Obtenemos los datos de la base de datos
router.post("/r", readIncidents);

//Obtenemos un solo incidente
router.post("/rs", readIncident);

//Actualizamos un solo incidente
router.post("/u", validatorUpdateIncident, updateIncident);

//Actualizamos las coordenadas de las lesiones
router.post("/uc", validatorUpdateCoords, updateCoordsIncident);

//Actualizamos el servicio a comenzado
router.post("/uss", updateIncidentStatus)

// //Deshabilitamos un incidente
// router.post("/d", disableUser);

// //Habilitamos un incidente
// router.post("/e", enableUser);

// //Eliminamos un incidente
// router.post("/de", deleteUser);

export { router };
