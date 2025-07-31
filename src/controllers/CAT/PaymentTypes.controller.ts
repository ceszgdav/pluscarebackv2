import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { PaymentTypeTransactions } from "../../transactions/CAT/PaymentTypes.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createPaymentType = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const nuewPaymentType = await PaymentTypeTransactions.createPaymentType(data);
    handleHttpSuccess(res, true, 'Tipo de pago creado correctamente', 201, nuewPaymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readPaymentTypes = async (req: Request, res: Response) => {
  try {
    const paymentTypes = await PaymentTypeTransactions.readPaymentTypes();
    handleHttpSuccess(res, true, 'Tipos de pago encontrados correctamente', 201, paymentTypes)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readPaymentType = async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypeTransactions.readPaymentType(req.body);
    handleHttpSuccess(res, true, 'Tipo de pago encontrado correctamente', 201, paymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updatePaymentType = async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypeTransactions.updatePaymentType(req.body);
    handleHttpSuccess(res, true, 'Tipo de pago actualizado correctamente', 201, paymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disablePaymentType = async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypeTransactions.disablePaymentType(req.body);
    handleHttpSuccess(res, true, 'Tipo de pago deshabilitado correctamente', 201, paymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enablePaymentType = async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypeTransactions.enablePaymentType(req.body);
    handleHttpSuccess(res, true, 'Tipo de pago habilitado correctamente', 201, paymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deletePaymentType = async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypeTransactions.deletePaymentType(req.body);
    handleHttpSuccess(res, true, 'Tipo de pago eliminado correctamente', 201, paymentType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createPaymentType, readPaymentTypes, readPaymentType, updatePaymentType, disablePaymentType, enablePaymentType, deletePaymentType }