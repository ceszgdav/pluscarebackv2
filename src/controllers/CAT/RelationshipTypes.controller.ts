import { Request, Response } from "express"
import { handleHttpError } from "../../utils/handleError"
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { RelationshipTypeTransactions } from "../../transactions/CAT/RelationshipTypes.transactions";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const createRelationshipType = async (req: Request, res: Response) => {
  try {
    let data = matchedData(req);
    let uuid = uuidv4();
    data = { ...data, uuid }
    const newRelationshipType = await RelationshipTypeTransactions.createRelationshipType(data);
    handleHttpSuccess(res, true, 'Parentesco creado correctamente', 201, newRelationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRelationshipTypes = async (req: Request, res: Response) => {
  try {
    const relationshipTypes = await RelationshipTypeTransactions.readRelationshipTypes();
    handleHttpSuccess(res, true, 'Parentescos encontrados correctamente', 201, relationshipTypes)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const readRelationshipType = async (req: Request, res: Response) => {
  try {
    const relationshipType = await RelationshipTypeTransactions.readRelationshipType(req.body);
    handleHttpSuccess(res, true, 'Parentesco encontrado correctamente', 201, relationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const updateRelationshipType = async (req: Request, res: Response) => {
  try {
    const relationshipType = await RelationshipTypeTransactions.updateRelationshipType(req.body);
    handleHttpSuccess(res, true, 'Parentesco actualizado correctamente', 201, relationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const disableRelationshipType = async (req: Request, res: Response) => {
  try {
    const relationshipType = await RelationshipTypeTransactions.disableRelationshipType(req.body);
    handleHttpSuccess(res, true, 'Parentesco deshabilitado correctamente', 201, relationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const enableRelationshipType = async (req: Request, res: Response) => {
  try {
    const relationshipType = await RelationshipTypeTransactions.enableRelationshipType(req.body);
    handleHttpSuccess(res, true, 'Parentesco habilitado correctamente', 201, relationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

const deleteRelationshipType = async (req: Request, res: Response) => {
  try {
    const relationshipType = await RelationshipTypeTransactions.deleteRelationshipType(req.body);
    handleHttpSuccess(res, true, 'Parentesco eliminado correctamente', 201, relationshipType)
  } catch (error) {
    handleHttpError(res, error, 201)
  }
}

export { createRelationshipType, readRelationshipTypes, readRelationshipType, updateRelationshipType, disableRelationshipType, enableRelationshipType, deleteRelationshipType }