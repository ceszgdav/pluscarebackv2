import { Router } from "express";
import { createDeliveryMedications, readDeliveryMedicationsAll, setDeliveryMedicationsPayment } from "../../controllers/SERV/DeliveryMedications.controller";
import { uploadVoucherMiddleware } from "../../utils/handleStoragePayment";
import { uploadFile } from "../../controllers/RED/Delivers.Controller";

const router = Router();

//Creamos un nuevo incidente
router.post("/create-delivery", createDeliveryMedications);
//Creamos un nuevo incidente
router.post("/read-deliveries", readDeliveryMedicationsAll);

router.post("/set-payment", setDeliveryMedicationsPayment);

router.post("/upload-voucher", uploadVoucherMiddleware.single('myFile'), uploadFile);

export { router };
