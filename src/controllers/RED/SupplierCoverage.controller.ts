import { Request, Response } from "express";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { handleHttpError } from "../../utils/handleError";
import { matchedData } from "express-validator";
import { supplierCoverageTransactions } from "../../transactions/RED/SupplierCoverage.transactions";

const createSupplierCoverage = async (req: Request, res: Response) => {
  try {
    //Obtenemos la data del body limpia
    const data = matchedData(req);
    //Pasamos la data a la transacción para ingresarla en la base de datos
    const cuentaBancoProveedor = await supplierCoverageTransactions.createSupplierCoverage(data);
    //Retornamos success o error
    handleHttpSuccess(res, true, 'Proveedor creado correctamente', 201, cuentaBancoProveedor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createSupplierCoverage }