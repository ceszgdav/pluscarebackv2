import { Router } from "express";
import { createRelationshipType, deleteRelationshipType, disableRelationshipType, enableRelationshipType, readRelationshipType, readRelationshipTypes, updateRelationshipType } from "../../controllers/CAT/RelationshipTypes.controller";
import { validatorCreateRelationshipTypes, validatorDeleteRelationshipTypes, validatorDisableRelationshipTypes, validatorEnableRelationshipTypes, validatorReadRelationshipTypes, validatorUpdateRelationshipTypes } from "../../validators/CAT/RelationshipTypes.validators";

const router = Router();

//Creamos un nuevo parentesco
router.post("/c", validatorCreateRelationshipTypes, createRelationshipType);

//Obtenemos los datos de la base de datos
router.post("/r", readRelationshipTypes);

//Obtenemos un solo parentesco
router.post("/rs", validatorReadRelationshipTypes, readRelationshipType);

//Actualizamos un solo parentesco
router.post("/u", validatorUpdateRelationshipTypes, updateRelationshipType);

//Deshabilitamos un parentesco
router.post("/d", validatorDisableRelationshipTypes, disableRelationshipType);

//Habilitamos un parentesco
router.post("/e", validatorEnableRelationshipTypes, enableRelationshipType);

//Eliminamos un parentesco
router.post("/de", validatorDeleteRelationshipTypes, deleteRelationshipType);

export { router };
