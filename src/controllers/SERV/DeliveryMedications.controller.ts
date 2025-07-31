import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { DeliveryMedicationsTransactions } from "../../transactions/SERV/DeliveryMedications.transaction";

const createDeliveryMedications = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const entregaMedicamentos = await DeliveryMedicationsTransactions.createDeliveryMedications(data);

    await DeliveryMedicationsTransactions.createDeliveryMedicationsList(data, entregaMedicamentos.id);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, entregaMedicamentos)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readDeliveryMedicationsAll = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const entregaMedicamentos = await DeliveryMedicationsTransactions.readDeliveryMedicationsAll();
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, entregaMedicamentos)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const setDeliveryMedicationsPayment = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = req.body;
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const entregaMedicamentos = await DeliveryMedicationsTransactions.setDeliveryMedicationsPayment(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Servicio programado creado correctamente', 201, entregaMedicamentos)
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

export { createDeliveryMedications, readDeliveryMedicationsAll, setDeliveryMedicationsPayment, uploadFile }