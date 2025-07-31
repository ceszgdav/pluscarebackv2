import { NextFunction, Request, Response } from "express";
import { check } from "express-validator"
import { validateResults } from "../../utils/handleValidators";

const validarLogin = [
  check("usuario").exists().isLength({ min: 1 }).matches(/^[A-Za-z\0-9\.]+$/, 'g').trim(),
  check("contrasena").exists().isLength({ min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validarToken = [
  check("authorization").exists().isLength({ min: 1 }).matches(/^[A-Za-z\s0-9\s._\-]+$/, 'g'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

const validarAccessToken = [
  check("authorization").exists().isLength({ min: 1 }).matches(/^[A-Za-z\s0-9\s._\-]+$/, 'g'),
  // check("id").exists().isLength({ min: 1 }).matches(/^[0-9]+$/, 'g'),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  }
]

export { validarLogin, validarToken, validarAccessToken }