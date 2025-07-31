import * as jwt from 'jsonwebtoken';
import { UserTransactions } from '../transactions/ADM/Users.transaction';

const JWT_SECRET: any = process.env.JWT_SECRET;

/**
 * Objeto de usuario
 * @param {*} user 
 */
const tokenSign = async (user: any) => {
  const sign = jwt.sign(
    {
      uuid: user.uuid,
    },
    JWT_SECRET,
    {
      expiresIn: "24h"
    }
  )

  return sign;

}

/**
 * Pasar token de sesión
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt: any) => {
  try {
    //Verificamos el token
    const verify = await jwt.verify(tokenJwt, JWT_SECRET, async (error: any, decoded: any) => {
      if (error) {
        return false;
      } else {
        //Verificamos si el token aun existe en la base de datos
        const user: any = await UserTransactions.readUser(decoded);
        /*
         *Si el token es igual retornamos true
         *Si no es igual, retornaremos false
        */
        if (user.token === tokenJwt) {
          return true;
        } else {
          return false;
        }
      }
    });
    //Retornamos el error de la verificación
    return verify;
  } catch (err) {
    return false
  }
}

/**
 * Pasar token de sesión para cerrarla
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyTokenToLogout = async (tokenJwt: any) => {
  try {
    //Verificamos el token
    const verify = await jwt.verify(tokenJwt, JWT_SECRET, async (error: any, decoded: any) => {
      if (error) {
        return false;
      } else {
        //Verificamos si el token aun existe en la base de datos
        return decoded
      }
    });
    //Retornamos el error de la verificación
    return verify;
  } catch (err) {
    return false
  }
}

/**
 * Pasar token de sesion
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyAccessToken = async (tokenJwt: any) => {
  try {
    const verify = await jwt.decode(tokenJwt, JWT_SECRET);
    return verify;
  } catch (err) {
    return false

  }
}

export { tokenSign, verifyToken, verifyTokenToLogout, verifyAccessToken };