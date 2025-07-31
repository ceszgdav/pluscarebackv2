import { Router } from "express";
import { validarAccessToken, validarLogin, validarToken } from "../../validators/EXTRAS/Auth.validator";
import { authLogin, authLogout, checkAccessToken, checkInfoByToken, checkPermission, checkToken } from "../../controllers/EXTRAS/Auth.controller";
const router = Router();

//Ruta de login
router.post("/li", validarLogin, authLogin);
//Ruta de logout
router.post("/lo", validarToken, authLogout);
//Ruta de CheckToken
router.post("/ct", validarToken, checkToken);
//Ruta de verificación de acceso mediante el token
router.post("/cat", validarAccessToken, checkAccessToken);
//Ruta para obtener información del usuario mediante el token
router.post("/gi", validarToken, checkInfoByToken);
//Ruta para obtener información del usuario y el permiso hacia la ruta
router.post("/gp", checkPermission);
export { router };
