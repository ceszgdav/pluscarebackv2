import { Router } from "express";
import { createPaymentCredit, readPaymentCredit } from "../../controllers/ADM/PaymentCredit.controller";

const router = Router();

//Creamos un nuevo aseguradoras
router.post("/c", createPaymentCredit);

//Obtenemos los datos de la base de datos
router.post("/r", readPaymentCredit);

export { router };
