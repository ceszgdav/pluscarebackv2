import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handleHttpError } from "../../utils/handleError";
import { AuthTransactions } from "../../transactions/EXTRAS/Auth.transactions";
import { tokenSign, verifyToken, verifyTokenToLogout } from "../../utils/handleJwt";
import { handleHttpSuccess } from "../../utils/handleSuccess";
import { UserTransactions } from "../../transactions/ADM/Users.transaction";
import { OperatorTransactions } from "../../transactions/ADM/Operators.transaction";
import { ParamedicTransactions } from "../../transactions/ADM/Paramedics.transaction";

const authLogin = async (req: Request, res: Response) => {
  try {
    //Obtenemos el body formateado
    const body = matchedData(req);
    //Verificamos si el data de usuario existe en la base de datos
    let user: any;
    let token: any;
    user = await AuthTransactions.authLogin(body)
    //Si no existe comprobamos en operadores
    if (!user) {
      user = await AuthTransactions.authOperatorLogin(body)
      //Si no existe comprobamos en paramedicos
      if (!user) {
        user = await AuthTransactions.authParamedicLogin(body)
        //Si no existe retornamos error
        if (!user) {
          handleHttpError(res, "El usuario no existe", 400);
          return
        } else {
          //Comparamos las contraseñas
          const check = await AuthTransactions.compareParamedicPsw(body, body.contrasena)
          //Si no coinciden retornamos error
          if (!check) {
            handleHttpError(res, "Contraseña incorrecta", 400);
            return
          }
          //Creamos el token
          token = await tokenSign(user)
          //Actualizamos el ultimo login del usuario
          const update = await AuthTransactions.updateParamedicLastLogin(user, token);
          //Si no conseguimos actualizarlo arrojamos error
          if (!update) {
            handleHttpError(res, "No se ha logrado la actualización", 400);
            return
          }
        }
      } else {
        //Comparamos las contraseñas
        const check = await AuthTransactions.compareOperatorPsw(body, body.contrasena)
        //Si no coinciden retornamos error
        if (!check) {
          handleHttpError(res, "Contraseña incorrecta", 400);
          return
        }
        //Creamos el token
        token = await tokenSign(user)
        //Actualizamos el ultimo login del usuario
        const update = await AuthTransactions.updateOperatorLastLogin(user, token);
        //Si no conseguimos actualizarlo arrojamos error
        if (!update) {
          handleHttpError(res, "No se ha logrado la actualización", 400);
          return
        }
      }
    } else {
      //Comparamos las contraseñas
      const check = await AuthTransactions.comparePsw(body, body.contrasena)
      //Si no coinciden retornamos error
      if (!check) {
        handleHttpError(res, "Contraseña incorrecta", 400);
        return
      }
      //Creamos el token
      token = await tokenSign(user)
      //Actualizamos el ultimo login del usuario
      const update = await AuthTransactions.updateLastLogin(user, token);
      //Si no conseguimos actualizarlo arrojamos error
      if (!update) {
        handleHttpError(res, "No se ha logrado la actualización", 400);
        return
      }
    }
    //Creamos el token
    const data = {
      token: token,
      user
    }
    //Enviamos la información de logeo
    handleHttpSuccess(res, true, 'Registro actualizado correctamente', 201, data)
  } catch (error) {
    handleHttpError(res, 'Error login de usuario', 204)
  }

}

const authLogout = async (req: Request, res: Response) => {
  try {
    //Obtenemos el body formateado
    const body = matchedData(req);
    //Creamos el token
    const token = await verifyTokenToLogout(body.authorization)
    //Actualizamos el ultimo login del usuario
    const update = await AuthTransactions.updateLogout(token.uuid);
    //Si no conseguimos actualizarlo arrojamos error
    if (!update) {
      handleHttpError(res, "No se ha logrado la actualización", 400);
      return
    }
    //Enviamos la información de logeo
    handleHttpSuccess(res, true, 'logout', 201, null)
  } catch (error) {
    handleHttpError(res, 'Error login de usuario', 204)
  }

}

const checkToken = async (req: Request, res: Response) => {
  try {
    //Obtenemos la informacion que viene en el headers
    const data = matchedData(req)
    //Si no viene nada en los headers retornamos un false
    if (data.authorization == undefined) {
      res.send(false)
    } else {
      //Se verifica el token
      const checkToken = await AuthTransactions.checkToken(data.authorization);
      //Enviamos el tipo de respuesta si es true o false
      res.send(
        checkToken
      )
    }
  } catch (error) {
    handleHttpError(res, 'Error login de usuario', 204)
  }
}

const checkAccessToken = async (req: Request, res: Response) => {
  try {
    //Obtenemos la informacion que viene en el headers
    const data = matchedData(req)
    //Si no viene nada en los headers retornamos un false
    if (data.authorization == undefined) {
      res.send(false)
    } else {
      //Se verifica el token
      const checkToken = await AuthTransactions.checkAccessToken(data.authorization);
      res.send(checkToken);
    }
  } catch (error) {
    handleHttpError(res, 'Error login de usuario', 204)
  }
}

const checkInfoByToken = async (req: Request, res: Response) => {
  try {
    //Obtenemos la informacion que viene en el headers
    const data = matchedData(req)
    //Si no viene nada en los headers retornamos un false
    if (data.authorization == undefined) {
      res.send(false)
    } else {
      //Se verifica el token
      const checkToken = await AuthTransactions.checkAccessToken(data.authorization);
      //Obtenemos la información del usuario
      const user = await UserTransactions.readUserToken(checkToken)
      if (!user) {
        const user = await OperatorTransactions.readUser(checkToken)
        if (!user) {
          const user = await ParamedicTransactions.readParamedic(checkToken)
          if (!user) {
            return 'error;'
          }
          res.send(
            user
          );
          return
        }
        res.send(
          user
        );
        return
      }
      res.send(
        user
      );
    }
  } catch (error) {
    handleHttpError(res, 'Error login de usuario', 204)
  }
}

const checkPermission = async (req: Request, res: Response) => {
  try {
    var data = req.body;
    const getPermission = await AuthTransactions.getPermission(data);
    handleHttpSuccess(res, true, 'Permisos obtenidos correctamente', 200, getPermission)
  } catch (error) {
    console.log(error)
    handleHttpError(res, 'Error', 204)
  }
}

export { authLogin, authLogout, checkToken, checkAccessToken, checkInfoByToken, checkPermission }