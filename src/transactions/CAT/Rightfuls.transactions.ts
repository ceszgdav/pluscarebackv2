import { AppDataSource } from '../../config/connection';
import { Rightful } from '../../entity/CAT/Rightfuls';
import { v4 as uuidv4 } from 'uuid';
import { RightfulHistory } from '../../entity/CAT/RightfulsHistory';

const rightfulRepository = AppDataSource.getRepository(Rightful);
const rightfulHistoryRepository = AppDataSource.getRepository(RightfulHistory);

export class RightfulTransactions {

  static async createRightful(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewRightful = await rightfulRepository.save(data)
      const rightfuls = await this.readRightful(nuewRightful)
      //Retornamos el resultado del insertado de registro
      return rightfuls
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readRightfuls() {
    try {
      //Buscamos y obtenemos todos los rightfuls
      const rightfuls = await rightfulRepository.createQueryBuilder('rightful')
        .where({
          deleted: 0
        })
        .select([
          'rightful.id as id',
          'rightful.uuid as uuid',
          'rightful.name as name',
          'rightful.active as active',
        ])
        .getRawMany();
      //Retornamos todos los rightfuls
      return rightfuls;
    } catch (error) {
      return error
    }
  }

  static async readRightful(data: Rightful) {
    try {
      //Buscamos y obtenemos el rightful
      const rightful = await rightfulRepository.createQueryBuilder('rightful')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'rightful.id as id',
          'rightful.uuid as uuid',
          'rightful.name as name',
          'rightful.active as active',
        ])
        .getRawOne();
      //Retornamos el rightful encontrado
      return rightful;
    } catch (error) {
      return error
    }
  }

  static async updateRightful(data: Rightful) {
    try {
      await this.readToUpdate(data);
      await rightfulRepository.update({ uuid: data.uuid }, data);
      const rightful = await this.readRightful(data)
      return rightful;
    } catch (error) {
      return error;
    }
  }

  static async disableRightful(data: Rightful) {
    try {
      await this.readToUpdate(data);
      await rightfulRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const rightful = await this.readRightful(data)
      return rightful;
    } catch (error) {
      return error;
    }
  }

  static async enableRightful(data: Rightful) {
    try {
      await this.readToUpdate(data);
      await rightfulRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const rightful = await this.readRightful(data)
      return rightful;
    } catch (error) {
      return error;
    }
  }

  static async deleteRightful(data: Rightful) {
    try {
      await this.readToUpdate(data);
      await rightfulRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const rightful = await this.readRightful(data)
      return rightful;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const rightful = await this.readRightful(data)
    let uuid = uuidv4();
    let rightfulHistory = {
      uuid: uuid,
      id_rightful: rightful.id,
      name: rightful.name,
      updated_by: data.updated_by,
    }
    return await rightfulHistoryRepository.save(rightfulHistory)
  }

}