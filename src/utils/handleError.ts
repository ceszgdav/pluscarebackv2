import { Response } from "express";

const handleHttpError = (res: Response, msg: any = 'Algo ha ocurrido, intentelo nuevamente', code = 403) => {

  res.status(code);

  res.send({
    error: msg
  })

}

export { handleHttpError }