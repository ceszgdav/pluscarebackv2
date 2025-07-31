import { AppDataSource } from '../../config/connection';
import { ModulesOperatorsAccess } from '../../entity/ADM/ModulesOperatorsAccess';
import { ModulesParamedicsAccess } from '../../entity/ADM/ModulesParamedicsAccess';
import { ModulesUsersAccess } from '../../entity/ADM/ModulesUsersAccess';
import { Operators } from '../../entity/ADM/Operators';
import { Paramedics } from '../../entity/ADM/Paramedics';
import { PermissionModuleUser } from '../../entity/ADM/PermissionModuleUser';
import { User } from '../../entity/ADM/User';
import { verifyAccessToken, verifyToken } from '../../utils/handleJwt';
import { compare } from '../../utils/handlePassword';

const usuariosRepository = AppDataSource.getRepository(User);
const operatorsRepository = AppDataSource.getRepository(Operators);
const paramedicRepository = AppDataSource.getRepository(Paramedics);
const permissionRepository = AppDataSource.getRepository(PermissionModuleUser);
const AccesoModulosUsuarioRepository = AppDataSource.getRepository(ModulesUsersAccess);
const AccesoModulosOperatorsRepository = AppDataSource.getRepository(ModulesOperatorsAccess);
const AccesoModulosParemedicsRepository = AppDataSource.getRepository(ModulesParamedicsAccess);

