import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { supplierTransactions } from "../../transactions/RED/Supplier.transactions";

const createSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.createSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.updateSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor actualizado correctamente', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSuppliers = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.readSuppliers();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedores encontrados', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.readSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor encontrado', 201, proveedor)
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
    handleHttpSuccess(res, true, 'Proveedor encontrado', 201, filesNames)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.disableSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor deshabilitado correctamente', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.enableSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor habilitado correctamente', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteSupplier = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const proveedor = await supplierTransactions.deleteSupplier(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor eliminado correctamente', 201, proveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const filterSupplier = async (req: Request, res: Response) => {
  try {
    const insurance = await supplierTransactions.filterSupplier(req.body);
    handleHttpSuccess(res, true, 'datos filtrados correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createSupplier, updateSupplier, readSuppliers, uploadUnitsFiles, readSupplier, disableSupplier, enableSupplier, deleteSupplier, filterSupplier }