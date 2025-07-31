import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { MedicsTransactions } from "../../transactions/RED/Medics.transactions";

const createMedic = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    let newMedic = await MedicsTransactions.createMedics(data);
    // newMedic = await MedicsTransactions.readMedic(newMedic);
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, newMedic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const uploadFile = async (req: Request, res: Response) => {
  let file: any = req
  let filename = file.file.filename
  handleHttpSuccess(res, true, 'Imagen cargada correctamente', 201, filename)

  return filename;
}

const readMedics = async (req: Request, res: Response) => {
  try {
    const Medic = await MedicsTransactions.readMedics();
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, Medic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedic = async (req: Request, res: Response) => {
  try {
    const Medic = await MedicsTransactions.readSingleMedic(req.body);
    handleHttpSuccess(res, true, 'Repartidor encontrado correctamente', 201, Medic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateMedic = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    const Medic = await MedicsTransactions.updateMedic(data);
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, Medic)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableMedic = async (req: Request, res: Response) => {
  try {
    const insurance = await MedicsTransactions.disableMedic(req.body);
    handleHttpSuccess(res, true, 'Aseguradora deshabilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableMedic = async (req: Request, res: Response) => {
  try {
    const insurance = await MedicsTransactions.enableMedic(req.body);
    handleHttpSuccess(res, true, 'Aseguradora habilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteMedic = async (req: Request, res: Response) => {
  try {
    const insurance = await MedicsTransactions.deleteMedic(req.body);
    handleHttpSuccess(res, true, 'Aseguradora eliminada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const filterMedic = async (req: Request, res: Response) => {
  try {
    const insurance = await MedicsTransactions.filterMedic(req.body);
    handleHttpSuccess(res, true, 'datos filtrados correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export {
  createMedic, uploadFile, readMedics, readMedic, updateMedic, disableMedic, enableMedic, deleteMedic, filterMedic
}