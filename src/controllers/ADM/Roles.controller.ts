import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { RolTransactions } from "../../transactions/ADM/Roles.transaction";
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from "express-validator";

const createRol = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newRole = await RolTransactions.createRol(data);
    handleHttpSuccess(res, true, 'Rol creado correctamente', 201, newRole)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRoles = async (req: Request, res: Response) => {
  try {
    const allRoles = await RolTransactions.readRoles();
    handleHttpSuccess(res, true, 'Roles encontrados', 201, allRoles)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRol = async (req: Request, res: Response) => {
  try {
    const role = await RolTransactions.readRol(req.body);
    handleHttpSuccess(res, true, 'Rol encontrado correctamente', 201, role)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateRol = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req)
    const role = await RolTransactions.updateRol(data);
    handleHttpSuccess(res, true, 'Rol actualizado correctamente', 201, role)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableRol = async (req: Request, res: Response) => {
  try {
    const role = await RolTransactions.disableRol(req.body);
    handleHttpSuccess(res, true, 'Rol deshabilitado correctamente', 201, role)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableRol = async (req: Request, res: Response) => {
  try {
    const role = await RolTransactions.enableRol(req.body);
    handleHttpSuccess(res, true, 'Rol habilitado correctamente', 201, role)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteRol = async (req: Request, res: Response) => {
  try {
    const role = await RolTransactions.deleteRol(req.body);
    handleHttpSuccess(res, true, 'Rol eliminado correctamente', 201, role)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createRol, readRoles, readRol, updateRol, disableRol, enableRol, deleteRol }