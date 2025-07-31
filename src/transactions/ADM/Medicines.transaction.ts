import { AppDataSource } from '../../config/connection';
import { Medicines } from '../../entity/ADM/Medicines';
import { MedicinesHistory } from '../../entity/ADM/MedicinesHistory';
import { MeasurementUnit } from '../../entity/CAT/MeasurementUnit';
import { MedicinesCategories } from '../../entity/CAT/MedicinesCategories';
import { v4 as uuidv4 } from 'uuid';

const medicinesRepository = AppDataSource.getRepository(Medicines);
const medicinesHistoryRepository = AppDataSource.getRepository(MedicinesHistory);

export class MedicinesTransactions {

  static async createMedicine(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewMedicine = await medicinesRepository.save(data)
      const medicines = await this.readMedicine(nuewMedicine)
      //Retornamos el resultado del insertado de registro
      return medicines
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readMedicines() {
    try {
      //Buscamos y obtenemos todos los medicines
      const medicines = await medicinesRepository.createQueryBuilder('medicine')
        .where({
          deleted: 0
        })
        .select([
          'medicine.id as id',
          'medicine.uuid as uuid',
          'medicine.name as name',
          'medicine.description as description',
          'medicine.quantity as quantity',
          'medicine.id_medicines_category as id_medicines_category',
          'medicine.id_measurement_unit as id_measurement_unit',
          'medicine.active as active',
        ])
        .leftJoin(MedicinesCategories, 'medicineCategory', 'medicine.id_medicines_category = medicineCategory.id')
        .leftJoin(MeasurementUnit, 'measurementUnit', 'medicine.id_measurement_unit = measurementUnit.id')
        .getRawMany();
      //Retornamos todos los medicines
      return medicines;
    } catch (error) {
      return error
    }
  }

  static async readMedicine(data: Medicines) {
    try {
      //Buscamos y obtenemos el medicine
      const medicine = await medicinesRepository.createQueryBuilder('medicine')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'medicine.id as id',
          'medicine.uuid as uuid',
          'medicine.name as name',
          'medicine.description as description',
          'medicine.quantity as quantity',
          'medicine.id_medicines_category as id_medicines_category',
          'medicine.id_measurement_unit as id_measurement_unit',
          'medicine.active as active',
        ])
        .leftJoin(MedicinesCategories, 'medicineCategory', 'medicine.id_medicines_category = medicineCategory.id')
        .leftJoin(MeasurementUnit, 'measurementUnit', 'medicine.id_measurement_unit = measurementUnit.id')
        .getRawOne();
      //Retornamos el medicine encontrado
      return medicine;
    } catch (error) {
      return error
    }
  }

  static async updateMedicine(data: Medicines) {
    try {
      await this.readToUpdate(data)
      await medicinesRepository.update({ uuid: data.uuid }, data);
      const medicine = await this.readMedicine(data)
      return medicine;
    } catch (error) {
      return error;
    }
  }

  static async disableMedicine(data: Medicines) {
    try {
      await this.readToUpdate(data)
      await medicinesRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const medicine = await this.readMedicine(data)
      return medicine;
    } catch (error) {
      return error;
    }
  }

  static async enableMedicine(data: Medicines) {
    try {
      await this.readToUpdate(data)
      await medicinesRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const medicine = await this.readMedicine(data)
      return medicine;
    } catch (error) {
      return error;
    }
  }

  static async deleteMedicine(data: Medicines) {
    try {
      await this.readToUpdate(data)
      await medicinesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const medicine = await this.readMedicine(data)
    let uuid = uuidv4();
    let medicineHistory = {
      uuid: uuid,
      id_medicine: medicine.id,
      id_medicines_category: medicine.id_medicines_category,
      name: medicine.id_medicines_category,
      description: medicine.id_medicines_category,
      quantity: medicine.id_medicines_category,
      id_measurement_unit: medicine.id_medicines_category,
      updated_by: data.updated_by,
    }
    return await medicinesHistoryRepository.save(medicineHistory)
  }

}