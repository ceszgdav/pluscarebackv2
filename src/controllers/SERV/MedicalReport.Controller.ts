import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { MedicalReportTransactions } from "../../transactions/SERV/MedicalReport.transactions";

const createMedicalReport = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newIncident = await MedicalReportTransactions.createMedicalReport(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, newIncident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicalReports = async (req: Request, res: Response) => {
  try {
    const medicalReports = await MedicalReportTransactions.readMedicalReports();
    handleHttpSuccess(res, true, 'Reportes encontrados', 201, medicalReports)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readMedicalReport = async (req: Request, res: Response) => {
  try {
    const medicalReport = await MedicalReportTransactions.readMedicalReport(req.body);
    handleHttpSuccess(res, true, 'Reportes encontrados', 201, medicalReport)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createMedicalReport, readMedicalReports, readMedicalReport }