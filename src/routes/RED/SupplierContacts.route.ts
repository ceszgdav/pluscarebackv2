import { Router } from "express";
import { validatorCreateSingleSupplierContact, validatorCreateSupplierContact, validatorDeleteSupplierContact, validatorDisableSupplierContact, validatorEnableSupplierContact, validatorReadSupplierContact, validatorReadSupplierContacts, validatorUpdateSupplierContact } from "../../validators/RED/SupplierContact.validator";
import { createSupplierContact, createSupplierSingleContact, deleteSupplierContact, disableSupplierContact, enableSupplierContact, readSupplierContact, readSupplierContacts, updateSupplierContact } from "../../controllers/RED/SupplierContact.controller";

const router = Router();

router.post("/c", validatorCreateSupplierContact, createSupplierContact);

router.post("/cs", validatorCreateSingleSupplierContact, createSupplierSingleContact);

router.post("/r", validatorReadSupplierContacts, readSupplierContacts);

router.post("/ri", validatorReadSupplierContact, readSupplierContact);

router.post("/u", validatorUpdateSupplierContact, updateSupplierContact);

router.post("/d", validatorDisableSupplierContact, disableSupplierContact);

router.post("/e", validatorEnableSupplierContact, enableSupplierContact);

router.post("/de", validatorDeleteSupplierContact, deleteSupplierContact);

export { router };
