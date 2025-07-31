import { Response } from "express";

const handleHttpSuccess = (res: Response, success: boolean, msg = 'Todo Ok!', code = 201, data: any) => {

  res.status(code);

  res.send({
    success: success,
    message: msg,
    data: data
  })

}

export { handleHttpSuccess }
