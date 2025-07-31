import { AppDataSource } from '../../config/connection';
import { Gender } from '../../entity/CAT/Gender';
import { v4 as uuidv4 } from 'uuid';
import { GenderHistory } from '../../entity/CAT/GenderHistory';

const genderRepository = AppDataSource.getRepository(Gender);
const genderHistoryRepository = AppDataSource.getRepository(GenderHistory);

export class GenderTransactions {

  static async createGender(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newGender = await genderRepository.save(data)
      const genders = await this.readGender(newGender)
      //Retornamos el resultado del insertado de registro
      return genders
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readGenders() {
    try {
      //Buscamos y obtenemos todos los genders
      const genders = await genderRepository.createQueryBuilder('gender')
        .where({
          deleted: 0
        })
        .select([
          'gender.id as id',
          'gender.uuid as uuid',
          'gender.name as name',
          'gender.active as active',
        ])
        .getRawMany();
      //Retornamos todos los genders
      return genders;
    } catch (error) {
      return error
    }
  }

  static async readGender(data: Gender) {
    try {
      //Buscamos y obtenemos el gender
      const gender = await genderRepository.createQueryBuilder('gender')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'gender.id as id',
          'gender.uuid as uuid',
          'gender.name as name',
          'gender.active as active',
        ])
        .getRawOne();
      //Retornamos el gender encontrado
      return gender;
    } catch (error) {
      return error
    }
  }

  static async updateGender(data: Gender) {
    try {
      await this.readToUpdate(data);
      await genderRepository.update({ uuid: data.uuid }, data);
      const gender = await this.readGender(data)
      return gender;
    } catch (error) {
      return error;
    }
  }

  static async disableGender(data: Gender) {
    try {
      await this.readToUpdate(data);
      await genderRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const gender = await this.readGender(data)
      return gender;
    } catch (error) {
      return error;
    }
  }

  static async enableGender(data: Gender) {
    try {
      await this.readToUpdate(data);
      await genderRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const gender = await this.readGender(data)
      return gender;
    } catch (error) {
      return error;
    }
  }

  static async deleteGender(data: Gender) {
    try {
      await this.readToUpdate(data);
      await genderRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const gender = await this.readGender(data)
      return gender;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const gender = await this.readGender(data)
    let uuid = uuidv4();
    let genderHistory = {
      uuid: uuid,
      id_gender: gender.id,
      name: gender.name,
      updated_by: data.updated_by,
    }
    return await genderHistoryRepository.save(genderHistory)
  }

}