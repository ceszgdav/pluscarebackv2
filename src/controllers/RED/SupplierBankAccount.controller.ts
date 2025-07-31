import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { supplierBankAccountTransactions } from "../../transactions/RED/SupplierBankAccount.transactions";

const createSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.createSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}
const createSupplierSingleBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.createSingleSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.updateSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor actualizado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierBankAccounts = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.readSupplierBankAccounts(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedors encontrados', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.readSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor encontrado', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.disableSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor deshabilitado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.enableSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor habilitado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteSupplierBankAccount = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierBankAccountTransactions.deleteSupplierBankAccount(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor eliminado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createSupplierBankAccount, createSupplierSingleBankAccount, updateSupplierBankAccount, readSupplierBankAccounts, readSupplierBankAccount, disableSupplierBankAccount, enableSupplierBankAccount, deleteSupplierBankAccount }