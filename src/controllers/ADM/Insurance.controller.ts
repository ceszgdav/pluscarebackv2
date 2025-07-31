import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { InsuranceTransactions } from "../../transactions/ADM/Insurance.transaction";

const createInsurance = async (req: Request, res: Response) => {
  try {
    let insurance = matchedData(req);
    let uuid = uuidv4();
    insurance = { ...insurance, uuid }
    const newInsurance = await InsuranceTransactions.createInsurance(insurance);
    handleHttpSuccess(res, true, 'Aseguradora creada correctamente', 201, newInsurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readInsurances = async (req: Request, res: Response) => {
  try {
    const insurances = await InsuranceTransactions.readInsurances();
    handleHttpSuccess(res, true, 'Aseguradoras encontradas correctamente', 201, insurances)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readInsurance = async (req: Request, res: Response) => {
  try {
    const insurance = await InsuranceTransactions.readInsurance(req.body);
    handleHttpSuccess(res, true, 'Aseguradora encontrada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateInsurance = async (req: Request, res: Response) => {
  try {
    const insurance = await InsuranceTransactions.updateInsurance(req.body);
    handleHttpSuccess(res, true, 'Aseguradora actualizada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableInsurance = async (req: Request, res: Response) => {
  try {
    const insurance = await InsuranceTransactions.disableInsurance(req.body);
    handleHttpSuccess(res, true, 'Aseguradora deshabilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableInsurance = async (req: Request, res: Response) => {
  try {
    const insurance = await InsuranceTransactions.enableInsurance(req.body);
    handleHttpSuccess(res, true, 'Aseguradora habilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteInsurance = async (req: Request, res: Response) => {
  try {
    const insurance = await InsuranceTransactions.deleteInsurance(req.body);
    handleHttpSuccess(res, true, 'Aseguradora eliminada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createInsurance, readInsurances, readInsurance, updateInsurance, disableInsurance, enableInsurance, deleteInsurance }