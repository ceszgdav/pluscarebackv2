import { AppDataSource } from '../../config/connection';
import { MeasurementUnit } from '../../entity/CAT/MeasurementUnit';
import { v4 as uuidv4 } from 'uuid';
import { MeasurementUnitHistory } from '../../entity/CAT/MeasurementUnitHistory';

const MeasurementUnitRepository = AppDataSource.getRepository(MeasurementUnit);
const MeasurementUnitHistoryRepository = AppDataSource.getRepository(MeasurementUnitHistory);

export class MeasurementUnitTransactions {

  static async createMeasurementUnit(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewMeasurementUnit = await MeasurementUnitRepository.save(data)
      const measurementUnits = await this.readMeasurementUnit(nuewMeasurementUnit)
      //Retornamos el resultado del insertado de registro
      return measurementUnits
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readMeasurementUnits() {
    try {
      //Buscamos y obtenemos todos los measurementUnits
      const measurementUnits = await MeasurementUnitRepository.createQueryBuilder('measurementUnit')
        .where({
          deleted: 0
        })
        .select([
          'measurementUnit.id as id',
          'measurementUnit.uuid as uuid',
          'measurementUnit.name as name',
          'measurementUnit.active as active',
        ])
        .getRawMany();
      //Retornamos todos los measurementUnits
      return measurementUnits;
    } catch (error) {
      return error
    }
  }

  static async readMeasurementUnit(data: MeasurementUnit) {
    try {
      //Buscamos y obtenemos el measurementUnit
      const measurementUnit = await MeasurementUnitRepository.createQueryBuilder('measurementUnit')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'measurementUnit.id as id',
          'measurementUnit.uuid as uuid',
          'measurementUnit.name as name',
          'measurementUnit.active as active',
        ])
        .getRawOne();
      //Retornamos el measurementUnit encontrado
      return measurementUnit;
    } catch (error) {
      return error
    }
  }

  static async updateMeasurementUnit(data: MeasurementUnit) {
    try {
      await this.readToUpdate(data);
      await MeasurementUnitRepository.update({ uuid: data.uuid }, data);
      const measurementUnit = await this.readMeasurementUnit(data)
      return measurementUnit;
    } catch (error) {
      return error;
    }
  }

  static async disableMeasurementUnit(data: MeasurementUnit) {
    try {
      await this.readToUpdate(data);
      await MeasurementUnitRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const measurementUnit = await this.readMeasurementUnit(data)
      return measurementUnit;
    } catch (error) {
      return error;
    }
  }

  static async enableMeasurementUnit(data: MeasurementUnit) {
    try {
      await this.readToUpdate(data);
      await MeasurementUnitRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const measurementUnit = await this.readMeasurementUnit(data)
      return measurementUnit;
    } catch (error) {
      return error;
    }
  }

  static async deleteMeasurementUnit(data: MeasurementUnit) {
    try {
      await this.readToUpdate(data);
      await MeasurementUnitRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const measurementUnit = await this.readMeasurementUnit(data)
      return measurementUnit;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const mu = await this.readMeasurementUnit(data)
    let uuid = uuidv4();
    let measurementUnitHistory = {
      uuid: uuid,
      id_measurement_unit: mu.id,
      name: mu.name,
      updated_by: data.updated_by,
    }
    return await MeasurementUnitHistoryRepository.save(measurementUnitHistory)
  }

}