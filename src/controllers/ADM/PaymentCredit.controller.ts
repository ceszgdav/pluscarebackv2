import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from "express-validator";
import { PaymentTransactions } from "../../transactions/ADM/PaymentCredit.transaction";

const createPaymentCredit = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newRole = await PaymentTransactions.createPayment(data);
    handleHttpSuccess(res, true, 'Rol creado correctamente', 201, newRole)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readPaymentCredit = async (req: Request, res: Response) => {
  try {
    const allRoles = await PaymentTransactions.readpaymentCredit();
    handleHttpSuccess(res, true, 'Roles encontrados', 201, allRoles)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createPaymentCredit, readPaymentCredit }