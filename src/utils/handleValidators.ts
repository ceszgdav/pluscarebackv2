import { NextFunction, Request, Response } from "express";

const { validationResult } = require("express-validator");

const validateResults = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error: any) {
    res.status(403);
    res.send({
      errors: error.array()
    })
  }
}

export { validateResults };