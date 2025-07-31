import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { MedicineCategoryTransactions } from "../../transactions/CAT/MedicinesCategories.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createMedicineCategory = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newMedicineCategory = await MedicineCategoryTransactions.createMedicineCategory(data);
    handleHttpSuccess(res, true, 'categoría de medicamento creada correctamente', 201, newMedicineCategory)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicineCategories = async (req: Request, res: Response) => {
  try {
    const newMedicineCategory = await MedicineCategoryTransactions.readMedicineCategories();
    handleHttpSuccess(res, true, 'categorías de medicamento encontradas correctamente', 201, newMedicineCategory)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicineCategory = async (req: Request, res: Response) => {
  try {
    const medicineCateogry = await MedicineCategoryTransactions.readMedicineCategory(req.body);
    handleHttpSuccess(res, true, 'categoría de medicamento encontrada correctamente', 201, medicineCateogry)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateMedicineCategory = async (req: Request, res: Response) => {
  try {
    const medicineCateogry = await MedicineCategoryTransactions.updateMedicineCategory(req.body);
    handleHttpSuccess(res, true, 'categoría de medicamento actualizada correctamente', 201, medicineCateogry)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableMedicineCategory = async (req: Request, res: Response) => {
  try {
    const medicineCateogry = await MedicineCategoryTransactions.disableMedicineCategory(req.body);
    handleHttpSuccess(res, true, 'categoría de medicamento deshabilitada correctamente', 201, medicineCateogry)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableMedicineCategory = async (req: Request, res: Response) => {
  try {
    const medicineCateogry = await MedicineCategoryTransactions.enableMedicineCategory(req.body);
    handleHttpSuccess(res, true, 'categoría de medicamento habilitada correctamente', 201, medicineCateogry)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteMedicineCategory = async (req: Request, res: Response) => {
  try {
    const medicineCateogry = await MedicineCategoryTransactions.deleteMedicineCategory(req.body);
    handleHttpSuccess(res, true, 'categoría de medicamento eliminada correctamente', 201, medicineCateogry)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createMedicineCategory, readMedicineCategories, readMedicineCategory, updateMedicineCategory, disableMedicineCategory, enableMedicineCategory, deleteMedicineCategory }