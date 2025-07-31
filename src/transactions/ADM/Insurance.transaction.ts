import { AppDataSource } from '../../config/connection';
import { Insurance } from '../../entity/ADM/Insurance';
import { InsurancessHistory } from '../../entity/ADM/InsuranceHistory';
import { v4 as uuidv4 } from 'uuid';

const insuranceRepository = AppDataSource.getRepository(Insurance);
const insuranceHistoryRepository = AppDataSource.getRepository(InsurancessHistory);

export class InsuranceTransactions {

  static async createInsurance(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newInsurance = await insuranceRepository.save(data)
      const insurances = await this.readInsurance(newInsurance)
      //Retornamos el resultado del insertado de registro
      return insurances
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readInsurances() {
    try {
      //Buscamos y obtenemos todos los insurances
      const insurances = await insuranceRepository.createQueryBuilder('insurance')
        .where({
          deleted: 0
        })
        .select([
          'insurance.id as id',
          'insurance.uuid as uuid',
          'insurance.name as name',
          'insurance.active as active',
        ])
        .getRawMany();
      //Retornamos todos los insurances
      return insurances;
    } catch (error) {
      return error
    }
  }

  static async readInsurance(data: Insurance) {
    try {
      //Buscamos y obtenemos el insurance
      const insurance = await insuranceRepository.createQueryBuilder('insurance')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'insurance.id as id',
          'insurance.uuid as uuid',
          'insurance.name as name',
          'insurance.active as active',
        ])
        .getRawOne();
      //Retornamos el insurance encontrado
      return insurance;
    } catch (error) {
      return error
    }
  }

  static async updateInsurance(data: Insurance) {
    try {
      await this.readToUpdate(data)
      await insuranceRepository.update({ uuid: data.uuid }, data);
      const insurance = await this.readInsurance(data)
      return insurance;
    } catch (error) {
      return error;
    }
  }

  static async disableInsurance(data: Insurance) {
    try {
      await this.readToUpdate(data)
      await insuranceRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const insurance = await this.readInsurance(data)
      return insurance;
    } catch (error) {
      return error;
    }
  }

  static async enableInsurance(data: Insurance) {
    try {
      await this.readToUpdate(data)
      await insuranceRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const insurance = await this.readInsurance(data)
      return insurance;
    } catch (error) {
      return error;
    }
  }

  static async deleteInsurance(data: Insurance) {
    try {
      await this.readToUpdate(data)
      await insuranceRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      return 'OK';
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const insurance = await this.readInsurance(data)
    let uuid = uuidv4();
    let insuranceHistory = {
      uuid: uuid,
      id_insurance: insurance.id,
      name: insurance.name,
      updated_by: data.updated_by,
    }
    return await insuranceHistoryRepository.save(insuranceHistory)
  }
}