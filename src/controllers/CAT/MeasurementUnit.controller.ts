import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { MeasurementUnitTransactions } from "../../transactions/CAT/MeasurementUnit.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createMeasurementUnit = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newMu = await MeasurementUnitTransactions.createMeasurementUnit(data);
    handleHttpSuccess(res, true, 'Unidad de medida creada correctamente', 201, newMu)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMeasurementUnits = async (req: Request, res: Response) => {
  try {
    const measurementUnits = await MeasurementUnitTransactions.readMeasurementUnits();
    handleHttpSuccess(res, true, 'Unidades de medida encontradas correctamente', 201, measurementUnits)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMeasurementUnit = async (req: Request, res: Response) => {
  try {
    const measurementUnit = await MeasurementUnitTransactions.readMeasurementUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad de medida encontrada correctamente', 201, measurementUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateMeasurementUnit = async (req: Request, res: Response) => {
  try {
    const measurementUnit = await MeasurementUnitTransactions.updateMeasurementUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad de medida actualizada correctamente', 201, measurementUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableMeasurementUnit = async (req: Request, res: Response) => {
  try {
    const measurementUnit = await MeasurementUnitTransactions.disableMeasurementUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad de medida deshabilitada correctamente', 201, measurementUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableMeasurementUnit = async (req: Request, res: Response) => {
  try {
    const measurementUnit = await MeasurementUnitTransactions.enableMeasurementUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad de medida habilitada correctamente', 201, measurementUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteMeasurementUnit = async (req: Request, res: Response) => {
  try {
    const measurementUnit = await MeasurementUnitTransactions.deleteMeasurementUnit(req.body);
    handleHttpSuccess(res, true, 'Unidad de medida eliminada correctamente', 201, measurementUnit)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createMeasurementUnit, readMeasurementUnits, readMeasurementUnit, updateMeasurementUnit, disableMeasurementUnit, enableMeasurementUnit, deleteMeasurementUnit }