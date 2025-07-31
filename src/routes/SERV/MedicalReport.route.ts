import { Router } from "express";
import { createMedicalReport, readMedicalReports, readMedicalReport } from "../../controllers/SERV/MedicalReport.Controller";

const router = Router();

//Creamos un nuevo incidente
router.post("/c", createMedicalReport);

router.post("/r", readMedicalReports)
router.post("/rs", readMedicalReport)
export { router };
