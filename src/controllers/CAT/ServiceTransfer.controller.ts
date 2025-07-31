import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { ServiceTransfersTransactions } from "../../transactions/CAT/ServiceTransfer.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createServiceTransfer = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newServiceTransfer = await ServiceTransfersTransactions.createServiceTransfer(data);
    handleHttpSuccess(res, true, 'Servicio creado correctamente', 201, newServiceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServiceTransfers = async (req: Request, res: Response) => {
  try {
    const serviceTransfers = await ServiceTransfersTransactions.readServiceTransfers();
    handleHttpSuccess(res, true, 'Servicios encontrados correctamente', 201, serviceTransfers)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServiceTransfer = async (req: Request, res: Response) => {
  try {
    const serviceTransfer = await ServiceTransfersTransactions.readServiceTransfer(req.body);
    handleHttpSuccess(res, true, 'Servicio encontrado correctamente', 201, serviceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateServiceTransfer = async (req: Request, res: Response) => {
  try {
    const serviceTransfer = await ServiceTransfersTransactions.updateServiceTransfers(req.body);
    handleHttpSuccess(res, true, 'Servicio actualizado correctamente', 201, serviceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableServiceTransfer = async (req: Request, res: Response) => {
  try {
    const serviceTransfer = await ServiceTransfersTransactions.disableServiceTransfers(req.body);
    handleHttpSuccess(res, true, 'Servicio deshabilitado correctamente', 201, serviceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableServiceTransfer = async (req: Request, res: Response) => {
  try {
    const serviceTransfer = await ServiceTransfersTransactions.enableServiceTransfers(req.body);
    handleHttpSuccess(res, true, 'Servicio habilitado correctamente', 201, serviceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteServiceTransfer = async (req: Request, res: Response) => {
  try {
    const serviceTransfer = await ServiceTransfersTransactions.deleteServiceTransfers(req.body);
    handleHttpSuccess(res, true, 'Servicio eliminado correctamente', 201, serviceTransfer)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createServiceTransfer, readServiceTransfers, readServiceTransfer, updateServiceTransfer, disableServiceTransfer, enableServiceTransfer, deleteServiceTransfer }