import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { OperatorTransactions } from "../../transactions/ADM/Operators.transaction";
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from "express-validator";

const createOperator = async (req: Request, res: Response) => {
  try {
    let opeatorData = matchedData(req);
    let uuid = uuidv4();
    opeatorData = { ...opeatorData, uuid }
    const newOperator = await OperatorTransactions.createOperator(opeatorData);
    handleHttpSuccess(res, true, 'Operador creado correctamente', 201, newOperator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createModuleAccess = async (req: Request, res: Response) => {
  try {
    let modules = req.body.id_module;
    let idOperator = req.body.id_user;
    const modulos = await OperatorTransactions.assignModules(modules, idOperator);
    handleHttpSuccess(res, true, 'Accesos creados correctamente', 201, modulos)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readOperators = async (req: Request, res: Response) => {
  try {
    const newOperator = await OperatorTransactions.readOperators();
    handleHttpSuccess(res, true, 'Operadores encontrados correctamente', 201, newOperator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readOperator = async (req: Request, res: Response) => {
  try {
    const operator = await OperatorTransactions.readOperator(req.body);
    handleHttpSuccess(res, true, 'Operador encontrado correctamente', 201, operator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateOperator = async (req: Request, res: Response) => {
  try {
    let opeatorData = matchedData(req);
    const operator = await OperatorTransactions.updateOperator(opeatorData);
    handleHttpSuccess(res, true, 'Operador actualizado correctamente', 201, operator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableOperator = async (req: Request, res: Response) => {
  try {
    const operator = await OperatorTransactions.disableOperator(req.body);
    handleHttpSuccess(res, true, 'Operador inhabilitado correctamente', 201, operator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableOperator = async (req: Request, res: Response) => {
  try {
    const operator = await OperatorTransactions.enableOperator(req.body);
    handleHttpSuccess(res, true, 'Operador habilitado correctamente', 201, operator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteOperator = async (req: Request, res: Response) => {
  try {
    const operator = await OperatorTransactions.deleteOperator(req.body);
    handleHttpSuccess(res, true, 'Operador eliminado correctamente', 201, operator)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createOperator, createModuleAccess, readOperators, readOperator, updateOperator, disableOperator, enableOperator, deleteOperator }