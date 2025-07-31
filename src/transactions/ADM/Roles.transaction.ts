import { AppDataSource } from '../../config/connection';
import { Roles } from '../../entity/ADM/Roles';
import { RolesHistory } from '../../entity/ADM/RolesHistory';
import { v4 as uuidv4 } from 'uuid';

const rolesRepository = AppDataSource.getRepository(Roles);
const rolesHistoryRepository = AppDataSource.getRepository(RolesHistory);

export class RolTransactions {

  static async createRol(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewRol = await rolesRepository.save(data)
      const roles = await this.readRol(nuewRol)
      //Retornamos el resultado del insertado de registro
      return roles
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readRoles() {
    try {
      //Buscamos y obtenemos todos los roles
      const roles = await rolesRepository.createQueryBuilder('roles')
        .where({
          deleted: 0
        })
        .select([
          'roles.id as id',
          'roles.uuid as uuid',
          'roles.name as name',
          'roles.description as description',
          'roles.active as active',
        ])
        .getRawMany();
      //Retornamos todos los roles
      return roles;
    } catch (error) {
      return error
    }
  }

  static async readRol(data: any) {
    try {
      //Buscamos y obtenemos el roles
      const roles = await rolesRepository.createQueryBuilder('roles')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'roles.id as id',
          'roles.uuid as uuid',
          'roles.name as name',
          'roles.description as description',
          'roles.active as active',
        ])
        .getRawOne();
      //Retornamos el roles encontrado
      return roles;
    } catch (error) {
      return error
    }
  }

  static async updateRol(data: any) {
    try {
      await this.readToUpdate(data);
      await rolesRepository.update({ uuid: data.uuid }, data);
      const roles = await this.readRol(data)
      return roles;
    } catch (error) {
      return error;
    }
  }

  static async disableRol(data: Roles) {
    try {
      await this.readToUpdate(data);
      await rolesRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const roles = await this.readRol(data)
      return roles;
    } catch (error) {
      return error;
    }
  }

  static async enableRol(data: Roles) {
    try {
      await this.readToUpdate(data);
      await rolesRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const roles = await this.readRol(data)
      return roles;
    } catch (error) {
      return error;
    }
  }

  static async deleteRol(data: Roles) {
    try {
      await this.readToUpdate(data);
      await rolesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const role = await this.readRol(data)
    let uuid = uuidv4();
    let roleHistory = {
      uuid: uuid,
      id_role: role.id,
      name: role.name,
      description: role.description,
      updated_by: data.updated_by,
    }
    return await rolesHistoryRepository.save(roleHistory)
  }

}