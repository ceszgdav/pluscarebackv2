import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { ServicePaperTransactions } from "../../transactions/SERV/ServicePaper.transaction";

const createServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.createServicePaper(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createServicePaperAtHome = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.createServicePaperAtHome(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.updateServicePaper(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado actualizado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServicePapers = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.readServicePapers();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedores encontrados', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.readServicePaper(data);
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

const disableServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.disableServicePaper(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado deshabilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.enableServicePaper(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado habilitado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteServicePaper = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const servicioProgramado = await ServicePaperTransactions.deleteServicePaper(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado eliminado correctamente', 201, servicioProgramado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const searchMedicAtHomeService = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body
    //Pasamos la data a la transacción para ingresarla en la base de datos
    let servicioProgramado = await ServicePaperTransactions.readServicePaperAtHome(data);
    console.log(servicioProgramado)
    if (servicioProgramado !== 'error') {
      //Retornamos success o error
      handleHttpSuccess(res, true, 'Servicio programado encontrado', 201, servicioProgramado)
    } else {
      handleHttpSuccess(res, false, 'Al parecer ya existe un reporte con este expediente o no existe el expediente.', 201, null)
    }
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createServicePaper, createServicePaperAtHome, updateServicePaper, readServicePapers, uploadUnitsFiles, readServicePaper, disableServicePaper, enableServicePaper, deleteServicePaper, searchMedicAtHomeService }