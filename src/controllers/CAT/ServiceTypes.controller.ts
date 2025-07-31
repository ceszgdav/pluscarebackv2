import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { ServiceTypesTransactions } from "../../transactions/CAT/ServiceTypes.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createServiceType = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newServiceType = await ServiceTypesTransactions.createServiceType(data);
    handleHttpSuccess(res, true, 'Servicio creado correctamente', 201, newServiceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServiceTypes = async (req: Request, res: Response) => {
  try {
    const serviceTypes = await ServiceTypesTransactions.readServiceTypes();
    handleHttpSuccess(res, true, 'Servicios encontrados correctamente', 201, serviceTypes)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServiceType = async (req: Request, res: Response) => {
  try {
    const serviceType = await ServiceTypesTransactions.readServiceType(req.body);
    handleHttpSuccess(res, true, 'Servicio encontrado correctamente', 201, serviceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateServiceType = async (req: Request, res: Response) => {
  try {
    const serviceType = await ServiceTypesTransactions.updateServiceTypes(req.body);
    handleHttpSuccess(res, true, 'Servicio actualizado correctamente', 201, serviceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableServiceType = async (req: Request, res: Response) => {
  try {
    const serviceType = await ServiceTypesTransactions.disableServiceTypes(req.body);
    handleHttpSuccess(res, true, 'Servicio deshabilitado correctamente', 201, serviceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableServiceType = async (req: Request, res: Response) => {
  try {
    const serviceType = await ServiceTypesTransactions.enableServiceTypes(req.body);
    handleHttpSuccess(res, true, 'Servicio habilitado correctamente', 201, serviceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteServiceType = async (req: Request, res: Response) => {
  try {
    const serviceType = await ServiceTypesTransactions.deleteServiceTypes(req.body);
    handleHttpSuccess(res, true, 'Servicio eliminado correctamente', 201, serviceType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createServiceType, readServiceTypes, readServiceType, updateServiceType, disableServiceType, enableServiceType, deleteServiceType }