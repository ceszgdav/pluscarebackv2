import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { RightfulTransactions } from "../../transactions/CAT/Rightfuls.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createRightful = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newRightful = await RightfulTransactions.createRightful(data);
    handleHttpSuccess(res, true, 'Derechohabiente creado correctamente', 201, newRightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRightfuls = async (req: Request, res: Response) => {
  try {
    const rightfuls = await RightfulTransactions.readRightfuls();
    handleHttpSuccess(res, true, 'Derechohabiente encontrados correctamente', 201, rightfuls)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRightful = async (req: Request, res: Response) => {
  try {
    const rightful = await RightfulTransactions.readRightful(req.body);
    handleHttpSuccess(res, true, 'Derechohabiente encontrado correctamente', 201, rightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateRightful = async (req: Request, res: Response) => {
  try {
    const rightful = await RightfulTransactions.updateRightful(req.body);
    handleHttpSuccess(res, true, 'Derechohabiente actualizado correctamente', 201, rightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableRightful = async (req: Request, res: Response) => {
  try {
    const rightful = await RightfulTransactions.disableRightful(req.body);
    handleHttpSuccess(res, true, 'Derechohabiente deshabilitado correctamente', 201, rightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableRightful = async (req: Request, res: Response) => {
  try {
    const rightful = await RightfulTransactions.enableRightful(req.body);
    handleHttpSuccess(res, true, 'Derechohabiente habilitado correctamente', 201, rightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteRightful = async (req: Request, res: Response) => {
  try {
    const rightful = await RightfulTransactions.deleteRightful(req.body);
    handleHttpSuccess(res, true, 'Derechohabiente eliminado correctamente', 201, rightful)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createRightful, readRightfuls, readRightful, updateRightful, disableRightful, enableRightful, deleteRightful }