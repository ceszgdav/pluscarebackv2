import { Router } from "express";
import { createPaymentType, deletePaymentType, disablePaymentType, enablePaymentType, readPaymentType, readPaymentTypes, updatePaymentType } from "../../controllers/CAT/PaymentTypes.controller";
import { validatorCreatePaymentType, validatorDeletePaymentType, validatorDisablePaymentType, validatorEnablePaymentType, validatorReadPaymentType, validatorUpdatePaymentType } from "../../validators/CAT/PaymentTypes.validators";

const router = Router();

//Creamos un nuevo tipos de pago
router.post("/c", validatorCreatePaymentType, createPaymentType);

//Obtenemos los datos de la base de datos
router.post("/r", readPaymentTypes);

//Obtenemos un solo tipos de pago
router.post("/rs", validatorReadPaymentType, readPaymentType);

//Actualizamos un solo tipos de pago
router.post("/u", validatorUpdatePaymentType, updatePaymentType);

//Deshabilitamos un tipos de pago
router.post("/d", validatorDisablePaymentType, disablePaymentType);

//Habilitamos un tipos de pago
router.post("/e", validatorEnablePaymentType, enablePaymentType);

//Eliminamos un tipos de pago
router.post("/de", validatorDeletePaymentType, deletePaymentType);

export { router };
