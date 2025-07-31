import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { programmedServiceTransactions } from "../../transactions/SERV/ProgrammedService.transactions";

const createProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.createProgrammedService(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.updateProgrammedService(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado actualizado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readProgrammedServices = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.readProgrammedServices();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedores encontrados', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.readProgrammedService(data);
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

const disableProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.disableProgrammedService(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado deshabilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.enableProgrammedService(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado habilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteProgrammedService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await programmedServiceTransactions.deleteProgrammedService(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado eliminado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createProgrammedService, updateProgrammedService, readProgrammedServices, uploadUnitsFiles, readProgrammedService, disableProgrammedService, enableProgrammedService, deleteProgrammedService }