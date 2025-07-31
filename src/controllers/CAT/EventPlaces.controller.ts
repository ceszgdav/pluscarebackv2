import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { EventPlaceTransactions } from "../../transactions/CAT/EventPlaces.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createEventPlace = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newEventPlace = await EventPlaceTransactions.createEventPlace(data);
    handleHttpSuccess(res, true, 'Lugar de evento creado correctamente', 201, newEventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readEventPlaces = async (req: Request, res: Response) => {
  try {
    const eventPlaces = await EventPlaceTransactions.readEventPlaces();
    handleHttpSuccess(res, true, 'Lugares de eventos encontrados correctamente', 201, eventPlaces)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readEventPlace = async (req: Request, res: Response) => {
  try {
    const eventPlace = await EventPlaceTransactions.readEventPlace(req.body);
    handleHttpSuccess(res, true, 'Lugar de evento encontrado correctamente', 201, eventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateEventPlace = async (req: Request, res: Response) => {
  try {
    const eventPlace = await EventPlaceTransactions.updateEventPlace(req.body);
    handleHttpSuccess(res, true, 'Lugar de evento actualizado correctamente', 201, eventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableEventPlace = async (req: Request, res: Response) => {
  try {
    const eventPlace = await EventPlaceTransactions.disableEventPlace(req.body);
    handleHttpSuccess(res, true, 'Lugar de evento deshabilitado correctamente', 201, eventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableEventPlace = async (req: Request, res: Response) => {
  try {
    const eventPlace = await EventPlaceTransactions.enableEventPlace(req.body);
    handleHttpSuccess(res, true, 'Lugar de evento habilitado correctamente', 201, eventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteEventPlace = async (req: Request, res: Response) => {
  try {
    const eventPlace = await EventPlaceTransactions.deleteEventPlace(req.body);
    handleHttpSuccess(res, true, 'Lugar de evento eliminado correctamente', 201, eventPlace)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createEventPlace, readEventPlaces, readEventPlace, updateEventPlace, disableEventPlace, enableEventPlace, deleteEventPlace }