export class AuthTransactions {
  //Acceso a sistema
  static async authLogin(data: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const user = await usuariosRepository.createQueryBuilder('user')
        .where("username = :usuario OR email = :usuario", { usuario: data.usuario })
        .select([
          'user.id as id',
          'user.uuid as uuid',
          'user.name as name',
          'user.email as email',
          'user.username as username',
          'user.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!user) {
        return false
      }
      //Retornamos la información del usuario
      return user
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async authOperatorLogin(data: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const operator = await operatorsRepository.createQueryBuilder('operator')
        .where("username = :usuario OR email = :usuario", { usuario: data.usuario })
        .select([
          'operator.id as id',
          'operator.uuid as uuid',
          'operator.name as name',
          'operator.email as email',
          'operator.username as username',
          'operator.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!operator) {
        return false
      }
      //Retornamos la información del usuario
      return operator
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async authParamedicLogin(data: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const paramedic = await paramedicRepository.createQueryBuilder('paramedic')
        .where("username = :usuario", { usuario: data.usuario })
        .select([
          'paramedic.id as id',
          'paramedic.uuid as uuid',
          'paramedic.name as name',
          'paramedic.username as username',
          'paramedic.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!paramedic) {
        return false
      }
      //Retornamos la información del usuario
      return paramedic
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Comparamos la contraseña
  static async comparePsw(data: any, psw: any) {
    try {
      //Buscamos si existe un usuario con la información enviada
      const user = await usuariosRepository.createQueryBuilder('user')
        .where("username = :usuario OR email = :usuario", { usuario: data.usuario })
        .select([
          'user.id as id',
          'user.uuid as uuid',
          'user.name as name',
          'user.email as email',
          'user.username as username',
          'user.password as password',
          'user.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!user) {
        return false
      }
      //Se compara la contraseña en texto plano con la cifrada
      const check = await compare(psw, user.password)
      // Retornamos el resultado de la comparación
      return check;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Comparamos la contraseña
  static async compareOperatorPsw(data: any, psw: any) {
    try {
      //Buscamos si existe un usuario con la información enviada
      const operator = await operatorsRepository.createQueryBuilder('operator')
        .where("username = :usuario OR email = :usuario", { usuario: data.usuario })
        .select([
          'operator.id as id',
          'operator.uuid as uuid',
          'operator.name as name',
          'operator.email as email',
          'operator.username as username',
          'operator.password as password',
          'operator.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!operator) {
        return false
      }
      //Se compara la contraseña en texto plano con la cifrada
      const check = await compare(psw, operator.password)
      // Retornamos el resultado de la comparación
      return check;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Comparamos la contraseña
  static async compareParamedicPsw(data: any, psw: any) {
    try {
      //Buscamos si existe un usuario con la información enviada
      const paramedic = await paramedicRepository.createQueryBuilder('paramedic')
        .where("username = :usuario OR email = :usuario", { usuario: data.usuario })
        .select([
          'paramedic.id as id',
          'paramedic.uuid as uuid',
          'paramedic.name as name',
          'paramedic.email as email',
          'paramedic.username as username',
          'paramedic.password as password',
          'paramedic.token as token',
        ])
        .getRawOne();
      //Si no existe retornamos un error
      if (!paramedic) {
        return false
      }
      //Se compara la contraseña en texto plano con la cifrada
      const check = await compare(psw, paramedic.password)
      // Retornamos el resultado de la comparación
      return check;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Actualizar información de ultimo login
  static async updateLastLogin(user: any, token: string) {
    try {
      //Actualizamos la fecha de ultimo login
      const update = await usuariosRepository.update(user.id, { last_login_at: new Date(), token: token })
      //Retornamos el resultado de la actualización
      return update;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Actualizar información de ultimo login
  static async updateOperatorLastLogin(user: any, token: string) {
    try {
      //Actualizamos la fecha de ultimo login
      const update = await operatorsRepository.update(user.id, { last_login_at: new Date(), token: token })
      //Retornamos el resultado de la actualización
      return update;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Actualizar información de ultimo login
  static async updateParamedicLastLogin(user: any, token: string) {
    try {
      //Actualizamos la fecha de ultimo login
      const update = await paramedicRepository.update(user.id, { last_login_at: new Date(), token: token })
      //Retornamos el resultado de la actualización
      return update;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Actualizar información de ultimo login
  static async updateLogout(user: any) {
    try {
      //Actualizamos la fecha de ultimo login
      const update = await usuariosRepository.update({ uuid: user }, { token: '' })
      //Retornamos el resultado de la actualización
      return update;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Verificación del token
  static async checkToken(token: string) {
    try {
      //Se verifica si el token es valido
      const checkToken = await verifyToken(token)
      //Retornamos el resultado de la verificación
      return checkToken;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  //Verificación del token
  static async checkAccessToken(token: any) {
    try {
      //Se verifica si el token es valido
      const checkToken = await verifyAccessToken(token)
      //Retornamos el resultado de la verificación
      return checkToken;
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async getModulos(idUsuario: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const modulos = await AccesoModulosUsuarioRepository.createQueryBuilder('module')
        .where({
          id_user: idUsuario
        })
        .orderBy('module.id_module', 'ASC')
        .select([
          'module.id_module as id_module',
          'module.id_user as id_user',
          'permission.id_permission as id_permission'
        ])
        .leftJoin(PermissionModuleUser, 'permission', 'module.id_module = permission.id_module')
        .getRawMany();
      //Retornamos la información del usuario
      return modulos
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async getModulosOperator(idUsuario: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const modulos = await AccesoModulosOperatorsRepository.createQueryBuilder('module')
        .where({
          id_operator: idUsuario
        })
        .orderBy('module.id_module', 'ASC')
        .select([
          'module.id_module as id_module',
          'module.id_operator as id_operator'
        ])
        .getRawMany();
      //Retornamos la información del usuario
      return modulos
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async getModulosParemdico(idUsuario: any) {
    try {
      //Buscamos en la tabla de usuarios si existe el usuario o el correo
      const modulos = await AccesoModulosParemedicsRepository.createQueryBuilder('module')
        .where({
          id_paramedic: idUsuario
        })
        .orderBy('module.id_module', 'ASC')
        .select([
          'module.id_module as id_module',
          'module.id_paramedic as id_paramedic'
        ])
        .getRawMany();
      //Retornamos la información del usuario
      return modulos
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async filtrarModulos(modulosUsuario: any, modulosExistentes: any) {
    const modulosFiltrados = [];
    for (const modulo of modulosExistentes) {
      // Verifica si el módulo está en la lista de módulos de acceso
      const moduloAcceso = modulosUsuario.find((m: any) => m.id_module === modulo.id);
      if (moduloAcceso) {
        // Agrega el id_permission del módulo de acceso al módulo actual
        modulo.id_permission = moduloAcceso.id_permission;
        // Agrega el módulo actual a los módulos filtrados
        modulosFiltrados.push(modulo);
        // Si el módulo tiene hijos, filtra los hijos recursivamente
        if (modulo.children) {
          if (modulo.children.length > 0) {
            modulo.children = await AuthTransactions.filtrarModulos(modulosUsuario, modulo.children,);
          }
        }
        if (modulo.subchild) {
          if (modulo.subchild.length > 0 && modulo.subchild) {
            modulo.subchild = await AuthTransactions.filtrarModulos(modulosUsuario, modulo.subchild);
          }
        }
        if (modulo.subovchild) {
          if (modulo.subovchild.length > 0 && modulo.subovchild) {
            modulo.subovchild = await AuthTransactions.filtrarModulos(modulosUsuario, modulo.subovchild);
          }
        }
      }
    }
    return modulosFiltrados;
  }

  static async getPermission(data: any) {
    try {
      console.log(data)
      const permissionType = await permissionRepository.createQueryBuilder('permission')
        .where({
          id_module: data.id_module,
          id_user: data.id_user
        })
        .select([
          'permission.id_permission as id_permission'
        ])
        .getRawOne();
      return permissionType;
    } catch (error) {
      console.log(error)
      //Obtener y enviar el error
      return 'error'
    }
  }
}