import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { ParamedicTransactions } from "../../transactions/ADM/Paramedics.transaction";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createParamedic = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newParamedic = await ParamedicTransactions.createParamedic(data);
    handleHttpSuccess(res, true, 'Paramedico creado correctamente', 201, newParamedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createModuleAccess = async (req: Request, res: Response) => {
  try {
    let modules = req.body.id_module;
    let idOperator = req.body.id_user;
    const modulos = await ParamedicTransactions.assignModules(modules, idOperator);
    handleHttpSuccess(res, true, 'Accesos creados correctamente', 201, modulos)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readParamedics = async (req: Request, res: Response) => {
  try {
    const paramedics = await ParamedicTransactions.readParamedics();
    handleHttpSuccess(res, true, 'Paramedicos encontrados correctamente', 201, paramedics)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readParamedic = async (req: Request, res: Response) => {
  try {
    const paramedic = await ParamedicTransactions.readParamedic(req.body);
    handleHttpSuccess(res, true, 'Paramedico encontrado correctamente', 201, paramedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateParamedic = async (req: Request, res: Response) => {
  try {
    const paramedic = await ParamedicTransactions.updateParamedic(req.body);
    handleHttpSuccess(res, true, 'Paramedico actualizado correctamente', 201, paramedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableParamedic = async (req: Request, res: Response) => {
  try {
    const paramedic = await ParamedicTransactions.disableParamedic(req.body);
    handleHttpSuccess(res, true, 'Paramedico inhabilitado correctamente', 201, paramedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableParamedic = async (req: Request, res: Response) => {
  try {
    const paramedic = await ParamedicTransactions.enableParamedic(req.body);
    handleHttpSuccess(res, true, 'Paramedico habilitado correctamente', 201, paramedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteParamedic = async (req: Request, res: Response) => {
  try {
    const paramedic = await ParamedicTransactions.deleteParamedic(req.body);
    handleHttpSuccess(res, true, 'Paramedico eliminado correctamente', 201, paramedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createParamedic, createModuleAccess, readParamedics, readParamedic, updateParamedic, disableParamedic, enableParamedic, deleteParamedic }