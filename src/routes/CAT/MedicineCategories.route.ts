import { Router } from "express";
import { createMedicineCategory, deleteMedicineCategory, disableMedicineCategory, enableMedicineCategory, readMedicineCategories, readMedicineCategory, updateMedicineCategory } from "../../controllers/CAT/MedicinesCategories.controller";
import { validatorCreateMedicineCategories, validatorDeleteMedicineCategories, validatorDisableMedicineCategories, validatorEnableMedicineCategories, validatorReadMedicineCategories, validatorUpdateMedicineCategories } from "../../validators/CAT/MedicineVategories.validators";

const router = Router();

//Creamos un nuevo categoria de medicinas
router.post("/c", validatorCreateMedicineCategories, createMedicineCategory);

//Obtenemos los datos de la base de datos
router.post("/r", readMedicineCategories);

//Obtenemos un solo categoria de medicinas
router.post("/rs", validatorReadMedicineCategories, readMedicineCategory);

//Actualizamos un solo categoria de medicinas
router.post("/u", validatorUpdateMedicineCategories, updateMedicineCategory);

//Deshabilitamos un categoria de medicinas
router.post("/d", validatorDisableMedicineCategories, disableMedicineCategory);

//Habilitamos un categoria de medicinas
router.post("/e", validatorEnableMedicineCategories, enableMedicineCategory);

//Eliminamos un categoria de medicinas
router.post("/de", validatorDeleteMedicineCategories, deleteMedicineCategory);

export { router };
