import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { DoctorTransactions } from "../../transactions/ADM/Doctors.transaction";
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from "express-validator";

const createDoctor = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newDoctor = await DoctorTransactions.createDoctor(data);
    handleHttpSuccess(res, true, 'Doctor creado correctamente', 201, newDoctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await DoctorTransactions.readDoctors();
    handleHttpSuccess(res, true, 'Doctores encontrados correctamente', 201, doctors)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorTransactions.readDoctor(req.body);
    handleHttpSuccess(res, true, 'Doctor encontrado correctamente', 201, doctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorTransactions.updateDoctor(req.body);
    handleHttpSuccess(res, true, 'Doctor actualizado correctamente', 201, doctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorTransactions.disableDoctor(req.body);
    handleHttpSuccess(res, true, 'Doctor deshabilitado correctamente', 201, doctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorTransactions.enableDoctor(req.body);
    handleHttpSuccess(res, true, 'Doctor habilitado correctamente', 201, doctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorTransactions.deleteDoctor(req.body);
    handleHttpSuccess(res, true, 'Doctor eliminado correctamente', 201, doctor)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createDoctor, readDoctors, readDoctor, updateDoctor, disableDoctor, enableDoctor, deleteDoctor }