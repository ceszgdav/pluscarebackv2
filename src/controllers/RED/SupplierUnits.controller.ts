import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { supplierUnitsTransactions } from "../../transactions/RED/SupplierUnits.transactions";

const uploadUnit = async (req: any, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.files;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.uploadSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createSupplierUnits = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.createSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateSupplierUnits = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.updateSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor actualizado correctamente', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierUnitss = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.readSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Unidades encontrados', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierUnits = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.readSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor encontrado', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteSupplierUnits = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const unidad = await supplierUnitsTransactions.deleteSupplierUnits(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor eliminado correctamente', 201, unidad)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { uploadUnit, createSupplierUnits, updateSupplierUnits, readSupplierUnitss, readSupplierUnits, deleteSupplierUnits }