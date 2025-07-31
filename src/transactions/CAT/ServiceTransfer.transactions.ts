import { AppDataSource } from '../../config/connection';
import { ServiceTransfer } from '../../entity/CAT/ServiceTransfer';
import { v4 as uuidv4 } from 'uuid';
import { ServiceTransferHistory } from '../../entity/CAT/ServiceTransferHistory';

const serviceTransferRepository = AppDataSource.getRepository(ServiceTransfer);
const serviceTransferHistoryRepository = AppDataSource.getRepository(ServiceTransferHistory);

export class ServiceTransfersTransactions {

  static async createServiceTransfer(data: any) {
    try {
      //Ingresamos los datos del nuevo registro
      const newServiceTransfer = await serviceTransferRepository.save(data)
      const serviceTransfers = await this.readServiceTransfer(newServiceTransfer)
      //Retornamos el resultado del insertado de registro
      return serviceTransfers
    } catch (error) {
      //Obtener y enviar el error
      return 'error'
    }
  }

  static async readServiceTransfers() {
    try {
      //Buscamos y obtenemos todos los serviceTransfers
      const serviceTransfers = await serviceTransferRepository.createQueryBuilder('serviceTransfer')
        .where({
          deleted: 0
        })
        .select([
          'serviceTransfer.id as id',
          'serviceTransfer.uuid as uuid',
          'serviceTransfer.name as name',
          'serviceTransfer.description as description',
          'serviceTransfer.active as active',
        ])
        .getRawMany();
      //Retornamos todos los serviceTransfers
      return serviceTransfers;
    } catch (error) {
      return error
    }
  }

  static async readServiceTransfer(data: ServiceTransfer) {
    try {
      //Buscamos y obtenemos el serviceTransfer
      const serviceTransfer = await serviceTransferRepository.createQueryBuilder('serviceTransfer')
        .where({
          deleted: 0,
          uuid: data.uuid
        })
        .select([
          'serviceTransfer.id as id',
          'serviceTransfer.uuid as uuid',
          'serviceTransfer.name as name',
          'serviceTransfer.description as description',
          'serviceTransfer.active as active',
        ])
        .getRawOne();
      //Retornamos el serviceTransfer encontrado
      return serviceTransfer;
    } catch (error) {
      return error
    }
  }

  static async updateServiceTransfers(data: ServiceTransfer) {
    try {
      await this.readToUpdate(data);
      await serviceTransferRepository.update({ uuid: data.uuid }, data);
      const serviceTransfer = await this.readServiceTransfer(data)
      return serviceTransfer;
    } catch (error) {
      return error;
    }
  }

  static async disableServiceTransfers(data: ServiceTransfer) {
    try {
      await this.readToUpdate(data);
      await serviceTransferRepository.update({ uuid: data.uuid }, { active: 0, updated_by: data.updated_by });
      const serviceTransfer = await this.readServiceTransfer(data)
      return serviceTransfer;
    } catch (error) {
      return error;
    }
  }

  static async enableServiceTransfers(data: ServiceTransfer) {
    try {
      await this.readToUpdate(data);
      await serviceTransferRepository.update({ uuid: data.uuid }, { active: 1, updated_by: data.updated_by });
      const serviceTransfer = await this.readServiceTransfer(data)
      return serviceTransfer;
    } catch (error) {
      return error;
    }
  }

  static async deleteServiceTransfers(data: ServiceTransfer) {
    try {
      await this.readToUpdate(data);
      await serviceTransferRepository.update({ uuid: data.uuid }, { deleted: 1, active: 0, deleted_by: data.deleted_by });
      const serviceTransfer = await this.readServiceTransfer(data)
      return serviceTransfer;
    } catch (error) {
      return error;
    }
  }

  static async readToUpdate(data: any) {
    const st = await this.readServiceTransfer(data)
    let uuid = uuidv4();
    let stHistory = {
      uuid: uuid,
      id_service_Transfer: st.id,
      name: st.name,
      description: st.description,
      updated_by: data.updated_by,
    }
    return await serviceTransferHistoryRepository.save(stHistory)
  }

}