import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { MedicinesTransactions } from "../../transactions/ADM/Medicines.transaction";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createMedicine = async (req: Request, res: Response) => {
  try {
    let medicine = matchedData(req);
    let uuid = uuidv4();
    medicine = { ...medicine, uuid }
    const newMedicine = await MedicinesTransactions.createMedicine(medicine);
    handleHttpSuccess(res, true, 'Medicina creada correctamente', 201, newMedicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await MedicinesTransactions.readMedicines();
    handleHttpSuccess(res, true, 'Medicinas encontradas correctamente', 201, medicines)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await MedicinesTransactions.readMedicine(req.body);
    handleHttpSuccess(res, true, 'Medicina encontrada correctamente', 201, medicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await MedicinesTransactions.updateMedicine(req.body);
    handleHttpSuccess(res, true, 'Medicina actualizada correctamente', 201, medicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await MedicinesTransactions.disableMedicine(req.body);
    handleHttpSuccess(res, true, 'Medicina deshabilitada correctamente', 201, medicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await MedicinesTransactions.enableMedicine(req.body);
    handleHttpSuccess(res, true, 'Medicina habilitada correctamente', 201, medicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await MedicinesTransactions.deleteMedicine(req.body);
    handleHttpSuccess(res, true, 'Medicina eliminada correctamente', 201, medicine)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createMedicine, readMedicines, readMedicine, updateMedicine, disableMedicine, enableMedicine, deleteMedicine }