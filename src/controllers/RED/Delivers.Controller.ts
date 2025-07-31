import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { DeliversTransactions } from "../../transactions/RED/Delivers.transactions";

const createDeliver = async (req: Request, res: Response) => {
  try {
    let uuid = uuidv4();
    let data = req.body;
    let deliveInfo = {
      "uuid": uuid,
      "name": data.name,
      "phone": data.phone,
      "state": data.state,
      "price": data.price,
      "ineFront": data.ineFront,
      "ineBack": data.ineBack,
      "created_by": data.created_by
    }
    const newDeliver = await DeliversTransactions.createDelivers(deliveInfo);
    let bankAccount = data.bank_account
    let deliver_id = newDeliver.id
    let created_by = data.created_by
    if (bankAccount.length > 0) {
      bankAccount.forEach(async (element) => {
        let uuid = uuidv4();
        element = { ...element, deliver_id, uuid, created_by }
        await DeliversTransactions.createBankAccount(element);
      });
    }
    let coverageList = data.coverage
    await DeliversTransactions.createCoverage(coverageList, deliver_id, created_by);
    let availabilityList = data.available_dates
    await DeliversTransactions.createAvailability(availabilityList, deliver_id, created_by)

    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, newDeliver)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const uploadFile = async (req: Request, res: Response) => {
  let file: any = req
  let filename = file.file.filename
  handleHttpSuccess(res, true, 'Imagen cargada correctamente', 201, filename)

  return filename;
}

const readDelivers = async (req: Request, res: Response) => {
  try {
    const deliver = await DeliversTransactions.readDelivers();
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, deliver)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readDeliversToPay = async (req: Request, res: Response) => {
  try {
    const deliver = await DeliversTransactions.readDeliversToPay(req.body);
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, deliver)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readDeliver = async (req: Request, res: Response) => {
  try {
    const deliver = await DeliversTransactions.readDeliver(req.body);
    handleHttpSuccess(res, true, 'Repartidor encontrado correctamente', 201, deliver)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateDeliver = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let deliveInfo = {
      "uuid": data.uuid,
      "name": data.name,
      "phone": data.phone,
      "state": data.state,
      "price": data.price,
      "ineFront": data.ineFront,
      "ineBack": data.ineBack,
      "updated_by": data.updated_by
    }
    let bankAccount = data.bank_account
    let coverageList = data.coverage
    const deliver = await DeliversTransactions.updateDeliver(deliveInfo);
    await DeliversTransactions.updateDeliverBankAccount(bankAccount)
    let created_by = data.updated_by

    await DeliversTransactions.createCoverage(coverageList, deliver.id, created_by);
    handleHttpSuccess(res, true, 'Repartidor creado correctamente', 201, deliver)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableDeliver = async (req: Request, res: Response) => {
  try {
    const insurance = await DeliversTransactions.disableDeliver(req.body);
    handleHttpSuccess(res, true, 'Aseguradora deshabilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableDeliver = async (req: Request, res: Response) => {
  try {
    const insurance = await DeliversTransactions.enableDeliver(req.body);
    handleHttpSuccess(res, true, 'Aseguradora habilitada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteDeliver = async (req: Request, res: Response) => {
  try {
    const insurance = await DeliversTransactions.deleteDeliver(req.body);
    handleHttpSuccess(res, true, 'Aseguradora eliminada correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const filterDeliver = async (req: Request, res: Response) => {
  try {
    const insurance = await DeliversTransactions.filterDeliver(req.body);
    handleHttpSuccess(res, true, 'datos filtrados correctamente', 201, insurance)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export {
  createDeliver, uploadFile, readDelivers, readDeliver, readDeliversToPay, updateDeliver, disableDeliver, enableDeliver, deleteDeliver, filterDeliver
}