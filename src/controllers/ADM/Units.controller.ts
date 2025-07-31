import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { UnitTransactions } from "../../transactions/ADM/Units.transaction";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createUnit = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newUnit = await UnitTransactions.createUnit(data);
    handleHttpSuccess(res, true, 'Unidad creada correctamente', 201, newUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readUnits = async (req: Request, res: Response) => {
  try {
    const units = await UnitTransactions.readUnits();
    handleHttpSuccess(res, true, 'Unidades encontradas correctamente', 201, units)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readUnit = async (req: Request, res: Response) => {
  try {
    const unit = await UnitTransactions.readUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad encontrada correctamente', 201, unit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateUnit = async (req: Request, res: Response) => {
  try {
    const unit = await UnitTransactions.updateUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad actualizada correctamente', 201, unit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableUnit = async (req: Request, res: Response) => {
  try {
    const unit = await UnitTransactions.disableUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad deshabilitada correctamente', 201, unit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableUnit = async (req: Request, res: Response) => {
  try {
    const unit = await UnitTransactions.enableUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad habilitada correctamente', 201, unit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteUnit = async (req: Request, res: Response) => {
  try {
    const unit = await UnitTransactions.deleteUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad eliminada correctamente', 201, unit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createUnit, readUnits, readUnit, updateUnit, disableUnit, enableUnit, deleteUnit }