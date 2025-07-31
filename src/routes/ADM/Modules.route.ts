import { Router } from "express";
import { crearModulos, obtenerModulos, readCurrentModules, readModulos, updateModules } from "../../controllers/ADM/Modules.controller";

const router = Router();

// router.post("/obtenerModulos/:id", obtenerModulos);
router.post("/obtenerModulos", obtenerModulos);
router.post("/crearModulos", crearModulos);
router.post("/r", readModulos)
router.post('/em', updateModules)
router.post('/rma', readCurrentModules)

export { router };
