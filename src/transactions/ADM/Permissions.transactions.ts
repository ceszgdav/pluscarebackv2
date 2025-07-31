import { AppDataSource } from '../../config/connection';
import { v4 as uuidv4 } from 'uuid';
import { Permissions } from '../../entity/ADM/Permissions';

const permissionsRepository = AppDataSource.getRepository(Permissions);

export class PermissionsTransactions {

  static async createPermission(data: any) {
    try {
      //Creamos el uuid para el Permission
      let uuid = uuidv4();
      //Agregamos el uuid al nuevo registro
      let newData = { ...data, uuid }
      //Ingresamos los datos del nuevo registro
      const newPermission = await permissionsRepository.save(newData)
      const permissions = await this.readPermission(newPermission)
      //Retornamos el resultado del insertado de registro
      return permissions
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async createPermissionTests() {
    try {
      let data = [
        {
          name: 'w',
          description: 'Escritura'
        },
        {
          name: 'r',
          description: 'Lectura'
        },
        {
          name: 'rw',
          description: 'Lectura y escritura'
        },
        {
          name: 'sa',
          description: 'Lectura, escritura y borrado'
        },
      ]

      await data.forEach(async element => {
        //Creamos el uuid para el Permission
        let uuid = uuidv4();
        //Agregamos el uuid al nuevo registro
        let newData = { ...element, uuid }
        //Ingresamos los datos del nuevo registro
        await permissionsRepository.save(newData)
      });
      //Retornamos el resultado del insertado de registro
      return 'ok'
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readPermissions() {
    try {
      //Buscamos y obtenemos todos los permissions
      const permissions = await permissionsRepository.createQueryBuilder('permissions')
        .where({
          deleted: 0
        })
        .select([
          'permissions.id as id',
          'permissions.uuid as uuid',
          'permissions.name as name',
          'permissions.description as description',
          'permissions.active as active',
        ])
        .getRawMany();
      //Retornamos todos los permissions
      return permissions;
    } catch (error) {
      return error
    }
  }

  static async readPermission(data: any) {
    try {
      //Buscamos y obtenemos el permissions
      const permissions = await permissionsRepository.createQueryBuilder('permissions')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'permissions.id as id',
          'permissions.uuid as uuid',
          'permissions.name as name',
          'permissions.description as description',
          'permissions.active as active',
        ])
        .getRawOne();
      //Retornamos el permissions encontrado
      return permissions;
    } catch (error) {
      return error
    }
  }

  static async updatePermission(data: any) {
    try {
      await permissionsRepository.update({ uuid: data.uuid }, data);
      const permissions = await this.readPermission(data)
      return permissions;
    } catch (error) {
      return error;
    }
  }

  static async disablePermission(data: any) {
    try {
      await permissionsRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const permissions = await this.readPermission(data)
      return permissions;
    } catch (error) {
      return error;
    }
  }

  static async enablePermission(data: any) {
    try {
      await permissionsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const permissions = await this.readPermission(data)
      return permissions;
    } catch (error) {
      return error;
    }
  }

  static async deletePermission(data: any) {
    try {
      await permissionsRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

}