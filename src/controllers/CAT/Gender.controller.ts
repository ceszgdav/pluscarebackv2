import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { GenderTransactions } from "../../transactions/CAT/Gender.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createGender = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newGender = await GenderTransactions.createGender(data);
    handleHttpSuccess(res, true, 'Género creado correctamente', 201, newGender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readGenders = async (req: Request, res: Response) => {
  try {
    const genders = await GenderTransactions.readGenders();
    handleHttpSuccess(res, true, 'Géneros encontrados correctamente', 201, genders)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readGender = async (req: Request, res: Response) => {
  try {
    const gender = await GenderTransactions.readGender(req.body);
    handleHttpSuccess(res, true, 'Género encontrado correctamente', 201, gender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateGender = async (req: Request, res: Response) => {
  try {
    const gender = await GenderTransactions.updateGender(req.body);
    handleHttpSuccess(res, true, 'Género actualizado correctamente', 201, gender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableGender = async (req: Request, res: Response) => {
  try {
    const gender = await GenderTransactions.disableGender(req.body);
    handleHttpSuccess(res, true, 'Género deshabilitado correctamente', 201, gender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableGender = async (req: Request, res: Response) => {
  try {
    const gender = await GenderTransactions.enableGender(req.body);
    handleHttpSuccess(res, true, 'Género habilitado correctamente', 201, gender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteGender = async (req: Request, res: Response) => {
  try {
    const gender = await GenderTransactions.deleteGender(req.body);
    handleHttpSuccess(res, true, 'Género eliminado correctamente', 201, gender)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createGender, readGenders, readGender, updateGender, disableGender, enableGender, deleteGender }