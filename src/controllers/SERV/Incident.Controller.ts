import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { IncidentsTransactions } from "../../transactions/SERV/Incident.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const createIncident = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newIncident = await IncidentsTransactions.createIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, newIncident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const storeSignsIncident = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const newIncident = await IncidentsTransactions.updateSignIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, newIncident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const storeCoordsIncident = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    const newIncident = await IncidentsTransactions.storeCoordsIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, newIncident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const countIncidents = async (req: Request, res: Response) => {
  try {
    const incident = await IncidentsTransactions.countIncidents();
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readIncidents = async (req: Request, res: Response) => {
  try {
    const incident = await IncidentsTransactions.readIncidents();
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readIncident = async (req: Request, res: Response) => {
  try {
    const incident = await IncidentsTransactions.readIncident(req.body);
    handleHttpSuccess(res, true, 'Incidente encontrado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateIncident = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req)
    const incident = await IncidentsTransactions.updateIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateIncidentStatus = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const incident = await IncidentsTransactions.updateIncidentStatus(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateCoordsIncident = async (req: Request, res: Response) => {
  try {
    const data = matchedData(req)
    const incident = await IncidentsTransactions.updateCoordsIncident(data);
    handleHttpSuccess(res, true, 'Incidente creado correctamente', 201, incident)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createIncident, storeSignsIncident, storeCoordsIncident, countIncidents, readIncidents, readIncident, updateIncident, updateIncidentStatus, updateCoordsIncident }