import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { SatisfactionTransactions } from "../../transactions/SERV/Satisfaction.transaction";

const createSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.createSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const storeSignsIncident = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const newIncident = await SatisfactionTransactions.updateSignIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, newIncident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.updateSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado actualizado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSatisfactions = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.readSatisfactions();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedores encontrados', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.readSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado encontrado', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const uploadUnitsFiles = async (req: any, res: Response) => {
  try {
    const files: any = req.files; // Esto será un array de archivos
    if (!files || files.length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }
    let filesNames: any[] = []
    for (const file of files) {
      filesNames.push(file.filename)
    }
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado encontrado', 201, filesNames)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.disableSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado deshabilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.enableSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado habilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteSatisfaction = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await SatisfactionTransactions.deleteSatisfaction(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado eliminado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createSatisfaction, storeSignsIncident, updateSatisfaction, readSatisfactions, uploadUnitsFiles, readSatisfaction, disableSatisfaction, enableSatisfaction, deleteSatisfaction }