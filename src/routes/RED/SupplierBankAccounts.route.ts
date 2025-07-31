import { Router } from "express";
import { validatorCreateSingleSupplierBankAccount, validatorCreateSupplierBankAccount, validatorDeleteSupplierBankAccount, validatorDisableSupplierBankAccount, validatorEnableSupplierBankAccount, validatorReadSupplierBankAccount, validatorReadSupplierBankAccounts, validatorUpdateSupplierBankAccount } from "../../validators/RED/SupplierBankAccount.validator";
import { createSupplierBankAccount, createSupplierSingleBankAccount, deleteSupplierBankAccount, disableSupplierBankAccount, enableSupplierBankAccount, readSupplierBankAccount, readSupplierBankAccounts, updateSupplierBankAccount } from "../../controllers/RED/SupplierBankAccount.controller";

const router = Router();

router.post("/c", validatorCreateSupplierBankAccount, createSupplierBankAccount);

router.post("/cs", validatorCreateSingleSupplierBankAccount, createSupplierSingleBankAccount);

router.post("/r", validatorReadSupplierBankAccounts, readSupplierBankAccounts);

router.post("/ri", validatorReadSupplierBankAccount, readSupplierBankAccount);

router.post("/u", validatorUpdateSupplierBankAccount, updateSupplierBankAccount);

router.post("/d", validatorDisableSupplierBankAccount, disableSupplierBankAccount);

router.post("/e", validatorEnableSupplierBankAccount, enableSupplierBankAccount);

router.post("/de", validatorDeleteSupplierBankAccount, deleteSupplierBankAccount);

export { router };
