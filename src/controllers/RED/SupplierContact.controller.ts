import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { supplierContactTransactions } from "../../transactions/RED/SupplierContact.transactions";

const createSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.createSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createSupplierSingleContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.createSingleSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.updateSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor actualizado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierContacts = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.readSupplierContacts(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedors encontrados', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.readSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor encontrado', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.disableSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor deshabilitado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.enableSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor habilitado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteSupplierContact = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const contactoProveedor = await supplierContactTransactions.deleteSupplierContact(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor eliminado correctamente', 201, contactoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createSupplierContact, createSupplierSingleContact, updateSupplierContact, readSupplierContacts, readSupplierContact, disableSupplierContact, enableSupplierContact, deleteSupplierContact }