import { AppDataSource } from '../../config/connection';
import { PaymentTypes } from '../../entity/CAT/PaymentTypes';
import { v4 as uuidv4 } from 'uuid';
import { PaymentTypesHistory } from '../../entity/CAT/PaymentTypesHistory';

const paymentTypesRepository = AppDataSource.getRepository(PaymentTypes);
const paymentTypesHistoryRepository = AppDataSource.getRepository(PaymentTypesHistory);

export class PaymentTypeTransactions {

  static async createPaymentType(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const nuewPaymentType = await paymentTypesRepository.save(data)
      const paymentType = await this.readPaymentType(nuewPaymentType)
      //Retornamos el resultado del insertado de registro
      return paymentType
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readPaymentTypes() {
    try {
      //Buscamos y obtenemos todos los paymentType
      const paymentType = await paymentTypesRepository.createQueryBuilder('paymentType')
        .where({
          deleted: 0
        })
        .select([
          'paymentType.id as id',
          'paymentType.uuid as uuid',
          'paymentType.name as name',
          'paymentType.active as active',
        ])
        .getRawMany();
      //Retornamos todos los paymentType
      return paymentType;
    } catch (error) {
      return error
    }
  }

  static async readPaymentType(data: PaymentTypes) {
    try {
      //Buscamos y obtenemos el paymentType
      const paymentType = await paymentTypesRepository.createQueryBuilder('paymentType')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'paymentType.id as id',
          'paymentType.uuid as uuid',
          'paymentType.name as name',
          'paymentType.active as active',
        ])
        .getRawOne();
      //Retornamos el paymentType encontrado
      return paymentType;
    } catch (error) {
      return error
    }
  }

  static async updatePaymentType(data: PaymentTypes) {
    try {
      await this.readToUpdate(data);
      await paymentTypesRepository.update({ uuid: data.uuid }, data);
      const paymentType = await this.readPaymentType(data)
      return paymentType;
    } catch (error) {
      return error;
    }
  }

  static async disablePaymentType(data: PaymentTypes) {
    try {
      await this.readToUpdate(data);
      await paymentTypesRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const paymentType = await this.readPaymentType(data)
      return paymentType;
    } catch (error) {
      return error;
    }
  }

  static async enablePaymentType(data: PaymentTypes) {
    try {
      await this.readToUpdate(data);
      await paymentTypesRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const paymentType = await this.readPaymentType(data)
      return paymentType;
    } catch (error) {
      return error;
    }
  }

  static async deletePaymentType(data: PaymentTypes) {
    try {
      await this.readToUpdate(data);
      await paymentTypesRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const paymentType = await this.readPaymentType(data)
      return paymentType;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const pt = await this.readPaymentType(data)
    let uuid = uuidv4();
    let genderHistory = {
      uuid: uuid,
      id_payment_type: pt.id,
      name: pt.name,
      updated_by: data.updated_by,
    }
    return await paymentTypesHistoryRepository.save(genderHistory)
  }

}