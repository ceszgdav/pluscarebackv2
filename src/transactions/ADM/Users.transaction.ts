import { promises } from 'dns';
import { AppDataSource } from '../../config/connection';
import { Roles } from '../../entity/ADM/Roles';
import { User } from '../../entity/ADM/User';
import { encrypt } from '../../utils/handlePassword';
import { ModulesUsersAccess } from '../../entity/ADM/ModulesUsersAccess';
import { UserHistory } from '../../entity/ADM/UserHistory';
import { v4 as uuidv4 } from 'uuid';
import { Permissions } from '../../entity/ADM/Permissions';

const usuariosRepository = AppDataSource.getRepository(User);
const usuariosHistoryRepository = AppDataSource.getRepository(UserHistory);
const accesoModulosRepository = AppDataSource.getRepository(ModulesUsersAccess);

export class UserTransactions {

  static async createUser(data: any) {
    try {
      //Encriptamos la contraseña que se envia
      const password = await encrypt(data.password);
      //Creamos el nuevo json
      const newData = { ...data, password }
      //Ingresamos los datos del nuevo registro
      const nuewUser = await usuariosRepository.save(newData)
      const usuarios = await this.readUser(nuewUser)
      //Retornamos el resultado del insertado de registro
      return usuarios
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async assignModules(data: any, idUser: any) {
    try {
      let id_user = idUser;
      Object.values(data).forEach(async (element: any, index: any) => {
        if (element) {
          let access = {
            id_module: index + 1,
            id_user: id_user
          }
          await accesoModulosRepository.save(access)
        }
      });
      //Retornamos el resultado del insertado de registro
      return 'usuarios'
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readUsers() {
    try {
      //Buscamos y obtenemos todos los usuarios
      const usuarios = await usuariosRepository.createQueryBuilder('usuario')
        .where({
          deleted: 0
        })
        .select([
          'usuario.id as id',
          'usuario.uuid as uuid',
          'usuario.name as name',
          'usuario.email as email',
          'usuario.username as username',
          'usuario.id_role as id_role',
          'usuario.active as active',
        ])
        .leftJoin(Roles, 'role', 'usuario.id_role = role.id')
        .getRawMany();
      //Retornamos todos los usuarios
      return usuarios;
    } catch (error) {
      return error
    }
  }

  static async readUser(data: any) {
    try {
      //Buscamos y obtenemos el usuario
      const usuario = await usuariosRepository.createQueryBuilder('usuario')
        .where({
          deleted: 0,
          active: 1,
          uuid: data.uuid
        })
        .select([
          'usuario.id as id',
          'usuario.uuid as uuid',
          'usuario.name as name',
          'usuario.email as email',
          'usuario.username as username',
          'usuario.token as token',
          'usuario.id_role as id_role',
          'usuario.active as active',
          'usuario.user_type as user_type',
          'usuario.id_permission as id_permission',
        ])
        .leftJoin(Roles, 'role', 'usuario.id_role = role.id')
        .getRawOne();
      //Retornamos el usuario encontrado
      return usuario;
    } catch (error) {
      return error
    }
  }

  static async readUserToken(data: any) {
    try {
      //Buscamos y obtenemos el usuario
      const usuario = await usuariosRepository.createQueryBuilder('usuario')
        .where({
          uuid: data.uuid
        })
        .select([
          'usuario.id as id',
          'usuario.uuid as uuid',
          'usuario.name as name',
          'usuario.username as username',
          'usuario.token as token',
          'usuario.id_role as id_role',
          'usuario.id_permission as id_permission',
          'usuario.user_type as user_type',
          'permission.name as permission_name'
        ])
        .leftJoin(Roles, 'role', 'usuario.id_role = role.id')
        .leftJoin(Permissions, 'permission', 'usuario.id_permission = permission.id')
        .getRawOne();
      //Retornamos el usuario encontrado
      return usuario;
    } catch (error) {
      return error
    }
  }

  static async updateUser(data: any) {
    try {
      if (data.password !== "") {
        //Encriptamos la contraseña que se envia
        const password = await encrypt(data.password);
        //Creamos el nuevo json
        data = { ...data, password }
      } else {
        delete data.password
      }
      await this.readToUpdate(data);
      await usuariosRepository.update({ uuid: data.uuid }, data);
      const usuario = await this.readUser(data)
      return usuario;
    } catch (error) {
      return error;
    }
  }

  static async disableUser(data: any) {
    try {
      this.readToUpdate(data);
      await usuariosRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const usuario = await this.readUser(data)
      return usuario;
    } catch (error) {
      return error;
    }
  }

  static async enableUser(data: any) {
    try {
      this.readToUpdate(data);
      await usuariosRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const usuario = await this.readUser(data)
      return usuario;
    } catch (error) {
      return error;
    }
  }

  static async deleteUser(data: any) {
    try {
      this.readToUpdate(data);
      await usuariosRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const user = await this.readUser(data)
    let uuid = uuidv4();
    let userHistory = {
      uuid: uuid,
      id_user: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      id_role: user.id_role,
      last_login_at: user.last_login_at,
      updated_by: data.updated_by,
    }
    return await usuariosHistoryRepository.save(userHistory)
  }

}