import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { UserTransactions } from "../../transactions/ADM/Users.transaction";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from "express-validator";

const createUser = async (req: Request, res: Response) => {
  try {
    let userData = matchedData(req);
    let uuid = uuidv4();
    userData = { ...userData, uuid }
    const newUser = await UserTransactions.createUser(userData);
    await UserTransactions.assignModules(userData.id_module, newUser.id);
    handleHttpSuccess(res, true, 'Usuario creado correctamente', 201, newUser)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readUsers = async (req: Request, res: Response) => {
  try {
    const user = await UserTransactions.readUsers();
    handleHttpSuccess(res, true, 'Usuario encontrado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readUser = async (req: Request, res: Response) => {
  try {
    const userData = matchedData(req)
    const user = await UserTransactions.readUser(userData);
    handleHttpSuccess(res, true, 'Usuario creado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = matchedData(req)
    const user = await UserTransactions.updateUser(userData);
    handleHttpSuccess(res, true, 'Usuario actualizado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableUser = async (req: Request, res: Response) => {
  try {
    const userData = matchedData(req)
    const user = await UserTransactions.disableUser(userData);
    handleHttpSuccess(res, true, 'Usuario inhabilitado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableUser = async (req: Request, res: Response) => {
  try {
    const userData = matchedData(req)
    const user = await UserTransactions.enableUser(userData);
    handleHttpSuccess(res, true, 'Usuario habilitado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userData = matchedData(req)
    const user = await UserTransactions.deleteUser(userData);
    handleHttpSuccess(res, true, 'Usuario eliminado correctamente', 201, user)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createUser, readUsers, readUser, updateUser, disableUser, enableUser, deleteUser }