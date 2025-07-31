import { AppDataSource } from '../../config/connection';
import { MedicinesCategories } from '../../entity/CAT/MedicinesCategories';
import { v4 as uuidv4 } from 'uuid';
import { MedicinesCategoriesHistory } from '../../entity/CAT/MedicinesCategoriesHistory';

const medicinesCategoriesRepository = AppDataSource.getRepository(MedicinesCategories);
const medicinesCategoriesHistoryRepository = AppDataSource.getRepository(MedicinesCategoriesHistory);

export class MedicineCategoryTransactions {

  static async createMedicineCategory(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newMedicineCategory = await medicinesCategoriesRepository.save(data)
      const medicineCategories = await this.readMedicineCategory(newMedicineCategory)
      //Retornamos el resultado del insertado de registro
      return medicineCategories
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readMedicineCategories() {
    try {
      //Buscamos y obtenemos todos los medicineCategories
      const medicineCategories = await medicinesCategoriesRepository.createQueryBuilder('medicineCategory')
        .where({
          deleted: 0
        })
        .select([
          'medicineCategory.id as id',
          'medicineCategory.uuid as uuid',
          'medicineCategory.name as name',
          'medicineCategory.active as active',
        ])
        .getRawMany();
      //Retornamos todos los medicineCategories
      return medicineCategories;
    } catch (error) {
      return error
    }
  }

  static async readMedicineCategory(data: MedicinesCategories) {
    try {
      //Buscamos y obtenemos el medicineCategory
      const medicineCategory = await medicinesCategoriesRepository.createQueryBuilder('medicineCategory')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'medicineCategory.id as id',
          'medicineCategory.uuid as uuid',
          'medicineCategory.name as name',
          'medicineCategory.active as active',
        ])
        .getRawOne();
      //Retornamos el medicineCategory encontrado
      return medicineCategory;
    } catch (error) {
      return error
    }
  }

  static async updateMedicineCategory(data: MedicinesCategories) {
    try {
      await medicinesCategoriesRepository.update({ uuid: data.uuid }, data);
      const medicineCategory = await this.readMedicineCategory(data)
      return medicineCategory;
    } catch (error) {
      return error;
    }
  }

  static async disableMedicineCategory(data: MedicinesCategories) {
    try {
      await medicinesCategoriesRepository.update({ uuid: data.uuid }, { active: 0 });
      const medicineCategory = await this.readMedicineCategory(data)
      return medicineCategory;
    } catch (error) {
      return error;
    }
  }

  static async enableMedicineCategory(data: MedicinesCategories) {
    try {
      await medicinesCategoriesRepository.update({ uuid: data.uuid }, { active: 1 });
      const medicineCategory = await this.readMedicineCategory(data)
      return medicineCategory;
    } catch (error) {
      return error;
    }
  }

  static async deleteMedicineCategory(data: MedicinesCategories) {
    try {
      await medicinesCategoriesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0 });
      const medicineCategory = await this.readMedicineCategory(data)
      return medicineCategory;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const mc = await this.readMedicineCategory(data)
    let uuid = uuidv4();
    let medicineCategoryHistory = {
      uuid: uuid,
      id_medicine_category: mc.id_event_place,
      name: mc.name,
      updated_by: data.updated_by,
    }
    return await medicinesCategoriesHistoryRepository.save(medicineCategoryHistory)
  }

}