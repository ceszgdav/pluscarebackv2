import { Request, Response } from "express"
import { AuthTransactions } from "../../transactions/EXTRAS/Auth.transactions";
import { ModulosTransaction } from "../../transactions/ADM/Modules.transactions";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { usuarioAccesosTransactions } from "../../transactions/ADM/UserAccessModules.transactions";

const obtenerModulos = async (req: Request, res: Response) => {
  const id = req.body.id
  let modulosFiltrados;
  let modulosAcceso;
  const modulos = await ModulosTransaction.obtenerModulos();
  // if (req.body.user_type === 'usuario') {
  modulosAcceso = await AuthTransactions.getModulos(id);
  modulosFiltrados = await AuthTransactions.filtrarModulos(modulosAcceso, modulos);
  // }
  // if (req.body.user_type === 'operador') {
  //   modulosAcceso = await AuthTransactions.getModulosOperator(id);
  //   modulosFiltrados = await AuthTransactions.filtrarModulos(modulosAcceso, modulos);
  // }
  // if (req.body.user_type === 'paramedico') {
  //   modulosAcceso = await AuthTransactions.getModulosParemdico(id);
  //   modulosFiltrados = await AuthTransactions.filtrarModulos(modulosAcceso, modulos);
  // }
  res.send({ modulosFiltrados });
}

const crearModulos = async (req: Request, res: Response) => {
  const modulos = await ModulosTransaction.crearModules();
  res.send(modulos);
}

const readModulos = async (req: Request, res: Response) => {
  const modulos = await ModulosTransaction.obtenerModulos();
  res.send(modulos);
}

const updateModules = async (req: Request, res: Response) => {
  try {
    const updatedModules = await usuarioAccesosTransactions.updateModules(req.body)
    handleHttpSuccess(res, true, 'Unidad creada correctamente', 201, updatedModules)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readCurrentModules = async (req: Request, res: Response) => {
  try {
    const updatedModules = await usuarioAccesosTransactions.readCurrentModules(req.body)
    handleHttpSuccess(res, true, 'Modulos encontrados correctamente', 201, updatedModules)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { obtenerModulos, crearModulos, readModulos, updateModules, readCurrentModules }