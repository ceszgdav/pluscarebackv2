import { AppDataSource } from '../../config/connection';
import { Units } from '../../entity/ADM/Units';
import { UnitsHistory } from '../../entity/ADM/UnitsHistory';
import { v4 as uuidv4 } from 'uuid';

const unitsRepository = AppDataSource.getRepository(Units);
const unitsHistoryRepository = AppDataSource.getRepository(UnitsHistory);

export class UnitTransactions {

  static async createUnit(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewUnit = await unitsRepository.save(data)
      const units = await this.readUnit(nuewUnit)
      //Retornamos el resultado del insertado de registro
      return units
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readUnits() {
    try {
      //Buscamos y obtenemos todos los units
      const units = await unitsRepository.createQueryBuilder('unit')
        .where({
          deleted: 0
        })
        .select([
          'unit.id as id',
          'unit.uuid as uuid',
          'unit.type as type',
          'unit.model as model',
          'unit.unit_name as unit_name',
          'unit.plate as plate',
          'unit.kilometer as kilometer',
          'unit.active as active',
        ])
        .getRawMany();
      //Retornamos todos los units
      return units;
    } catch (error) {
      return error
    }
  }

  static async readUnit(data: Units) {
    try {
      //Buscamos y obtenemos el unit
      const unit = await unitsRepository.createQueryBuilder('unit')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'unit.id as id',
          'unit.uuid as uuid',
          'unit.type as type',
          'unit.model as model',
          'unit.unit_name as unit_name',
          'unit.plate as plate',
          'unit.kilometer as kilometer',
          'unit.active as active',
        ])
        .getRawOne();
      //Retornamos el unit encontrado
      return unit;
    } catch (error) {
      return error
    }
  }

  static async updateUnit(data: Units) {
    try {
      await this.readToUpdate(data);
      await unitsRepository.update({ uuid: data.uuid }, data);
      const unit = await this.readUnit(data)
      return unit;
    } catch (error) {
      return error;
    }
  }

  static async disableUnit(data: Units) {
    try {
      await this.readToUpdate(data);
      await unitsRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const unit = await this.readUnit(data)
      return unit;
    } catch (error) {
      return error;
    }
  }

  static async enableUnit(data: Units) {
    try {
      await this.readToUpdate(data);
      await unitsRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const unit = await this.readUnit(data)
      return unit;
    } catch (error) {
      return error;
    }
  }

  static async deleteUnit(data: Units) {
    try {
      await this.readToUpdate(data);
      await unitsRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    try {
      const role = await this.readUnit(data)
      let uuid = uuidv4();
      let unitHistory = {
        uuid: uuid,
        id_unit: role.id,
        type: role.type,
        model: role.model,
        unit_name: role.unit_name,
        plate: role.plate,
        kilometer: role.kilometer,
        updated_by: data.updated_by,
      }
      return await unitsHistoryRepository.save(unitHistory)
    } catch (error) {
    }
  }

}