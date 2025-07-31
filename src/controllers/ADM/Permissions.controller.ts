import { Permissions } from './../../entity/ADM/Permissions';
import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { PermissionsTransactions } from '../../transactions/ADM/Permissions.transactions';

const createPermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.createPermission(data);
    //Creamos la variable que contendrá el id del permission creado
    const permissionId = permission.uuid;
    //Obtenemos el permission creado
    const permissionCreado = await PermissionsTransactions.readPermission({ uuid: permissionId })
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro creado correctamente', 201, permissionCreado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const createPermissionTests = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.createPermissionTests();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro creado correctamente', 201, 'permissionCreado')
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updatePermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.updatePermission(data);
    //Creamos la variable que contendrá el id del permission creado
    const permissionId = data.uuid;
    //Obtenemos el permission actualizado
    const permissionActualizado = await PermissionsTransactions.readPermission({ uuid: permissionId })
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro actualizado correctamente', 201, permissionActualizado)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readPermissions = async (req: Request, res: Response) => {
  try {
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.readPermissions();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registros encontrados', 201, permission)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readPermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.readPermission(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro encontrado', 201, permission)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disablePermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    await PermissionsTransactions.disablePermission(data);
    //Obtenemos el permission actualizado
    const permission = await PermissionsTransactions.readPermission(data)
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro deshabilitado correctamente', 201, permission)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enablePermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    await PermissionsTransactions.enablePermission(data);
    //Obtenemos el permission actualizado
    const permission = await PermissionsTransactions.readPermission(data)
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro habilitado correctamente', 201, permission)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deletePermission = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const permission = await PermissionsTransactions.deletePermission(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Registro eliminado correctamente', 201, permission)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createPermission, createPermissionTests, updatePermission, readPermissions, readPermission, disablePermission, enablePermission, deletePermission }