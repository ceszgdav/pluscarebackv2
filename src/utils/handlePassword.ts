import * as  bcryptjs from 'bcryptjs'

/**
 * Contraseña sin encriptar
 */
const encrypt = async (passwordPlain: string) => {

  const hash = await bcryptjs.hash(passwordPlain, 10);

  return hash;

}

/**
 * Comparar contraseñas
 * @param {*} passwordPlain 
 * @param {*} passwordCrypted 
 * @returns 
 */
const compare = async (passwordPlain: string, passwordCrypted: string) => {
  return await bcryptjs.compare(passwordPlain, passwordCrypted);
}

export { encrypt, compare }